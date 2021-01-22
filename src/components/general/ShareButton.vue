<template>

<div class="share-btn-container">

<q-icon name="fas fa-share-alt" class="text-white"/>

<a :href="whatsappShare">
  <q-icon name="fab fa-whatsapp" class="text-white"/>
</a>

<!-- <a :href="messengerShare">
  <i class="fab fa-facebook-messenger"></i>
</a>

<a :href="smsShare">
  <i class="fas fa-sms"></i>
</a> -->
        <q-tooltip content-class="bg-secondary" :offset="[10, 10]"
        anchor="center left" self="center right" >
          Thanks for sharing our FREE website on WhatsApp.<br>
          Spread the awareness!!
        </q-tooltip>

</div>
<!-- Custom Sharing Script- END -->
</template>

<script>

export default {
  data () {
    return {
      postTitle: encodeURI('Hi! Please check this FREE matrimony website for our KKP community.\n*Features*\n - It is *FREE* \n - It is only for KKP \n - Completely online(Easy website) \n Please spread the awareness.'),
      postUrl: encodeURI(document.location.href)
    }
  },
  computed: {
    facebookShare () {
      return 'https://www.facebook.com/sharer.php?u=' + this.postUrl
    },
    whatsappShare () {
      return 'https://api.whatsapp.com/send?text=' + this.postUrl + '%0a %0a' + this.postTitle
    },
    smsShare () {
      // sms:{phone_number}?body={url}{text}
      //    sms:mobilenumber?body=message
      return 'sms:?body=' + this.postUrl + '\n ' + this.postTitle
    },
    messengerShare () {
      return 'fb-messenger://share?link=' + this.postUrl + '& message=' + this.postTitle
    }
    /*
    fb-messenger://share?link=external-link&app_id=appid
    fb://profile/fb-id
    fb://page/page-id
*/

  }
}
</script>

<style>
/* Share button */
.share-btn-container{
    background :  #25d366;
    display: flex;
    flex-direction: column;
    padding: 5px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    position: fixed;
    top: 80%;
    right: 0;
    transform: translateY(-50%);
    border-radius: 25px 0px 0px 25px;

}

.share-btn-container{
  font-size : 25px;
}

 .share-btn-container a {
  /* margin : 5px 0;  */
  transition: 500ms;
  text-decoration: none !important;
}

 .share-btn-container a:hover {
transform: scale(1.4)
}

</style>
