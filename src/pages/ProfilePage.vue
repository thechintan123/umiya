<template>
  <q-page padding class="flex">
    <profile/>
    </q-page>
</template>

<script>
export default {
  components: {
    profile: require("components/Profile.vue").default,
  }
};
</script>