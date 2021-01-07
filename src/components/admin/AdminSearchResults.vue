<template>
  <div class="q-mt-md">
    <q-card>
      <q-banner inline-actions rounded dense class="bg-dark text-secondary">
        Results :
        <i>
          You have <b>{{ searchResults.length }}</b> matches
        </i>
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

      <q-list v-for="(searchItem, index) in searchResultsPerPage" :key="index">
        <div class="q-ma-sm row justify-evenly">
          <div class="col-4">
            <search-results-photo-slide
              :profileID="searchItem.id"
              :photos="photosAndProof(searchItem)"
              :gender="searchItem.gender"
            ></search-results-photo-slide>
          </div>
          <q-item class="col-8 text-capitalize">
            <q-item-section>
              <q-item-label>
                <div class="text-h6">
                  {{ searchItem.firstName }} {{ searchItem.lastName }}
                </div>
              </q-item-label>
              <q-item-label>
                <u>Profile ID</u>
                :
                {{ searchItem.userDetailsId }}<i> (Email : {{ searchItem.email }} )</i>
              </q-item-label>
              <q-item-label>
                <u>Date of Birth</u>
                :
                {{ removeTimeStamp(searchItem.dateOfBirth) }} <i> (Age : {{ computeAge(searchItem.dateOfBirth) }} )</i>
              </q-item-label>
                    <q-item-label>
                        <u>Gender</u>
                        :
                        {{ searchItem.gender.name }}
                      </q-item-label>
                      <q-item-label>
                        <u>Location</u>
                        :
                        {{ searchItem.city }}, {{ searchItem.state }},
                        {{ searchItem.country.name }}
                      </q-item-label>
                      <q-item-label>
                        <u>Address</u>
                        :
                        {{ searchItem.residentialAddress }}
                      </q-item-label>
                      <q-item-label>
                        <u>Current Status</u>
                        :
                        <b>{{ searchItem.status.name }} </b> <i>(Approval Date : {{ searchItem.approvalDate}})</i>
                      </q-item-label>
                      <q-item-label>
                        <u>Previous Correction Comments</u>
                        :
                        <i>{{ searchItem.correctionComments }}</i>
                      </q-item-label>
          <q-item-label>

            <template v-for="(status,index) in list.profileStatusOptions">
            <q-radio v-model="profileStatus[searchItem.userDetailsId]"
            :val="status.id" :label="status.name" :key="index"/>
            </template>
          </q-item-label>

          <q-item-label>
              <q-input v-if="profileStatus[searchItem.userDetailsId] === 3"
                v-model="correctionComments[searchItem.userDetailsId]"
                label = "Correction Comments"
                outlined
                autogrow
                :maxlength = "correctionCommentsMax"
                :rules="[val => checkCorrectionCommentsLength(val, searchItem.correctionComments) || correctionErrorMessage]"

              />
           <q-btn color="primary" label="Change Status"
           @click="changeStatus(searchItem)"/>

          </q-item-label>
              <q-expansion-item
                switch-toggle-side
                expand-separator
                caption="Click for more details"
                dense
                dense-toggle
              >
                <q-card>
                  <q-card-section>
                    <q-item-section>
                      <q-item-label>
                        <u>Marital Status</u>
                        :
                        {{ searchItem.maritalStatus.name }}
                      </q-item-label>

                      <q-item-label>
                        <u>Father Name</u>
                        :
                        {{ searchItem.fatherName }}
                      </q-item-label>
                      <q-item-label>
                        <u>Gotra</u>
                        :
                        {{ searchItem.gotra.name }}
                      </q-item-label>
                      <q-item-label>
                        <u>Original Surname</u>
                        :
                        {{ searchItem.originalSurname }}
                      </q-item-label>
                      <q-item-label>
                        <u>Education</u>
                        :
                        {{ searchItem.education }}
                      </q-item-label>
                      <q-item-label>
                        <u>
                          About
                          {{ searchItem.firstName }}
                        </u>
                        :
                        {{ searchItem.aboutYourself }}
                      </q-item-label>
                      <q-item-label>
                        <u>Primary Contact</u>
                        :
                        {{ searchItem.primaryContact }}
                      </q-item-label>
                      <q-item-label>
                        <u>Alternate Contact</u>
                        :
                        {{ searchItem.alternateContact }}
                      </q-item-label>
                      <q-item-label>
                        <u>Last Login</u>
                        :
                        {{ hasBlank(searchItem.lastLogin) }}
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
import axios from 'axios'
import { mapState, mapMutations, mapActions } from 'vuex'
import mixinComputations from 'src/mixins/Mixin_Computations.js'
import mixinUtils from 'src/mixins/Mixin_Utils.js'
import mixinSortDataElements from 'src/mixins/Mixin_SortDataElements.js'
import { correctionCommentsMaxLength } from 'src/constants/registerFormConstants.js'

export default {
  mixins: [mixinComputations, mixinUtils, mixinSortDataElements],
  components: {
    'search-results-photo-slide': require('../search/SearchResultsPhotoSlide.vue')
      .default
  },

  // props: ['searchResults'],
  data () {
    return {
      profileStatus: [],
      correctionComments: [],
      correctionCommentsMax: correctionCommentsMaxLength,
      correctionErrorMessage: 'Max length of Correction Commments has reached'

    }
  },
  computed: {
    ...mapState('admin', ['searchResultsPerPage', 'searchResults', 'page', 'list'])

  },
  methods: {
    ...mapMutations('admin', ['setSearchItemParameter', 'setSearchResults', 'setShowProgressBar']),
    ...mapActions('admin', ['updatePage']), // ...mapActions("admin",["updateStatus"])
    changeStatus (item) {
      var userDetailsId = item.userDetailsId
      var newStatusId = this.profileStatus[userDetailsId]
      var updatedUser = { status: { id: newStatusId } }
      // console.log("changeStatus", item, this.correctionComments)

      var currentComments, currDate, previousComments
      var hasError = false
      if (newStatusId === 3) { // 3- Correction
      // validate Correction Comments Length
        currentComments = this.correctionComments[userDetailsId]
        currDate = new Date().toDateString()
        previousComments = ''
        if (this.hasValue(item.correctionComments)) {
          previousComments = item.correctionComments
        }
        hasError = !this.checkCorrectionCommentsLength(currentComments, previousComments)
      // above function returns false if there is any error
      }

      if (hasError) {
        this.showMessageDialog(this.correctionErrorMessage)
      } else {
        this.setShowProgressBar(true)
        // 3 means - Correction
        if (newStatusId === 3 && this.hasValue(currentComments)) {
          updatedUser.correction_comments = previousComments + currDate + ' : ' + currentComments + '; \n '
        }

        // console.log("updatedUser", updatedUser);
        axios
          .put(process.env.API + '/admin/users/' + userDetailsId, updatedUser)
          .then(({ data }) => {
          // console.log("Updated Successfully", data);
            this.setSearchItemParameter({ item: item, key: 'status', value: data.status })
            if (newStatusId === 3) {
              this.setSearchItemParameter({ item: item, key: 'correctionComments', value: data.correction_comments })
            } else if (newStatusId === 2) {
              this.setSearchItemParameter({ item: item, key: 'approvalDate', value: data.approval_date })
            }
            // this.$q.notify({
            //   type: 'positive',
            //   message: 'Profile status of ' + data.first_name + ' is updated to ' + data.status.name
            // })
            var message = 'Profile status of ' + data.first_name + ' is updated to ' + data.status.name
            this.showNotification('positive', message)
            this.setShowProgressBar(false)
          })
          .catch(error => {
            this.showErrorDialog(error)
            this.setShowProgressBar(false)
          })
      }
    },
    photosAndProof (searchItem) {
      var fileList = []
      fileList.push(searchItem.uploadPhotos)
      fileList.push(searchItem.uploadProof)
      return fileList
    },
    changeSort (sortOption) {
      var newList = []
      newList = [...this.searchResults]
      if (sortOption.key === 'lastLogin') {
        newList.sort(this.sortDate(sortOption.key, sortOption.order))
      } else {
        newList.sort(this.sortList(sortOption.key, sortOption.order))
      }
      // console.log("newList", newList)
      this.setSearchResults(newList)
      this.updatePage(this.page)
    },
    checkCorrectionCommentsLength (currentComments, previousComments) {
      var currLength = 0
      if (this.hasValue(currentComments)) {
        currLength = currentComments.length
      }
      var prevLength = 0
      if (this.hasValue(previousComments)) {
        prevLength = previousComments.length
      }
      if (this.correctionCommentsMax > prevLength + currLength) {
        return true
      } else {
        return false
      }
    }
  }

}
</script>

<style>

</style>
