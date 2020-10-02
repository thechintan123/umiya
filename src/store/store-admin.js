import axios from 'axios'
import mixinComputations from 'src/mixins/Mixin_Computations.js'
import mixinUtils from 'src/mixins/Mixin_Utils.js'
import {maxSearchResultsPerPage} from '../constants/registerFormConstants.js'

const state = {

  searchParams :
  {
  email : '',
  firstName : '',
  lastName : '',
  userDetailsId : '',
  gender : '',
  profileStatus : [1] //1 - Registered
  },  

  searchResults: [],
  searchResultsPerPage : [],

  showProgressBar: false,
  resultsPerPage: maxSearchResultsPerPage, 

  list: {
    profileStatusOptions: []
  },

  searchPerformed : false,
  totalPages : 0,
  page : 1,
  expand : true

}

const getters = {

}


// Not using Action and mutations since on updating page number and state of Search Results is not changed
const mutations = {

  setSearchParamsIndividual (state, object) {
    state.searchParams[object.key] = object.value
  },
  setShowProgressBar (state, value) {
    // console.log("setShowProgressBar", state.showProgressBar, value);
    state.showProgressBar = value
  },

  setList (state, object) {
    state.list[object.key] = object.value
    // console.log("state.list", state.list, object.key, object.key);
  },
  setSearchResults(state,list){
    state.searchResults = list;
  },
  setSearchResultsPerPage(state,list){
    state.searchResultsPerPage = list;
  },  
  setSearchPerformed(state,value){
    state.searchPerformed = value
  },
  setTotalPages(state, value){
    state.totalPages =value
  },
  setPage(state, value){
    state.page =value
  },
  setExpand(state, value){
    state.expand = value
  },
  setSearchItemParameter(state, Object){
    var item = Object.item;
    var key = Object.key;
    var value = Object.value;
    var foundItem = state.searchResults.find(element => element.userDetailsId === item.userDetailsId);
    foundItem[key] = value;
  }

}

// Not using Action and mutations since on updating page number and state of Search Results is not changed
const actions = {

  saveSearchResults ({commit , dispatch}, searchResults) {

    //Reset the details before search
    //set Empty Result
    var emptyResult = []
    commit('setSearchResults', emptyResult)
    commit('setSearchResultsPerPage',emptyResult)

    //set Page back to 1 and totalpages to 0
    commit('setPage',1)
    commit('setTotalPages',0)

    commit('setShowProgressBar', true)


    //Converting keys in Object from Snake to Camel Case
     var searchResultsCamelList= []
      for (var i = 0; i < searchResults.length; i++) {
      var indObj = searchResults[i]
      var searchResultCamelObj = {}
      for (var key in indObj) {
      searchResultCamelObj[mixinComputations.methods.snakeToCamel(key)] = indObj[key]
      }
      searchResultsCamelList.push(searchResultCamelObj);

      }
      
      //Computing total Pages for Pagination
      var totalPages = Math.ceil(
        searchResultsCamelList.length/state.resultsPerPage
      )

      if (totalPages <= 0) {
        totalPages = 0
      }
      else if(totalPages <= 1){
        totalPages = 1
      }



      commit('setSearchResults', searchResultsCamelList)

      commit('setTotalPages', totalPages)

      //Create Results per page
      dispatch('updatePage', 1)


      var searchPerformed = true;
      commit('setSearchPerformed', searchPerformed)

      //whether SearchForm should be expanded or closed
      if(searchResults.length >0){
      commit('setExpand', false)
      }
      else{
      commit('setExpand', true)
      }

      commit('setShowProgressBar', false)

  },
  updatePage({commit}, page){
  
      var searchResultsPerPage = []
      var searchResultsList = state.searchResults
      if(searchResultsList.length > 0) {
      var startingIndex = (page - 1) * state.resultsPerPage
      var endingIndex = startingIndex + state.resultsPerPage
      if(endingIndex > searchResultsList.length){
        endingIndex = searchResultsList.length
      }
      // console.log("updatePage", page, startingIndex, endingIndex)
      searchResultsPerPage = searchResultsList.slice(startingIndex, endingIndex)
      commit('setSearchResultsPerPage', searchResultsPerPage)
      commit('setPage', page)

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
