<template>
  <div class="fit column">
    <q-card>

      <q-form greedy ref="searchForm">

      <q-expansion-item
        label="Search"
        header-class="bg-dark"
        v-model="expand"
        expand-icon-class="text-primary"

      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon size="lg" color="primary" name="search" />
          </q-item-section>

          <q-item-section>
              Search
          </q-item-section>

        </template>
        <q-card-section>
          <q-item>
            <q-item-section side>Looking for :</q-item-section>
            <q-item-section>
              <q-btn-toggle
                v-model="lookingFor"
                tabindex="1"
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
              <q-range
                tabindex="2"
              v-model="ageFromTo" :min="18" :max="50" label-always />
            </q-item-section>
            <q-item-section side>
              <q-badge
                color="secondary"
              >Age: {{ ageFromTo.min }} to {{ ageFromTo.max }}</q-badge>
            </q-item-section>
          </q-item>
          <div class="row">
            <div class="col">
              <q-select
                tabindex="3"
                outlined
                v-model="heightFrom"
                dense
                options-dense
                clearable
                label="Height(From)"
                :options="heightOptions"
                :rules="[val => checkHeightFrom(val) || 'Height(From) should be lesser than (To)']"
              ></q-select>
            </div>
            <div class="col">
              <q-select
                tabindex="4"
                outlined
                v-model="heightTo"
                dense
                options-dense
                clearable
                label="Height(To)"
                :options="heightOptions"
                :rules="[ val => checkHeightTo(val) || 'Height(To) should be greater than (From)']"
              ></q-select>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <q-select
                tabindex="5"
                v-model="maritalStatusPreference"
                option-value="id"
                option-label="name"
                :options="list.maritalOptions"
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
                v-model="country"
                :options="list.countryOptions"
                dense
                options-dense
                label="Country*"
                option-value="id"
                option-label="name"
                input-debounce="0"
                clearable
                use-chips
                multiple
                hint="Hint: Multiple Options can be selected"
                tabindex="6"

              />

            </div>
          </div>
          <q-separator inset color="secondary"/>
          <p class="text-subtitle no-margin text-grey-6">Search based on above parameters or Search using profile ID.</p>
          <div class="row">
            <div class="col">
                <q-input
                  tabindex="7"
                  outlined
                  v-model="userDetailsIdFrom"
                  label="Only Search by Profile ID(From)"
                  type="number"
                  dense
                  clearable
                  maxlength="3"
                  :rules="[val => compareIdFromTo(val, this.userDetailsIdTo) || 'Profile Id(From) is greater than (To)']"
                />            </div>
            <div class="col">
            <q-input
              tabindex="7"
              outlined
              v-model="userDetailsIdTo"
              label="Only Search by Profile ID(To)"
              type="number"
              dense
              clearable
              maxlength="3"
              :rules="[val => compareIdFromTo(this.userDetailsIdFrom, val) || 'Profile Id(To) is less than (From)']"

            />
             </div>
             </div>
          <div class="row">
           <q-space />
            <q-btn
              tabindex="8"
            color="primary" label="Search" @click="submitSearchForm" />
          </div>
        </q-card-section>
    </q-expansion-item>

      </q-form>
    </q-card>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState, mapMutations } from 'vuex'
import mixinFormValidations from 'src/mixins/Mixin_FormValidations.js'
import mixinUtils from 'src/mixins/Mixin_Utils.js'
import mixinDataElements from 'src/mixins/Mixin_DataElements.js'
import mixinComputations from 'src/mixins/Mixin_Computations.js'

import { heightFtStart, heightFtEnd } from '../../constants/registerFormConstants.js'

export default {
  mixins: [mixinFormValidations, mixinUtils, mixinDataElements, mixinComputations],
  created () {
    this.createHeightList()
    this.createAgeFromToList()
  },
  mounted () {
    this.fetchList()
  },
  data () {
    return {
      ageFromToOptions: [],
      heightOptions: []
    }
  },
  methods: {
    ...mapMutations('search', ['setShowProgressBar', 'setExpand', 'setSearchParamsIndividual']),
    ...mapActions('search', ['saveSearchResults', 'fetchList']),

    showSearchMessage () {
      var searchMessage = ''

      if (this.hasValue(this.userDetailsIdFrom) && this.hasValue(this.userDetailsIdTo)) {
        searchMessage = `You are searching using profile ID range from <b><u>${this.userDetailsIdFrom}</u></b> to <b><u>${this.userDetailsIdTo}</u></b>`
      } else if (this.hasValue(this.userDetailsIdFrom) && !this.hasValue(this.userDetailsIdTo)) {
        searchMessage = `You are searching using all profile ID containing <b><u>${this.userDetailsIdFrom}</u></b> in it.`
      } else if (!this.hasValue(this.userDetailsIdFrom) && this.hasValue(this.userDetailsIdTo)) {
        searchMessage = `You are searching using all profile ID having <b><u>${this.userDetailsIdTo}</u></b> in it.`
      } else if (!this.hasValue(this.userDetailsIdFrom) && !this.hasValue(this.userDetailsIdTo)) {
        var brigeGroom = this.lookingFor === '1' ? 'Groom (Male)' : 'Bride (Female)'
        searchMessage = `You are searching using following parameters :  <br>
                <b><u> ${brigeGroom} </u></b> of  age from <b><u>${this.ageFromTo.min}</u></b> to <b><u>${this.ageFromTo.max}</u></b> and other criteria... `
      }
      this.$q.notify({
        icon: 'search',
        message: searchMessage,
        color: 'dark',
        multiLine: true,
        position: 'center',
        progress: true,
        type: 'ongoing',
        html: true,
        textColor: 'secondary',
        timeout: 1500
      })
    },
    async submitSearchForm () {
      this.setShowProgressBar(true)
      // console.log("showProgressBar", this.showProgressBar);
      await this.$refs.searchForm.validate().then(success => {
        if (success) {
          // console.log('Success', this.searchParams, this.$refs.searchForm)

          this.showSearchMessage()

          // convert height to Cms
          var heightFrom = this.searchParams.heightFrom
          if (!this.hasValue(heightFrom)) {
            heightFrom = heightFtStart + ' ft 0 inches'
          }
          var heightFromCms = this.convertHeightToCms(heightFrom)
          // this.searchParams['heightFromCms'] = heightFromCms
          this.setSearchParamsIndividual({ key: 'heightFromCms', value: heightFromCms })

          var heightTo = this.searchParams.heightTo
          if (!this.hasValue(heightTo)) {
            heightTo = heightFtEnd + ' ft 12 inches'
          }
          var heightToCms = this.convertHeightToCms(heightTo)
          // this.searchParams['heightToCms'] = heightToCms
          this.setSearchParamsIndividual({ key: 'heightToCms', value: heightToCms })

          this.fetchSearch(this.searchParams)
        } else {
          var error = 'Error in Search Form. Please correct it before proceeding.'
          this.showErrorDialog(error)
          this.setShowProgressBar(false)
        }
      })
    },

    fetchSearch (data) {
      return axios
        .post(process.env.API + '/search', data)
        .then(({ data }) => {
          // console.log('Search Success', data)
          this.saveSearchResults(data)
          // Store in Stores
          this.$q.notify({
            type: 'positive',
            message: 'Successfully search. Matching results are ' + data.length,
            position: 'top-right'

          })
        })
        .catch(error => {
          console.log('fetchSearch', error)
          this.showErrorDialog(error)
        })
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
    compareIdFromTo (userDetailsIdFrom, userDetailsIdTo) {
      if (userDetailsIdFrom && userDetailsIdTo) {
        return (userDetailsIdFrom <= userDetailsIdTo)
      } else {
        return true
      }
    },
    checkCountry (val) {
      // console.log("checkCountry", val, this.hasValue(val))
      if (this.hasValue(val)) {
        if (val.length === 0) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    }
  },
  computed: {
    ...mapState('search', ['showProgressBar', 'list', 'tmpData', 'searchPerformed', 'searchParams']),
    expand: {
      get () {
        return this.$store.state.search.expand
      },
      set (value) {
        this.setExpand(value)
      }
    },
    lookingFor: {
      get () {
        return this.searchParams.lookingFor
      },
      set (value) {
        this.setSearchParamsIndividual({
          key: 'lookingFor',
          value: value
        })
      }
    },
    ageFromTo: {
      get () {
        return this.searchParams.ageFromTo
      },
      set (value) {
        // console.log("ageFromTo value", value);
        this.setSearchParamsIndividual({
          key: 'ageFromTo',
          value: { min: value.min, max: value.max }
        })
      }
    },
    heightFrom: {
      get () {
        return this.searchParams.heightFrom
      },
      set (value) {
        this.setSearchParamsIndividual({ key: 'heightFrom', value: value })
      }
    },
    heightTo: {
      get () {
        return this.searchParams.heightTo
      },
      set (value) {
        this.setSearchParamsIndividual({ key: 'heightTo', value: value })
      }
    },
    maritalStatusPreference: {
      get () {
        return this.searchParams.maritalStatusPreference
      },
      set (value) {
        this.setSearchParamsIndividual({ key: 'maritalStatusPreference', value: value })
      }
    },
    country: {
      get () {
        return this.searchParams.country
      },
      set (value) {
        this.setSearchParamsIndividual({ key: 'country', value: value })
      }
    },
    searchUsingId: {
      get () {
        return this.searchParams.searchUsingId
      },
      set (value) {
        this.setSearchParamsIndividual({ key: 'searchUsingId', value: value })
      }
    },
    userDetailsIdFrom: {
      get () {
        return this.searchParams.userDetailsIdFrom
      },
      set (value) {
        this.setSearchParamsIndividual({ key: 'userDetailsIdFrom', value: value })
      }
    },
    userDetailsIdTo: {
      get () {
        return this.searchParams.userDetailsIdTo
      },
      set (value) {
        this.setSearchParamsIndividual({ key: 'userDetailsIdTo', value: value })
      }
    }
  }

}
</script>

<style>
</style>
