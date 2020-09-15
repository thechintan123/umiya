<template>
  <div class="fit column">
            <!-- <progressBar v-show="showProgressBar"/> -->
        <progressBar v-show="showProgressBar"/>
      <spinner v-show="showProgressBar"/>
    <searchForm @fetchSearchResults="fetchSearchResults" />
    <searchResults
      :searchResults="searchResultsPerPage"
      v-if="Object.keys(searchResultsPerPage).length"
    />

  <noSearchResult v-if="!Object.keys(searchResultsPerPage).length && searchPerformed" />

    <!-- <searchResults :searchResults="searchResultsList" v-if="Object.keys(searchResultsList).length"/> -->
    <!-- Use this if you want to send entire SearchResultList and not SearchResultsPage -->

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
        v-if="maxPages > 0"
        color="secondary"
      ></q-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      searchResultsList: {},
      page: 1,
      maxPages: 0,
      resultsPerPage: 3, // Fixed count
      searchResultsPerPage: {},
      searchPerformed: false
    }
  },
  methods: {
    checkPage () {
      // use slice of Objects.keys(as array). Pass allowed keys as array to SearchResults
      // const keys = Object.keys(this.searchResultsList)
      const startingIndex = (this.page - 1) * this.resultsPerPage
      const endingIndex = startingIndex + this.resultsPerPage
      // const selectedKeys = keys.slice(startingIndex, endingIndex)
      // console.log("Page", this.page, startingIndex, endingIndex);
      this.searchResultsPerPage = Object.assign(
        ...Object.keys(this.searchResultsList)
          .slice(startingIndex, endingIndex)
          .map(k => ({ [k]: this.searchResultsList[k] }))
      )
      // console.log("Page", this.page, startingIndex, endingIndex);
      // console.log("Check Page", selectedKeys, this.searchResultsPerPage);
    },

    fetchSearchResults () {
      this.searchResultsList = {}
      this.searchResultsList = this.getSearchResults
      this.page = 1 // initalizing to page 1
      // console.log("searchResultsList", this.searchResultsList);
      if (Object.keys(this.searchResultsList).length > 0) {
        this.checkPage()
        this.maxPages = Math.ceil(
          Object.keys(this.searchResultsList).length / this.resultsPerPage
        )
        if (this.maxPages <= 1) {
          this.maxPages = 1
        }
      } else {
        this.searchResultsPerPage = {}
        this.maxPages = 0
      }
      this.page = 1 // To stay on First Page
      this.searchPerformed = true // This is done to ensure that No Search Results message is displayed for empty Search Results
      // this.searchResultsPerPage = this.getSearchResultsPerPage;
      // console.log("searchResultsPerPage", this.searchResultsPerPage);
    }
  },
  computed: {
    ...mapGetters('search', ['getSearchResults', 'getSearchResultsPerPage']),
    ...mapState('search', ['searchResults','showProgressBar'])
  },
  components: {
    searchForm: require('./search/SearchForm.vue').default,
    searchResults: require('./search/SearchResults.vue').default,
    noSearchResult : require('./search/NoSearchResult.vue').default
  }
}
</script>

<style scoped>
</style>
