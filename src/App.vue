<template>
  <div id="q-app">
    <router-view />
    <shareButton/>
    <facebookChatButton/>

  </div>

</template>

<script>
import { Platform } from 'quasar'
import { productName, description } from '../package.json'
import fcm from './utils/fcm'

export default {
  name: 'App',
  beforeCreate () {
    // console.log('Before Create', this.$store)
    this.$store.commit('auth/initialiseStore')
  },
  components: {
    shareButton: require('components/general/ShareButton.vue').default,
    facebookChatButton: require('components/general/FacebookChatButton.vue').default
  },
  meta: {
    // sets document title
    title: productName + ' - Free Matrimony wesbite for KKP',
    meta: {
      description: { name: 'description', content: description }
      // keywords: { name: 'keywords', content: 'Quasar website' },
      // equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
    }
  },
  mounted() {
    if (Platform.is.cordova) {
      fcm.init()
    }
  }
}
</script>

<style>

</style>
