<template>
  <div class="fit">
      <progressBar v-if="showProgressBar"/>
      <spinner v-if="showProgressBar"/>
      <searchForm />
    <searchResults
      v-if="Object.keys(searchResultsPerPage).length"
    />

  <noSearchResult v-if="!Object.keys(searchResultsPerPage).length && searchPerformed" />

    <div class="q-mt-sm flex flex-center">
      <q-pagination
        v-model="page"
        :max="totalPages"
        @click="changePage"
        v-if="totalPages > 0"
        color="secondary"
      ></q-pagination>
    </div>

  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {

  methods: {
    ...mapActions('search', ['updatePage']),
    ...mapMutations('search', ['setPage']),

    changePage (e) {
      this.updatePage(this.page)
    }
  },
  computed: {
    ...mapGetters('search', ['getSearchResults']),
    ...mapState('search', ['searchResults', 'showProgressBar', 'searchResultsPerPage', 'searchPerformed', 'totalPages']),
    page: {
      get () {
        return this.$store.state.search.page
      },
      set (value) {
        this.setPage(value)
      }
    }
  },
  components: {
    searchForm: require('./search/SearchForm.vue').default,
    searchResults: require('./search/SearchResults.vue').default,
    noSearchResult: require('./search/NoSearchResult.vue').default,
    progressBar: require('./general/ProgressBar.vue').default,
    spinner: require('./general/Spinner.vue').default
  }
}
</script>

<style scoped>
</style>
