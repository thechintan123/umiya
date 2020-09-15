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
    :arrows="photos.length > 1"
    :navigation="photos.length > 1"
    infinite
    control-color="primary"
    height="200px"
    class="bg-grey-1 text-primary rounded-borders"
    transition-prev="slide-right"
    transition-next="slide-left"
    v-if="photos.length >= 1"
  >
    <q-carousel-slide class="no-padding" v-for="(photo,index) in photos" :key="index" :name="index">
      <q-img class="fit" :src="computeURL(photo)">
        <template v-slot:error>
          <!-- <div class="absolute-full flex flex-center bg-negative text-white">Cannot load image</div> -->
          <q-img height="200px" class="bg-dark rounded-borders" :src="avatarURL" contain />
        </template>
      </q-img>
    </q-carousel-slide>
  </q-carousel>

  <q-img v-else height="200px" class="bg-dark rounded-borders" :src="avatarURL" contain />
</template>

<script>
export default {
  props: ['profileID', 'photos', 'gender'],
  data () {
    return {
      slide: 0,
      fullscreen: false,
      imageURL: process.env.API + '/photos/'
    }
  },
  computed: {
    computeURL () {
      console.log("photo")
      return (photo) => this.imageURL + this.profileID + '/' + photo
    },
    avatarURL () {
      // console.log("Gender", this.gender);
      if (this.gender === 'Male') {
        return 'statics/avatars/male1.png'
      } else {
        return 'statics/avatars/female1.png'
      }
    },
    checkPhotos () {
      // console.log("checkPhotos", this.photos.length);
      if (this.photos.length > 1) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style>
</style>
