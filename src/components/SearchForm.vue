<template>
  <div class="fit column">

    <q-card>

      <q-banner rounded dense class="bg-grey-3">
        <template v-slot:avatar>
          <q-icon name="search" color="primary" />
        </template>
        Search
      </q-banner>

      <q-card-section>

      <q-item>
        <q-item-section side>
          <p>Age : </p>
        </q-item-section>
        <q-item-section>
            <q-range
              v-model="searchParams.ageFromTo"
              :min="18"
              :max="50"
              label-always
            />
        </q-item-section>
      </q-item>

           <q-badge color="secondary">
                Age: {{ searchParams.ageFromTo.min }} to {{ searchParams.ageFromTo.max }}
            </q-badge>

            <div class="row">
              <div class="col">
                <q-select outlined v-model="searchParams.heightFrom" dense options-dense clearable label="Height(From)*" :options="heightOptions" :rules="[ val => !!val || 'Field is required']">
                </q-select>

              </div>
              <div class="col">
                <q-select outlined v-model="searchParams.heightTo" dense options-dense clearable label="Height(To)*" :options="heightOptions" :rules="[ val => !!val || 'Field is required' , val => checkHeightFromHeightTo(val) || 'Height(To) should be greater than Height(From).']">
                </q-select>
              </div>
            </div>

            <div class="row">
              <div class="col">
            <q-select v-model="searchParams.maritalStatusPreference"
             :options="martialOptions"
             outlined
             dense
             options-dense
             label="Marital Status*"
             :rules="[ val => !!val || 'Field is required']"
             multiple use-chips
             input-debounce="0"
             hint="Hint: Multiple Options can be selected" />
           </div>
           <div class="col">
               <q-select outlined v-model="searchParams.country"
               :options="countryOptions"
               dense
               options-dense
               label="Country"
               :rules="[ val => !!val || 'Field is required']" input-debounce="0"
               multiple use-chips
               clearable />
           </div>
           </div>
            <div class="row">

              <q-space />
              <q-btn color="primary" label="Search" @click="fetchSearchResults" />
            </div>

           </q-card-section>
    </q-card>
  </div>
</template>

<script>

import { countryList } from './countryList.js'

export default {
  created () {
    this.createHeightList()
    this.createAgeFromToList()
  },
  data () {
    return {
      ageFromToOptions: [],
      heightOptions: [],
      countryOptions: countryList,
      martialOptions: [
        'Never Married',
        'Divorced',
        'Widowed',
        'Awaiting Divorce'
      ],

      searchParams: {
        ageFromTo: {
          min: 20,
          max: 30
        },
        ageFromTo: {
          min: 20,
          max: 30
        },
        heightFrom: '',
        heightTo: '',
        maritalStatusPreference: [],
        country: ['India']
      }
    }
  },
  methods: {
    fetchSearchResults () {
      this.$emit('fetchSearchResults')
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
    }
  }
}
</script>

<style>
</style>
