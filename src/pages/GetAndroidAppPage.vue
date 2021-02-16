<template>
  <q-page padding>
    <getAndroidApp/>
  </q-page>
</template>

<script>
import { productName } from '../../package.json'

export default {
  components: {
    getAndroidApp: require('components/getAndroidApp.vue').default
  },
  meta: {
    // sets document title
    title: productName + ' | Get Android App',
    meta: {
      description: { name: 'description', content: 'Get Android App. It is free and easy to use.' }

    }
  }
}
</script>

<style scoped>
</style>
