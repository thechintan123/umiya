<template>
  <div class="fit column">
    <progress-bar v-if="showProgressBar" />
    <spinner v-if="showProgressBar" />
    <successUpdate
      v-if="successProcess"
      :updateProfile="updateProfile"
    />
    <q-card v-if="!successProcess">
      <banner
        :iconName="updateProfile ? 'edit' : 'account_circle'"
        :bannerTitle="
          updateProfile ? 'Update Profile' : 'Register - It\'s FREE'
        "
      />
      <q-tabs
        v-model="tab"
        dense
        class="text-secondary"
        active-color="primary"
        indicator-color="primary"
        narrow-indicator
        align="justify"
        @click="tabChange"
      >
        <q-tab name="basic" icon="fas fa-user-cog" label="Basic">
          <q-badge v-if="error.basicHasError" align="top" color="blue" floating>
            Error
            <q-icon name="warning" color="yellow" class="q-ml-sm" />
          </q-badge>
        </q-tab>
        <q-tab name="personal" icon="ballot" label="Personal">
          <q-badge
            v-if="error.personalHasError"
            align="top"
            color="blue"
            floating
          >
            Error
            <q-icon name="warning" color="yellow" class="q-ml-sm" />
          </q-badge>
        </q-tab>
        <q-tab name="upload" icon="add_a_photo" label="Upload">
          <q-badge
            v-if="error.uploadHasError"
            align="top"
            color="blue"
            floating
          >
            Error
            <q-icon name="warning" color="yellow" class="q-ml-sm" />
          </q-badge>
        </q-tab>
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-model="tab"
        keep-alive
        animated
        ref="mainTabPanel"
        @transition = "transitionFn"
      >
        <q-tab-panel name="basic">
          <template v-if="list.registrationOptions.length > 0">
                    <basicForm ref="basicFormRef" :updateProfile="updateProfile" />
          </template>         
        </q-tab-panel>

        <q-tab-panel name="personal">
          <personalForm ref="personalFormRef" :updateProfile="updateProfile" />
        </q-tab-panel>

        <q-tab-panel name="upload">
          <uploadForm ref="uploadFormRef" :updateProfile="updateProfile" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import mixinFormValidations from 'src/mixins/Mixin_FormValidations.js'
import mixinComputations from 'src/mixins/Mixin_Computations.js'
import mixinUtils from 'src/mixins/Mixin_Utils.js'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  mixins: [mixinFormValidations, mixinComputations, mixinUtils],
  data () {
    return {
      prevUserId: ''
    }
  },
  // This prop is for UpDateProfile. It will be true for UpdateProfile
  props: {
    updateProfile: {
      type: Boolean,
      default: false
    }

  },

  computed: {
    ...mapState('registerUpdate', ['showProgressBar', 'tab', 'error', 'successProcess',
      'emptyFormData', 'loggedInUserDetailsId','list']),
    ...mapState('admin', ['selectedIdByAdmin']),

    tab: {
      get () {
        return this.$store.state.registerUpdate.tab
      },
      set (value) {
        this.setTab(value)
        // console.log("Env",process.env);
      }
    }
  },
  mounted () {
    // for updateProfile
    // console.log("Register_update Mounted", this.updateProfile, this)
    var selectedUserDetailsId = ''
    var selectedByAdmin = false

    if (this.updateProfile === true) {
      if (this.selectedIdByAdmin !== '') {
        selectedUserDetailsId = this.selectedIdByAdmin
        this.prevUserId = this.selectedIdByAdmin
        selectedByAdmin = true
      } else {
        this.fetchLoggedInUserDetails()
        selectedUserDetailsId = this.loggedInUserDetailsId
      }
      this.resetState()
      // console.log('selectedUserDetailsId', selectedUserDetailsId)
      this.fetchUserDetails({
        userDetailsId: selectedUserDetailsId,
        selectedByAdmin: selectedByAdmin
      })
    } else { // User has selected Register Link - updateProfile is false
      // If user is already logged in
      this.fetchLoggedInUserDetails()
      selectedUserDetailsId = this.loggedInUserDetailsId
      // console.log("Register_update selectedUserDetailsId",selectedUserDetailsId)

      if (selectedUserDetailsId !== '') {
        // if user is logged in and wants to register
        this.resetState()
      }
    }
    this.fetchList()
  },
  methods: {
    ...mapActions('registerUpdate', ['fetchUserDetails', 'fetchList', 'fetchLoggedInUserDetails']),
    ...mapMutations('registerUpdate', ['setTab', 'setFormData', 'setTmpDataFull', 'resetState']),
    transitionFn (newVal, oldVal) {
      // console.log("transitionFn", newVal, oldVal, this.$refs, this.error);
      if (
        oldVal === 'upload' && newVal === 'basic' && this.error.finalSubmitClicked) {
        this.$refs.basicFormRef.submitBasicForm()
      } else if (
        oldVal === 'basic' && newVal === 'personal' && this.error.finalSubmitClicked) {
        this.$refs.personalFormRef.submitPersonalForm()
      } else if (oldVal === 'personal' && newVal === 'upload' && this.error.finalSubmitClicked) {
        this.$refs.uploadFormRef.preSubmit()
      }
    },
    tabChange () {
      if (this.tab === 'basic' && this.basicHasError) {
        this.$refs.basicForm.validate()
      } else if (this.tab === 'personal' && this.personalHasError) {
        this.$refs.personalForm.validate()
      }
    }
  },

  beforeDestroy () {
    // console.log('REgister-Update - Before Destroyed');
    // this.resetState()
  },
  components: {
    successUpdate: require('./register_update/SuccessUpdate.vue').default,
    progressBar: require('./general/ProgressBar.vue').default,
    spinner: require('./general/Spinner.vue').default,
    banner: require('./general/Banner.vue').default,
    basicForm: require('./register_update/BasicForm.vue').default,
    personalForm: require('./register_update/PersonalForm.vue').default,
    uploadForm: require('./register_update/UploadForm.vue').default
  }
}
</script>

<style scoped>
.my-card {
  width: auto;
  min-width: 500px;
  max-width: 800px;
}

.my-uploader {
  max-width: 300px;
}

.q-btn:focus,
.q-btn:hover {
  outline-width: 5px !important;
  outline-style: solid !important;
  outline-color: #d63447 !important; /*$secondary : #d63447;*/
}
</style>
