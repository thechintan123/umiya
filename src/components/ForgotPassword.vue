<template>
  <div class="fit column">

        <banner
        :isSuccess = "true"
        iconName="done_outline"
        :bannerTitle="successMessage"
        v-show="successProcess"
              />

      <progressBar v-show="showProgressBar" />
      <spinner
        v-show="showProgressBar"
      />
    <q-card bordered>
      <banner
        iconName="vpn_key"
        bannerTitle="Forgot Password"
              />
      <q-card-section>
        <q-form
          no-reset-focus
          greedy
          @submit.prevent="forgotPassword"
          @reset="resetForm"
          ref="forgotPasswordForm"
        >
        <q-input
          outlined
          v-model="formData.email"
          label="Email"
          lazy-rules
          tabIndex=1
          :rules="[ val => !!val || 'Please type something', val => checkEmail(val) || 'Please enter valid email address.']"
          clearable
          dense
        />

          <div class="row">
            <q-space/>
            <q-btn
              tabIndex=2
              label="Reset Password"
              type="submit"
              icon-right="keyboard_arrow_right"
              color="primary" />
          </div>
        </q-form>
      </q-card-section>

    </q-card>

  </div>
</template>

<script>
import mixinFormValidations from 'src/mixins/Mixin_FormValidations.js'
import mixinUtils from 'src/mixins/Mixin_Utils.js'
// import { showErrorMessage } from 'src/utils/show-error-message'
import axios from 'axios'

export default {
  mixins: [mixinFormValidations, mixinUtils],
  data () {
    return {
      formData: {
        email: ''
      },
      successProcess: false,
      successMessage: 'Password has been reset. Please check your email.',
      showProgressBar: false

    }
  },
  methods: {
    forgotPassword () {
      this.showProgressBar = true
      const email = this.formData.email
      axios
        .post(process.env.API + '/forgot_password/' + email)
        .then(response => {
          this.$q.notify({
            type: 'positive',
            message: this.successMessage
          })
          this.successProcess = true
          this.$refs.forgotPasswordForm.reset()
          this.showProgressBar = false
        })
        .catch(error => {
          this.showErrorDialoge(error)
          this.showProgressBar = false
          this.successProcess = false
        })
    },
    resetForm () {
      this.formData.email = ''
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
