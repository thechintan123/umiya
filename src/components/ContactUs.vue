<template>
  <div class="fit column">
    <q-card bordered>
      <banner iconName="fas fa-phone-square-alt" bannerTitle="Contact Us" />
      <q-card-section>
        We have answered some of the Frequently asked questions in
        <router-link to="/help">Help/FAQ section.</router-link>
        <br />
        In case you still need to contact us, please see below options.
      </q-card-section>

      <q-expansion-item group="somegroup" expand-separator>
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon class="text-facebook-messenger" name="fab fa-facebook-messenger" />
          </q-item-section>

          <q-item-section>
            Facebook Messenger
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>
            Please send us message on Facebook Messenger by clicking on Icon.
            <q-img
              src="~assets/images/FB_Messenger_Click.png"
              width="80%"
              height="80%"
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item group="somegroup" expand-separator>
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon class="text-whatsapp" name="fab fa-whatsapp" />
          </q-item-section>

          <q-item-section>
            WhatsApp or Message Us
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>
            You can WhatsApp us on +91 97693 83174. <br />
            Please leave us a message and we will respond within 24 hours. Since
            we are doing a social service, please be aware that there can delay
            in responding.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item expand-separator group="somegroup">
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon color="secondary" name="far fa-envelope" />
          </q-item-section>

          <q-item-section>
            Email
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>
            You can email us on umiyamatrimony@gmail.com
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item expand-separator group="somegroup">
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon class="text-facebook" name="fab fa-facebook-square" />
          </q-item-section>

          <q-item-section>
            Facebook Like/Share
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>

          <iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&width=450&layout=standard&action=like&size=large&share=true&height=35&appId" width="450" height="35" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
          </iframe>
            <br>
            <br>

          <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fumiyamatrimony%2F&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="340" height="130" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>

          </q-card-section>
        </q-card>
      </q-expansion-item>
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
.text-facebook {
  color: #3b5998;
}

.text-whatsapp {
  color: #25D366;
}

.text-facebook-messenger {
  color: #0084ff;
}
</style>
