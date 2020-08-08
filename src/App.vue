<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeCreate(){
    //console.log('Before Create', this.$store)
    this.$store.commit('auth/initialiseStore');
  }
}
</script>
