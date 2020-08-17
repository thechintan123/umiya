const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/register', component: () => import('pages/RegisterPage.vue') },
      { path: '/search', component: () => import('pages/SearchPage.vue') },
      { path: '/login', component: () => import('pages/LoginPage.vue') },
      { path: '/logout', component: () => import('pages/LogoutPage.vue') },

      {
        path: '/updateProfile',
        component: () => import('pages/UpdateProfilePage.vue')
      },
      {
        path: "/profile",
        component: () => import("pages/ProfilePage.vue")
      }
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
