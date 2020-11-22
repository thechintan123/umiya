import axios from 'axios'
import mixinComputations from 'src/mixins/Mixin_Computations.js'
import mixinUtils from 'src/mixins/Mixin_Utils.js'
import { maxSearchResultsPerPage } from '../constants/registerFormConstants.js'

const state = {

  searchParams: {
    ageFromTo: {
      min: 20,
      max: 40
    },

    lookingFor: '2', // 2 is for Bride ; Defaulted to Bride
    heightFrom: '',
    heightTo: '',
    maritalStatusPreference: [],
    country: [{ id: 81, name: 'India' }], // defaulted to India
    // country : ['India']
    userDetailsIdFrom: '',
    userDetailsIdTo: '',
    searchUsingId: false
  },
  searchResults: [],
  searchResultsPerPage: [],

  showProgressBar: false,
  // page: 1,
  resultsPerPage: maxSearchResultsPerPage,

  list: {
    countryOptions: [],
    maritalOptions: []
  },

  tmpData: {
    countryList: []
  },

  searchPerformed: false,
  totalPages: 0,
  page: 1,
  expand: true,
  count :{
    start : 0,
    end : 0
  }

}

const getters = {
  getSearchResults: state => {
    return state.searchResults
  }
}

// Not using Action and mutations since on updating page number and state of Search Results is not changed
const mutations = {

  setSearchParamsIndividual (state, object) {
    state.searchParams[object.key] = object.value
  },
  setShowProgressBar (state, value) {
    state.showProgressBar = value
  },
  setTmpData (state, object) {
    state.tmpData[object.key] = object.value
    // console.log("tmpdata", state.tmpData, object.key, object.key);
  },
  setList (state, object) {
    state.list[object.key] = object.value
    // console.log("tmpdata", state.tmpData, object.key, object.key);
  },
  setSearchResults (state, list) {
    state.searchResults = list
  },
  setSearchResultsPerPage (state, list) {
    state.searchResultsPerPage = list
  },
  setSearchResultsSingle (state, object) {
    state.searchResults[object.key] = object.value
  },
  setSearchPerformed (state, value) {
    state.searchPerformed = value
  },
  setTotalPages (state, value) {
    state.totalPages = value
  },
  setPage (state, value) {
    state.page = value
  },
  setExpand (state, value) {
    state.expand = value
  }
  ,
  setCount(state, object) {
    state.count[object.key] = object.value
    //console.log("setCount", state.count, object, object.key, object.value)
  }
  ,
  setResultsPerPage(state, value){
    state.resultsPerPage = value
   // console.log("setResultsPerPage", state.resultsPerPage, value)

  }
}

// Not using Action and mutations since on updating page number and state of Search Results is not changed
const actions = {

  fetchList ({ commit }) {
    return axios
      .get(process.env.API + '/lists')
      .then(response => {
        // this.countryList = response.data.country
        var countryOptions = response.data.country
        commit('setList', { key: 'countryOptions', value: countryOptions })
        commit('setTmpData', { key: 'countryList', value: countryOptions })

        var maritalOptions = response.data.marital_status
        commit('setList', { key: 'maritalOptions', value: maritalOptions })
      })
      .catch(error => {
        mixinUtils.methods.showErrorDialog(error)
      })
  },
  saveSearchResults ({ commit, dispatch }, searchResults) {
    // Reset the details before search
    // set Empty Result
    var emptyResult = []
    commit('setSearchResults', emptyResult)
    commit('setSearchResultsPerPage', emptyResult)

    // set Page back to 1 and totalpages to 0
    commit('setPage', 1)
    commit('setTotalPages', 0)

    commit('setShowProgressBar', true)

    // Converting keys in Object from Snake to Camel Case
    var searchResultsCamelList = [];
    for (var i = 0; i < searchResults.length; i++) {
      var indObj = searchResults[i]
      var searchResultCamelObj = {}
      for (var key in indObj) {
        searchResultCamelObj[mixinComputations.methods.snakeToCamel(key)] = indObj[key]
      }
      searchResultsCamelList.push(searchResultCamelObj)
    }

    commit('setSearchResults', searchResultsCamelList)


     // Computing total Pages for Pagination
    dispatch('computeTotalPages')

    // Create Results per page
    dispatch('updatePage', 1)

    var searchPerformed = true
    commit('setSearchPerformed', searchPerformed)

    // whether SearchForm should be expanded or closed
    if (searchResults.length > 0) {
      commit('setExpand', false)
    } else {
      commit('setExpand', true)
    }

    commit('setShowProgressBar', false)
  },
  computeTotalPages({commit}){
  var resultsCount = state.searchResults.length;  
  var totalPages = Math.ceil(
    resultsCount / state.resultsPerPage
  )

  if (totalPages <= 0) {
    totalPages = 0
  } else if (totalPages <= 1) {
    totalPages = 1
  }
  commit('setTotalPages', totalPages)

}
,
  updatePage ({ commit }, page) {
    var searchResultsPerPage = []
    var searchResultsList = state.searchResults
    if (searchResultsList.length > 0) {
      var startingIndex = (page - 1) * state.resultsPerPage
      var endingIndex = startingIndex + state.resultsPerPage
      if (endingIndex > searchResultsList.length) {
        endingIndex = searchResultsList.length
      }
      searchResultsPerPage = searchResultsList.slice(startingIndex, endingIndex)
      commit('setSearchResultsPerPage', searchResultsPerPage)
      commit('setPage', page)
      commit('setCount',{ key: 'start', value: startingIndex+1 })
      commit('setCount', { key: 'end', value: endingIndex} )

    }
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
