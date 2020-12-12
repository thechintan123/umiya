<template>
  <div class="q-mt-md">
    <q-card>

    <q-table
      color="secondary"
      card-class="bg-dark"
      :data="searchResults"
      :columns="columns"
      row-key="email"
      dense
      selection="single"
      :selected.sync="selected"
      @update:selected = "rowSelected"
    />

    </q-card>
    <!-- <div class="q-mt-md">
      Selected: {{ JSON.stringify(selected) }}
    </div> -->
  </div>

</template>

<script>
import axios from 'axios'
import { mapState, mapMutations, mapActions } from 'vuex'
import mixinComputations from 'src/mixins/Mixin_Computations.js'
import mixinUtils from 'src/mixins/Mixin_Utils.js'
import mixinSortDataElements from 'src/mixins/Mixin_SortDataElements.js'

export default {
  mixins: [mixinComputations, mixinUtils, mixinSortDataElements],
  data () {
    return {
      //  selected : [],
      columns: [
        {
          name: 'profileId',
          required: true,
          label: 'Profile Id',
          align: 'left',
          field: 'userDetailsId',
          format: val => `${val}`,
          sortable: true
        },
        { name: 'email', align: 'left', label: 'Email', field: 'email', sortable: true },
        { name: 'firstName', align: 'left', label: 'First Name', field: 'firstName', sortable: true },
        { name: 'lastName', align: 'left', label: 'Last Name', field: 'lastName', sortable: true },
        { name: 'maritalStatus', align: 'left', label: 'Marital Status', field: 'maritalStatus', format: val => val.name, sortable: true },
        { name: 'status', align: 'left', label: 'Status', field: 'status', format: val => val.name, sortable: true }

      ]

    }
  },
  computed: {
    ...mapState('admin', ['searchResultsPerPage', 'searchResults', 'page', 'list', 'selectedIdByAdmin', 'selectedUser']),
    selected: {
      get () {
        return this.selectedUser
      },
      set (value) {
        this.setSelectedUser(value)
      }
    }

  },
  methods: {
    ...mapMutations('admin', ['setSearchItemParameter', 'setSearchResults', 'setShowProgressBar', 'setSelectedUser', 'setSelectedIdByAdmin']),
    ...mapActions('admin', ['updatePage']),
    rowSelected (newSelected) {
      // console.log("rowSelected", this.selected)
      // console.log("newSelected", newSelected)
      var selectedUserDetailsId = ''
      if (newSelected.length > 0) {
        selectedUserDetailsId = newSelected[0].userDetailsId
        this.setSelectedIdByAdmin(selectedUserDetailsId)
      } else {
        this.setSelectedIdByAdmin(selectedUserDetailsId)
      }
    },
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
