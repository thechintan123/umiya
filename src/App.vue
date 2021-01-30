<template>
  <div id="q-app">
    <router-view />
    <shareButton/>
    <facebookChatButton/>

  </div>

</template>

<script>
export default {
  name: 'App',
  beforeCreate () {
    // console.log('Before Create', this.$store)
    this.$store.commit('auth/initialiseStore')
  },
  components: {
    shareButton: require('components/general/ShareButton.vue').default,
    facebookChatButton: require('components/general/FacebookChatButton.vue').default
  }
}
</script>

<style>

</style>
