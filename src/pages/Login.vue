<template>
  <div class="q-pa-md fit column">
    <q-card class="q-pa-md" flat bordered>
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
            :rules="[ val => !!val || 'Please type something', val => checkEmail(val) || 'Please enter valid email address.']"
            clearable
            dense />

          <q-input outlined v-model="formData.password"
            lazy-rules
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
          <q-btn label="Login" type="submit" icon-right="keyboard_arrow_right"  color="primary"/>
          </div>
        </q-form>
      </q-card-section>


    </q-card>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import mixinRegisterLogin from 'src/mixins/Mixin_RegisterLogin.js'

export default {
    mixins : [mixinRegisterLogin]
,
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
    ...mapActions('auth', ['loginUser', 'logoutUser']),
    login () {
      console.log('formData',this.formData);
      //this.loginUser(this.formData)
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
