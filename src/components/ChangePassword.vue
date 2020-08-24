<template>
  <div class="fit column">
    <q-card>
      <q-linear-progress v-show="showProgressBar" indeterminate size="10px" color="secondary" />
      <q-spinner
        v-show="showProgressBar"
        class="z-top fixed-center"
        color="secondary"
        size="3em"
        :thickness="10"
      />
      <q-form greedy ref="changePasswordForm">
        <q-banner rounded dense class="bg-grey-3">
          <template v-slot:avatar>
            <q-icon name="fas fa-key" color="primary" />
          </template>
          Change Password
        </q-banner>

        <q-card-section>
                <q-input
                  tabindex="2"
                  outlined
                  v-model="oldPassword"
                  :rules="[ val => !!val || 'Field is required']"
                  lazy-rules
                  ref="password"
                  label="Old Password*"
                  dense
                  clearable
                  :type="isOldPwd ? 'password' : 'text'"
                  hint="Password with toggle"
                  maxlength="50"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isOldPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isOldPwd = !isOldPwd"
                      clearable
                    />
                  </template>
                </q-input>

            <div class="row" >
              <div class="col">                
                <q-input
                  tabindex="2"
                  outlined
                  v-model="newPassword"
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
          </div>      
          <div class="col">
                <q-input
                  outlined
                  v-model="confirmNewPassword"
                  :rules="[ val => !!val || 'Field is required']"
                  lazy-rules
                  ref="password"
                  label="Confirm New Password*"
                  dense
                  clearable
                  type="Password"
                  maxlength="50"
                >

                </q-input>
          </div>                    
          </div>

          <div class="row">
            <q-btn flat color="primary" type="reset" label="Reset" />

            <q-space />

            <q-btn color="primary" label="Change Password" @click="submitSearchForm" />
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";
// import { countryList } from './countryList.js'
import { mapActions } from "vuex";
import mixinFormValidations from "src/mixins/Mixin_FormValidations.js";

export default {
  mixins: [mixinFormValidations],
  data() {
    return {
      // To show Progress bar when loading
      oldPassword: "",
      newPassword:"",
      confirmNewPassword : "",

      //this field is used for Password Toggle
      isOldPwd: true,
      isNewPwd: true

      
    }
  },
  methods: {


  }
};
</script>

<style>
</style>
