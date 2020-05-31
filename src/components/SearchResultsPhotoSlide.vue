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
            :fullscreen.sync="fullscreen"
      >
      -->
          <q-carousel
      animated
      v-model="slide"
      arrows
      navigation
      infinite
      :fullscreen.sync="fullscreen"
        height="200px"
        class="bg-dark text-accent rounded-borders"

    >
        <q-carousel-slide name="first" class="column no-wrap flex-center">
            <img style="max-width:200px;max-height:200px" :src="'statics/photos/' + profileID + '.jpg'">
        </q-carousel-slide>
        <q-carousel-slide name="second" class="column no-wrap flex-center">
            <img style="max-width:200px;max-height:200px" src="statics/photos/nature.jpg">
        </q-carousel-slide>
      </q-carousel>

</template>

<script>
export default {
props: ['profileID']
,
data(){
return {
slide : 'first',
fullscreen : false
}
}
}
</script>

<style>
</style>
