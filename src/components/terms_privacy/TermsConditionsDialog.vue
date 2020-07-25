<template>
  <div class="q-pt-sm">
    <q-btn
      label="Click for Terms & Privacy Policy"
      flat
      color="secondary"
      @click="termsDialog = true"
    />
    <q-dialog v-model="termsDialog">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>Terms & Conditions</q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-splitter class="q-mt-xl" v-model="splitterModel">
          <template v-slot:before>
            <div class="q-pa-md">
              <q-tree
                :nodes="simple"
                node-key="label"
                selected-color="primary"
                :selected.sync="selected"
                default-expand-all
              />
            </div>
          </template>

          <template v-slot:after>
            <q-tab-panels
              v-model="selected"
              animated
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel name="Terms & Conditions">
                <terms />
              </q-tab-panel>

              <q-tab-panel name="Privacy">
                <privacy />
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
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
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!",
      splitterModel: 40,
      selected: "Terms & Conditions",
      simple: [
        {
          label: "Details",
          selectable: false,
          children: [
            {
              label: "Terms & Conditions",
              icon: "settings"
            },
            {
              label: "Privacy",
              icon: "rss_feed"
            }
          ]
        }
      ]
    };
  },
  computed: {
    contentSize() {
      return this.moreContent ? 150 : 5;
    }
  },
  components: {
    terms: require("./Terms.vue").default,
    privacy: require("./Privacy.vue").default
  }
};
</script>

<style>
</style>