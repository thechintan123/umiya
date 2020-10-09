<template>
  <div class="fit column">
    <q-card>

      <q-form greedy ref="searchUserForm" @reset="resetForm">

      <q-expansion-item
        label="Search"
        header-class="bg-grey-3"
        v-model="expand"
        expand-icon-class="text-primary"

      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon size="lg" color="primary" name="search" />
          </q-item-section>

          <q-item-section>
              Search User
          </q-item-section>

        </template>
        <q-card-section>
      <q-input
      outlined
      tabindex="1"
      v-model="email"
      label="Search by Email (Login ID)"
      type="email"
      dense
      clearable
      maxlength="50"
    />
    <div class="row">
      <div class="col">
        <q-input
          tabindex="2"
          outlined
          v-model="firstName"
          label="Search by First Name"
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
          label="Search by Last Name"
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
          v-model="userDetailsId"
          label="Search by Profile ID"
          type="number"
          dense
          clearable
          maxlength="50"
        />
    </div>
    <div class="col">
    <q-select
      outlined
      tabindex="5"
      v-model="gender"
      option-value="id"
      option-label="name"
      :options="genderOptions"
      dense
      options-dense
      clearable
      label="Search by Gender"
    />
      </div>
      </div>
    <div class="row q-ma-sm" v-if="this.list.profileStatusOptions.length <= 0">
      <div class="col">
      <q-skeleton animation="pulse" class="bg-dark" square />
       </div>
    </div>
    <div  class="row" v-else>
      <template v-for="(profStatus,index) in this.list.profileStatusOptions">
        <q-checkbox v-model="profileStatus" :label="profStatus.name"  :val ="profStatus.id" :key="index" />
      </template>

      </div>
          <div class="row">
            <q-btn color="primary" type="reset" flat label="Reset"/>
            <q-space />
            <q-btn color="primary" label="Search" @click="submitSearchUser" />
          </div>
        </q-card-section>
    </q-expansion-item>

      </q-form>
    </q-card>
  </div>
</template>

<script>
import axios from 'axios'
// import { countryList } from './countryList.js'
import { mapActions, mapState, mapMutations } from 'vuex'
import mixinFormValidations from 'src/mixins/Mixin_FormValidations.js'
import mixinUtils from 'src/mixins/Mixin_Utils.js'
import mixinDataElements from 'src/mixins/Mixin_DataElements.js'
import mixinComputations from 'src/mixins/Mixin_Computations.js'

export default {
  mixins: [mixinFormValidations, mixinUtils, mixinDataElements, mixinComputations],

  mounted () {
    // this.fetchList();
    axios
      .get(process.env.API + '/lists')
      .then(response => {
        this.genderOptions = response.data.gender
        var profileStatusOptions = response.data.profile_status
        this.setList({ key: 'profileStatusOptions', value: profileStatusOptions })
      })
      .catch(error => {
        this.showErrorDialog(error)
      })
  },
  data () {
    return {
      genderOptions: []
    }
  },
  components: {
  },
  methods: {
    ...mapActions('admin', ['saveSearchResults', 'resetSearchParams']),
    ...mapMutations('admin', ['setList', 'setSearchParamsIndividual', 'setExpand', 'setShowProgressBar', 'setSelectedIdByAdmin']),

    async submitSearchUser () {
      // reset
      this.setSelectedIdByAdmin('')
      this.setShowProgressBar(true)
      // console.log("showProgressBar", this.showProgressBar);
      await this.$refs.searchUserForm.validate().then(success => {
        if (success) {
          // convert Camel to Snake case
          var searchParamsSnakeCase = {}
          for (const key in this.searchParams) {
            searchParamsSnakeCase[this.camelToSnake(key)] =
                      this.searchParams[key]
          }

          // console.log('Success', searchParamsSnakeCase)
          this.fetchSearch(searchParamsSnakeCase)
        } else {
          var error = 'Error in Search Form. Please correct it before proceeding.'
          this.showErrorDialog(error)
          this.setShowProgressBar(false)
        }
      })
    },

    fetchSearch (searchParamsSnakeCase) {
      return axios
        .post(process.env.API + '/search-by-admin', searchParamsSnakeCase)
        .then(({ data }) => {
          console.log('Search Success', data)
          this.saveSearchResults(data)
          // Store in Stores
          this.$q.notify({
            type: 'positive',
            message: 'Successfully search. Matching results are ' + data.length
          })
        })
        .catch(error => {
          console.log('fetchSearch', error)
          this.showErrorDialog(error)
        })
    },
    resetForm () {
      this.resetSearchParams()
    }

  },
  computed: {
    ...mapState('admin', ['searchParams', 'list', 'expand']),
    expand: {
      get () {
        return this.$store.state.admin.expand
      },
      set (value) {
        this.setExpand(value)
      }
    },
    email: {
      get () {
        return this.searchParams.email
      },
      set (value) {
        this.setSearchParamsIndividual({ key: 'email', value: value })
      }
    },
    firstName: {
      get () {
        return this.searchParams.firstName
      },
      set (value) {
        this.setSearchParamsIndividual({
          key: 'firstName',
          value: value
        })
      }
    },
    lastName: {
      get () {
        return this.searchParams.lastName
      },
      set (value) {
        this.setSearchParamsIndividual({
          key: 'lastName',
          value: value
        })
      }
    },
    userDetailsId: {
      get () {
        return this.searchParams.userDetailsId
      },
      set (value) {
        this.setSearchParamsIndividual({ key: 'userDetailsId', value: value })
      }
    },
    gender: {
      get () {
        return this.searchParams.gender
      },
      set (value) {
        this.setSearchParamsIndividual({ key: 'gender', value: value })
      }
    },
    profileStatus: {
      get () {
        return this.searchParams.profileStatus
      },
      set (value) {
        this.setSearchParamsIndividual({ key: 'profileStatus', value: value })
      }
    }

  }

}
</script>

<style>
</style>
