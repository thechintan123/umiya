<template>
  <q-page padding>
    <search @fetchSearchResults="fetchSearchResults"/>
    <searchResults :searchResults="searchResultsList" v-if="Object.keys(searchResultsList).length"/>
  </q-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
data(){
return {
searchResultsList : {}

}

}
,
methods:{
fetchSearchResults(){
console.log('fetchSearchResults');
this.searchResultsList = this.getSearchResults;
console.log(this.searchResultsList);
}
}
,
computed :{
 ...mapGetters('search',['getSearchResults']),
 ...mapState('search', ['searchResults'])
}
  ,
 components : {
    'search' :  require('components/Search.vue').default,
    'searchResults' :  require('components/SearchResults.vue').default,

  }
}
</script>

<style scoped>
</style>
