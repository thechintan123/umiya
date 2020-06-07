<template>
 <div class="fit column">
    <q-card bordered>
      <!-- <img src="https://cdn.quasar.dev/img/mountains.jpg"> -->

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
          <!-- <q-btn label="Submit" type="submit" color="primary"/> -->
          <q-space/>
          <q-btn            tabIndex = 3
label="Login" type="submit" icon-right="keyboard_arrow_right"  color="primary"/>
          </div>
        </q-form>
      </q-card-section>

    </q-card>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import mixinRegisterLogin from 'src/mixins/Mixin_RegisterLogin.js'

export default {
  mixins: [mixinRegisterLogin],
  data () {
    return {
      isPwd: true,
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('auth', ['loginUser']),
    login () {
      this.loginUser(this.formData)
    }
  }
}
</script>

<style scoped>
</style>
