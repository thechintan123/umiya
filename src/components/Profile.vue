<template>
  <div class="fit column">
   <q-linear-progress v-show="showProgressBar" indeterminate size="10px" color="secondary" />
      <q-spinner
        v-show="showProgressBar"
        class="z-top fixed-center"
        color="secondary"
        size="3em"
        :thickness="10"
      />
    <q-card v-if="showfield">

        <q-banner rounded dense class="bg-grey-3">
          <template v-slot:avatar>
            <q-icon name="assignment_ind" color="primary" />
          </template>
          Welcome!!!
        </q-banner>

        <q-card-section>
          <q-item>
              <q-item-label class="text-h6 text-capitalize">Welcome, {{ userDetail.firstName }} {{ userDetail.lastName }}</q-item-label>
            </q-item>
          <q-item dense>
              <q-item-label>Your Profile ID is  <b>{{ userDetail.id }}</b> </q-item-label>
          </q-item>
          <q-item>

            <q-item-section>
              <q-item-label>Your Email is <b> {{ userDetail.email }}</b> </q-item-label>
               <q-item-label caption>
                  All notifications from UmiyaMatrimony.com will be sent to this email.
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>

            <q-item-section>
              <q-item-label>Your Profile Status is  <b>{{ userDetail.status.name }} </b>
              <q-icon class="vertical-middle no-padding no-margin" :name="getIcon" color="primary" size="lg"/>
              </q-item-label>
              <q-item-label caption :lines="3">
                {{getProfileStatusMessage}}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Your Primary Contact is  <b>{{ userDetail.primaryContact }} </b> </q-item-label>
              <q-item-label caption :lines="2">
                You will be contacted by other party on this contact number.
                Please ensure to keep your contact number active.
              </q-item-label>
            </q-item-section>
          </q-item>

        </q-card-section>

    </q-card>
  </div>
</template>

<script>
import axios from 'axios'
import { showErrorMessage } from 'src/utils/show-error-message'

export default {

  data () {
    return {
      // To show Progress bar when loading
      showProgressBar: true,
      showfield: false,
      userDetail: { }

    }
  },
  computed: {
    getIcon () {
      const status = this.userDetail.status.name
      if (status === 'Registered') {
        return 'keyboard'
      } else if (status === 'Approved') {
        return 'verified_user'
      } else if (status === 'Correction') {
        return 'feedback'
      } else if (status === 'Deactivated') {
        return 'visibility_off'
      } else {
        return ''
      }
    },
    getProfileStatusMessage () {
      const status = this.userDetail.status.name
      if (status === 'Registered') {
        return 'NEXT STEP > Admin team will approve your profile.Once approved, you can search and contact the other profiles.'
      } else if (status === 'Approved') {
        return 'NEXT STEP > You can search and contact the other profiles.'
      } else if (status === 'Correction') {
        return 'NEXT STEP > We have sent an email for correction steps. Please ensure that your name and date of birth matches to that in your ID Proof. Please correct your profile so that we can verify and approve.'
      } else if (status === 'Deactivated') {
        return 'NEXT STEP > We have deactivated your profile. Please contact us to Activate your profile. If your profile will be deactivated for long, we will delete your profile completely.'
      } else {
        return ''
      }
    }

  },
  mounted () {
    // console.log("mounted")
    this.showProgressBar = true
    var user = JSON.parse(localStorage.getItem('user'))
    // var userDetail
    // console.log(JSON.parse(localStorage.getItem("user")));
    // console.log(typeof user, user);
    if (user !== null) {
      var userDetailsId = user.user_details_id
      // user_details_id is same profile_Id share on UI
      axios.get(process.env.API + '/users/' + userDetailsId)
        .then(({ data }) => {
        // console.log("data", data, data.first_name);

          // this code replaces key in data Object from Snake Case to Camel Case
          this.userDetail = JSON.parse(JSON.stringify(data).replace(
            /(_\w)\w+":/g,
            match => match[1].toUpperCase() + match.substring(2)
          ))
          // console.log("userDetail", this.userDetail);
          this.showfield = true
          this.showProgressBar = false
        }).catch((error) => {
          let errMsg = ''
          if ('message' in error.response.data) {
            // errMsg = error.response.data.error + " - " + error.response.data.message;
            errMsg = error.response.data.message
          } else {
            errMsg = error.response.data.error
          }
          showErrorMessage(errMsg)
          // console.log('uploadImage - Error - Error Message', errMsg)
        })
    } else {
      this.$q.notify({
        type: 'negative',
        multiLine: true,

        message: 'You need to login to access this page.You are redirected to Login Page',
        icon: 'warning'

      })
      this.$router.push('/login')
    }
  }

}
</script>

<style>
</style>
