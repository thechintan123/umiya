<template>
  <div id="q-app">
    <router-view />
    <shareButton/>

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
    shareButton: require('components/general/ShareButton.vue').default
  }
}
</script>

<style>

</style>
