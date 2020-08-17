<template>
  <q-page padding class="flex">
    <h5>Update Profile Page</h5>
    <register :updateProfile="true"/>
  </q-page>
</template>

<script>
import axios from 'axios'
export default {
  components: {
    register: require('components/Register_2.vue').default
  },
  data () {
    return {
      // form fields
      userDetail: {}
    }
  },
  async created () {
    console.log('created - UpdateProfilePage')
    this.getUserDetail()
  },
  methods: {
    async getUserDetail () {
      var user = JSON.parse(localStorage.getItem('user'))
      // console.log(JSON.parse(localStorage.getItem("user")));
      // var keysArray = Object.keys(user);
      // console.log(typeof user, user, user.email, user.user_details_id);
      if (user !== null) {
        var profile_id = user.user_details_id
        await this.getUserDetail_DB(profile_id)
      }
    },
    getUserDetail_DB (profile_id) {

    }

  }
}
</script>
