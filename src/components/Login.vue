<template>
  <div class="fit column">
    <q-card bordered>
      <q-banner class="q-mb-md bg-grey-3">
        <template v-slot:avatar>
          <q-icon name="fas fa-sign-in-alt" color="primary" />
        </template>
        Login
      </q-banner>
      <q-card-section>
        <q-form
          greedy
          ref="loginForm"
          @submit.prevent="login"
        >
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
import { showErrorMessage } from 'src/utils/show-error-message'

export default {
  mixins: [mixinFormValidations],
  data () {
    return {
      isPwd: true,
      formData: {
        email: 'chin1@gmail.com',
        password: 'Aa3UKd7C'
      }
    }
  },
  methods: {
    ...mapActions('auth', ['loginUser']),
    login () {
      this.loginUser(this.formData)
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Welcome ! You are now logged in.'
          })
          this.$router.push('/profile')
        })
        .catch(error => {
          // console.log('error',error);
          let errMsg = ''
          if ('message' in error.response.data) {
            errMsg = error.response.data.error + ' - ' + error.response.data.message
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
