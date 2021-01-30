<template>
  <div>
      <a :href="link" target="_blank">
    <q-icon
      name="fab fa-facebook-messenger"
      class="facebook-chat circle cursor-pointer"
      v-if="visible"
    />
    </a>
  </div>
</template>

<script>
import { Platform } from 'quasar'

export default {
  data () {
    return {
      visible: Platform.is.cordova,
      link: process.env.URL + '/contact-us?openFacebook=true'
    }
  },
  created () {
    // console.log("Platform.is.cordova", Platform.is.cordova);
  }
}
</script>

<style scoped>
.facebook-chat {
  /* bottom: 68px; */
  bottom: 25px;
  position: fixed;
  /* width: 20px;
  height: 24px; */
  z-index: 2147483645;
  /* border-radius: 0; */
  /* background: #fff; */
  /* left: 67px; */
  left: 25px;
  color: #FFF;
  font-size: 40px;
}

.circle {
    border: 2px solid #0078FF;
    background-color: #0078FF;
    height: 60px;
    border-radius:50%;
    width: 60px;
}
</style>
