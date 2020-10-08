<template>
  <q-page padding>
      <adminUpdateProfile/>
  </q-page>
</template>

<script>
import mixinUtils from 'src/mixins/Mixin_Utils.js'

export default {
  mixins : [mixinUtils],

  components: {
    adminUpdateProfile: require('components/AdminUpdateProfile.vue').default
  }
,
  beforeMount(){
    this.checkUserLoggedIn('admin')
  }
}
</script>

<style scoped>
</style>
