<template>
  <q-page padding>
      <adminApproval/>
  </q-page>
</template>

<script>
import mixinUtils from 'src/mixins/Mixin_Utils.js'

export default {
  mixins : [mixinUtils],

  components: {
    adminApproval: require('components/AdminApproval.vue').default
  }
,
  beforeMount(){
    this.checkUserLoggedIn('admin')
  }
}
</script>

<style scoped>
</style>
