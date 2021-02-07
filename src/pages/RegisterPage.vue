<template>
  <q-page padding class="flex">
    <register_update :updateProfile="false"/>
  </q-page>
</template>

<script>
import { productName } from '../../package.json'

export default {
  components: {
    register_update: require('components/Register_Update.vue').default
    }
  ,
  meta : {
    // sets document title
    title: productName + ' | Register FREE',
    meta: {
      description: { name: 'description', content: 'FREE Registration on Website. It is Easy and Quick.' },
      // keywords: { name: 'keywords', content: 'Quasar website' },
      // equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
    }
  }
}
</script>
