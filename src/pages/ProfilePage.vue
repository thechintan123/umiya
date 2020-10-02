<template>
  <q-page padding class="flex">
    <profile/>
    </q-page>
</template>

<script>
import mixinUtils from 'src/mixins/Mixin_Utils.js'

export default {
    mixins : [mixinUtils],

  components: {
    profile: require('components/Profile.vue').default
  }
  ,
  beforeMount(){
    this.checkUserLoggedIn()
  }
}
</script>
