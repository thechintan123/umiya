<template>

<div class="">

    <q-card flat bordered class="my-card">

    <q-banner class="bg-grey-3 q-mb-xs">
      <template v-slot:avatar>
        <q-icon name="account_circle" color="primary" />
      </template>
        Register on website!!
    </q-banner>

        <q-tabs
          v-model="tab"
          dense
          class="text-secondary"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="account" icon="fas fa-address-card" label="Basic" />
          <q-tab name="personal" icon="ballot" label="Personal" />
          <q-tab name="upload" icon="add_a_photo" label="Upload" />

        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="account">




                 <q-input outlined v-model="formData.email" label="Email"
                  :rules="[ val => !!val || 'Field is required', val => checkEmail(val) || 'Please enter valid email address.']"
                  lazy-rules
                  ref="email"
                  dense
                  />



                 <q-input outlined v-model="formData.password"
                 :rules="[ val => !!val || 'Field is required']"
                  lazy-rules
                  ref="password"
                 label="Password" type="password"
                  dense
                 />

                 <q-input outlined v-model="formData.confirmPassword"
                 :rules="[ val => !!val || 'Field is required']"
                  lazy-rules
                 label="Confirm Password" type="password"
                 dense
                 />


                 <div class="row">
                 <div class="col">
                 <q-input outlined v-model="formData.firstName"
                 label="First Name"
                 :rules="[ val => !!val || 'Field is required']"
                 dense
                 />
                 </div>
                 <div class="col">
                  <q-input outlined v-model="formData.lastName"
                 label="Last Name"
                 :rules="[ val => !!val || 'Field is required']"
                 dense
                 />
                 </div>
                 </div>

                   <q-select
                   outlined
                   v-model="formData.gender"
                   :options="genderOptions"
                   dense
                   options-dense
                    clearable
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                   label="Gender"
                   :rules="[ val => !!val || 'Field is required']"
                   @filter="filterGenderFn"

                   />


                 <div class="row">
                 <div class="col">
                   <q-input v-model="formData.dateOfBirth"
                    outlined
                    dense
                    stack-label
                    type="date"
                    label="Date of Birth"
                    :rules="[ val => !!val || 'Field is required']"
                    @blur = "calculateAge"
                     />
                 </div>
                 <div class="col">
                  <q-input outlined v-model="formData.age"
                 label="Age"
                 readonly
                 disable
                 dense
                 />
                 </div>
                 </div>

                   <q-select
                   outlined
                   v-model="formData.Country"
                   :options="countryOptions"
                   dense
                   options-dense
                   label="Country"
                   use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                   :rules="[ val => !!val || 'Field is required']"
                    @filter="filterCountryFn"
                   />

                 <div class="row">
                 <div class="col">
                   <q-input v-model="formData.state"
                    outlined
                    dense
                    label="State"
                    :rules="[ val => !!val || 'Field is required']"

                     />
                 </div>
                 <div class="col">
                   <q-input v-model="formData.city"
                    outlined
                    dense
                    label="City"
                    :rules="[ val => !!val || 'Field is required']"
                     />
                 </div>
                 </div>

                 <div class="row">
                 <div class="col-1">
                   <q-input v-model="formData.primaryContactCountryCode"
                    outlined
                    dense
                    label="Code"
                    mask="##"
                    fill-mask
                    type = "tel"
                    :rules="[ val => !!val || 'Field is required']"
                     />
                   </div>
                  <div class="col-5">

                   <q-input v-model="formData.primaryContact"
                    outlined
                    dense
                    label="Primary Contact"
                    mask="##### #####"
                    fill-mask
                    type = "tel"
                    :rules="[ val => !!val || 'Field is required']"
                     />
                 </div>
                 <div class="col">
                   <q-input v-model="formData.alternateContact"
                    outlined
                    dense
                    label="Alternate Contact"
                     />
                 </div>
                 </div>

             <div class="row">
              <q-space/>
              <q-btn color="primary" label="Next"
              @click="tab = 'personal'"/>

                 </div>


         </q-tab-panel>

          <q-tab-panel name="personal">

                 <div class="row">
                 <div class="col">
                   <q-select v-model="formData.maritalStatus"
                    :options = "martialOptions"
                    outlined
                    dense
                    label="Marital Status"
                    :rules="[ val => !!val || 'Field is required']"
                     />
                 </div>
                 <div class="col">
                  <q-input outlined v-model="formData.height"
                 label="Age"
                 readonly
                 disable
                 dense
                 />
                 </div>
                 </div>

                 <q-input outlined v-model="formData.fatherName"
                 label="Father Name"
                 :rules="[ val => !!val || 'Field is required']"
                 dense
                 />

                   <div class="row">
                 <div class="col-1">
                   <q-input v-model="formData.primaryContactCountryCode"
                    outlined
                    dense
                    label="Code"
                    mask="##"
                    fill-mask
                    type = "tel"
                    :rules="[ val => !!val || 'Field is required']"
                     />
                   </div>
                  <div class="col-5">

                   <q-input v-model="formData.primaryContact"
                    outlined
                    dense
                    label="Primary Contact"
                    mask="##### #####"
                    fill-mask
                    type = "tel"
                    :rules="[ val => !!val || 'Field is required']"
                     />
                 </div>
                 <div class="col">
                   <q-input v-model="formData.alternateContact"
                    outlined
                    dense
                    label="Alternate Contact"
                     />
                 </div>
                 </div>

             <div class="row">
              <q-space/>
              <q-btn color="primary" label="Next"
              @click="tab = 'personal'"/>
              </div>

          </q-tab-panel>

          <q-tab-panel name="upload">
                   <div class="q-mb-xs">
                    <q-uploader
                      url="http://localhost:4444/upload"
                      label = "Upload Photos"
                    />
                  </div>

          </q-tab-panel>

        </q-tab-panels>


        </q-card>
</div>
</template>

<script>
import {countryList} from './countryList.js'

export default{
data(){
return {
tab: 'account',
dense : true,
genderOptions : ['Male','Female'],
martialOptions : ['Never Married','Divorced','Widowed'],
countryOptions : countryList,

formData : {
  email : '',
  password : '',
  confirmPassword : '',
  firstName : '',
  lastName : '',
  gender : '',
  dateOfBirth : '',
  age : 0,
  country : '',
  state : '',
  city : '',
  primaryContact : '',
  primaryContactCountryCode : 91,
  alternateContact : '',
  alternateContactCountryCode : 91,
  maritalStatus : '',
  height : '',
  gotra : '',
  originalSurname : '',
  fatherName : ''

}
}
}
,
methods : {
calculateAge(){
console.log('calculateAge');
console.log('DOB',this.formData.dateOfBirth);

var dob_inMS = Date.parse(this.formData.dateOfBirth);
console.log('DOB converted',dob);

 var diff_ms = Date.now() - dob_inMS;
 var age_dt = new Date(diff_ms);
 this.formData.age = Math.abs(age_dt.getUTCFullYear() - 1970);
},
filterGenderFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.genderOptions = this.genderOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
}
,
filterCountryFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.countryOptions = countryList.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
}

,
submitForm(){
console.log('Submit form');
this.$refs.email.validate();
this.$refs.password.validate();
if(!this.$refs.email.hasError && !this.$refs.password.hasError){
  if(this.tab == 'login'){
console.log('Login User');
}
else {
console.log('Register User');
}
}
}
,
checkEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log('checkEmail', re.test(String(email).toLowerCase()));
    return re.test(String(email).toLowerCase());
}
}
,
filters : {
captilize(value){
return value[0].toUpperCase() + value.slice(1);
}
}
}
</script>

<style scoped>
.my-card {
  width: 100%;
  min-width: 500px;
  max-width: 800px
  }
</style>
