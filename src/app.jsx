import { PageLoading } from '@ant-design/pro-layout';
import { history, Link, useModel } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import gql from 'graphql-tag';
import { secureQueryAsync } from './hooks/useSecureGraphql';
const loginPath = '/user/login';

const queryClient = new QueryClient();

export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const userInfoQuery = `
        query RootQuery {
          userInfo {
            name
            login
            username
            email
            id
          }
        }
      `;
      const data = await secureQueryAsync({ query: userInfoQuery });
      return data.userInfo;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };
  const currentUser = await fetchUserInfo();
  if (currentUser && history.location.pathname == loginPath) {
    history.push('/');
  }
  if (history.location.pathname !== loginPath) {
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }

  return {
    fetchUserInfo,
    settings: {},
  };
}
// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout = ({ initialState }) => {
  return {
    childrenRender: (children) => {
      return (
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      );
    },
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: 'GPG Dev',
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;

      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
  };
};
