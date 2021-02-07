<template>
  <q-page padding>
      <help/>
  </q-page>
</template>

<script>
import { productName } from '../../package.json'

export default {
  components: {
    help: require('components/Help.vue').default
  },
  meta: {
    // sets document title
    title: productName + ' | Help/FAQ',
    meta: {
      description: { name: 'description', content: 'Check out Frequently asked questions.' }
      // keywords: { name: 'keywords', content: 'Quasar website' },
      // equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
    }
  }
}
</script>

<style scoped>
</style>
