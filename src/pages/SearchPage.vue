<template>
  <q-page padding class="flex">
    <search/>
  </q-page>
</template>

<script>
import { productName } from '../../package.json'

export default {
  components: {
    search: require('components/Search.vue').default
  }
  ,
  meta : {
    // sets document title
    title: productName + ' | Search',
    meta: {
      description: { name: 'description', content: 'Self Search for your life partner.' },
      // keywords: { name: 'keywords', content: 'Quasar website' },
      // equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
    }
  }
  }
</script>
