import Vue from 'vue'
import axios from 'axios'

export default ({ app, router, store, Vue }) => {
  // response interceptor
  axios.interceptors.response.use(
    res => res,
    err => {
      if (err.response.status === 401) {
        store.dispatch('auth/logoutUser')
        router.push({ path: '/login' })
      }
      return Promise.reject(err)
    })
}

Vue.prototype.$axios = axios
