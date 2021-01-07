<template>
            <q-form greedy ref="personalForm">
            <div class="row">
              <div class="col">
                <q-select
                  v-model="maritalStatus"
                  option-value="id"
                  option-label="name"
                  :options="list.maritalOptions"
                  tabindex="15"
                  outlined
                  dense
                  options-dense
                  label="Marital Status*"
                  clearable
                  :rules="[val => !!val || 'Field is required']"
                  @blur="defaultPartnerMaritalStatus"
                />
              </div>
              <div class="col">
                <q-select
                  tabindex="16"
                  clearable
                  outlined
                  v-model="height"
                  dense
                  options-dense
                  label="Height*"
                  :options="heightOptions"
                  :rules="[val => !!val || 'Field is required']"
                  @blur="defaultHeightFromHeightTo"
                ></q-select>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <q-select
                  tabindex="17"
                  v-model="gotra"
                  :rules="[val => !!val || 'Field is required']"
                  outlined
                  dense
                  clearable
                  options-dense
                  option-value="id"
                  option-label="name"
                  :options="list.gotraOptions"
                  label="Gotra*"
                />
              </div>

              <div class="col">
                <q-input
                  clearable
                  tabindex="18"
                  v-model="originalSurname"
                  outlined
                  dense
                  label="Original Surname*"
                  :rules="[val => !!val || 'Field is required']"
                  maxlength="20"
                />
              </div>
            </div>

            <q-input
              tabindex="19"
              clearable
              outlined
              v-model="fatherName"
              label="Father Name*"
              :rules="[val => !!val || 'Field is required']"
              dense
              maxlength="50"
            />
            <q-input
              tabindex="20"
              clearable
              outlined
              v-model="residentialAddress"
              label="Residential Address*"
              :rules="[val => !!val || 'Field is required']"
              dense
              placeholder="Flat/House no, Building Name, Street Name, City, State"
              hint="Hint: Flat/House no, Building Name, Street Name, City, State"
              maxlength="100"
            />
            <q-input
              tabindex="20"
              clearable
              outlined
              v-model="education"
              label="Education*"
              :rules="[val => !!val || 'Field is required']"
              dense
              placeholder="Degree/Diploma completed. Can provile multiple"
              hint="Hint: BCom, CA or BE, MBA or HSC Completed"
              maxlength="100"
            />
            <q-input
              tabindex="21"
              clearable
              v-model="aboutYourself"
              outlined
              dense
              label="Tell us about yourself (Optional)"
              type="textarea"
              placeholder="Your profession, hobbies and family"
              hint="Hint: Your profession, hobbies and family"
              maxlength="200"
            />
            <q-select
              tabindex="22"
              v-model="whereKnow"
              option-value="id"
              option-label="name"
              :options="list.whereKnowOptions"
              label="Where do you come to know?"
              dense
              options-dense
              outlined
              clearable
              :rules="[val => !!val || 'Field is required']"
            />
            <div class="text-subtitle1">Partner Preferences</div>
            <div class="text-caption text-italic">
              We have defaulted some of the options. Please feel free to change
              as per your preference.
            </div>

            <div class="row">
              <div class="col">
                <q-select
                  tabindex="23"
                  clearable
                  outlined
                  v-model="partnerAgeFrom"
                  dense
                  options-dense
                  label="Age(From)*"
                  :options="ageFromToOptions"
                  :rules="[
                    val => !!val || 'Field is required',
                    val =>
                      checkAgeFromTo(val, partnerAgeTo) ||
                      'Age(From) should be less than or equal to Age(To)'
                  ]"
                ></q-select>
              </div>
              <div class="col">
                <q-select
                  tabindex="24"
                  clearable
                  outlined
                  v-model="partnerAgeTo"
                  dense
                  options-dense
                  label="Age(To)*"
                  :options="ageFromToOptions"
                  :rules="[
                    val => !!val || 'Field is required',
                    val =>
                      checkAgeFromTo(partnerAgeFrom, val) ||
                      'Age(To) should be greater than Age(From)'
                  ]"
                ></q-select>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <q-select
                  tabindex="25"
                  clearable
                  outlined
                  v-model="partnerHeightFrom"
                  dense
                  options-dense
                  label="Height(From)*"
                  :options="heightOptions"
                  :rules="[
                    val => !!val || 'Field is required',
                    val =>
                      checkHeightFrom(val) ||
                      'Height(To) should be greater than Height(From)'
                  ]"
                ></q-select>
              </div>
              <div class="col">
                <q-select
                  tabindex="26"
                  clearable
                  outlined
                  v-model="partnerHeightTo"
                  dense
                  options-dense
                  label="Height(To)*"
                  :options="heightOptions"
                  :rules="[
                    val => !!val || 'Field is required',
                    val =>
                      checkHeightTo(val) ||
                      'Height(To) should be greater than Height(From)'
                  ]"
                ></q-select>
              </div>
            </div>

            <q-select
              tabindex="27"
              v-model="partnerMaritalStatus"
              option-value="id"
              option-label="name"
              :options="list.maritalOptions"
              outlined
              dense
              options-dense
              label="Marital Statuses*"
              :rules="[val => !!val > 0 || 'Field is required']"
              multiple
              use-chips
              input-debounce="0"
              ref="partnerMaritalStatus"
              hint="Hint: Multiple Options can be selected"
            />

    <div class="row">
      <div class="col">
        <q-field
          borderless
          :value="emailMatchedNotification"
        >
          <template v-slot:control>
            <q-toggle
              tabindex="28"
              v-model="emailMatchedNotification"
              checked-icon="check"
              color="green"
              unchecked-icon="clear"
              label="Recieve email notifications for matches based on above preferences*"
              dense
            />
          </template>
        </q-field>
      </div>
      </div>
            <div class="row">
              <q-btn
                color="secondary"
                flat
                label="Back"
                @click="goBack"
              />
              <q-space />
              <q-btn
                tabindex="28"
                color="primary"
                label="Next >"
                @click="submitPersonalForm"
              />
            </div>
          </q-form>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import mixinFormValidations from 'src/mixins/Mixin_FormValidations.js'
import mixinComputations from 'src/mixins/Mixin_Computations.js'
import mixinUtils from 'src/mixins/Mixin_Utils.js'

import { ageDifference, heightDifference } from '../../constants/registerFormConstants.js'

export default {
  props: ['updateProfile'],
  mixins: [mixinComputations, mixinFormValidations, mixinUtils],
  data () {
    return {
      heightOptions: [],
      ageFromToOptions: []
    }
  },

  computed: {
    ...mapState('registerUpdate', ['formData', 'list', 'tmpData', 'error']),
    maritalStatus: {
      get () {
        return this.$store.state.registerUpdate.formData.maritalStatus
      },
      set (value) {
        this.$store.commit('registerUpdate/setFormDataIndividual', { key: 'maritalStatus', value: value })
      }
    },
    height: {
      get () {
        return this.$store.state.registerUpdate.formData.height
      },
      set (value) {
        this.$store.commit('registerUpdate/setFormDataIndividual', { key: 'height', value: value })
      }
    },
    gotra: {
      get () {
        return this.$store.state.registerUpdate.formData.gotra
      },
      set (value) {
        this.$store.commit('registerUpdate/setFormDataIndividual', { key: 'gotra', value: value })
      }
    },
    originalSurname: {
      get () {
        return this.$store.state.registerUpdate.formData.originalSurname
      },
      set (value) {
        this.$store.commit('registerUpdate/setFormDataIndividual', { key: 'originalSurname', value: value })
      }
    },
    fatherName: {
      get () {
        return this.$store.state.registerUpdate.formData.fatherName
      },
      set (value) {
        this.$store.commit('registerUpdate/setFormDataIndividual', { key: 'fatherName', value: value })
      }
    },
    residentialAddress: {
      get () {
        return this.$store.state.registerUpdate.formData.residentialAddress
      },
      set (value) {
        this.$store.commit('registerUpdate/setFormDataIndividual', { key: 'residentialAddress', value: value })
      }
    },
    education: {
      get () {
        return this.$store.state.registerUpdate.formData.education
      },
      set (value) {
        this.$store.commit('registerUpdate/setFormDataIndividual', { key: 'education', value: value })
      }
    },
    aboutYourself: {
      get () {
        return this.$store.state.registerUpdate.formData.aboutYourself
      },
      set (value) {
        this.$store.commit('registerUpdate/setFormDataIndividual', { key: 'aboutYourself', value: value })
      }
    },
    whereKnow: {
      get () {
        return this.$store.state.registerUpdate.formData.whereKnow
      },
      set (value) {
        this.$store.commit('registerUpdate/setFormDataIndividual', { key: 'whereKnow', value: value })
      }
    },
    partnerAgeFrom: {
      get () {
        return this.$store.state.registerUpdate.formData.partnerAgeFrom
      },
      set (value) {
        this.$store.commit('registerUpdate/setFormDataIndividual', { key: 'partnerAgeFrom', value: value })
      }
    },
    partnerAgeTo: {
      get () {
        return this.$store.state.registerUpdate.formData.partnerAgeTo
      },
      set (value) {
        this.$store.commit('registerUpdate/setFormDataIndividual', { key: 'partnerAgeTo', value: value })
      }
    },
    partnerHeightFrom: {
      get () {
        return this.$store.state.registerUpdate.formData.partnerHeightFrom
      },
      set (value) {
        this.$store.commit('registerUpdate/setFormDataIndividual', { key: 'partnerHeightFrom', value: value })
      }
    },
    partnerHeightTo: {
      get () {
        return this.$store.state.registerUpdate.formData.partnerHeightTo
      },
      set (value) {
        this.$store.commit('registerUpdate/setFormDataIndividual', { key: 'partnerHeightTo', value: value })
      }
    },
    partnerMaritalStatus: {
      get () {
        return this.$store.state.registerUpdate.formData.partnerMaritalStatus
      },
      set (value) {
        this.$store.commit('registerUpdate/setFormDataIndividual', { key: 'partnerMaritalStatus', value: value })
      }
    },
    emailMatchedNotification: {
      get () {
        return this.$store.state.registerUpdate.formData.emailMatchedNotification
      },
      set (value) {
        this.$store.commit('registerUpdate/setFormDataIndividual', { key: 'emailMatchedNotification', value: value })
      }
    }

  },
  methods: {
    ...mapMutations('registerUpdate', ['setFormDataIndividual', 'setError']),
    createHeightList () {
      // create height list when component is created
      let h
      let i
      const startHeight = 4
      const endHeight = 7
      for (h = startHeight; h <= endHeight; h++) {
        for (i = 0; i <= 11; i++) {
          this.heightOptions.push(h + ' ft ' + i + ' inches')
        }
      }
    },
    defaultHeightFromHeightTo () {
      if (this.updateProfile !== true) {
        // this.formData.heightCms = this.convertHeightToCms(this.formData.height)
        var heightCms = this.convertHeightToCms(this.formData.height)
        var heightFromCms, heightToCms
        // this.convertHeightToFtInch(heightCms)
        // console.log("Gender", this.gender);
        if (this.formData.gender.name === 'Male') {
          // Defaulting Age for Partner
          heightFromCms = heightCms - heightDifference
          heightToCms = heightCms
        } else if (this.formData.gender.name === 'Female') {
          // Defaulting Age for Partner
          heightFromCms = heightCms
          heightToCms = heightCms + heightDifference
        } else {
          heightFromCms = heightCms
          heightToCms = heightCms
        }
        // this.formData.partnerHeightFromCms = heightFromCms
        // this.formData.partnerHeightToCms = heightToCms
        var partnerHeightFromFtInch = this.convertHeightToFtInch(
          heightFromCms
        )
        var partnerHeightToFtInch = this.convertHeightToFtInch(heightToCms)

        this.setFormDataIndividual({ key: 'partnerHeightFromCms', value: heightFromCms })
        this.setFormDataIndividual({ key: 'partnerHeightToCms', value: heightToCms })

        this.setFormDataIndividual({ key: 'partnerHeightFrom', value: partnerHeightFromFtInch })
        this.setFormDataIndividual({ key: 'partnerHeightTo', value: partnerHeightToFtInch })
      }
    },
    defaultAgeFromAgeTo () {
      // console.log("Gender", this.formData.gender);
      if (this.updateProfile !== true) {
        if (this.formData.age !== '') {
          if (this.formData.gender.name === 'Male') {
            // Defaulting Age for Partner
            this.formData.partnerAgeFrom =
              this.formData.age - ageDifference
            this.formData.ageTo = this.formData.age
          } else if (this.formData.gender.name === 'Female') {
            // Defaulting Age for Partner
            this.formData.partnerAgeFrom = this.formData.age
            this.formData.ageTo = this.formData.age + ageDifference
          } else {
            this.formData.partnerAgeFrom = ''
            this.formData.ageTo = ''
          }
        } else {
          this.formData.partnerAgeFrom = ''
          this.formData.ageTo = ''
        }
      }
    },
    defaultPartnerMaritalStatus () {
      if (this.updateProfile !== true) {
        var partnerMaritalStatus = [...this.formData.partnerMaritalStatus]
        partnerMaritalStatus.push(this.formData.maritalStatus)
        this.$store.commit('registerUpdate/setFormDataIndividual', { key: 'partnerMaritalStatus', value: partnerMaritalStatus })
      }
    },

    createAgeFromToList () {
      const startAge = 18
      const endAge = 60
      let a
      for (a = startAge; a <= endAge; a++) {
        this.ageFromToOptions.push(a)
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
      const heightTo = this.formData.partnerHeightTo
      if (heightFrom && heightTo) {
        return this.compareHeightFromHeightTo(heightFrom, heightTo)
      } else {
        return true
      }
    },
    checkAgeFromTo (partnerAgeFrom, partnerAgeTo) {
      // console.log("checkAgeFrom", partnerAgeFrom, this.formData.partnerAgeTo);
      if (this.hasValue(partnerAgeFrom) && this.hasValue(partnerAgeTo)) {
        if (partnerAgeFrom > partnerAgeTo) {
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    },
    submitPersonalForm () {
      // console.log("validatePersonalForm Called")
      try {
        this.$refs.personalForm.validate().then(success => {
          if (success) {
            this.$store.commit('registerUpdate/setError', { key: 'personalHasError', value: false })
            this.$store.commit('registerUpdate/setTab', 'upload')
          } else {
            this.$store.commit('registerUpdate/setError', { key: 'personalHasError', value: true })
            if (this.error.finalSubmitClicked === true) {
              this.setError({ key: 'finalSubmitClicked', value: false })
            }
          }
        })

        this.$store.commit('registerUpdate/setError', { key: 'personalValidated', value: true })
      //  console.log("validate Personal Form 3");
      } catch (error) {
      // console.log("Validate Personal Form", err)
        this.showErrorDialog(error)
      }
    },
    goBack () {
      this.$store.commit('registerUpdate/setTab', 'basic')
    }
  },
  created () {
    this.createHeightList()
    this.createAgeFromToList()
  }

}
</script>

<style>

</style>
