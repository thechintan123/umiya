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
      control-color="secondary"
      :fullscreen.sync="fullscreen"
        height="200px"
        class="bg-dark text-accent rounded-borders"

    >
          <q-carousel-slide name="first">
            <img class="fit" :src="'statics/photos/' + profileID + '.jpg'">
        </q-carousel-slide>
         <q-carousel-slide name="first1">
            <img class="fit" src="statics/photos/nature.jpg">
        </q-carousel-slide>
         <q-carousel-slide name="first2">
            <img class="fit" src="/api/uploads/1/ID1.jpg">
        </q-carousel-slide>
      <template v-slot:control>
        <q-carousel-control
          position="bottom-right"
          :offset="[18, 18]"
        >
          <q-btn
            push round dense color="white" text-color="primary"
            :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="fullscreen = !fullscreen"
          />
        </q-carousel-control>
      </template>
      </q-carousel>

</template>

<script>
export default {
  props: ['profileID'],
  data () {
    return {
      slide: 'first',
      fullscreen: false
    }
  }
}
</script>

<style>
@media screen and (max-width : 400px){
.my-photo {
width : 100px !important;
}
}
</style>
