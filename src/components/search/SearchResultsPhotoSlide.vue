<template>


  <q-carousel
    animated
    v-model="slide"
    :arrows="photos.length > 1"
    :navigation="photos.length > 1"
    infinite
    control-color="primary"
    class="bg-dark my-image-center text-primary rounded-borders my-max-width"
    transition-prev="slide-right"
    transition-next="slide-left"
    v-if="photos.length >= 1"
    height="200px"
    :fullscreen.sync="fullscreen"
    >
  
    <q-carousel-slide class="no-padding" v-for="(photo,index) in photos" :key="index" :name="index">
       <q-img class="my-image-contain" :src="computeURL(photo)" contain>
        <template v-slot:error>
          <!-- <div class="absolute-full flex flex-center bg-negative text-white">Cannot load image</div> height="200px"-->
          <q-img class="my-image-center bg-dark rounded-borders my-max-width my-image-contain" :src="avatarURL" contain/> 
        </template>
      </q-img>
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
         <q-img v-else  class="bg-dark rounded-borders my-max-width my-image-center" height="200px" :src="avatarURL" contain />

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
      // console.log('photo')
      return (photo) => this.imageURL + this.profileID + '/' + photo
    },
    avatarURL () {
      // console.log("Gender", this.gender);
      if (this.gender.name === 'Male') {
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

<style scoped>
           .my-image-contain { 
                width:100% !important;
                max-width: 100% !important;
                height: 100% !important;
                object-fit: contain !important;
                /* height:auto;  */
            }

            .my-image-center{
                display: block;
                margin-left: auto;
                margin-right: auto;
            }

            .my-max-width{
              max-width : 500px !important;
              width : 100 % !important;

            }

@media screen and (max-width: 500px) {
  .my-style2{
    height : 100px !important;
    width: 100px !important;
    /* object-fit: contain !important;
    width : 100px !important; */
  }
}            
</style>
