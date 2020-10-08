<template>
  <div class="fit column">
    <q-card bordered>
      <q-banner class="q-mb-md bg-grey-3">
        <template v-slot:avatar>
          <q-icon name="fas fa-sign-in-alt" color="primary" />
        </template>
        Forgot Password
      </q-banner>
      <q-card-section>
        <q-form
          greedy
          @submit.prevent="forgotPassword"
        >
          <q-input
            v-model="formData.email"
            :rules="[ val => !!val || 'Please type something', val => checkEmail(val) || 'Please enter valid email address.']"
            label="Email"
            clearable
            dense
            lazy-rules
            outlined
            tabIndex=1
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
import { showErrorMessage } from 'src/utils/show-error-message'
import axios from 'axios'

export default {
  mixins: [mixinFormValidations],
  data () {
    return {
      formData: {
        email: ''
      }
    }
  },
  methods: {
    forgotPassword () {
      const email = this.formData.email
      axios
        .post(process.env.API + '/forgot_password/' + email)
        .then(response => {
          this.$q.notify({
            type: 'positive',
            message: 'Password has been reset. Please check your email.'
          })
        })
        .catch(error => {
          let errMsg = ''
          if ('message' in error.response.data) {
            errMsg = error.response.data.message
          } else {
            errMsg = error.response.data.error
          }
          showErrorMessage(errMsg)
        })
    }
  }
}
</script>

<style scoped>
</style>
