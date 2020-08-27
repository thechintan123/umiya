<template>
    <q-card>
      <q-banner class="bg-grey-3 q-mb-xs">
        <template v-slot:avatar>
          <q-icon name="assignment_turned_in" color="secondary" />
        </template>
        <template v-if="updateProfile">Successfull Update</template>
        <template v-else>Sucessfull Registration !!</template>      
        </q-banner>
      <q-card-section>
        Thank you
        <span class="text-weight-bolder text-capitalize"
        >{{ formData.firstName }} {{ formData.lastName }} </span>
        <template v-if="updateProfile">for successful update.</template>
        <template v-else>for successful registration.!</template>          
        <br />
        <br/>
        Your Profile ID is
        <b>{{ userDetailsId }}</b>. 
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
       </template>
      </q-card-section>
    </q-card>
</template>

<script>
export default {
    props :['userDetailsId', 'formData','updateProfile']

}
</script>

<style>

</style>