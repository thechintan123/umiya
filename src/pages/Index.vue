<template>
  <q-page padding>
    <div class="flex flex-center row">
      <div class="rounded-borders col-md-10 col-12">
        <q-carousel
          swipeable
          transition-prev="slide-right"
          transition-next="slide-left"
          arrows
          animated
          v-model="slide"
          infinite
          control-color="primary"
          padding
          navigation
          :autoplay="2500"
          class="my-carousel bg-secondary"
        >
          <!--
      style="height:30vw"

          <q-carousel
      animated
      v-model="slide"
      arrows
      navigation
      infinite
      control-color="secondary"
      :fullscreen.sync="fullscreen"
        class="bg-dark text-accent rounded-borders"
        height="500px"

    >
    src="~assets/logos/LogoMakr_Ring_RED.png"
          -->

          <q-carousel-slide :name="1" img-src="~assets/images/Success.jpg">
            <div class="absolute-bottom-left custom-caption text-primary">
              <div class="text-h2 my-style">Success Story</div>
              <div class="text-subtitle1">Chetan and Dhara</div>
            </div>
          </q-carousel-slide>

          <q-carousel-slide :name="5" img-src="~assets/images/Wedding.jpg">
            <div class="absolute-bottom-left custom-caption text-primary">
              <div class="text-h2 my-style">It's Free</div>
              <div class="text-subtitle1">200+ Profiles</div>
            </div>
          </q-carousel-slide>

          <q-carousel-slide :name="2" img-src="~assets/images/UmiyaMataji.jpg">
            <div class="absolute-bottom-left custom-caption text-primary">
              <div class="text-h2 my-style">For Samaj</div>
              <div class="text-subtitle1">Only for Kutch Kadva Patidar Sanatan Samaj</div>
            </div>
          </q-carousel-slide>

          <q-carousel-slide :name="3" img-src="~assets/images/Validate1.jpg">
            <div class="absolute-bottom-left custom-caption text-primary">
              <div class="text-h2 my-style">We Verify</div>
              <div class="text-subtitle1">No Fake. We verify ID proof.</div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="4" img-src="~assets/images/Wedding2.jpg">
            <div class="absolute-bottom-left text-center custom-caption text-primary">
              <div class="text-h2 my-style">Join Now</div>
              <div class="text-subtitle1">Register FREE</div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>

    <div class="flex flex-center q-pa-md row q-gutter-x-xl q-gutter-y-xl">

     <q-card
      flat bordered class="my-card cursor-pointer" @click="register()" align="center" key="card1"
      data-aos="zoom-in-up">
        <q-card-section class="bg-dark">
          <q-icon name="far fa-edit" class="text-secondary" style="font-size: 3rem;" />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="text-h6">Register FREE & EASY</div>
          <div class="text-subtitle1">Only Basic Details. No Bank Details Required.</div>
          <q-btn class="glossy" to="/register" color="secondary" style="width: 100%">Click HERE</q-btn>
        </q-card-section>
      </q-card>

      <q-card
       flat bordered class="my-card" align="center" data-aos="zoom-in-up">
        <q-card-section class="bg-dark">
          <q-icon name="phone_android" class="text-secondary" style="font-size: 3rem;" />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="text-h6">Free & Easy Mobile App</div>
          <!-- <div class="text-subtitle1">Free and Easy to use Android App available</div> -->
          <a href="https://play.google.com/store/apps/details?id=com.umiyamatrimony.app" target="_blank">
          <q-img
          src="~assets/images/Download_Android_App.svg"
          :ratio="1"
          style="max-width: 250px; height: 90px;"
          contain
                  />
          </a>
        </q-card-section>
      </q-card>

    </div>
    <div
    class="flex flex-center q-pa-md row q-gutter-x-xl q-gutter-y-xl">
      <q-card flat bordered class="my-card" align="center" data-aos="zoom-in-up">
        <q-card-section class="bg-dark">
          <q-icon name="fas fa-user-lock" class="text-secondary" style="font-size: 3rem;" />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="text-h6">100% Secure</div>
          <div
            class="text-subtitle1"
          >Your details are secured. It is not shared with any other website.</div>
        </q-card-section>
      </q-card>

      <q-card
      flat bordered class="my-card" align="center" data-aos="zoom-in-up">
        <q-card-section class="bg-dark">
          <q-icon name="fas fa-user-check" class="text-secondary" style="font-size: 3rem;" />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="text-h6">User Verified</div>
          <div
            class="text-subtitle1"
          >User needs to register with one ID Proof. We ensure that profile is genuine and not fake.</div>
        </q-card-section>
      </q-card>

      <q-card
      flat bordered class="my-card" align="center" data-aos="zoom-in-up">
        <q-card-section class="bg-dark">
          <q-icon name="fas fa-search" class="text-secondary" style="font-size: 3rem;" />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="text-h6">Easy Search</div>
          <div class="text-subtitle1">Easy Search based on Age, Health and Country.</div>
        </q-card-section>
      </q-card>

      <q-card
      flat bordered class="my-card" align="center" data-aos="zoom-in-up">
        <q-card-section class="bg-dark">
          <q-icon name="fas fa-ban" class="text-secondary" style="font-size: 3rem;" />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="text-h6">Restricted</div>
          <div class="text-subtitle1">Only for Kucth Kadva Patidar Sanatan Samaj Only</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import AOS from 'aos'
import 'aos/dist/aos.css'

import { productName, description } from '../../package.json'

AOS.init({
  duration: 1200,
  easing: 'linear'
})

export default {
  name: 'PageIndex',
  data () {
    return {
      slide: 1,
      cardDetails: [
        {
          icon: 'fas fa-search',
          title: 'Easy Search',
          subtitle: 'Easy Search based on Age, Health and Country.'
        },
        {
          icon: 'fas fa-search',
          title: 'Easy Search',
          subtitle: 'Easy Search based on Age, Health and Country.'
        },
        {
          icon: 'fas fa-search',
          title: 'Easy Search',
          subtitle: 'Easy Search based on Age, Health and Country.'
        }
      ]
    }
  },
  methods: {
    register () {
      console.log('Register')
      this.$router.push('register')
    }
  },
  meta: {
    // sets document title
    // title: 'UmiyaMatrimony.com - Free Matrimonial for KKP',
    title: productName + ' - Free matrimonial website for KKP',
    // // optional; sets final title as "Index Page - My Website", useful for multiple level meta
    // titleTemplate: title => `${title} - Welcome`,
    // meta tags
    meta: {
      description: { name: 'description', content: description }
      // description: { name: 'description', content: 'It is FREE Matrimonial website for Kutch Kadva Patidar Sanatan Samaj. It is completely online and it is self register and self search.' },
      // keywords: { name: 'keywords', content: 'Quasar website' },
      // equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
    }
  }
}

</script>

<style>
.custom-caption {
  text-align: center;
  padding: 5px;
  color: white;
  background-color: rgba(
    214,
    52,
    71,
    0.4
  ); /*/* $secondary : #d63447;- This is secondary color*/
  /*background-color :  #d63447; */ /* $primary   : #ffd31d; */ /* $secondary : #d63447;*/
  /*opacity: 0.1;*/
}

.my-card {
  width: 100%;
  max-width: 420px;
  height: 220px;
  /*transition: width 0.5s;*/
  transition: transform 0.2s !important;
}

.my-card:hover {
  /*max-width: 425px;*/
  /* border-color: #d63447; */ /*$secondary : #d63447;*/
  transform: scale(1.1) !important;
}

.my-carousel {
  height: 30vw;
  min-height: 300px;
}

.my-style {
  font-family: "Great Vibes", cursive;
}

* {
  box-sizing: border-box;
}
</style>
