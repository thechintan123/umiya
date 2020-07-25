<template>
  <div class="q-pt-sm">
    <q-btn label="Click for Terms & Conditions" flat color="secondary" @click="termsDialog = true" />
    <q-dialog v-model="termsDialog">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>Header</q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-page-container>
          <terms />
        </q-page-container>
      </q-layout>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      termsDialog: false,
      moreContent: true,

      lorem:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!"
    };
  },
  computed: {
    contentSize() {
      return this.moreContent ? 150 : 5;
    }
  },
  components: {
    terms: require("./Terms.vue").default
  }
};
</script>

<style>
</style>