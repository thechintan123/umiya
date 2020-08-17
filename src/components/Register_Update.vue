<template>
  <div class="fit column">
    <!-- <q-card flat bordered class="my-card">--->

    <q-linear-progress v-show="showProgressBar" indeterminate size="10px" color="secondary" />
    <q-spinner
      v-show="showProgressBar"
      class="z-top fixed-center"
      color="secondary"
      size="3em"
      :thickness="10"
    />

    <q-card v-if="successRegistration">
      <q-banner class="bg-grey-3 q-mb-xs">
        <template v-slot:avatar>
          <q-icon name="assignment_turned_in" color="secondary" />
        </template>
        Successful Registration!!
      </q-banner>
      <q-card-section>
        Thank you
        <span
          class="text-weight-bolder text-capitalize"
        >{{formData.firstName}} {{formData.lastName}}</span> for successful registration.
        <br />Your Profile ID is
        <b>{{user_details_id}}</b>.
        <br />Going forward, UmiyaMatrimony.com will notify you on your email
        <b>{{formData.email}}</b>.
        <br />The other profile will contact you on your primary contact
        <b>{{formData.primaryContact}}</b>
        <br />
        <br />
        <b>Next Steps:</b>
        <br />
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="done_outline" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Admin Approval</q-item-label>
            <q-item-label caption>
              Admin will verify your ID Proof and approve the profile.
              You will be notified on {{formData.email}}.
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon color="secondary" name="fas fa-heart" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Self Search & Contact</q-item-label>
            <q-item-label caption>Search your match and contact the profile directly.</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>

    <q-card v-if="!successRegistration">
      <q-banner class="bg-grey-3 q-mb-xs">
        <template v-slot:avatar>
          <q-icon :name="updateProfile ? 'edit' : 'account_circle'" color="primary" />
        </template>
        <template v-if="updateProfile">Update Profile</template>
        <template v-else>Register on website!!</template>
      </q-banner>

      <q-tabs
        v-model="tab"
        dense
        class="text-secondary"
        active-color="primary"
        indicator-color="primary"
        narrow-indicator
        align="justify"
        @click="tabChange"
      >
        <q-tab name="basic" icon="fas fa-user-cog" label="Basic">
          <q-badge v-if="basicHasError" align="top" color="blue" floating>
            Error
            <q-icon name="warning" color="yellow" class="q-ml-sm" />
          </q-badge>
        </q-tab>
        <q-tab name="personal" icon="ballot" label="Personal">
          <q-badge v-if="personalHasError" align="top" color="blue" floating>
            Error
            <q-icon name="warning" color="yellow" class="q-ml-sm" />
          </q-badge>
        </q-tab>
        <q-tab name="upload" icon="add_a_photo" label="Upload">
          <q-badge v-if="isErrorPhoto || isErrorProof" align="top" color="blue" floating>
            Error
            <q-icon name="warning" color="yellow" class="q-ml-sm" />
          </q-badge>
        </q-tab>
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" keep-alive animated>
        <q-tab-panel name="basic">
          <q-form greedy ref="basicForm">
            <!-- Start - This button is only visible in Testing Mode -->
            <div class="row">
              <q-btn
                v-if="testingMode"
                class="my-button q-mb-md"
                color="secondary"
                label="For Testing - Default fields"
                @click="defaultFields"
              />
            </div>
            <!-- End - This button is only visible in Testing Mode -->

            <q-input
              outlined
              tabindex="1"
              v-model="formData.email"
              label="Email (Login ID)*"
              :rules="[ val => !!val || 'Field is required', val => checkEmail(val) || 'Please enter valid email address.']"
              dense
              clearable
              hint="Hint: This Email will be used as login ID"
              maxlength="50"
              :disable="updateProfile"
            />

            <div class="row" v-if="!updateProfile">
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
                  tabindex="3"
                  outlined
                  v-model="formData.confirmPassword"
                  :rules="[ val => !!val || 'Field is required', val => checkConfirmPassword(val) || 'Password & Confirm Password are not same' ]"
                  lazy-rules
                  label="Confirm Password*"
                  type="password"
                  dense
                  clearable
                  maxlength="50"
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
                  maxlength="50"
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
                  maxlength="50"
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
              @blur="defaultHeightAgeFromTo"
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
                  maxlength="20"
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
                  maxlength="30"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-3">
                <q-input
                  v-model="tmpData.primaryContactCountryCode"
                  outlined
                  dense
                  label="Country Code"
                  type="tel"
                  :rules="[ val => !!val || 'Field is required']"
                  hint="Don't add + or ( )"
                />
              </div>
              <div class="col-9">
                <q-input
                  tabindex="11"
                  v-model="tmpData.primaryContact"
                  outlined
                  dense
                  label="Primary Contact*"
                  type="number"
                  :rules="[ val => !!val || 'Field is required']"
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
                  v-model="tmpData.alternateContactCountryCode"
                  tabindex="12"
                  outlined
                  dense
                  label="Country Code"
                  type="tel"
                  :rules="[ val => !!val || 'Field is required']"
                  hint="Don't add + or ( )"
                />
              </div>
              <div class="col-9">
                <q-input
                  tabindex="13"
                  v-model="tmpData.alternateContact"
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
                  :value="formData.agreeTc"
                  :rules="[ val => val === true || 'Field is required']"
                >
                  <template v-slot:control>
                    <q-toggle
                      tabindex="13"
                      v-model="formData.agreeTc"
                      checked-icon="check"
                      color="green"
                      unchecked-icon="clear"
                      label="Agree Terms & Conditions *"
                      dense
                      :disable="updateProfile"
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
                UmiyaMatrimony.com and its team are only providing online platform for brige-groom search.
                The team only validates the name and date of birth based on ID Proof.
                The team does not perform any background check on any details.
                Requesting to perform the background check before proceeding with any profile.
              </i>
            </p>

            <div class="row">
              <q-space />
              <q-btn
                tabindex="14"
                class="my-button"
                color="primary"
                label="Next >"
                @click="submitBasicForm()"
              />
            </div>
          </q-form>
        </q-tab-panel>

        <q-tab-panel name="personal">
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
                  @blur="defaultPartnerMartialStatus"
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
                  @blur="defaultHeightFromHeightTo"
                ></q-select>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <q-select
                  tabindex="17"
                  v-model="formData.gotra"
                  :rules="[ val => !!val || 'Field is required']"
                  outlined
                  dense
                  clearable
                  options-dense
                  option-value="id"
                  option-label="name"
                  :options="gotraOptions"
                  label="Gotra*"
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
                  maxlength="20"
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
              maxlength="50"
            />
            <q-input
              tabindex="20"
              clearable
              outlined
              v-model="formData.residentialAddress"
              label="Residential Address*"
              :rules="[ val => !!val || 'Field is required']"
              dense
              placeholder="Flat/House no, Building Name, Street Name, City, State"
              hint="Hint: Flat/House no, Building Name, Street Name, City, State"
              maxlength="100"
            />
            <q-input
              tabindex="21"
              clearable
              v-model="formData.aboutYourself"
              outlined
              dense
              label="Tell us about yourself (Optional)"
              type="textarea"
              placeholder="Your education, profession, Interest and family"
              hint="Hint: Your education, profession, Interest and family"
              maxlength="200"
            />
            <q-select
              tabindex="22"
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
            <div class="text-subtitle1">Partner Preferences</div>
            <div class="text-caption text-italic">
              We have defaulted some of the options.
              Please feel free to change as per your preference.
            </div>

            <div class="row">
              <div class="col">
                <q-select
                  tabindex="23"
                  clearable
                  outlined
                  v-model="formData.partnerAgeFrom"
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
                  v-model="formData.partnerAgeTo"
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
                  v-model="formData.partnerHeightFrom"
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
                  v-model="formData.partnerHeightTo"
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
              v-model="formData.partnerMaritalStatus"
              option-value="id"
              option-label="name"
              :options="maritalOptions"
              outlined
              dense
              options-dense
              label="Marital Statuses*"
              :rules="[ val => val.length > 0 || 'Field is required']"
              multiple
              use-chips
              input-debounce="0"
              ref="partnerMartialStatus"
              hint="Hint: Multiple Options can be selected"
            />

            <div class="row">
              <q-btn color="secondary" flat label="Back" @click="tab = 'basic'" />
              <q-space />
              <q-btn tabindex="28" color="primary" label="Next >" @click="submitPersonalForm" />
            </div>
          </q-form>
        </q-tab-panel>

        <q-tab-panel name="upload">
          <q-form ref="uploadForm" greedy>
            
          <div class="q-mb-xs" >
            <q-toggle 
            v-model="updatePhoto" 
            checked-icon="check" 
            color="green" unchecked-icon="clear" 
            label="Do you want to update Photos?"
            @input="getPhotos"
            />
        <q-slide-transition>
              <q-field
                error-message="Please upload atleast One Photo."
                :error="isErrorPhoto"
                borderless
                dense
                v-show="(updateProfile && updatePhoto) || !updateProfile"
              >
                <template v-slot:control>
                  <q-uploader
                    :factory="uploadPhoto"
                    label="Upload Photos (max 4 images)"
                    class="my-uploader"
                    accept="image/*, .pdf, .jpg, .jpeg, .gif, .png"
                    multiple
                    :max-files="4"
                    ref="photo"
                    hide-upload-btn
                    @added="checkPhoto"
                    @removed="checkPhoto"
                    @rejected="onRejected"
                  />
                </template>
              </q-field>
    </q-slide-transition>
                </div>


            <div class="q-mb-xs" >

            <q-toggle 
            v-model="updateProof" 
            checked-icon="check" 
            color="green" unchecked-icon="clear" 
            label="Do you want to update Proofs?"
            @input="getProof"
            />

        <q-slide-transition>


              <q-field
                error-message="Please upload ID Proof."
                :error="isErrorProof"
                borderless
                dense
                v-show="(updateProfile && updateProof) || !updateProfile"
              >
                <template v-slot:control>
                  <q-uploader
                    :factory="uploadProof"
                    label="Upload ID Proof (only 1 image or PDF)"
                    class="my-uploader"
                    accept="image/*, .pdf, .jpg, .jpeg, .gif, .png"
                    color="accent"
                    ref="proof"
                    hide-upload-btn
                    @added="checkProof"
                    @removed="checkProof"
                  />
                </template>
              </q-field>

        </q-slide-transition>
                    <p v-if = "formData.status.name === 'Approved'"> 
              Your profile is already Approved so you cannot update your ID Proof</p>
                    </div>


            <div class="row">
              <q-btn color="secondary" flat label="Back" @click="tab = 'personal'" />
              <q-space />
              <q-btn v-if="updateProfile" color="primary" label="Update"  @click="updateForm"/>

              <q-btn v-else color="primary" label="Submit" @click="submitForm" />


            </div>
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";
import mixinFormValidations from "src/mixins/Mixin_FormValidations.js";
import mixinComputations from "src/mixins/Mixin_Computations.js";
import { showErrorMessage } from "src/utils/show-error-message";
import { mapState } from "vuex";

export default {
  mixins: [mixinFormValidations, mixinComputations],
  //This prop is for UpDateProfile. It will be true for UpdateProfile
  props: ["updateProfile"],
  data() {
    return {
      // upload url
      uploadURL: process.env.API + "/upload",

      //to show Progress Bar between click of Submit Button and Success Registrion,
      showProgressBar: false,

      //to show Registration form or Success message
      successRegistration: false,

      // Form Settings
      isPwd: true,
      tab: "basic",
      imageSrc: "",
      dense: true,
      basicHasError: false,
      personalHasError: false,
      uploadHasError: false,

      //Error for Photo and Proofs
      isErrorProof: false,
      isErrorPhoto: false,

      user_details_id: "",
      // this user_details_id is populated after user is registered in DB - user_details.
      // This is same as id in user_details DB table
      // This is visile as profile ID on screen

      // Dropdown List
      countryOptions: [],
      countryList: [], // This extra dropdown list is required to work with FilterOtherCountry function.
      genderOptions: [],
      maritalOptions: [],
      heightOptions: [],
      ageFromToOptions: [],
      gotraOptions: [],
      sourceOfWebsiteOptions: [],

      //this is to default ageFrom and ageTo. Defaulting to 5 years
      ageDifference: 5,
      heightDifference: 12,
      heightDifference: 15.24, //15.24 cms is 6 inches

      //For testing Purpose only
      testingMode: true,

      // testData for Defaulting Option
      testData: {
        email: "test9@test.com",
        password: "password",
        confirmPassword: "password",
        firstName: "first",
        lastName: "last",
        gender: { id: 1, name: "Male" },
        dateOfBirth: "1983-09-01",
        age: 36,
        country: "India",
        otherCountry: "",
        state: "state",
        city: "city",
        primaryContact: "11111111111",
        alternateContact: "22222222222",
        maritalStatus: { id: 1, name: "Never Married" },
        height: "5 ft 0 inch",
        heightCms: "",
        gotra: { id: 1, name: "Aditya" },
        originalSurname: "Surname",
        fatherName: "father",
        residentialAddress: "address",
        aboutYourself: "about yourself",
        partnerAgeFrom: "30",
        partnerAgeTo: "40",
        partnerHeightFrom: "5 ft 0 inch",
        partnerHeightFromCms: "",
        partnerHeightTo: "6 ft 0 inch",
        partnerHeightToCms: "",
        partnerMartialStatus: [{ id: 1, name: "Never Married" }],
        agreeTc: true,
        sourceOfWebsite: { id: 1, name: "Friends" },
      },
      testTmpData: {
        primaryContact: "11111111111",
        primaryContactCountryCode: "91",
        alternateContactCountryCode: "91",
        alternateContact: "22222222222",
      },

      //form fields
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
        heightCms: "",
        gotra: "",
        originalSurname: "",
        fatherName: "",
        residentialAddress: "",
        aboutYourself: "",
        partnerAgeFrom: "",
        partnerAgeTo: "",
        partnerHeightFrom: "",
        partnerHeightFromCms: "",
        partnerHeightTo: "",
        partnerHeightToCms: "",
        partnerMartialStatus: [],
        agreeTc: false,
        sourceOfWebsite: "",
      },

      //This fields are used to later club them into form fields of primaryContact and alternateContcts
      tmpData: {
        primaryContact: "",
        primaryContactCountryCode: "",
        alternateContactCountryCode: "",
        alternateContact: "",
      },

      //These fields are used for updateProfile
      updatePhoto : false,
      updateProof : false
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn"]),
  },
  methods: {
    //This is for testing purpose. To default the fields on click on default Button
    defaultFields() {
      this.formData = this.testData;
      this.tmpData = this.testTmpData;
      //defaults email with random string
      this.formData.email =
        "test" + Math.random().toString(20).substr(2, 6) + "@test.com";
    },
    tabChange() {
      if (this.tab === "basic" && this.basicHasError) {
        this.$refs.basicForm.validate();
      } else if (this.tab === "personal" && this.personalHasError) {
        this.$refs.personalForm.validate();
      }
    },
    submitBasicForm() {
      this.$refs.basicForm.validate().then((success) => {
        if (success) {
          this.basicHasError = false;
          this.tab = "personal";
        } else {
          this.basicHasError = true;
        }
      });
    },
    submitPersonalForm() {
      this.$refs.personalForm.validate().then((success) => {
        if (success) {
          this.personalHasError = false;
          this.tab = "upload";
        } else {
          this.personalHasError = true;
        }
      });
    },
    registerUser(data) {
      return axios
        .post(process.env.API + "/users", data)
        .then(({ data }) => {
          //console.log("Register User", data);
          this.user_details_id = data.user_details_id;

          //console.log("this.user_details_id", this.user_details_id, typeof(data));

          this.$q.notify({
            type: "positive",
            message: "Successfully registered",
          });
          /* this.$router.push('/login') */
        })
        .catch((error) => {
          let errMsg = "";
          if ("message" in error.response.data) {
            //errMsg = error.response.data.error + " - " + error.response.data.message;

            errMsg = error.response.data.message;
          } else {
            errMsg = error.response.data.error;
          }
          //console.log(errMsg);
          showErrorMessage(errMsg);
        });
    },

    checkPhoto() {
      //console.log("Photo", this.$refs.photo);
      //console.log(this.$refs.photo.files.length);
      if (this.$refs.photo.files.length > 4) {
        this.$refs.photo.files.length = 4; // This will reduce the allowed files to 4 photos;
        this.$q.notify({
          type: "negative",
          message: `Only 4 Photos are allowed. Addtional ones are removed`,
        });
      } else if (this.$refs.photo.files.length === 0) {
        this.isErrorPhoto = true;
        //this.uploadHasError = true;
      } else {
        this.isErrorPhoto = false;
        //this.uploadHasError = true;
      }
    },
    checkProof() {
      //console.log("Proof", this.$refs.photo);
      //console.log(this.$refs.photo.files.length);

      if (this.$refs.proof.files.length === 0) {
        this.isErrorProof = true;
        //this.uploadHasError = true;
      } else {
        this.isErrorProof = false;
        //this.uploadHasError = true;
      }
    },
    async submitForm() {
      this.showProgressBar = true;

      //console.log('SubmitForm', this.$refs);

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

      this.checkPhoto();
      this.checkProof();

      if (
        !this.basicHasError &&
        !this.personalHasError &&
        !this.isErrorPhoto &&
        !this.isErrorProof
      ) {
        this.formData.primaryContact =
          "+" +
          this.tmpData.primaryContactCountryCode +
          " " +
          this.tmpData.primaryContact;
        this.formData.alternateContact =
          "+" +
          this.tmpData.alternateContactCountryCode +
          " " +
          this.tmpData.alternateContact;

        //console.log("Submit form 1", this.formData);
        //convert Height To Cms
        this.formData.partnerHeightFromCms = this.convertHeightToCms(
          this.formData.partnerHeightFrom
        );
        this.formData.partnerHeightToCms = this.convertHeightToCms(
          this.formData.partnerHeightTo
        );
        if (this.formData.heightCms === "") {
          this.formData.heightCms = this.convertpartnerHeightToCms(
            this.formData.height
          );
        }

        //console.log("Submit Form", this.formData);

        await this.registerUser(this.formData);

        if (this.user_details_id !== "") {
          this.$refs.photo.upload();
          this.$refs.proof.upload();
          this.successRegistration = true;
        }
      }
      this.showProgressBar = false;
    },
    createHeightList() {
      // create height list when component is created
      let h;
      let i;
      const startHeight = 4;
      const endHeight = 7;
      for (h = startHeight; h <= endHeight; h++) {
        for (i = 0; i <= 11; i++) {
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
      this.defaultAgeFromAgeTo();
    },

    defaultHeightAgeFromTo() {
      this.defaultAgeFromAgeTo();
      this.defaultHeightFromHeightTo();
    },
    defaultAgeFromAgeTo() {
      //console.log("Gender", this.formData.gender);
      if (this.formData.age !== "") {
        if (this.formData.gender.name == "Male") {
          //Defaulting Age for Partner
          this.formData.partnerAgeFrom = this.formData.age - this.ageDifference;
          this.formData.ageTo = this.formData.age;
        } else if (this.formData.gender.name == "Female") {
          //Defaulting Age for Partner
          this.formData.partnerAgeFrom = this.formData.age;
          this.formData.ageTo = this.formData.age + this.ageDifference;
        } else {
          this.formData.partnerAgeFrom = "";
          this.formData.ageTo = "";
        }
      } else {
        this.formData.partnerAgeFrom = "";
        this.formData.ageTo = "";
      }
    },
    defaultHeightFromHeightTo() {
      this.formData.heightCms = this.convertHeightToCms(this.formData.height);
      var heightCms = this.formData.heightCms;
      var heightFromCms, heightToCms;
      this.convertHeightToFtInch(heightCms);
      if (this.formData.gender.name == "Male") {
        //Defaulting Age for Partner
        heightFromCms = heightCms - this.heightDifference;
        heightToCms = heightCms;
      } else if (this.formData.gender.name == "Female") {
        //Defaulting Age for Partner
        heightFromCms = heightCms;
        heightToCms = heightCms + this.heightDifference;
      } else {
        heightFromCms = heightCms;
        heightToCms = heightCms;
      }
      this.formData.partnerHeightFromCms = heightFromCms;
      this.formData.partnerHeightToCms = heightToCms;
      this.formData.partnerHeightFrom = this.convertHeightToFtInch(
        heightFromCms
      );
      this.formData.partnerHeightTo = this.convertHeightToFtInch(heightToCms);
    },

    defaultPartnerMartialStatus() {
      //console.log("Martial Status", this.formData.maritalStatus);
      //console.log("MSP", this.formData.partnerMartialStatus);
      this.formData.partnerMartialStatus.length = 0;
      this.formData.partnerMartialStatus.push(this.formData.maritalStatus);
    },
    convertHeightToCms(heightFtInch) {
      var heightFt = heightFtInch.substr(0, 1);
      var heightInches = heightFtInch.substr(5, 7);
      //console.log("Height Ft Inch", heightFt, heightInches);
      var heightCms =
        parseFloat(heightFt) * 30.48 + parseFloat(heightInches) * 2.54;
      //console.log("heightCms", heightCms);
      return heightCms;
    },
    convertHeightToFtInch(heightCms) {
      var heightTotalInches = heightCms * 0.393701;
      var heightFt = Math.floor(heightTotalInches / 12);
      var heightInches = Math.floor(heightTotalInches - heightFt * 12);
      console.log("Height Ft Inch", heightFt, heightInches);
      return heightFt + " ft " + heightInches + " inches";
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
      if (ageTo < this.formData.partnerAgeFrom) {
        return false;
      } else {
        return true;
      }
    },
    checkAgeFrom(partnerAgeFrom) {
      if (partnerAgeFrom > this.formData.ageTo) {
        return false;
      } else {
        return true;
      }
    },
    checkHeightTo(heightTo) {
      const heightFrom = this.formData.partnerHeightFrom;
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
    uploadImage(fd, file) {
      return axios
        .post(process.env.API + "/upload", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resolve) => {
          //console.log("uploadImage - Then");
          this.$q.notify({
            type: "positive",
            message: file + " successfully uploaded",
          });
        })
        .catch((error) => {
          let errMsg = "";
          if ("message" in error.response.data) {
            //errMsg = error.response.data.error + " - " + error.response.data.message;
            errMsg = rror.response.data.message;
          } else {
            errMsg = error.response.data.error;
          }
          showErrorMessage(errMsg);
          //console.log("uploadImage - Error - Error Message", errMsg);
        });
    },
    async uploadPhoto(file) {
      const fd = new FormData();
      fd.append("file", file[0]);
      fd.append("filetype", "photo");
      fd.append("user_details_id", this.user_details_id);
      //console.log("Upload Photo", fd, file);
      await this.uploadImage(fd, "Photo");
    },
    async uploadProof(file) {
      const fd = new FormData();
      fd.append("file", file[0]);
      fd.append("filetype", "proof");
      fd.append("user_details_id", this.user_details_id);
      //console.log("Upload Proof", fd, file[0]);
      await this.uploadImage(fd, "Proof");
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
    },
    //Photo Upload - Error Message
    onRejected(rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: "negative",
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
      });
    },

    //For Update Profile
    getUserDetail() {
      var user = JSON.parse(localStorage.getItem("user"));
      var userDetail;
      //console.log(JSON.parse(localStorage.getItem("user")));
      //var keysArray = Object.keys(user);
      //console.log(typeof user, user, user.email, user.user_details_id);
      if (user !== null) {
        var user_details_id = user.user_details_id;
        //user_details_id is same profile_Id share on UI

        this.user_details_id = user_details_id;

        axios
          .get(process.env.API + "/users/" + user_details_id)
          .then(({ data }) => {
            console.log("data", data, data.upload_proof);

            //this code replaces key in data Object from Snake Case to Camel Case
            userDetail = JSON.parse(
              JSON.stringify(data).replace(
                /(_\w)\w+":/g,
                (match) => match[1].toUpperCase() + match.substring(2)
              )
            );

            //need to parse again since there were variables likes partner_age_from
            userDetail = JSON.parse(
              JSON.stringify(userDetail).replace(
                /(_\w)\w+":/g,
                (match) => match[1].toUpperCase() + match.substring(2)
              )
            );

            //console.log("userDetail", userDetail);
            this.formData = userDetail;
            //console.log("formData", this.formData);

            //Converting the data to match the form fields requirements

            /* for Primary Phone and Alternate Phone. It is stored in the following format "+91 1234567890" 
      so extracting the information */
            this.tmpData.primaryContactCountryCode = this.formData.phonePrimary.substr(
              1,
              2
            );
            this.tmpData.primaryContact = this.formData.phonePrimary.substr(4);
            this.tmpData.alternateContactCountryCode = this.formData.phoneAlternate.substr(
              1,
              2
            );
            this.tmpData.alternateContact = this.formData.phoneAlternate.substr(
              4
            );

            //Mapping Height in Cms to Ft and Inch
            this.formData.height = this.convertHeightToFtInch(
              this.formData.height
            );
            //console.log('Height',this.formData.height);

            //Mapping Date of birth correctly. Date of birth will be mapped
            //from "Tue, 20 Sep 1983 00:00:00 GMT"(returned from DB) to YYYY-MM-DD(required for mapping in UI)
            this.formData["dateOfBirth"] = new Date(this.formData.dob)
              .toISOString()
              .split("T")[0];
            console.log(
              "date of Birth",
              this.formData,
              this.formData.dateOfBirth
            );

            //Calculate Age
            this.formData["age"] = this.computeAge(this.formData.dateOfBirth);

            //Map country and other country
            var country = this.formData.country;
            if (country.Name === "India") {
              this.formData.country = "India";
            } else {
              this.formData.country = "Other";
              this.formData.otherCountry = country; //mapping entire country object
            }

            //Map Address and father
            this.formData["residentialAddress"] = this.formData.address;
            this.formData["fatherName"] = this.formData.fatherFullname;

            //Map Source of Website
            this.formData["sourceOfWebsite"] = this.formData.whereKnow;

            //Map Partner Height From and To. First, Convert to Ft and Inches
            this.formData.partnerHeightFrom = this.convertHeightToFtInch(
              this.formData.partnerHeightFrom
            );
            this.formData.partnerHeightTo = this.convertHeightToFtInch(
              this.formData.partnerHeightTo
            );
          })
          .catch((error) => {
            //console.log(error);
          });
      } //end of if user!==null
    }, //end of getUser Detail method


//get Photos for update profile
getPhotos(){

  //Get Photos
           // console.log("Get Photo", this.formData.uploadPhotos);
            if (
              this.updatePhoto && (
              this.formData.uploadPhotos.length != 0 &&
              this.formData.uploadPhotos != null &&
              typeof this.formData.uploadPhotos !== "undefined")
              && (this.$refs.photo.files.length != this.formData.uploadPhotos.length) 
              //if photos are already loaded then no need to fetch it from Axios
            ) {
              //var user_d_id = this.user_details_id;
              //console.log("Before Photo Loop", this.formData.uploadPhotos);
              var fileList = [];
              var i = 0;
              var photos = this.formData.uploadPhotos;
              var len = photos.length;
              var photo = {};
              var fileObj = {};
              var blobObject = {};
              var user_d_id = this.formData.id;

              for (photo of photos) {
                //var filename = photo.filename;
                //axios.get(process.env.API + "/upload/"+ user_details_id +"/" + filename,
                //photo = photos[i];
                //console.log("Photo Loop", photo, photo.filename, fileList[0], fileList.length);

                axios({
                  url:
                    process.env.API +
                    "/upload/" +
                    this.user_details_id +
                    "/" +
                    photo.filename,
                  method: "GET",
                  responseType: "blob", // important
                })
                  .then((response) => {
                    var pos = response.config.url.indexOf("photo");
                    var file = response.config.url.substr(pos); //get file name from URL

                    // console.log(
                    //   "Photo Details",
                    //   pos,
                    //   response.config.url,
                    //   file,
                    //   photo.filename,
                    //   response
                    // );

                    blobObject = new Blob([response.data]);
                    fileObj = new File([blobObject], file, {
                      type: "image/jpeg",
                    });
                    //var fileObj =  new File([response.data]);
                    // fileObj.lastModifiedDate = new Date();
                    // fileObj.name = filename;
                    //fileObj.type = "image/jpeg";
                    //console.log('File Obj', blobObject, fileObj);
                    //var fileList = [fileObj]
                    fileList.push(fileObj);
                    //this.$refs.photo1.files.push(fileObj);
                    this.$refs.photo.addFiles(fileList);
                    //console.log("Photos in Uploader", this.$refs.photo);
                  })
                  .catch((error) => {
                    //console.log(error);
                  });

                //console.log("File List", fileList);
              } //for of Photo loop
            } // end of if for photos

}//end of getPhotos
,
//get Proofs for UpdateProfile
getProof(){
   //get Proofs
      
      //console.log("getProof", this.updateProof,  this.formData.uploadProof);
      if(this.updateProof && 
      (this.formData.uploadProof !== "" && this.formData.uploadProof !== null 
      && (typeof this.formData.uploadProof !== "undefined"))
      && (this.$refs.proof.files.length == 0) 
      ){
      var user_d_id = this.user_details_id;
      var filename = this.formData.uploadProof;

      axios({
        url: process.env.API + "/upload/"+ user_d_id +"/" + filename,
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {
       // console.log("Called Upload", response);

        var blobObject = new Blob([response.data]);
        var fileObj = new File([blobObject], filename,  { type:"image/jpeg" });

        //console.log('File Obj', blobObject, fileObj);
        var fileList = [fileObj]
        this.$refs.proof.addFiles(fileList);
        //console.log('Proof', this.$refs.proof)
        if(this.formData.status.name === 'Approved'){
              this.$refs.proof.disable = true;
        }   
      }).catch((error) => {
        //console.log(error);
      });
}
} //end of getphotos
,
//function called on updateForm
async updateForm(){

      this.showProgressBar = true;

      console.log("Update Form", this.formData);


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

      this.checkPhoto();
      this.checkProof();

      if (
        !this.basicHasError &&
        !this.personalHasError &&
        !this.isErrorPhoto &&
        !this.isErrorProof
      ) {
        this.formData.primaryContact =
          "+" +
          this.tmpData.primaryContactCountryCode +
          " " +
          this.tmpData.primaryContact;
        this.formData.alternateContact =
          "+" +
          this.tmpData.alternateContactCountryCode +
          " " +
          this.tmpData.alternateContact;

        //console.log("Submit form 1", this.formData);
        //convert Height To Cms
        this.formData.partnerHeightFromCms = this.convertHeightToCms(
          this.formData.partnerHeightFrom
        );
        this.formData.partnerHeightToCms = this.convertHeightToCms(
          this.formData.partnerHeightTo
        );
        if (this.formData.heightCms === "") {
          this.formData.heightCms = this.convertHeightToCms(
            this.formData.height
          );
        }


        //converting from CamelCase to SnakeCase
        var formDataSnakeCase = {}
      for(var camel in this.formData) {
          //console.log("Key", camel);
          formDataSnakeCase[this.camelToSnake(camel)] = this.formData[camel];
      }

  	  console.log('Converted to Snake Case', formDataSnakeCase);


        await this.updateUser(formDataSnakeCase);

      this.showProgressBar = false;


      }
}// end of  UpdateForm
,
camelToSnake(key) {
    return key.replace( /([A-Z])/g, "_$1" ).toLowerCase();
}

,
updateUser(data) {
      return axios
        .put(process.env.API + "/users/" +this.user_details_id, data)
        .then(({ data }) => {
          console.log("Search Success", data);
          //this.user_details_id = data.user_details_id;
          this.$q.notify({
            type: "positive",
            message: "Successfully registered",
          });
          /* this.$router.push('/login') */
        })
        .catch((error) => {
          let errMsg = "";
          if ("message" in error.response.data) {
            //errMsg = error.response.data.error + " - " + error.response.data.message;

            errMsg = error.response.data.message;
          } else {
            errMsg = error.response.data.error;
          }
          //console.log(errMsg);
          showErrorMessage(errMsg);
        });
    }
,
    checkPhoto1() {
      console.log("Check Photo", this.$refs.photo1);
    },
  },
  created() {
    this.createHeightList();
    this.createAgeFromToList();
  },
  mounted() {
    //for updateProfile
    if (this.updateProfile === true) {
      this.getUserDetail();
    }
    axios
      .get(process.env.API + "/lists")
      .then((response) => {
        this.countryList = response.data.country;
        this.countryOptions = this.countryList;
        this.gotraOptions = response.data.gotra;
        this.sourceOfWebsiteOptions = response.data.where_know;
        this.maritalOptions = response.data.marital_status;
        this.genderOptions = response.data.gender;
      })
      .catch((error) => {
        //console.log(error);
      });
  },
  components: {
    termsConditionsDialog: require("./terms_privacy/TermsConditionsDialog.vue")
      .default,
  },
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
