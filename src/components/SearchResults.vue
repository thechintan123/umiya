<template>
  <div class="q-mt-md">
    <q-card>
      <q-banner rounded dense class="bg-dark text-secondary">Results</q-banner>
      <!--
    <q-toolbar class="bg-dark text-secondary shadow-2 rounded-borders">
      <q-toolbar-title>
        Results
      </q-toolbar-title>
    </q-toolbar>
      -->
      <!--<q-card>-->
      <q-list padding v-for="(searchItem,key,index) in searchResults" :key="index">
        <div class="q-ma-sm row justify-center">
          <div class="col-md-4 col-9">
            <!-- <q-avatar rounded> -->
            <!--<img style="max-width:200px;max-height:200px" :src="'statics/photos/' + key + '.jpg'"> -->
            <!-- </q-avatar> -->
            <search-results-photo-slide
              :profileID="searchItem.id"
              :photos="searchItem.uploadPhotos"
              :gender="searchItem.gender"
            ></search-results-photo-slide>
          </div>
          <q-item class="col-md-8 col-9 text-capitalize">
            <q-item-section>
              <q-item-label>
                <div
                  class="text-h6"
                >{{ searchItem.firstName}} {{searchItem.lastName}} (Profile ID :{{ searchItem.id }})</div>
              </q-item-label>
              <q-item-label>
                <u>Date of Birth</u>
                :
                {{ searchItem.dob | convertToDate}}
              </q-item-label>
              <q-item-label>
                <u>Age</u>
                :
                {{ computeAge(searchItem.dob)}}
              </q-item-label>
              <q-item-label>
                <u>Height</u>
                :
                {{searchItem.height | convertHeightToFoot}}
              </q-item-label>
              <q-item-label>
                <u>Marital Status</u>
                :
                {{searchItem.maritalStatus}}
              </q-item-label>
              <q-item-label>
                <u>Location</u>
                :
                {{ searchItem.city}}, {{ searchItem.state}}, {{ searchItem.country}}
              </q-item-label>
              <q-item-label
                caption
                v-if="!loggedIn"
              >You need to be registered member to see contact details.</q-item-label>
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
                      <q-item-label>
                        <u>Father Name</u>
                        :
                        {{searchItem.fatherFullName}}
                      </q-item-label>
                      <q-item-label>
                        <u>Gotra</u>
                        :
                        {{searchItem.gotra}}
                      </q-item-label>
                      <q-item-label>
                        <u>Original Surname</u>
                        :
                        {{searchItem.originalSurname}}
                      </q-item-label>
                      <q-item-label>
                        <u>Address</u>
                        :
                        {{searchItem.address}}
                      </q-item-label>
                      <q-item-label>
                        <u>
                          About
                          {{ searchItem.firstName}}
                        </u>
                        :
                        {{searchItem.aboutYourself}}
                      </q-item-label>
                      <q-item-label>
                        <u>Primary Contact</u>
                        :
                        {{searchItem.phonePrimary}}
                      </q-item-label>
                      <q-item-label>
                        <u>Alternate Contact</u>
                        :
                        {{searchItem.phoneAlternate}}
                      </q-item-label>
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
import { mapGetters, mapState } from 'vuex'
import mixinComputations from 'src/mixins/Mixin_Computations.js'

export default {
  mixins: [mixinComputations],
  components: {
    'search-results-photo-slide': require('components/SearchResultsPhotoSlide.vue')
      .default
  },

  props: ['searchResults'],
  data () {
    return {
      slide: 'first',
      loggedIn: false
    }
  },
  methods: {
    checkLoggedIn () {
      const user = localStorage.getItem('user')
      // console.log(user);
      if (user) {
        this.loggedIn = true
      } else {
        this.loggedIn = false
      }
    }
  },
  filters: {
    convertHeightToFoot (heightInCms) {
      var heigthInInches = heightInCms * 0.39
      var heightInFeet = Math.trunc(heigthInInches / 12)
      var onlyInches = Math.trunc(heigthInInches - heightInFeet * 12)
      // console.log(heightInFeet, onlyInches, heigthInInches);
      return heightInFeet + ' feet ' + onlyInches + ' inches'
    },
    convertToDate (val) {
      // console.log('ConvertToDate', val);
      return val.substring(0, 17)
    }
  },
  created () {
    this.checkLoggedIn()
  }
}
</script>

<style>
@media screen and (max-width: 400px) {
  .my-photo {
    width: 100px !important;
  }
}
</style>
