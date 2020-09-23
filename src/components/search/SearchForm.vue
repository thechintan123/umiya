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
              <!-- <banner
        iconName="search"
        bannerTitle="Search"
      /> -->
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
              Search
          </q-item-section>


        </template>
        <q-card-section>
          <q-item>
            <q-item-section side>Looking for :</q-item-section>
            <q-item-section>
              <q-btn-toggle
                v-model="lookingFor"
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
              <q-range v-model="ageFromTo" :min="18" :max="50" label-always />
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
                outlined
                v-model="heightFrom"
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
                v-model="heightTo"
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
                :rules="[val => checkCountry(val) || 'Field is required']"
                input-debounce="0"
                clearable
                use-chips
                multiple
                hint="Hint: Multiple Options can be selected"

              />

            </div>
          </div>
          <div class="row">
            <q-space />
            <q-btn color="primary" label="Search" @click="submitSearchForm" />
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

import { heightFtStart, heightFtEnd} from '../../constants/registerFormConstants.js'

export default {
  mixins: [mixinFormValidations, mixinUtils,mixinDataElements,mixinComputations],
  created () {
    this.createHeightList()
    this.createAgeFromToList()
  },
  mounted () {
      this.fetchList();
  },
  data () {
    return {

      ageFromToOptions: [],
      heightOptions: []

    }
  },
  components: {
    banner: require('../general/Banner.vue').default
  },
  methods: {
    ...mapMutations('search', ['setShowProgessBar','setExpand','setSearchParamsIndividual']),
    ...mapActions('search', ['saveSearchResults','fetchList']),

    async submitSearchForm () {
      this.setShowProgessBar(true);
      // console.log("showProgressBar", this.showProgressBar);
      await this.$refs.searchForm.validate().then(success => {
        if (success) {
          console.log('Success', this.searchParams, this.$refs.searchForm)

          //convert height to Cms
          var heightFrom = this.searchParams.heightFrom;
          if(!this.hasValue(heightFrom)){
            heightFrom =  heightFtStart+" ft 0 inches"
          }
          var heightFromCms = this.convertHeightToCms(heightFrom)
          // this.searchParams['heightFromCms'] = heightFromCms
          this.setSearchParamsIndividual({ key: 'heightFromCms', value: heightFromCms })

          var heightTo = this.searchParams.heightTo;
          if(!this.hasValue(heightTo)){
            heightTo =  heightFtEnd+" ft 12 inches"
          }
          var heightToCms = this.convertHeightToCms(heightTo)
          // this.searchParams['heightToCms'] = heightToCms
          this.setSearchParamsIndividual({ key: 'heightToCms', value: heightToCms })


          this.fetchSearch(this.searchParams)
 
        } else {
          var error = "Error in Search Form. Please correct it before proceeding."
          this.showErrorDialog(error);
          this.setShowProgessBar(false);

        }
      })



    },

    fetchSearch (data) {
      return axios
        .post(process.env.API + '/search', data)
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
          console.log("fetchSearch",error)
          this.showErrorDialog(error)
        })
    }
,
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
      // console.log("checkCountry", val, this.hasValue(val))
      if (this.hasValue(val)){
        if(val.length === 0) {
        return false
      } else {
        return true
      }
    }else{
       return false
    }
  }
  },
  computed: {
    ...mapState('search', ['showProgressBar','list','tmpData','searchPerformed','searchParams']),
    expand :{
      get () {
        return this.$store.state.search.expand
      },
      set (value) {
        this.setExpand(value)
      }
    }
    ,
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
          value: {min: value.min , max: value.max}
        })
      }
    },
    heightFrom :{
            get () {
        return this.searchParams.heightFrom
      },
      set (value) {
        this.setSearchParamsIndividual({ key: 'heightFrom', value: value })
      }
    }
    ,
    heightTo :{
            get () {
        return this.searchParams.heightTo
      },
      set (value) {
        this.setSearchParamsIndividual({ key: 'heightTo', value: value })
      }
    }
    ,
    maritalStatusPreference :{
      get () {
        return this.searchParams.maritalStatusPreference
      },
      set (value) {
        this.setSearchParamsIndividual({ key: 'maritalStatusPreference', value: value })
      }  
    }
    ,
    country :{
      get () {
        return this.searchParams.country
      },
      set (value) {
        this.setSearchParamsIndividual({ key: 'country', value: value })
      }      
    }
    ,

  }
  ,

}
</script>

<style>
</style>
