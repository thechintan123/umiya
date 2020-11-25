<template>
  <div class="fit">
    <progressBar v-show="showProgressBar"/>
    <spinner v-show="showProgressBar"/>
    <adminSearchUser bannerTitle="Search User for Admin Updating Profile"/>
    <adminSearchResultList
      v-if="Object.keys(searchResultsPerPage).length"
    />

  <noSearchResult v-if="!Object.keys(searchResultsPerPage).length && searchPerformed" />

    <register_update v-if="selectedIdByAdmin !== ''"
    :updateProfile="true"
    class="q-mt-md"
    ref="registerRef"
    />

  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import mixinFormValidations from 'src/mixins/Mixin_FormValidations.js'

export default {
  mixins: [mixinFormValidations],
  computed: {
    ...mapState('admin', ['searchResults', 'searchResultsPerPage',
      'showProgressBar', 'searchPerformed', 'totalPages', 'selectedIdByAdmin']),

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
    adminSearchResultList: require('components/admin/AdminSearchResultList.vue').default,
    noSearchResult: require('components/search/NoSearchResult.vue').default,
    progressBar: require('components/general/ProgressBar.vue').default,
    spinner: require('components/general/Spinner.vue').default,
    register_update: require('components/Register_Update.vue').default

  }
}
</script>

<style scoped>
</style>
