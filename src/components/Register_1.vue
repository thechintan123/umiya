<template>
  <div class="fit column">
    <!-- <q-card flat bordered class="my-card">--->

    <q-card>
      <q-banner class="bg-grey-3 q-mb-xs">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        Register on website!!
      </q-banner>
      <q-stepper
        v-model="step"
        header-nav
        ref="stepper"
        error-icon="error"
        error-color="red"
        done-color="deep-orange"
        active-color="purple"
        inactive-color="secondary"
        animated
      >
        <q-step
          :name="1"
          title="Basic"
          icon="fas fa-user-cog"
          error-icon="error"
          :done="step > 1"
          :header-nav="step > 1"
          :error="basicHasError"
        >
          <q-form greedy ref="basicForm">
            <q-input
              outlined
              tabindex="1"
              v-model="formData.email"
              label="Email (Login ID)*"
              :rules="[ val => !!val || 'Field is required', val => checkEmail(val) || 'Please enter valid email address.']"
              dense
              clearable
              hint="Hint: This Email will be used as login ID"
            />

            <div class="row">
              <div class="col">
                <q-input
                  tabindex="2"
                  outlined
                  v-model="formData.password"
                  :rules="[ val => !!val || 'Field is required']"
                  lazy-rules
                  ref="password"
                  label="Password*"
                  dense
                  clearable
                  :type="isPwd ? 'password' : 'text'"
                  hint="Password with toggle"
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
                  tabindex="3"
                  outlined
                  v-model="formData.confirmPassword"
                  :rules="[ val => !!val || 'Field is required', val => checkConfirmPassword(val) || 'Password & Confirm Password are not same' ]"
                  lazy-rules
                  label="Confirm Password*"
                  type="password"
                  dense
                  clearable
                />
              </div>
            </div>

            <div class="row">
              <div class="col">
                <q-input
                  tabindex="4"
                  outlined
                  v-model="formData.firstName"
                  label="First Name*"
                  :rules="[ val => !!val || 'Field is required']"
                  dense
                  clearable
                />
              </div>
              <div class="col">
                <q-input
                  tabindex="5"
                  outlined
                  v-model="formData.lastName"
                  label="Last Name*"
                  :rules="[ val => !!val || 'Field is required']"
                  dense
                  clearable
                />
              </div>
            </div>

            <q-select
              outlined
              tabindex="6"
              v-model="formData.gender"
              option-value="id"
              option-label="name"
              :options="genderOptions"
              dense
              options-dense
              clearable
              label="Gender*"
              :rules="[ val => !!val || 'Field is required']"
            />

            <div class="row">
              <div class="col">
                <q-input
                  tabindex="7"
                  v-model="formData.dateOfBirth"
                  outlined
                  dense
                  stack-label
                  type="date"
                  label="Date of Birth*"
                  :rules="[ val => !!val || 'Field is required']"
                  @blur="calculateAge"
                  clearable
                />
              </div>
              <div class="col">
                <q-input outlined v-model="formData.age" label="Age" readonly disable dense />
              </div>
            </div>

            <div class="row">
              <div class="col">
                <q-radio
                  tabindex="8"
                  v-model="formData.country"
                  val="India"
                  left-label
                  label="Living in : India"
                />
                <q-radio
                  tabindex="8"
                  v-model="formData.country"
                  val="Other"
                  left-label
                  label="Other"
                />
              </div>
              <div class="col">
                <q-select
                  tabindex="8"
                  outlined
                  :disable="formData.country === 'India'"
                  v-model="formData.otherCountry"
                  :options="countryOptions"
                  option-value="id"
                  option-label="name"
                  dense
                  options-dense
                  label="Other Country"
                  use-input
                  hide-selected
                  fill-input
                  :rules="[ val => checkOtherCountry(val) || 'Field is required']"
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
                  v-model="formData.state"
                  outlined
                  dense
                  label="State*"
                  :rules="[ val => !!val || 'Field is required']"
                  clearable
                />
              </div>
              <div class="col">
                <q-input
                  tabindex="10"
                  v-model="formData.city"
                  outlined
                  dense
                  label="City*"
                  :rules="[ val => !!val || 'Field is required']"
                  clearable
                />
              </div>
            </div>

            <div class="row">
              <div class="col-1">
                <q-input
                  v-model="tmpData.primaryContactCountryCode"
                  outlined
                  dense
                  label="Code"
                  mask="##"
                  fill-mask
                  type="tel"
                  :rules="[ val => !!val || 'Field is required']"
                />
              </div>
              <div class="col-5">
                <q-input
                  tabindex="11"
                  v-model="tmpData.primaryContact"
                  outlined
                  dense
                  label="Primary Contact*"
                  type="number"
                  :rules="[ val => !!val || 'Field is required']"
                  clearable
                />
              </div>
              <div class="col">
                <q-input
                  tabindex="12"
                  v-model="tmpData.alternateContact"
                  outlined
                  dense
                  label="Alternate Contact"
                  type="number"
                  clearable
                />
              </div>
            </div>

            <q-toggle
              tabindex="13"
              v-model="formData.agreeTnC"
              checked-icon="check"
              color="green"
              unchecked-icon="clear"
              label="Agree Terms & Conditions *"
              dense
            />

            <q-stepper-navigation>
              <q-space />
              <q-btn
                tabindex="14"
                class="my-button"
                color="primary"
                label="Next >"
                @click="submitBasicForm()"
              />
              <q-btn @click="() => { done1 = true; step = 2 }" color="primary" label="Continue" />
            </q-stepper-navigation>
          </q-form>
        </q-step>

        <q-step
          :name="2"
          title="Personal"
          caption="Optional"
          icon="ballot"
          :done="step > 2"
          :header-nav="step > 2"
          :error="personalHasError"
        >
          <q-form greedy ref="personalForm">
            <div class="row">
              <div class="col">
                <q-select
                  v-model="formData.maritalStatus"
                  option-value="id"
                  option-label="name"
                  :options="maritalOptions"
                  tabindex="15"
                  outlined
                  dense
                  options-dense
                  label="Marital Status*"
                  clearable
                  :rules="[ val => !!val || 'Field is required']"
                />
              </div>
              <div class="col">
                <q-select
                  tabindex="16"
                  clearable
                  outlined
                  v-model="formData.height"
                  dense
                  options-dense
                  label="Height*"
                  :options="heightOptions"
                  :rules="[ val => !!val || 'Field is required']"
                ></q-select>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <q-select
                  tabindex="17"
                  v-model="formData.gotra"
                  outlined
                  dense
                  clearable
                  options-dense
                  option-value="id"
                  option-label="name"
                  :options="gotraOptions"
                  label="Gotra"
                />
              </div>

              <div class="col">
                <q-input
                  clearable
                  tabindex="18"
                  v-model="formData.originalSurname"
                  outlined
                  dense
                  label="Original Surname*"
                  :rules="[ val => !!val || 'Field is required']"
                />
              </div>
            </div>

            <q-input
              tabindex="19"
              clearable
              outlined
              v-model="formData.fatherName"
              label="Father Name*"
              :rules="[ val => !!val || 'Field is required']"
              dense
            />
            <q-input
              tabindex="21"
              clearable
              outlined
              v-model="formData.residentialAddress"
              label="Residential Address*"
              :rules="[ val => !!val || 'Field is required']"
              dense
              placeholder="Flat/House no, Building Name, Street Name, City, State"
              hint="Hint: Flat/House no, Building Name, Street Name, City, State"
            />
            <q-input
              tabindex="22"
              clearable
              v-model="formData.aboutYourself"
              outlined
              dense
              label="Tell us about yourself (Optional)"
              type="textarea"
              placeholder="Your education, profession, Interest and family"
              hint="Hint: Your education, profession, Interest and family"
            />

            <div class="text-subtitle1">Partner Preferences</div>

            <div class="row">
              <div class="col">
                <q-select
                  tabindex="23"
                  clearable
                  outlined
                  v-model="formData.ageFrom"
                  dense
                  options-dense
                  label="Age(From)*"
                  :options="ageFromToOptions"
                  :rules="[ val => !!val || 'Field is required',  val => checkAgeFrom(val) || 'Age(To) should be greater than Age(From)']"
                ></q-select>
              </div>
              <div class="col">
                <q-select
                  tabindex="24"
                  clearable
                  outlined
                  v-model="formData.ageTo"
                  dense
                  options-dense
                  label="Age(To)*"
                  :options="ageFromToOptions"
                  :rules="[ val => !!val || 'Field is required', val => checkAgeTo(val) || 'Age(To) should be greater than Age(From)' ]"
                ></q-select>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <q-select
                  tabindex="25"
                  clearable
                  outlined
                  v-model="formData.heightFrom"
                  dense
                  options-dense
                  label="Height(From)*"
                  :options="heightOptions"
                  :rules="[ val => !!val || 'Field is required', val => checkHeightFrom(val) || 'Height(To) should be greater than Height(From)']"
                ></q-select>
              </div>
              <div class="col">
                <q-select
                  tabindex="26"
                  clearable
                  outlined
                  v-model="formData.heightTo"
                  dense
                  options-dense
                  label="Height(To)*"
                  :options="heightOptions"
                  :rules="[ val => !!val || 'Field is required' , val => checkHeightTo(val) || 'Height(To) should be greater than Height(From)']"
                ></q-select>
              </div>
            </div>

            <q-select
              tabindex="27"
              clearable
              v-model="formData.maritalStatusPreference"
              option-value="id"
              option-label="name"
              :options="maritalOptions"
              outlined
              dense
              options-dense
              label="Marital Status*"
              :rules="[ val => !!val || 'Field is required']"
              multiple
              use-chips
              input-debounce="0"
              hint="Hint: Multiple Options can be selected"
            />

            <q-select
              v-model="formData.sourceOfWebsite"
              option-value="id"
              option-label="name"
              :options="sourceOfWebsiteOptions"
              label="Where do you come to know?"
              dense
              options-dense
              outlined
              clearable
              :rules="[ val => !!val || 'Field is required']"
            />

            <div class="row">
              <q-btn color="secondary" flat label="Back" @click="tab = 'basic'" />
              <q-space />
              <q-btn tabindex="28" color="primary" label="Submit" @click="submitForm" />
            </div>
            <q-stepper-navigation>
              <q-btn @click="() => { done2 = true; step = 3 }" color="primary" label="Continue" />
              <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
              <q-btn color="secondary" flat label="Back" @click="tab = 'basic'" />
              <q-space />
              <q-btn tabindex="28" color="primary" label="Submit" @click="submitForm" />
            </q-stepper-navigation>
          </q-form>
        </q-step>

        <q-step :name="3" title="Upload" icon="add_a_photo" :header-nav="step > 3">
          <q-form ref="uploadForm" greedy>
            <div class="q-mb-xs">
              <q-field borderless :rules="[ val => !!val || 'One Photo is required']" dense>
                <template v-slot:control>
                  <q-uploader
                    :factory="uploadPhoto"
                    label="Upload Photos (max 4 images)"
                    class="my-uploader"
                    accept="image/*, .pdf, .jpg, .jpeg, .gif, .png"
                    multiple
                    max-files="4"
                    max-total-size="20971520"
                    field-name="file"
                  />
                </template>
              </q-field>
            </div>

            <div class="q-mb-xs">
              <q-field borderless :rules="[ val => !!val || 'One ID Proof is required']" dense>
                <template v-slot:control>
                  <q-uploader
                    :factory="uploadProof"
                    label="Upload ID Proof (only 1 image or PDF)"
                    class="my-uploader"
                    accept="image/*, .pdf, .jpg, .jpeg, .gif, .png"
                    max-total-size="5242880"
                    color="accent"
                  />
                </template>
              </q-field>
            </div>
            <q-stepper-navigation>
              <q-btn color="primary" @click="done3 = true" label="Finish" />
              <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
            </q-stepper-navigation>
          </q-form>
        </q-step>
      </q-stepper>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";
import mixinFormValidations from "src/mixins/Mixin_FormValidations.js";
import mixinComputations from "src/mixins/Mixin_Computations.js";
import { showErrorMessage } from "src/utils/show-error-message";
import { mapState } from "vuex";

const stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];

export default {
  mixins: [mixinFormValidations, mixinComputations],
  data() {
    return {
      // upload url
      uploadURL: process.env.API + "/upload",

      step: 1,
      // Form Settings
      isPwd: true,
      tab: "basic",
      imageSrc: "",
      dense: true,
      basicHasError: false,
      personalHasError: false,
      uploadHasError: false,

      // Dropdown List
      countryOptions: [],
      countryList: [], // This extra dropdown list is required to work with FilterOtherCountry function.
      genderOptions: [],
      maritalOptions: [],
      heightOptions: [],
      ageFromToOptions: [],
      gotraOptions: [],
      sourceOfWebsiteOptions: [],

      // formData
      tmpData: {
        primaryContact: "",
        primaryContactCountryCode: "91",
        alternateContact: ""
      },
      formData: {
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        age: 0,
        country: "India",
        otherCountry: "",
        state: "",
        city: "",
        primaryContact: "",
        alternateContact: "",
        maritalStatus: "",
        height: "",
        gotra: "",
        originalSurname: "",
        fatherName: "",
        residentialAddress: "",
        aboutYourself: "",
        ageFrom: "",
        ageTo: "",
        heightFrom: "",
        heightTo: "",
        maritalStatusPreference: [],
        agreeTnC: false,
        sourceOfWebsite: ""
      }
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn"])
  },
  methods: {
    tabChange() {
      if (this.tab === "basic" && this.basicHasError) {
        this.$refs.basicForm.validate();
      } else if (this.tab === "personal" && this.personalHasError) {
        this.$refs.personalForm.validate();
      }
    },
    submitBasicForm() {
      this.$refs.basicForm.validate().then(success => {
        if (success) {
          this.basicHasError = false;
          this.done1 = true;
          this.step = 2;
        } else {
          this.basicHasError = true;
        }
      });
    },
    submitPersonalForm() {
      this.$refs.personalForm.validate().then(success => {
        if (success) {
          this.personalHasError = false;
          this.done2 = true;
          this.step = 3;
        } else {
          this.personalHasError = true;
        }
      });
    },
    registerUser(data) {
      axios
        .post(process.env.API + "/users", data)
        .then(({ data }) => {
          this.$q.notify({
            type: "positive",
            message: "Successfully registered"
          });
          /*this.$router.push('/login')*/
        })
        .catch(error => {
          let errMsg = "";
          if ("message" in error.response.data) {
            errMsg =
              error.response.data.error + " - " + error.response.data.message;
          } else {
            errMsg = error.response.data.error;
          }
          showErrorMessage(errMsg);
        });
    },
    submitForm() {
      if (typeof this.$refs.basicForm === "undefined") {
        this.basicHasError = true;
      } else {
        this.submitBasicForm();
      }
      if (typeof this.$refs.personalForm === "undefined") {
        this.personalHasError = true;
      } else {
        this.submitPersonalForm();
      }
      this.formData.primaryContact =
        "+" +
        this.tmpData.primaryContactCountryCode +
        " " +
        this.tmpData.primaryContact;
      this.formData.alternateContact =
        "+" +
        this.tmpData.primaryContactCountryCode +
        " " +
        this.tmpData.alternateContact;
      this.registerUser(this.formData);
    },
    createHeightList() {
      // create height list when component is created
      let h;
      let i;
      const startHeight = 4;
      const endHeight = 7;
      for (h = startHeight; h <= endHeight; h++) {
        for (i = 0; i <= 12; i++) {
          this.heightOptions.push(h + " ft " + i + " inches");
        }
      }
    },
    createAgeFromToList() {
      const startAge = 18;
      const endAge = 60;
      let a;
      for (a = startAge; a <= endAge; a++) {
        this.ageFromToOptions.push(a);
      }
    },
    calculateAge() {
      this.formData.age = this.computeAge(this.formData.dateOfBirth);
    },

    checkOtherCountry(otherCountry) {
      if (this.formData.country === "Other" && otherCountry === null) {
        return false;
      } else {
        return true;
      }
    },
    checkConfirmPassword(confirmPassword) {
      if (this.formData.password === confirmPassword) {
        return true;
      } else {
        return false;
      }
    },
    checkAgeTo(ageTo) {
      if (ageTo < this.formData.ageFrom) {
        return false;
      } else {
        return true;
      }
    },
    checkAgeFrom(ageFrom) {
      if (ageFrom > this.formData.ageTo) {
        return false;
      } else {
        return true;
      }
    },
    checkHeightTo(heightTo) {
      const heightFrom = this.formData.heightFrom;
      if (heightFrom && heightTo) {
        return this.compareHeightFromHeightTo(heightFrom, heightTo);
      } else {
        return true;
      }
    },
    checkHeightFrom(heightFrom) {
      const heightTo = this.formData.heightTo;
      if (heightFrom && heightTo) {
        return this.compareHeightFromHeightTo(heightFrom, heightTo);
      } else {
        return true;
      }
    },
    uploadImage(fd) {
      return axios
        .post(process.env.API + "/upload", fd, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(resolve => {
          this.$q.notify({
            type: "positive",
            message: "Images successfully uploaded"
          });
        })
        .catch(error => {
          let errMsg = "";
          if ("message" in error.response.data) {
            errMsg =
              error.response.data.error + " - " + error.response.data.message;
          } else {
            errMsg = error.response.data.error;
          }
          showErrorMessage(errMsg);
        });
    },
    uploadPhoto(file) {
      const fd = new FormData();
      fd.append("file", file[0]);
      fd.append("filetype", "photo");
      this.uploadImage(fd);
    },
    uploadProof(file) {
      const fd = new FormData();
      fd.append("file", file[0]);
      fd.append("filetype", "proof");
      this.uploadImage(fd);
    },
    filterOtherCountry(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        const countryListFiltered = [];
        for (const country of this.countryList) {
          // console.log('country',country);
          const countryNameLowerCase = country.name.toLowerCase();
          if (countryNameLowerCase.includes(needle)) {
            countryListFiltered.push(country);
          }
        }
        // console.log('countryListFiltered', countryListFiltered);
        this.countryOptions = countryListFiltered;
      });
    }
  },
  created() {
    this.createHeightList();
    this.createAgeFromToList();
  },
  mounted() {
    axios
      .get(process.env.API + "/lists")
      .then(response => {
        this.countryList = response.data.country;
        this.countryOptions = this.countryList;
        this.gotraOptions = response.data.gotra;
        this.sourceOfWebsiteOptions = response.data.where_know;
        this.maritalOptions = response.data.marital_status;
        this.genderOptions = response.data.gender;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.my-card {
  width: auto;
  min-width: 500px;
  max-width: 800px;
}

.my-uploader {
  max-width: 300px;
}

.q-btn:focus,
.q-btn:hover {
  outline-width: 5px !important;
  outline-style: solid !important;
  outline-color: #d63447 !important; /*$secondary : #d63447;*/
}
</style>
