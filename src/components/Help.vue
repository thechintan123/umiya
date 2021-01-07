<template>
  <div class="fit column">
    <q-card bordered >
        <banner
        iconName="far fa-question-circle"
        bannerTitle="Help/FAQ"
              />
      <q-expansion-item
        group="somegroup"
        expand-separator
        default-opened
      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon color="secondary" name="fas fa-rupee-sign" />
          </q-item-section>

          <q-item-section>
            Is the website completely FREE?
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>
              YES! The website is completely FREE. You don't have to provide any bank or credit card details.
              This website is a social service for our Kutch Kadva Patidar Community.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        group="somegroup"
      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon color="secondary" name="fas fa-tasks" />
          </q-item-section>

          <q-item-section>
            What are the steps to use the website?
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>
              <ol>
                  <li>Self Register on website. It is FREE</li>
                  <li>Admin will review and approve the profile</li>
                  <li>Post approval, you can self search and contact the interested profile directly</li>
            </ol>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        group="somegroup"
      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon color="secondary" name="fas fa-people-arrows" />
          </q-item-section>

          <q-item-section>
            Do I contact interested profile(bride/groom) directly?
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>
              YES! You need to contact the interested profile(bride/groom) directly.
              UmiyaMatrimony team will NOT faciliate in meetings.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        group="somegroup"
      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon color="secondary" name="fas fa-user-check" />
          </q-item-section>

          <q-item-section>
            Do I need to perform backgound check of the interested profile(bridge/groom)?
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>
              YES! You need to perform background check. UmiyaMatrimony team does not perform background check on any profile.
              The team only checks ID proof to ensure that it is not a fake profile.
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
</style>
