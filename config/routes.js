export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'smile',
    component: './dashboard',
  },
  {
    path: '/statements',
    name: 'statements',
    icon: 'table',
    component: './statements',
  },
  // {
  //   path: '/reports',
  //   name: 'reports',
  //   icon: 'smile',
  //   component: './reports',
  //   // access: 'canAdmin',
  // },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   // access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './dashboard',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },

  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    component: './404',
  },
];
