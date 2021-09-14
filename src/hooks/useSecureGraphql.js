import { GraphQLClient } from 'graphql-request';
import { useQuery } from 'react-query';

export function useSecureGraphql({ key, query, variables = {} }) {
  const config = {};
  const endpoint = `${BASE_URL}`;
  const headers = {
    headers: {
      authorization: `${localStorage.getItem('token')}`,
    },
  };

  const client = new GraphQLClient(`${endpoint}/graphql`, headers);

  return useQuery(key, async () => client.request(query, variables), config);
}

export async function secureQueryAsync({ query, variables = {} }) {
  const config = {};
  const endpoint = `${BASE_URL}`;
  const headers = {
    headers: {
      authorization: `${localStorage.getItem('token')}`,
    },
  };

  const client = new GraphQLClient(`${endpoint}/graphql`, headers);

  return await client.request(query, variables);
}
