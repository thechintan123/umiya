<template>
  <!--
        <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="secondary"
        navigation
        arrows
        height="200px"
        class="bg-dark text-accent rounded-borders"
              :fullscreen.sync="fullscreen"
     >
  -->
  <q-carousel
    animated
    v-model="slide"
    arrows
    navigation
    infinite
    control-color="primary"
    height="200px"
    class="text-primary rounded-borders"
    transition-prev="slide-right"
    transition-next="slide-left"
  >
    <q-carousel-slide class="no-padding" v-for="(photo,index) in photos" :key="index" :name="index">
      <img class="fit" :src="computeURL(photo)" />
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
export default {
  props: ["profileID", "photos"],
  data() {
    return {
      slide: 0,
      fullscreen: false,
      imageURL: process.env.API + "/upload/",
    };
  },
  computed: {
    computeURL() {
      return (photo) => this.imageURL + this.profileID + "/" + photo;
    },
  },
};
</script>

<style>
@media screen and (max-width: 400px) {
  .my-photo {
    width: 100px !important;
  }
}
</style>
