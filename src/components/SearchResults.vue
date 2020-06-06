<template>

  <div class="q-mt-md">
    <q-toolbar class="bg-dark text-secondary shadow-2 rounded-borders">
      <q-toolbar-title>
        Results
      </q-toolbar-title>
    </q-toolbar>
   <q-card>
   <q-list padding
   v-for="(searchItem,key,index) in searchResults"
   >
      <div class="q-ma-sm row">
        <div class="col-md-4 col-9">
          <!-- <q-avatar rounded> -->
            <!--<img style="max-width:200px;max-height:200px" :src="'statics/photos/' + key + '.jpg'"> -->
          <!-- </q-avatar> -->
          <search-results-photo-slide :profileID= "key"></search-results-photo-slide>
        </div>
        <q-item class="col-md-8 col-9">
        <q-item-section >
         <q-item-label> <div class="text-h6">{{ searchItem.firstName}} {{searchItem.lastName}}( {{ key }})</div></q-item-label>
          <q-item-label > Date of Birth : {{ searchItem.dateOfBirth}} </q-item-label>
          <q-item-label > Age : {{ searchItem.age}} years </q-item-label>
          <q-item-label > Height : {{searchItem.height}} </q-item-label>
          <q-item-label > Marital Status : {{searchItem.maritalStatus}} </q-item-label>
          <q-item-label > Location : {{ searchItem.city}}, {{ searchItem.state}}, {{ searchItem.country}}  </q-item-label>
          <q-item-label caption v-if="!loggedIn"> You need to be registered member to see contact details.  </q-item-label>
         <q-expansion-item
         switch-toggle-side
        expand-separator
        caption="Click for more details"
        dense
        dense-toggle
        v-else
         >

        <q-card>
          <q-card-section>
          <q-item-section>
          <q-item-label > Father Name  : {{searchItem.fatherName}} </q-item-label>
          <q-item-label > Gotra  : {{searchItem.gotra}} </q-item-label>
          <q-item-label > Original Surname  : {{searchItem.originalSurname}} </q-item-label>
          <q-item-label > Address  : {{searchItem.residentialAddress}} </q-item-label>
          <q-item-label > About {{ searchItem.firstName}} : {{searchItem.aboutYourself}} </q-item-label>
          <q-item-label > Primary Contact  : {{searchItem.primaryContactCode}} - {{searchItem.primaryContact}}  </q-item-label>
          <q-item-label > Alternate Contact  : {{searchItem.alternateContactCode}} - {{searchItem.alternateContact}}  </q-item-label>
          </q-item-section>
          </q-card-section>
        </q-card>

      </q-expansion-item>

      </q-item-section>
      </q-item>

      </div>

     <q-separator color="secondary" inset />

      </q-list>
   </q-card>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex';

export default{
components:{
    'search-results-photo-slide' :  require('components/SearchResultsPhotoSlide.vue').default,

}
,
props :['searchResults'],
data(){
return {
slide : 'first',
loggedIn:  false
}
}
,
methods: {
checkLoggedIn(){
let user = localStorage.getItem("user");
console.log('checkLoggedIn');
console.log(user);
if(user){
this.loggedIn = true;
} else{
this.loggedIn = false;
}
}
}
,
created(){
this.checkLoggedIn();
}
/*
data(){
return{
searchResults: {
        'ID1' : {
        email: "email@email.com",
        password: "",
        confirmPassword: "",
        firstName: "First",
        lastName: "Last",
        gender: "Male",
        dateOfBirth: "01-Jan-2020",
        age: 10,
        country: "India",
        otherCountry: "",
        state: "Maharashtra",
        city: "Mumbai",
        primaryContact: "1234567890",
        primaryContactCountryCode: 91,
        alternateContact: "1111111111",
        alternateContactCountryCode: 91,
        maritalStatus: "Never Married",
        height: "6 ft",
        gotra: "Gotra",
        originalSurname: "Mavani",
        fatherName: "Father",
        residentialAddress: "12, Building, Street, City",
        aboutYourself: " About Yourself",
        ageFrom: "",
        ageTo: "",
        heightFrom: "",
        heightTo: "",
        martialStatusPreferences: [],
        agreeTnC: false
      }
      ,
        'ID2' : {
        email: "email2@email.com",
        password: "",
        confirmPassword: "",
        firstName: "First-ID2",
        lastName: "Last",
        gender: "Male",
        dateOfBirth: "01-Jan-2020",
        age: 10,
        country: "India",
        otherCountry: "",
        state: "Maharashtra",
        city: "Mumbai",
        primaryContact: "1234567890",
        primaryContactCountryCode: 91,
        alternateContact: "1111111111",
        alternateContactCountryCode: 91,
        maritalStatus: "Never Married",
        height: "6 ft",
        gotra: "Gotra",
        originalSurname: "Mavani",
        fatherName: "Father",
        residentialAddress: "12, Building, Street, City",
        aboutYourself: " About Yourself",
        ageFrom: "",
        ageTo: "",
        heightFrom: "",
        heightTo: "",
        martialStatusPreferences: [],
        agreeTnC: false
      },

      'ID3' : {
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
        primaryContactCountryCode: 91,
        alternateContact: "",
        alternateContactCountryCode: 91,
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
        martialStatusPreferences: [],
        agreeTnC: false
      }



}

}
}
,

methods: {
checkLoggedIn(){
let user = localStorage.getItem("user");
console.log('checkLoggedIn');
console.log(user);
}
}
,
updated(){
console.log('created');
this.checkLoggedIn();

}
,
computed :{
 ...mapGetters('search',['getSearchResults']),
 ...mapState('search', ['searchResults'])
}
*/
}
</script>

<style>
</style>
