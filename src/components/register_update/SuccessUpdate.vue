<template>
    <q-card>
      <banner
        iconName="assignment_turned_in"
        :bannerTitle="
          updateProfile ? 'Successful Update !!' : 'Sucessful Registration !'"
      />
      <q-card-section>
        Thank you
        <span class="text-weight-bolder text-capitalize"
        >{{ formData.firstName }} {{ formData.lastName }} </span>
        <template v-if="updateProfile">for successful update.</template>
        <template v-else>for successful registration.</template>
        <br />
        <br/>
        Your Profile ID is
        <b>{{ formData.userDetailsId }}</b>.
        <br />
        <br/>
        UmiyaMatrimony.com will notify you on your email
        <b>{{ formData.email }}</b
        >. <br />
        <br/>
        The other profile will contact you on your primary contact
        <b>{{ formData.primaryContact }}</b>
        <br />
        <br />
        <template v-if="!updateProfile">
        <b>Next Steps:</b>
        <br />
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="done_outline" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Admin Approval</q-item-label>
            <q-item-label caption>
              Admin will verify your ID Proof and approve the profile. You will
              be notified on {{ formData.email }}.
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon color="secondary" name="fas fa-heart" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Self Search & Contact</q-item-label>
            <q-item-label caption
              >Search your match and contact the profile directly.</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-separator inset color="dark"/>
    <br/>
    <div class="row">
      <span class="text-subtitle2 q-mt-sm">Need to register one more profile >></span>
      <q-space/>
        <q-btn
        color="primary"
        label="New Registration >"
        @click="newRegister"
      />
    </div>
       </template>
      </q-card-section>
    </q-card>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  props: ['updateProfile'],

  computed: {
    ...mapState('registerUpdate', ['formData'])
  },
  methods: {
    ...mapMutations('registerUpdate', ['setSuccessProcess', 'setTab', 'resetState', 'setShowProgressBar']),
    ...mapActions('registerUpdate', ['fetchList']),

    async newRegister () {
      this.resetState()
      this.setShowProgressBar(true)
      await this.fetchList() // to get dropdownlist
      this.setTab('basic')
      this.setShowProgressBar(false)
    }
  },
  components: {
    banner: require('../general/Banner.vue').default
  }

}
</script>

<style>

</style>
