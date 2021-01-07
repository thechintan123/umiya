<template>
  <div class="q-mt-md">
    <!-- <div> -->
    <q-card >
      <q-banner inline-actions rounded dense class="bg-dark text-secondary">
        Results :
        You have <b>{{searchResults.length}}</b> matches
          <i> (Showing {{count.start}} to {{count.end}})</i>
      <template v-slot:action>
       <q-select dense options-dense
       borderless v-model="sortBy"
       :options=sortByOptions
      option-value="id"
      option-label="value"
       @input = "changeSort"
       label="Sort By" >
        <template v-slot:prepend>
          <q-icon name="fas fa-sort-amount-up-alt"/>
        </template>
       </q-select>
      </template>
      </q-banner>
      <!--
    <q-toolbar class="bg-dark text-secondary shadow-2 rounded-borders">
      <q-toolbar-title>
        Results
      </q-toolbar-title>
    </q-toolbar>
      -->
      <!--<q-card>-->
      <q-list v-for="(searchItem,index) in searchResultsPerPage" :key="index">
        <div class="q-ma-sm row justify-evenly">
          <div class="col-4">
            <!-- <q-avatar rounded> -->
            <!--<img style="max-width:200px;max-height:200px" :src="'statics/photos/' + key + '.jpg'"> -->
            <!-- </q-avatar> -->
            <search-results-photo-slide
              :profileID="searchItem.id"
              :photos="searchItem.uploadPhotos"
              :gender="searchItem.gender"
            ></search-results-photo-slide>
          </div>
          <q-item class="col-8 text-capitalize">
            <q-item-section>
              <q-item-label>
                <div
                  class="text-h6"
                >{{ searchItem.firstName}} {{searchItem.lastName}} </div>
              </q-item-label>
              <q-item-label>
                <u>Profile ID</u>
                :
                {{ searchItem.id }}
              </q-item-label>
              <q-item-label>
                <u>Gender</u>
                :
                {{searchItem.gender.name}}
              </q-item-label>
              <q-item-label>
                <u>Date of Birth</u>
                :
                {{removeTimeStamp(searchItem.dateOfBirth)}}
              </q-item-label>
              <q-item-label>
                <u>Age</u>
                :
                {{computeAge(searchItem.dateOfBirth)}}
              </q-item-label>
              <q-item-label>
                <u>Height</u>
                :
                {{convertHeightToFtInch(searchItem.heightCms)}}
              </q-item-label>
              <q-item-label>
                <u>Marital Status</u>
                :
                {{searchItem.maritalStatus.name}}
              </q-item-label>

              <q-item-label
                caption
                v-if="!loggedIn"
              >You need to be approved member to see contact details.</q-item-label>
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
                        <u>Location</u>
                        :
                        {{ searchItem.city}}, {{ searchItem.state}}, {{ searchItem.country.name}}
                      </q-item-label>
                      <q-item-label>
                        <u>Father Name</u>
                        :
                        {{searchItem.fatherName}}
                      </q-item-label>
                      <q-item-label>
                        <u>Gotra</u>
                        :
                        {{searchItem.gotra.name}}
                      </q-item-label>
                      <q-item-label>
                        <u>Original Surname</u>
                        :
                        {{searchItem.originalSurname}}
                      </q-item-label>
                      <q-item-label>
                        <u>Address</u>
                        :
                        {{searchItem.residentialAddress}}
                      </q-item-label>
                      <q-item-label>
                        <u>Education</u>
                        :
                        {{searchItem.education}}
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
                        {{searchItem.primaryContact}}
                      </q-item-label>
                      <q-item-label>
                        <u>Alternate Contact</u>
                        :
                        {{searchItem.alternateContact}}
                      </q-item-label>
                      <q-item-label>
                        <u>Last Login</u>
                        :
                        {{ hasBlank(searchItem.lastLogin)}}
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
      <q-banner inline-actions rounded dense class="bg-dark text-secondary">
      <template v-slot:action>
      <q-select outlined v-model="resultsPP" :options=resultsPerPageOptions :dense='true'
       @input = "changeResultsPerPage"
      options-dense>
        <template v-slot:prepend>
          <q-icon name="fas fa-list-alt"/>
        </template>
      </q-select>
      </template>
      </q-banner>
    </q-card>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import mixinComputations from 'src/mixins/Mixin_Computations.js'
import mixinUtils from 'src/mixins/Mixin_Utils.js'
import mixinSortDataElements from 'src/mixins/Mixin_SortDataElements.js'

export default {
  mixins: [mixinComputations, mixinUtils, mixinSortDataElements],
  components: {
    'search-results-photo-slide': require('./SearchResultsPhotoSlide.vue')
      .default
  },

  data () {
    return {
      slide: 'first',
      loggedIn: false,
      resultsPerPageOptions: [5, 10, 15, 20, 25]
    }
  },
  computed: {
    ...mapState('search', ['searchResultsPerPage', 'count', 'searchResults', 'page', 'resultsPerPage']),
    resultsPP: {
      get () {
        return this.resultsPerPage
      },
      set (value) {
        this.setResultsPerPage(value)
      }
    }
  },
  methods: {
    ...mapMutations('search', ['setPage', 'setSearchResults', 'setResultsPerPage']),
    ...mapActions('search', ['updatePage', 'computeTotalPages']),
    // removeTimeStamp (val) {
    //   // console.log('ConvertToDate', val);
    //   if (this.hasValue(val)) { return val.substring(0, 17) }
    // },
    hasBlank (val) {
      // console.log('ifBlank', val, this);
      if (!this.hasValue(val)) { return 'Not logged In' } else { return val }
    },
    changeSort (sortOption) {
      var newList = []
      newList = [...this.searchResults]
      if (sortOption.key === 'lastLogin') {
        newList.sort(this.sortDate(sortOption.key, sortOption.order))
      } else {
        newList.sort(this.sortList(sortOption.key, sortOption.order))
      }
      console.log('newList', newList)
      this.setSearchResults(newList)
      this.updatePage(this.page)
    },
    changeResultsPerPage (option) {
      // this.setResultsPerPage(option)
      this.computeTotalPages()
      this.updatePage(1) // set the first page
    }
  },
  created () {
    this.checkLoggedIn()
  }

}
</script>
