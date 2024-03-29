const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/register',
        component: () => import('pages/RegisterPage.vue')
      },
      {
        path: '/search',
        component: () => import('pages/SearchPage.vue')
      },
      {
        path: '/login',
        component: () => import('pages/LoginPage.vue')
      },
      {
        path: '/logout',
        component: () => import('pages/LogoutPage.vue')
      },
      {
        path: '/update-profile',
        component: () => import('pages/UpdateProfilePage.vue')
      },
      {
        path: '/profile',
        component: () => import('pages/ProfilePage.vue')
      },
      {
        path: '/forgot-password',
        component: () => import('pages/ForgotPasswordPage.vue')
      },
      {
        path: '/change-password',
        component: () => import('pages/ChangePasswordPage.vue')
      },
      {
        path: '/admin-approval',
        component: () => import('pages/AdminApprovalPage.vue')
      },
      {
        path: '/admin-update-profile',
        component: () => import('pages/AdminUpdateProfilePage.vue')
      },
      {
        path: '/help',
        component: () => import('pages/HelpPage.vue')
      },
      {
        path: '/contact-us',
        component: () => import('pages/ContactUsPage.vue')
      },
      {
        path: '/get-android-app',
        component: () => import('pages/GetAndroidAppPage.vue')
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
