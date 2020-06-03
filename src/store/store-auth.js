import axios from 'axios'
import { showErrorMessage } from 'src/utils/show-error-message'


const state = {
	// format is user.email and user.token
  user: null,
  loggedIn: false
}

const mutations = {
  SET_USER_DATA(state, userData) {
    state.user = userData
    localStorage.setItem("user", JSON.stringify(userData))
    axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`
    state.loggedIn = true
  },
  CLEAR_USER_DATA() {
    localStorage.removeItem("user")
    location.reload()
    state.loggedIn = false
  }
}

const actions = {
  loginUser({ commit }, credentials) {
    return axios.post (
      process.env.API + "/tokens", {},
      {
        auth: {
          username: credentials.email,
          password: credentials.password
        }
      }
    )
    .then(({ data }) => {
      commit("SET_USER_DATA", data)
    })
    .catch(error => {
      let err_msg = ''
      if ('message' in error.response.data) {
        err_msg = error.response.data.error + ' - ' + error.response.data.message
      } else {
        err_msg = error.response.data.error
      }
      showErrorMessage(err_msg)
    })
  },
  logoutUser({ commit }) {
    commit("CLEAR_USER_DATA")
  }
}

const getters = {
  loggedIn(state) {
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
