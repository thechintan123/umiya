<template>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="toggle_off" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure that you want to Log off?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn label="CONFIRM" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

</template>

<script>
import { mapActions } from 'vuex'
import mixinFormValidations from 'src/mixins/Mixin_FormValidations.js'
import mixinUtils from 'src/mixins/Mixin_Utils.js'

export default {
  mixins: [mixinFormValidations, mixinUtils],
  data () {
    return {
      isPwd: true,
      confirm : true,     
      formData: {
        email: '',
        password: ''
      },
      devEnv: process.env.DEV // This is true for development environment and false for production

    }
  },
  methods: {
    ...mapActions('auth', ['loginUser']),
    login () {
      this.showProgressBar = true
      this.loginUser(this.formData)
        .then(() => {
          // this.$q.notify({
          //   type: 'positive',
          //   message: 'Welcome ! You are now logged in.'
          // })
          this.showNotification('positive','Welcome ! You are now logged in.')
          this.showProgressBar = false

          this.$router.push('/profile')
        })
        .catch(error => {
          console.log('Login error', error, error.response)
          this.showErrorDialog(error)
          this.showProgressBar = false
        })
    },
    defaultTestingData () {
      this.formData = testLoginData
    }
  },
  components: {
    progressBar: require('./general/ProgressBar.vue').default,
    spinner: require('./general/Spinner.vue').default,
    banner: require('./general/Banner.vue').default
  }
}
</script>

<style scoped>
</style>
