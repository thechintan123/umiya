<template>
  <div>
    <h4>Register</h4>
    <q-form
      @submit.prevent="register"
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
    ...mapActions('auth', ['registerUser']),
    register () {
      this.registerUser(this.formData)
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
        this.showNotif('You have successfully registered')
      }
    }
  }
}
</script>

<style scoped>
</style>
