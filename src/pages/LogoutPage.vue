<template>
  <q-page padding>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="toggle_off" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure that you want to Log off?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup @click="goBack"/>
          <q-btn label="CONFIRM" color="primary" v-close-popup @click="logout"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    </q-page>
</template>

<script>
import mixinUtils from 'src/mixins/Mixin_Utils.js'
import { mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      confirm: true
    }
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    ...mapMutations('search', ['resetState']),
    // ...mapMutations('search', ['setSearchResults','setSearchResultsPerPage','setTotalPages','setSearchPerformed']),
    logout () {
      this.logoutUser()
      // this.$q.notify({
      //   type: 'positive',
      //   message: 'Thank you. You have succesfully logged out'
      // })
      this.showNotification('positive', 'Thank you. You have succesfully logged out')
      this.resetState()
      // var emptyList = [];
      // this.setSearchPerformed(false);
      // this.setSearchResults(emptyList);
      // this.setSearchResultsPerPage(emptyList);
      // this.setTotalPages(0);
      this.$router.push('/')
    },
    goBack () {
      this.$router.back()
    }
  },
  mounted () {
    // this.logout()
  },
  mixins: [mixinUtils]
}
</script>

<style scoped>
</style>
