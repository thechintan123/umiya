<template>
  <q-page padding class="flex">
      <changePassword/>
    </q-page>
</template>

<script>
import axios from "axios";
export default {
  components: {
    changePassword: require("components/ChangePassword.vue").default,
  }

};
</script>