<template>
  <q-page padding>
      You are being logged out......
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('auth', ['logoutUser']),
    logout () {
      this.logoutUser()
      this.$q.notify({
        type: 'positive',
        message: 'Thank you. You have succesfully logged out'
      })
      this.$router.push('/')
    }
  },
  mounted () {
    this.logout()
  }
}
</script>

<style scoped>
</style>
