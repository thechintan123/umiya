<template>
  <div>
    <q-layout view="lHh lpr lff">
      <q-header>
        <q-toolbar>
          <q-btn flat round dense icon="menu" class="q-mr-sm" />
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>

          <q-toolbar-title>Umiya Matrimony</q-toolbar-title>

        </q-toolbar>
      </q-header>

      <q-footer>
        <q-toolbar>
          <q-toolbar-title>Footer</q-toolbar-title>
        </q-toolbar>
      </q-footer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      left: false
    }
  }
}
</script>
