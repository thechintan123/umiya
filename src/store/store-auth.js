import axios from 'axios'

const state = {
  // format is user.email and user.token
  user: null,
  loggedIn: false,
  role: null
}

const mutations = {
  SET_USER_DATA (state, userData) {
    // console.log("SET_USER_DATA", userData)
    state.user = userData
    localStorage.setItem('user', JSON.stringify(userData))
    axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`
    state.loggedIn = true
    state.role = userData.role
  },
  CLEAR_USER_DATA () {
    localStorage.removeItem('user')
    state.loggedIn = false
  },
  initialiseStore (state) {
    // console.log("initialiseStore")

    if (localStorage.getItem('user')) {
      state.loggedIn = true
      var user = JSON.parse(localStorage.getItem('user'))
      state.user = user
      state.role = user.role
      axios.defaults.headers.common.Authorization = `Bearer ${user.token}`
      console.log('User Token', user, user.token, axios.defaults.headers)
    }
  }
}

const actions = {
  loginUser ({ commit }, credentials) {
    return axios
      .post(
        process.env.API + '/tokens',
        {
          remember_me: credentials.rememberMe
        },
        {
          auth: {
            username: credentials.email,
            password: credentials.password
          }
        }
      )
      .then(({ data }) => {
        commit('SET_USER_DATA', data)
      })
  },
  logoutUser ({ commit }) {
    commit('CLEAR_USER_DATA')
  }
}

const getters = {
  loggedIn (state) {
    // the double - bang returns the boolean true / false association of a value
    return !!state.user
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
