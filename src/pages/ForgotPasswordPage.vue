<template>
  <q-page padding>
      <forgot-password />
  </q-page>
</template>

<script>
export default {
  components: {
    'forgot-password': require('components/ForgotPassword.vue').default
  }
}
</script>

<style scoped>
</style>
