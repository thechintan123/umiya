<template>

<!-- Not using this function and SearchResults Pagination component since
 On changing the page number and calling update Action. It updates page number and it is not
able to update the state of the SearchResults
-->
    <div class="q-pa-lg flex flex-center">
    <q-pagination
      v-model="page"
      :max="maxPages"
      @click="updatePage"
      v-if ="maxPages > 0"
      color = "primary"
    >
    </q-pagination>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      page: 1,
      maxPages: 3,
      resultsPerPage: 3 // Fixed count
    }
  },
  methods: {
    ...mapActions('search', ['updatePageNumber']),
    getSearchResults () {
      // call Getter
      this.getSearchResultsPerPage(this.page, this.resultsPerPage)
    },
    updatePage () {
      this.updatePageNumber(this.page)
    }
  },
  computed: {
    ...mapGetters('search', ['getSearchResultsPerPage'])
  }
}
</script>

<style>

</style>
