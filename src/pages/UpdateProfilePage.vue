<template>
  <q-page padding class="flex">
    <register_update :updateProfile="true"/>
  </q-page>
</template>

<script>
import mixinUtils from 'src/mixins/Mixin_Utils.js'

export default {
  mixins: [mixinUtils],

  components: {
    register_update: require('components/Register_Update.vue').default
  },
  beforeMount () {
    this.checkUserLoggedIn()
  }

}
</script>
