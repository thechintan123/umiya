<template>
  <div class="fit column">
    <q-card>


      <q-form greedy ref="searchForm">
        <!-- <q-banner rounded dense class="bg-grey-3">
          <template v-slot:avatar>
            <q-icon name="search" color="primary" />
          </template>
          Search
        </q-banner> -->
              <banner
        iconName="search"
        bannerTitle="Search"
      />

        <q-card-section>
          <q-item>
            <q-item-section side>Looking for :</q-item-section>
            <q-item-section>
              <q-btn-toggle
                v-model="searchParams.lookingFor"
                spread
                no-caps
                rounded
                toggle-color="secondary"
                color="dark"
                text-color="primary"
                :options="[
          {label: 'Bride', value: '2'},
          {label: 'Groom', value: '1'}
        ]"
              />
              <!-- value is aligned to Gender options id 1 : Male; 2 : Female -->
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section side>Age :</q-item-section>
            <q-item-section>
              <q-range v-model="searchParams.ageFromTo" :min="18" :max="50" label-always />
            </q-item-section>
            <q-item-section side>
              <q-badge
                color="secondary"
              >Age: {{ searchParams.ageFromTo.min }} to {{ searchParams.ageFromTo.max }}</q-badge>
            </q-item-section>
          </q-item>
          <div class="row">
            <div class="col">
              <q-select
                outlined
                v-model="searchParams.heightFrom"
                dense
                options-dense
                clearable
                label="Height(From)"
                :options="heightOptions"
                :rules="[val => checkHeightFrom(val) || 'Height(To) should be greater than Height(From)']"
              ></q-select>
            </div>
            <div class="col">
              <q-select
                outlined
                v-model="searchParams.heightTo"
                dense
                options-dense
                clearable
                label="Height(To)"
                :options="heightOptions"
                :rules="[ val => checkHeightTo(val) || 'Height(To) should be greater than Height(From)']"
              ></q-select>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <q-select
                v-model="searchParams.maritalStatusPreference"
                option-value="id"
                option-label="name"
                :options="maritalOptions"
                outlined
                dense
                options-dense
                label="Marital Status"
                :rules="[val => !!val || 'Field is required']"
                multiple
                use-chips
                input-debounce="0"
                hint="Hint: Multiple Options can be selected"
              />
            </div>
            <div class="col">
              <q-select
                outlined
                v-model="searchParams.country"
                :options="countryOptions"
                dense
                options-dense
                label="Country*"
                option-value="id"
                option-label="name"
                :rules="[val => checkCountry(val) || 'Field is required']"
                input-debounce="0"
                multiple
                use-chips
                clearable
              />
            </div>
          </div>
          <div class="row">
            <q-space />
            <q-btn color="primary" label="Search" @click="submitSearchForm" />
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </div>
</template>

<script>
import axios from 'axios'
// import { countryList } from './countryList.js'
import { mapActions, mapState, mapMutations } from 'vuex'
import mixinFormValidations from 'src/mixins/Mixin_FormValidations.js'
import { showErrorMessage } from 'src/utils/show-error-message'

export default {
  mixins: [mixinFormValidations],
  created () {
    this.createHeightList()
    this.createAgeFromToList()
  },
  mounted () {
    axios
      .get(process.env.API + '/lists')
      .then(response => {
        this.countryList = response.data.country
        this.countryOptions = this.countryList
        this.maritalOptions = response.data.marital_status
      })
      .catch(error => {
        console.log(error)
      })
  },
  data () {
    return {

      ageFromToOptions: [],
      heightOptions: [],
      countryOptions: [],
      countryList: [],
      martialOptions1: [
        'Never Married',
        'Divorced',
        'Widowed',
        'Awaiting Divorce'
      ],
      maritalOptions: [],
      searchParams: {
        ageFromTo: {
          min: 20,
          max: 30
        },

        lookingFor: '2',
        heightFrom: '',
        heightTo: '',
        maritalStatusPreference: [],
        country: [{ id: 81, name: 'India' }] // defaulted to India
      }
    }
  },
  components :{
    progressBar: require("../general/ProgressBar.vue").default,
    spinner: require("../general/Spinner.vue").default,
    banner: require("../general/Banner.vue").default
  }
  ,
  methods: {
    ...mapMutations('search', ['setShowProgessBar']),
    ...mapActions('search', ['saveSearchResults']),
  

    submitSearchForm () {
      this.showProgressBar = true
      // console.log("showProgressBar", this.showProgressBar);
      this.$refs.searchForm.validate().then(success => {
        if (success) {
          console.log("Success", this.searchParams);
          this.fetchSearchResults()
        } else {
          console.log('Error')
        }
      })
    },

    async fetchSearchResults () {
      // console.log('searchParams', this.searchParams);
      await this.fetchSearch_fromDB(this.searchParams)
      this.$emit('fetchSearchResults')
      this.showProgressBar = false
      // console.log("showProgressBar", this.showProgressBar);
    },
    fetchSearch_fromDB (data) {
      return axios
        .post(process.env.API + '/search', data)
        .then(({ data }) => {
          console.log("Search Success", data);
          this.saveSearchResults(data)
          // Store in Stores
          this.$q.notify({
            type: 'positive',
            message: 'Successfully search'
          })
        })
        .catch(error => {
          let errMsg = ''
          if ('message' in error.response.data) {
            errMsg =
              error.response.data.error + ' - ' + error.response.data.message
          } else {
            errMsg = error.response.data.error
          }
          showErrorMessage(errMsg)
        })
    },
    createAgeFromToList () {
      const startAge = 18
      const endAge = 60
      let a
      for (a = startAge; a <= endAge; a++) {
        this.ageFromToOptions.push(a)
      }
    },
    createHeightList () {
      // create height list when component is created
      let h
      let i
      const startHeight = 4
      const endHeight = 7
      for (h = startHeight; h <= endHeight; h++) {
        for (i = 0; i <= 12; i++) {
          this.heightOptions.push(h + ' ft ' + i + ' inches')
        }
      }
    },
    checkHeightTo (heightTo) {
      const heightFrom = this.searchParams.heightFrom
      if (heightFrom && heightTo) {
        return this.compareHeightFromHeightTo(heightFrom, heightTo)
      } else {
        return true
      }
    },
    checkHeightFrom (heightFrom) {
      const heightTo = this.searchParams.heightTo
      if (heightFrom && heightTo) {
        return this.compareHeightFromHeightTo(heightFrom, heightTo)
      } else {
        return true
      }
    },
    checkCountry (val) {
      if (val.length === 0) {
        return false
      } else {
        return true
      }
    }
  }
  ,
  components : {
    ...mapState("search",["showProgressBar"])
  }
}
</script>

<style>
</style>
