<template>
  <q-page padding class="flex">
    <register_update :updateProfile="true"/>
  </q-page>
</template>

<script>
export default {
  components: {
    register_update: require('components/Register_Update_old.vue').default
  }

}
</script>
