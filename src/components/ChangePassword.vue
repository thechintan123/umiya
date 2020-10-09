<template>
  <div class="fit column">
    <banner
        :isSuccess = "true"
        iconName="done_outline"
        bannerTitle="Your password has been changed successfully"
        v-show="successProcess"
              />
    <q-card>
      <progressBar v-show="showProgressBar" />
      <spinner
        v-show="showProgressBar"
      />
      <q-form no-reset-focus
      greedy ref="changePasswordForm"
      @reset="onReset"
      >

      <banner
        iconName="vpn_key"
        bannerTitle="Change Password"
              />

        <q-card-section>
                <q-input
                  tabindex="1"
                  outlined
                  v-model="params.currentPassword"
                  :rules="[ val => !!val || 'Field is required']"
                  lazy-rules
                  ref="password"
                  label="Current Password*"
                  dense
                  clearable
                  :type="isCurrentPwd ? 'password' : 'text'"
                  hint="Password with toggle"
                  maxlength="50"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isCurrentPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isCurrentPwd = !isCurrentPwd"
                      clearable
                    />
                  </template>
                </q-input>

                <q-input
                  tabindex="2"
                  outlined
                  v-model="params.newPassword"
                  :rules="[ val => !!val || 'Field is required']"
                  lazy-rules
                  ref="password"
                  label="New Password*"
                  dense
                  clearable
                  :type="isNewPwd ? 'password' : 'text'"
                  hint="Password with toggle"
                  maxlength="50"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isNewPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isNewPwd = !isNewPwd"
                      clearable
                    />
                  </template>
                </q-input>
                <q-input
                  outlined
                  tabindex="3"
                  v-model="params.confirmNewPassword"
                  :rules="[ val => !!val || 'Field is required',
                      val => checkConfirmPassword(val, params.newPassword) ||
                      'Password & Confirm Password are not same'
                  ]"
                  lazy-rules
                  ref="password"
                  label="Confirm New Password*"
                  dense
                  clearable
                  type="Password"
                  maxlength="50"
                >

                </q-input>

          <div class="row">
            <q-btn flat color="primary" type="reset" label="Reset" />

            <q-space />

            <q-btn color="primary" label="Change Password" @click="submitForm" />
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </div>
</template>

<script>
import axios from 'axios'
import mixinFormValidations from 'src/mixins/Mixin_FormValidations.js'
import mixinUtils from 'src/mixins/Mixin_Utils.js'

export default {
  mixins: [mixinFormValidations, mixinUtils],
  data () {
    return {
      // To show Progress bar when loading
      params: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      },
      showProgressBar: false,

      // this field is used for Password Toggle
      isCurrentPwd: true,
      isNewPwd: true,
      successProcess: false

    }
  },
  methods: {
    onReset () {
      this.params.currentPassword = ''
      this.params.newPassword = ''
      this.params.confirmNewPassword = ''
    },
    submitForm () {
      this.showProgressBar = true
      this.$refs.changePasswordForm.validate().then(success => {
        if (success) {
          var user = localStorage.getItem('user')
          var userJson = JSON.parse(user)
          this.params.email = userJson.email
          this.changePassword(this.params)
        } else {
          this.showProgressBar = false
        }
      })
    },

    changePassword (data) {
      return axios
        .post(process.env.API + '/change_password', data)
        .then(({ data }) => {
          this.successProcess = true
          this.$q.notify({
            type: 'positive',
            message: 'Password has been changed successfully'
          })
          this.$refs.changePasswordForm.reset()
          this.showProgressBar = false
        })
        .catch(error => {
          this.showErrorDialog(error)
        })
    }
  },
  components: {
    progressBar: require('./general/ProgressBar.vue').default,
    spinner: require('./general/Spinner.vue').default,
    banner: require('./general/Banner.vue').default

  }
}
</script>

<style>
</style>
