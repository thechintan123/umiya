
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/register', component: () => import('pages/RegisterPage.vue') },
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/test_login', component: () => import('pages/TestLogin.vue') },
      { path: '/test_reg', component: () => import('pages/TestReg.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
