<template>
  <q-form greedy ref="basicForm" no-reset-focus>
    <!-- Start - This button is only visible in Testing Mode -->
      <q-btn
        class="my-button q-mb-md"
        color="secondary"
        label="For Testing - Default fields"
        v-if="devEnv"
        @click="defaultTestingData"
      />
    <!-- End - This button is only visible in Testing Mode -->
    <br>
  <!-- <div class="q-pa-sm rounded-borders">
        Registration Type:
    <!-- <q-option-group
      :options="list.registrationOptions"
      type="radio"
      v-model="registrationType"
      @input="updateGender"
    />
    </div> -->
        <q-radio
          tabindex="0"
          v-model="registrationType"
          :val="list.registrationOptions[1].name"
          left-label
          label="Registration Type : Visible"
          @input="updateGender"
        />
        <q-radio
          tabindex="0"
          v-model="registrationType"
          :val="list.registrationOptions[0].name"
          left-label
          label="Confidential/Private(only for Girls)"
          @input="updateGender"
        />
        <span class="text-negative" style="font-size: 13px;" v-if="registrationType == 'special'">
          Girl's(Bride's) profile is 100% confidential. It is NOT visible to anyone.</span>
        <div class="text-grey-6" style="font-size: 13px;">Hint: Special registration is only for girls(brides) in 
          which Girl's profile is 100% confidential and it is not visible on searching. 
          But, girl's profile can see Boy's(Groom's) profile and can contact them. 
          We have created this on request of our KKP community members.</div>
    <q-input
      outlined
      tabindex="1"
      v-model="email"
      label="Email (Login ID)*"
      :rules="[
        val => !!val || 'Field is required',
        val => checkEmail(val) || 'Please enter valid email address.'
      ]"
      dense
      clearable
      hint="Hint: This Email will be used as login ID"
      maxlength="50"
      :disable="updateProfile"
    />
    <div class="row">
      <div class="col">
        <q-input
          tabindex="2"
          outlined
          v-model="firstName"
          label="First Name*"
          :rules="[val => !!val || 'Field is required']"
          dense
          clearable
          maxlength="50"
        />
      </div>
      <div class="col">
        <q-input
          tabindex="3"
          outlined
          v-model="lastName"
          label="Last Name*"
          :rules="[val => !!val || 'Field is required']"
          dense
          clearable
          maxlength="50"
        />
      </div>
    </div>
            <div class="row" v-if="!updateProfile">
              <div class="col">
                <q-input
                  tabindex="4"
                  outlined
                  v-model="password"
                  :rules="[val => !!val || 'Field is required',
                   val => val.length > 6 || 'Minimum Password length should be greater than 6'
                  ]"
                  lazy-rules
                  ref="password"
                  label="Password*"
                  dense
                  clearable
                  :type="isPwd ? 'password' : 'text'"
                  hint="Password with toggle"
                  maxlength="50"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                      clearable
                    />
                  </template>
                </q-input>
              </div>
              <div class="col">
                <q-input
                  tabindex="5"
                  outlined
                  v-model="confirmPassword"
                  :rules="[
                    val => !!val || 'Field is required',
                    val =>
                      checkConfirmPassword(val) ||
                      'Password & Confirm Password are not same'
                  ]"
                  lazy-rules
                  label="Confirm Password*"
                  type="password"
                  dense
                  clearable
                  maxlength="50"
                />
              </div>
            </div>
    <q-select
      outlined
      tabindex="6"
      v-model="gender"
      option-value="id"
      option-label="name"
      :options="list.genderOptions"
      :disable = "disableGender"
      dense
      options-dense
      clearable
      label="Gender*"
      :rules="[val => !!val || 'Field is required']"
    />
    <div class="row">
      <div class="col">
        <q-input
          tabindex="7"
          v-model="dateOfBirth"
          outlined
          dense
          stack-label
          type="date"
          label="Date of Birth*"
          :rules="[val => !!val || 'Field is required']"
          clearable
          @blur="calculateAge"
        />
      </div>
      <div class="col">
        <q-input outlined v-model="age" label="Age" readonly disable dense />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-radio
          tabindex="8"
          v-model="countryRadio"
          val="India"
          left-label
          label="Living in : India"
        />
        <q-radio
          tabindex="8"
          v-model="countryRadio"
          val="Other"
          left-label
          label="Other"
        />
      </div>
      <div class="col">
        <q-select
          tabindex="8"
          outlined
          v-model="otherCountry"
          :disable="countryRadio === 'India'"
          :options="list.countryOptions"
          option-value="id"
          option-label="name"
          dense
          options-dense
          label="Other Country"
          use-input
          hide-selected
          fill-input
          :rules="[val => checkOtherCountry(val) || 'Field is required']"
          input-debounce="0"
          clearable
          @filter="filterOtherCountry"
        />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <q-input
          tabindex="9"
          v-model="state"
          outlined
          dense
          label="State*"
          :rules="[val => !!val || 'Field is required']"
          clearable
          maxlength="20"
        />
      </div>
      <div class="col">
        <q-input
          tabindex="10"
          v-model="city"
          outlined
          dense
          label="City*"
          :rules="[val => !!val || 'Field is required']"
          clearable
          maxlength="30"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <q-input
          v-model="primaryContactCountryCode"
          outlined
          dense
          label="Country Code"
          type="tel"
          :rules="[val => !!val || 'Field is required']"
          hint="Don't add + or ( )"
          tabindex="11"
        />
      </div>
      <div class="col-9">
        <q-input
          tabindex="12"
          v-model="primaryContact"
          outlined
          dense
          label="Primary Contact*"
          type="number"
          :rules="[val => !!val || 'Field is required']"
          clearable
          maxlength="12"
          hint="Contact Numbers will be only shared to Approved profiles."
        />
        <!-- maxlength of 12 since DB maxlength is 20; 1 for +; 1 for Space; 4 for Country Code; -->
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <q-input
          v-model="alternateContactCountryCode"
          tabindex="13"
          outlined
          dense
          label="Country Code"
          type="tel"
          hint="Don't add + or ( )"
        />
      </div>
      <div class="col-9">
        <q-input
          tabindex="14"
          v-model="alternateContact"
          outlined
          dense
          label="Alternate Contact"
          type="number"
          clearable
          maxlength="12"
          hint="Contact Numbers will be only shared to Approved profiles."
        />
        <!-- maxlength of 12 since DB maxlength is 20; 1 for +; 1 for Space; 4 for Country Code; -->
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <q-field
          borderless
          :value="agreeTc"
          :rules="[val => val === true || 'Field is required']"
        >
          <template v-slot:control>
            <q-toggle
              v-model="agreeTc"
              checked-icon="check"
              color="green"
              unchecked-icon="clear"
              label="Agree Terms & Conditions *"
              dense
              :disable="updateProfile"
              tabindex="13"

            />
          </template>
        </q-field>
      </div>
      <div class="col-6">
        <termsConditionsDialog />
      </div>
    </div>
    <p class="text-caption text-weight-light">
      <i>
        UmiyaMatrimony.com and its team are only providing online platform for
        brige-groom search. The team only validates the name and date of birth
        based on ID Proof. The team does not perform any background check on any
        details. Requesting to perform the background check before proceeding
        with any profile.
      </i>
    </p>

    <div class="row">
      <q-space />
      <q-btn
        tabindex="14"
        class="my-button"
        color="primary"
        label="Next >"
        @click="submitBasicForm"
      />
    </div>
  </q-form>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

import mixinFormValidations from 'src/mixins/Mixin_FormValidations.js'
import mixinComputations from 'src/mixins/Mixin_Computations.js'
import mixinUtils from 'src/mixins/Mixin_Utils.js'
import { ageDifference } from 'src/constants/registerFormConstants.js'

export default {
  mixins: [mixinFormValidations, mixinComputations, mixinUtils],
  props: ['updateProfile'],
  created () {
    this.localCountryOptions = this.list.countryOptions
    // console.log("LocalCountryOptions", this.localCountryOptions);
  },
  data () {
    return {
      devEnv: process.env.DEV, // This is true for development environment and false for production
      localCountryOptions: [],
      locaFormData: {},
      isPwd: true,
      disableGender : false
    }
  },

  methods: {
    ...mapMutations('registerUpdate', ['setFormDataIndividual', 'setError']),
    ...mapActions('registerUpdate', ['defaultTestingData']),
    setLocalState (value) {
      // console.log("setLocalState", value);
      this.locaFormData = Object.assign({}, value)
    },
    calculateAge () {
      var age = this.computeAge(this.formData.dateOfBirth)
      // console.log("Age", age);
      this.$store.commit('registerUpdate/setTmpData', {
        key: 'age',
        value: age
      })

      this.defaultAgeFromAgeTo()
    },
    filterOtherCountry (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        const countryListFiltered = []
        for (const country of this.tmpData.countryList) {
          // console.log('country',country);
          const countryNameLowerCase = country.name.toLowerCase()
          if (countryNameLowerCase.includes(needle)) {
            countryListFiltered.push(country)
          }
        }
        // console.log('countryListFiltered', countryListFiltered);
        // this.countryOptions = countryListFiltered
        this.$store.commit('registerUpdate/setList', {
          key: 'countryOptions',
          value: countryListFiltered
        })
      })
    },
    checkOtherCountry (otherCountry) {
      // console.log("checkOtherCountry",this.countryRadio, otherCountry, this.hasValue(otherCountry));
      if (this.countryRadio === 'Other' && !this.hasValue(otherCountry)) {
        return false
      } else {
        return true
      }
    },
    checkConfirmPassword (confirmPassword) {
      if (this.formData.password === confirmPassword) {
        return true
      } else {
        return false
      }
    },
    updateGender(regType){
      console.log("UpdateGender", regType)
      if(regType.includes('Confidential')){
        var findFemale = this.list.genderOptions.find(element => element.name == 'Female');
        console.log("findFemale :",findFemale, this.list.genderOptions);
        this.setFormDataIndividual({ key: 'gender', value: findFemale }); 
        this.disableGender =  true;
      }
      else{
        this.disableGender =  false;
        this.setFormDataIndividual({ key: 'gender', value: '' });
      }
    }
    ,
    submitBasicForm () {
      // console.log("submitBasicForm ");

      try {
        this.$refs.basicForm.validate().then(success => {
          if (success) {
            this.$store.commit('registerUpdate/setError', {
              key: 'basicHasError',
              value: false
            })
            this.$store.commit('registerUpdate/setTab', 'personal')
            // console.log("validate BasicForm 2 - SUCCESS");
          } else {
            this.$store.commit('registerUpdate/setError', {
              key: 'basicHasError',
              value: true
            })
            if (this.error.finalSubmitClicked === true) {
              this.setError({ key: 'finalSubmitClicked', value: false })
            }
          // console.log("validate BasicForm 2 - FAILED");
          }
        })

        this.$store.commit('registerUpdate/setError', {
          key: 'basicValidated',
          value: true
        })
        // console.log("validate BasicForm 3");
      } catch (error) {
      // console.log("Validate Basic Form", err)
        this.showErrorDialog(error)
      }
    },
    checkHeightTo (heightTo) {
      const heightFrom = this.formData.partnerHeightFrom
      if (heightFrom && heightTo) {
        return this.compareHeightFromHeightTo(heightFrom, heightTo)
      } else {
        return true
      }
    },
    checkHeightFrom (heightFrom) {
      const heightTo = this.formData.heightTo
      if (heightFrom && heightTo) {
        return this.compareHeightFromHeightTo(heightFrom, heightTo)
      } else {
        return true
      }
    },
    defaultAgeFromAgeTo () {
      // console.log("Gender", this.formData.gender);
      var partnerAgeFrom, partnerAgeTo
      if (this.updateProfile !== true) {
        if (this.age !== '') {
          if (this.gender.name === 'Male') {
            // Defaulting Age for Partner
            partnerAgeFrom = this.age - ageDifference
            partnerAgeTo = this.age
          } else if (this.gender.name === 'Female') {
            // Defaulting Age for Partner
            partnerAgeFrom = this.age
            partnerAgeTo = this.age + ageDifference
          } else {
            partnerAgeFrom = ''
            partnerAgeTo = ''
          }
        } else {
          partnerAgeFrom = ''
          partnerAgeTo = ''
        }
      }
      this.setFormDataIndividual({ key: 'partnerAgeFrom', value: partnerAgeFrom })
      this.setFormDataIndividual({ key: 'partnerAgeTo', value: partnerAgeTo })
    }
  },
  computed: {
    ...mapState('registerUpdate', ['formData', 'list', 'tmpData', 'error']),
    gender: {
      get () {
        return this.$store.state.registerUpdate.formData.gender
      },
      set (value) {
        this.$store.commit('registerUpdate/setFormDataIndividual', {
          key: 'gender',
          value: value
        })
      }
    },
    registrationType: {
      get () {
        // console.log("registrationType", this.formData.registrationType);
        return this.formData.registrationType.name;
      },
      set (value) {
        
        var findObj = this.list.registrationOptions.find(element => element.name == value);

        console.log("set registrationType", value, findObj );

           this.$store.commit('registerUpdate/setFormDataIndividual', {
          key: 'registrationType',
          value: findObj
        })
      }
    },    
    email: {
      get () {
        return this.$store.state.registerUpdate.formData.email
      },
      set (value) {
        // this.$store.commit('registerUpdate/setFormDataIndividual', {key: 'email' , value : value})
        this.setFormDataIndividual({ key: 'email', value: value })
      }
    },
    password: {
      get () {
        return this.$store.state.registerUpdate.formData.password
      },
      set (value) {
        this.setFormDataIndividual({ key: 'password', value: value })
      }
    },
    confirmPassword: {
      get () {
        return this.$store.state.registerUpdate.formData.confirmPassword
      },
      set (value) {
        this.setFormDataIndividual({ key: 'confirmPassword', value: value })
      }
    },
    firstName: {
      get () {
        return this.$store.state.registerUpdate.formData.firstName
      },
      set (value) {
        this.$store.commit('registerUpdate/setFormDataIndividual', {
          key: 'firstName',
          value: value
        })
      }
    },
    lastName: {
      get () {
        return this.$store.state.registerUpdate.formData.lastName
      },
      set (value) {
        this.$store.commit('registerUpdate/setFormDataIndividual', {
          key: 'lastName',
          value: value
        })
      }
    },
    dateOfBirth: {
      get () {
        return this.$store.state.registerUpdate.formData.dateOfBirth
      },
      set (value) {
        this.$store.commit('registerUpdate/setFormDataIndividual', {
          key: 'dateOfBirth',
          value: value
        })
      }
    },
    age: {
      get () {
        return this.$store.state.registerUpdate.tmpData.age
      },
      set (value) {
        this.$store.commit('registerUpdate/setTmpData', {
          key: 'age',
          value: value
        })
      }
    },
    countryRadio: {
      get () {
        return this.$store.state.registerUpdate.tmpData.countryRadio
      },
      set (value) {
        this.$store.commit('registerUpdate/setTmpData', {
          key: 'countryRadio',
          value: value
        })
      }
    },
    otherCountry: {
      get () {
        return this.$store.state.registerUpdate.tmpData.otherCountry
      },
      set (value) {
        this.$store.commit('registerUpdate/setTmpData', {
          key: 'otherCountry',
          value: value
        })
      }
    },
    state: {
      get () {
        return this.$store.state.registerUpdate.formData.state
      },
      set (value) {
        this.$store.commit('registerUpdate/setFormDataIndividual', {
          key: 'state',
          value: value
        })
      }
    },
    city: {
      get () {
        return this.$store.state.registerUpdate.formData.city
      },
      set (value) {
        this.$store.commit('registerUpdate/setFormDataIndividual', {
          key: 'city',
          value: value
        })
      }
    },
    primaryContactCountryCode: {
      get () {
        return this.$store.state.registerUpdate.tmpData
          .primaryContactCountryCode
      },
      set (value) {
        this.$store.commit('registerUpdate/setTmpData', {
          key: 'primaryContactCountryCode',
          value: value
        })
      }
    },
    primaryContact: {
      get () {
        return this.$store.state.registerUpdate.tmpData.primaryContact
      },
      set (value) {
        this.$store.commit('registerUpdate/setTmpData', {
          key: 'primaryContact',
          value: value
        })
      }
    },
    alternateContactCountryCode: {
      get () {
        return this.$store.state.registerUpdate.tmpData
          .alternateContactCountryCode
      },
      set (value) {
        this.$store.commit('registerUpdate/setTmpData', {
          key: 'alternateContactCountryCode',
          value: value
        })
      }
    },
    alternateContact: {
      get () {
        return this.$store.state.registerUpdate.tmpData.alternateContact
      },
      set (value) {
        this.$store.commit('registerUpdate/setTmpData', {
          key: 'alternateContact',
          value: value
        })
      }
    },
    agreeTc: {
      get () {
        // console.log("agreeTc", this.$store.state.registerUpdate.formData.agreeTc, this.$store.state.registerUpdate.formData)
        return this.$store.state.registerUpdate.formData.agreeTc
      },
      set (value) {
        this.$store.commit('registerUpdate/setFormDataIndividual', {
          key: 'agreeTc',
          value: value
        })
      }
    }
  },

  components: {
    termsConditionsDialog: require('../terms_privacy/TermsConditionsDialog.vue')
      .default
  }
}
</script>

<style></style>
