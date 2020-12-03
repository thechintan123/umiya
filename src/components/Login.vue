<template>
  <div class="fit column">
    <q-card bordered>

      <progressBar v-if="showProgressBar" />
      <spinner
        v-if="showProgressBar"
      />
        <banner
        iconName="fas fa-sign-in-alt"
        bannerTitle="Login"
              />
      <q-card-section>
        <q-form
          greedy
          ref="loginForm"
          @submit.prevent="login"
        >
      <q-btn
        class="my-button q-mb-md"
        color="secondary"
        label="For Testing - Default fields"
        v-if="devEnv"
        @click="defaultTestingData"
      />

          <q-input outlined v-model="formData.email" label="Email"
            lazy-rules
            tabIndex = 1
            :rules="[ val => !!val || 'Please type something', val => checkEmail(val) || 'Please enter valid email address.']"
            clearable
            dense />

          <q-input outlined v-model="formData.password"
            lazy-rules
           tabIndex = 2

            :rules="[ val => !!val || 'Please type something']"
            label="Password"
            :type="isPwd ? 'password' : 'text'"
            clearable
            dense >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <div class="row">
            <q-space/>
            <q-btn
              tabIndex=3
              label="Login"
              type="submit"
              icon-right="keyboard_arrow_right"
              color="primary" />
          </div>
        </q-form>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="text-caption">
          <router-link to="/forgot-password">Forgot Password</router-link>
        </div>
      </q-card-section>

    </q-card>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import mixinFormValidations from 'src/mixins/Mixin_FormValidations.js'
import mixinUtils from 'src/mixins/Mixin_Utils.js'
import { testLoginData } from 'src/constants/testingDefaults.js'

export default {
  mixins: [mixinFormValidations, mixinUtils],
  data () {
    return {
      isPwd: true,
      formData: {
        email: '',
        password: ''
      },
      showProgressBar: false,
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
