<template>
      <span>
        </span>
    <!-- <q-spinner
      class="z-top fixed-center"
      color="secondary"
      size="3em"
      :thickness="10"
      /> -->
</template>

<script>

export default {
  created () {
    this.$q.loading.show({
      spinnerColor: 'secondary',
      backgroundColor: 'dark',
      messageColor: 'secondary',
      spinnerSize: 100

    })
  },
  destroyed () {
    this.$q.loading.hide()
  }
}
</script>

<style>

</style>
