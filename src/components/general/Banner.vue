<template>
      <q-banner class="bg-grey-3 q-mb-xs">
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
  props: ['bannerTitle', 'iconName']

}
</script>

<style>

</style>
