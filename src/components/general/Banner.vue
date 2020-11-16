<template>
      <q-banner
      rounded
      :class="isSuccess ? 'bg-dark q-ma-sm' : 'bg-dark q-mb-xs'">
        <template v-slot:avatar>
          <q-icon
            :name="iconName"
            color="primary"
          />
        </template>
                    {{bannerTitle}}
      </q-banner>
</template>

<script>
export default {
  props: {
    bannerTitle: String,
    iconName: String,
    isSuccess: {
      type: Boolean,
      default: false
    }
  }

}
</script>

<style>

</style>
