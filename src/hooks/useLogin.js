import { useMutation } from 'react-query';

import { GraphQLClient, gql } from 'graphql-request';

import { notification } from 'antd';

import { history, useModel } from 'umi';

export function useLogin() {
  const { initialState, setInitialState } = useModel('@@initialState');

  return useMutation(loginMutation, {
    onMutate: (variables) => {
      // A mutation is about to happen!

      // Optionally return a context containing data to use when for example rolling back
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.log(`rolling back optimistic update with id ${context.id}`);

      notification['error']({
        message: 'Login Failed',
        description: 'Invalid Username/Password',
      });
    },
    onSuccess: async (data, variables, context) => {
      notification['success']({
        message: 'Login Successful',
        description: 'Login success, redirecting...',
      });
      //Save token to local storage
      localStorage.setItem('token', data.login.bearer_token);

      const currentUser = await initialState.fetchUserInfo();

      setInitialState({ ...initialState, currentUser });
      await initialState.fetchUserInfo();

      if (!history) return;
      const { query } = history.location;
      const { redirect } = query;
      history.replace(redirect || '/');

      // Boom baby!
      console.log('Login success, redirecting...');
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });
}

const loginMutation = async (values) => {
  const config = {};
  const endpoint = `${BASE_URL}`;

  const loginMutation = gql`
    mutation LoginMutations($loginUsername: String, $loginPassword: String) {
      login(username: $loginUsername, password: $loginPassword) {
        bearer_token
        name
      }
    }
  `;

  const client = new GraphQLClient(`${endpoint}/graphql`);
  return await client.request(loginMutation, {
    loginUsername: values.username,
    loginPassword: values.password,
  });
};
