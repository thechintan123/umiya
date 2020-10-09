<template>
  <div class="fit">
    <progressBar v-show="showProgressBar"/>
    <spinner v-show="showProgressBar"/>
    <adminSearchUser />
    <adminSearchResults
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
import { mapActions, mapState, mapMutations } from 'vuex'
import mixinFormValidations from 'src/mixins/Mixin_FormValidations.js'

export default {
  mixins: [mixinFormValidations],
  computed: {
    ...mapState('admin', ['searchResults', 'searchResultsPerPage', 'showProgressBar', 'searchPerformed', 'totalPages']),

    page: {
      get () {
        return this.$store.state.admin.page
      },
      set (value) {
        this.setPage(value)
      }
    }
  },
  methods: {
    ...mapActions('admin', ['updatePage']),
    ...mapMutations('admin', ['setPage']),
    changePage (e) {
      this.updatePage(this.page)
    }
  },
  components: {
    adminSearchUser: require('components/admin/AdminSearchUser.vue').default,
    adminSearchResults: require('components/admin/AdminSearchResults.vue').default,
    noSearchResult: require('components/search/NoSearchResult.vue').default,
    progressBar: require('components/general/ProgressBar.vue').default,
    spinner: require('components/general/Spinner.vue').default
  }
}
</script>

<style scoped>
</style>
