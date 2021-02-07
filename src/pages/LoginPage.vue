<template>
  <q-page padding>
      <login/>
  </q-page>
</template>

<script>
import { productName } from '../../package.json'

export default {
  components: {
    login: require('components/Login.vue').default
  }
  ,
  meta : {
    // sets document title
    title: productName +' | Login',
    meta: {
      description: { name: 'description', content: 'Login into website.' },
      // keywords: { name: 'keywords', content: 'Quasar website' },
      // equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
    }
  }  
}
</script>

<style scoped>
</style>
