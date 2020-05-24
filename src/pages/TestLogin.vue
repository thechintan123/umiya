<template>
  <div>
    <h4>Login</h4>

    <q-form
      @submit.prevent="login"
      class="q-gutter-md">

      <q-input outlined v-model="formData.email" label="Email"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
        ref="email"
        dense />

      <q-input outlined v-model="formData.password"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
        ref="password"
        label="Password" 
        type="password"
        dense />

      <q-btn label="Submit" type="submit" color="primary"/>
      <q-btn @click="logout" label="Logout" color="primary"/>
    </q-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('auth', ['loginUser', 'logoutUser']),
    login () {
      this.loginUser(this.formData)
    },
    logout () {
      this.logoutUser()
    },
    showNotif (message) {
      this.$q.notify({
        message: message,
        color: 'purple'
      })
    }
  },
  computed: {
    ...mapState('auth', ['loggedIn'])
  },
  watch: {
    loggedIn(newValue) {
      if (newValue) {
        this.showNotif('You are now logged in')
      } else {
        this.showNotif('You are now logged out')
      }
    }
  }
}
</script>

<style scoped>
</style>
