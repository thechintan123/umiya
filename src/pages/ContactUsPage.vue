<template>
  <q-page padding>
      <contactUs/>
  </q-page>
</template>

<script>
import { productName } from '../../package.json'

export default {
  components: {
    contactUs: require('components/contactUs.vue').default
  }
  ,
  meta : {
    // sets document title
    title: productName + ' | Contact us',
    meta: {
      description: { name: 'description', content: 'Contact us through Facebook Messenger or other mediums.' },
      // keywords: { name: 'keywords', content: 'Quasar website' },
      // equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
    }
  }
}
</script>

<style scoped>
</style>
