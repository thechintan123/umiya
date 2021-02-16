<template>
  <div class="fit column">
    <q-card bordered>
      <banner iconName="fas fa-mobile-alt" bannerTitle="Get Android App" />
      <q-card-section>
       You can also use our Android App. It is Free and Easy to use.
       <br>
       Click on button below to download from Google play store.
        <br />
          <a href="https://play.google.com/store/apps/details?id=com.umiyamatrimony.app" target="_blank">
          <q-img
          src="~assets/images/Google-Play-Badge.png"
          :ratio="1"
          style="max-width: 150px; height: 75px;"
          contain
                  />
          </a>        
      </q-card-section> 
    </q-card>
  </div>
</template>

<script>
export default {
  components: {
    banner: require('./general/Banner.vue').default
  }
}
</script>

<style scoped>
</style>
