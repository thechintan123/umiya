<template>
  <q-page padding>
    <search @fetchSearchResults="fetchSearchResults"/>
    <searchResults :searchResults="searchResultsPerPage" v-if="Object.keys(searchResultsPerPage).length"/>

<!-- Not using this function and SearchResults Pagination component since
 On changing the page number and calling update Action. It updates page number and it is not
able to update the state of the SearchResults
-->
    <!-- <searchResultsPagination :maxPages = "maxPages" /> -->

    <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="page"
          :max="maxPages"
          @click="checkPage"
          v-if ="maxPages > 0"
          color = "secondary"
        >
        </q-pagination>
    </div>

  </q-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
data(){
return {
searchResultsList : {},
page : 1,
maxPages : 0,
resultsPerPage : 3 , //Fixed count
searchResultsPerPage : {}
}

}
,
methods:{
checkPage(){
console.log('page', this.page);
//use slice of Objects.keys(as array). Pass allowed keys as array to SearchResults
let keys = Object.keys(this.searchResultsList);
console.log('keys',keys);
let selectedKeys;
selectedKeys = keys.slice(this.page - 1, this.page - 1 + this.resultsPerPage);
console.log('selectedKeys',selectedKeys);
this.searchResultsPerPage = Object.assign(
        ...Object
        .keys(this.searchResultsList)
        .slice(this.page - 1 ,  this.page - 1 + this.resultsPerPage)
        .map(k => ({ [k]: this.searchResultsList[k] }))
    );
console.log(this.searchResultsPerPage);
}

,
fetchSearchResults(){
console.log('fetchSearchResults');
this.searchResultsList = this.getSearchResults;
this.maxPages = Object.keys(this.searchResultsList).length / this.resultsPerPage;
if (this.maxPages <= 1) { this.maxPages = 1 };
console.log('MaxPages', this.maxPages);
this.page=1;
this.checkPage();
//this.searchResultsPerPage = this.getSearchResultsPerPage;
//console.log('searchResultsPerPage', this.searchResultsPerPage);
}
}
,
computed :{
 ...mapGetters('search',['getSearchResults','getSearchResultsPerPage']),
 ...mapState('search', ['searchResults'])
}
  ,
 components : {
    'search' :  require('components/Search.vue').default,
    'searchResults' :  require('components/SearchResults.vue').default,
    'searchResultsPagination' :  require('components/SearchResultsPagination.vue').default,
  }
}
</script>

<style scoped>
</style>
