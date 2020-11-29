<template>
  <q-form ref="uploadForm" greedy>
    <div class="q-mb-xs">
      <q-toggle
        v-model="updatePhoto"
        checked-icon="check"
        color="green"
        unchecked-icon="clear"
        label="Do you want to update Photos?"
        @input="getPhotos"
        v-if="updateProfile"
      />
      <q-slide-transition>
        <q-field
          error-message="Please upload atleast One Photo."
          :error="isErrorPhoto"
          borderless
          dense
          v-show="(updateProfile && updatePhoto) || !updateProfile"
        >
          <template v-slot:control>
            <q-uploader
              :factory="uploadPhoto"
              label="Upload Photos (Max 4 images)"
              class="my-uploader"
              accept="image/*, .jpg, .jpeg, .gif, .png"
              multiple
              :max-files="4"
              ref="photo"
              hide-upload-btn
              @added="checkPhoto"
              @removed="checkPhoto"
              @rejected="onRejected"
            />
          </template>
        </q-field>
      </q-slide-transition>
    </div>

    <div class="q-mb-xs">
      <q-toggle
        v-model="updateProof"
        checked-icon="check"
        color="green"
        unchecked-icon="clear"
        label="Do you want to update Proofs?"
        @input="getProof"
        v-if="updateProfile"
      />

      <q-slide-transition>
        <q-field
          error-message="Please upload ID Proof."
          :error="isErrorProof"
          borderless
          dense
          v-show="(updateProfile && updateProof) || !updateProfile"
        >
          <template v-slot:control>
            <q-uploader
              :factory="uploadProof"
              label="Upload ID Proof (only 1 image)"
              class="my-uploader"
              accept="image/*, .jpg, .jpeg, .gif, .png"
              color="accent"
              ref="proof"
              hide-upload-btn
              @added="checkProof"
              @removed="checkProof"
              :disable="disableUploadProof"
            />
          </template>
        </q-field>
      </q-slide-transition>
      <p v-if="(updateProfile && hasKey(formData, 'status.name')) ? formData.status.name === 'Approved' : false" class="text-negative">
        <q-icon name="warning" class="text-negative" style="font-size: 2rem;" />
        As your profile is already Approved, you cannot update your ID Proof.
      </p>
    </div>

    <div class="row">
      <q-btn color="secondary" flat label="Back" @click="goBack" />
      <q-space />
      <!-- <q-btn
        v-if="updateProfile"
        color="primary"
        label="Update"
        @click.prevent="validateUploadForm"
      /> -->

      <q-btn color="primary" :label="updateProfile ?'Update' : 'Submit'" @click="validateUploadForm" />
    </div>
  </q-form>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions, mapMutations } from 'vuex'

import mixinFormValidations from 'src/mixins/Mixin_FormValidations.js'
import mixinComputations from 'src/mixins/Mixin_Computations.js'
import mixinUtils from 'src/mixins/Mixin_Utils.js'

import { Platform } from 'quasar'

export default {
  mixins: [mixinComputations, mixinFormValidations, mixinUtils],
  props: ['updateProfile'],
  data () {
    return {
      updatePhoto: false,
      updateProof: false,

      previousPhotosFiles: [],
      previousProofFile: '',

      isErrorProof: false,
      isErrorPhoto: false,

      // For disabling Upload Proof for Approved Profiles
      disableUploadProof: false
    }
  },
  computed: {
    ...mapState('registerUpdate', [
      'formData',
      'list',
      'tmpData',
      'error',
      'previousFormData',
      'userSubmitted',
      'showProgressBar'
    ]),
    ...mapState('admin', [
      'selectedIdByAdmin'
    ])
  },
  methods: {
    ...mapActions('registerUpdate', ['fetchPhotos']),
    ...mapMutations('registerUpdate', [
      'setShowProgressBar',
      'setError',
      'setTab',
      'setFormDataIndividual',
      'setUserSubmitted',
      'setSuccessProcess'
    ]),
    async uploadPhoto (file) {
      // console.log("uploadPhoto START");
      var uploadFile = true
      if (this.updateProfile === true) {
        // var newFileList = this.$refs.photo.files;
        // console.log("Check File List ", this.previousPhotosFiles);
        var index
        for (index = 0; index < this.previousPhotosFiles.length; index++) {
          if (this.previousPhotosFiles[index].name === file[0].name) {
            // console.log(
            //   "this.previousPhotosFiles - Before",
            //   JSON.stringify(this.previousPhotosFiles)
            // );
            this.$refs.photo.removeFile(file[0])
            this.previousPhotosFiles.splice(index, 1)
            index--
            uploadFile = false
            // console.log(
            //   "this.previousPhotosFiles - After",
            //   JSON.stringify(this.previousPhotosFiles)
            // );
          } // end-if
          // } //end -for
        } // end-for
        // console.log("Photo List", this.$refs.photo);
      } // end -if updateprofile = true
      if (uploadFile === true) {
        const fd = new FormData()
        fd.append('file', file[0])
        fd.append('filetype', 'photo')
        fd.append('user_details_id', this.formData.userDetailsId)
        // console.log("Upload Photo", this.formData.userDetailsId, fd, file);
        // uploadImageResponse = await this.uploadImage(fd, 'Photo')
        await this.uploadImage(fd, 'Photo')
      }
      // console.log("uploadPhoto End", uploadImageResponse);
    },
    async uploadProof (file) {
      var uploadFile = true
      if (this.updateProfile === true) {
        // var prevFileList = this.previousProofFile;
        var index
        for (index = 0; index < this.previousProofFile.length; index++) {
          if (this.previousProofFile[index].name === file[0].name) {
            this.$refs.proof.removeFile(file[0])
            uploadFile = false

            // if matches then remove Proof file otherwise remaning files will be deleted
            this.previousProofFile.splice(index, 1)
            index--
          } // end-if
        } // end-for
        // console.log('Photo List', this.$refs.proof)
      } // end -if updateprofile = true
      if (uploadFile === true) {
        const fd = new FormData()
        fd.append('file', file[0])
        fd.append('filetype', 'proof')
        fd.append('user_details_id', this.formData.userDetailsId)
        // console.log("Upload Proof", fd, file[0]);
        await this.uploadImage(fd, 'Proof')
      }
    },
    // get Photos for update profile
    getPhotos () {
      // Get Photos
      // console.log("Get Photo", this.updatePhoto, this.formData.uploadPhotos, this.$refs.photo);
      if (
        this.updatePhoto &&
        this.formData.uploadPhotos.length !== 0 &&
        this.formData.uploadPhotos !== null &&
        typeof this.formData.uploadPhotos !== 'undefined' &&
        this.$refs.photo.files.length !== this.formData.uploadPhotos.length
        // if photos are already loaded then no need to fetch it from Axios
      ) {
        // console.log("Before Photo Loop", this.formData.uploadPhotos);
        this.setShowProgressBar(true)
        // var fileList = []
        var photos = this.formData.uploadPhotos
        // var len = photos.length
        var photo = {}
        var fileObj = {}
        var blobObject = {}
        var userDetailsId = this.formData.userDetailsId

        for (photo of photos) {
          // var filename = photo.filename;
          // axios.get(process.env.API + "/photos/"+ userDetailsId +"/" + filename,
          // photo = photos[i];
          // console.log("Photo Loop", photo, photo.filename, fileList[0], fileList.length);

          axios({
            url:
              process.env.API +
              '/photos/' +
              userDetailsId +
              '/' +
              photo.filename,
            method: 'GET',
            responseType: 'blob' // important
          })
            .then(response => {
              var position = response.config.url.indexOf('photo_')
              var fileName = response.config.url.substr(position) // get file name from URL

              // console.log(
              //   "Photo Details",
              //   position,
              //   response.config.url,
              //   fileName,
              //   photo.filename,
              //   response
              // );

              blobObject = new Blob([response.data])
              fileObj = new File([blobObject], fileName, {
                type: 'image/jpeg'
              })
              // var fileObj =  new File([response.data]);
              // fileObj.lastModifiedDate = new Date();
              // fileObj.name = filename;
              // fileObj.type = "image/jpeg";
              // console.log('File Obj', blobObject, fileObj);
              // var fileList = [fileObj]
              this.previousPhotosFiles.push(fileObj)
              // this.$refs.photo1.files.push(fileObj);
              this.$refs.photo.addFiles(this.previousPhotosFiles)
              // console.log(
              //   "Photos Loaded",
              //   fileName,
              //   fileObj,
              //   this.previousPhotosFiles
              // );
              this.setShowProgressBar(false)
            })
            .catch(error => {
              // console.log("error", error);
              this.showErrorDialog(error)
            })

          // console.log("File List", fileList);
        } // for of Photo loop
      } // end of if for photos
    }, // end of getPhotos
    // get Proofs for UpdateProfile
    getProof () {
      // get Proofs

      // console.log("getProof", this.updateProof,  this.formData.uploadProof);
      if (
        this.updateProof &&
        this.formData.uploadProof !== '' &&
        this.formData.uploadProof !== null &&
        typeof this.formData.uploadProof !== 'undefined' &&
        this.$refs.proof.files.length === 0
      ) {
        this.setShowProgressBar(true)
        var userDetailsId = this.formData.userDetailsId
        var filename = this.formData.uploadProof

        axios({
          url: process.env.API + '/photos/' + userDetailsId + '/' + filename,
          method: 'GET',
          responseType: 'blob' // important
        })
          .then(response => {
            // console.log("Called Upload", response);

            var blobObject = new Blob([response.data])
            var fileObj = new File([blobObject], filename, {
              type: 'image/jpeg'
            })

            // console.log('File Obj', blobObject, fileObj);
            this.previousProofFile = [fileObj]
            this.$refs.proof.addFiles(this.previousProofFile)
            // console.log('disableUploadProof', this.formData.status.name)
            if (this.selectedIdByAdmin !== '') {
              this.disableUploadProof = false
            } else if (this.formData.status.name === 'Approved') {
              this.disableUploadProof = true
            }

            this.setShowProgressBar(false)
          })
          .catch(error => {
            // console.log(errMsg);
            this.showErrorDialog(error)
          })
      }
    }, // end of getphotos

    checkPhoto () {
      // console.log("Photo", this.$refs.photo);
      // console.log(this.$refs.photo.files.length);
      // Below condition is only check for updating Profile
      if (this.updateProfile !== true || this.updatePhoto === true) {
        if (this.$refs.photo.files.length > 4) {
          this.$refs.photo.files.length = 4 // This will reduce the allowed files to 4 photos;
          // this.$q.notify({
          //   type: 'negative',
          //   message: 'Only 4 Photos are allowed. Addtional ones are removed'
          // })
          this.showNotification('negative', 'Only 4 Photos are allowed. Addtional ones are removed')
        } else if (this.$refs.photo.files.length === 0) {
          this.isErrorPhoto = true
          // this.uploadHasError = true;
        } else {
          this.isErrorPhoto = false
          // this.uploadHasError = true;
        }
      } else {
        this.isErrorPhoto = false
      }
    },
    checkProof () {
      // console.log("Proof", this.$refs.photo);
      // console.log(this.$refs.photo.files.length);
      // Below condition is only check for updating Profile
      // console.log("Check Proof", this.updateProfile, this.updateProof)
      if (this.updateProfile !== true || this.updateProof === true) {
        if (this.$refs.proof.files.length === 0) {
          this.isErrorProof = true
          // this.uploadHasError = true;
        } else {
          this.isErrorProof = false
          // this.uploadHasError = true;
        }
      } else {
        this.isErrorProof = false
      }
    },
    validateUploadForm () {
      this.setShowProgressBar(true)
      this.$q.loading.show()
      this.checkPhoto()
      this.checkProof()

      if (this.isErrorPhoto || this.isErrorProof) {
        this.setError({ key: 'uploadHasError', value: true })
      } else {
        this.setError({ key: 'uploadHasError', value: false })

        // check other forms
        // this key is used to check transition function in Register_Update component
        this.setError({ key: 'finalSubmitClicked', value: true })
        this.setTab('basic')
      }

      this.setError({ key: 'uploadValidated', value: true })

      this.setShowProgressBar(false)
    },

    preSubmit () {
      this.setShowProgressBar(true)
      // console.log(
      //   "UpdateFinalForm 3",
      //   this.error,
      //   this.error.basicHasError,
      //   this.error.personalHasError,
      //   this.error.uploadHasError,
      //   this.error.uploadValidated
      // );

      if (this.error.basicHasError) {
        this.setTab('basic')
      } else if (this.error.personalHasError) {
        this.setTab('personal')
      }

      if (
        !this.error.basicHasError &&
        !this.error.personalHasError &&
        !this.error.uploadHasError &&
        this.error.uploadValidated
      ) {
        var primaryContact =
          '+' +
          this.tmpData.primaryContactCountryCode +
          ' ' +
          this.tmpData.primaryContact

        this.setFormDataIndividual({
          key: 'primaryContact',
          value: primaryContact
        })

        var alternateContact =
          '+' +
          this.tmpData.alternateContactCountryCode +
          ' ' +
          this.tmpData.alternateContact

        this.setFormDataIndividual({
          key: 'alternateContact',
          value: alternateContact
        })

        // create Country Object using Country radio and otherCountry Dropdown
        var country = {}
        if (this.tmpData.countryRadio === 'India') {
          const findIndia = this.tmpData.countryList.find(
            element => element.name === 'India'
          )
          // console.log("findIndia", findIndia);
          country = findIndia
        } else {
          //   this.tmpData.countryRadio = 'Other'
          country = Object.assign({}, this.tmpData.otherCountry)
        }
        this.setFormDataIndividual({ key: 'country', value: country })

        // console.log("Submit Form", this.formData);

        if (this.updateProfile === true) {
          this.updateFinalForm()
        } else {
          this.registerFinalForm()
        }
      }

    },
    async registerFinalForm () {
      // console.log("registerFinalForm", this.formData);
      var partnerHeightFromCms = this.convertHeightToCms(
        this.formData.partnerHeightFrom
      )
      // Height in cms are stored in DB so mapped back to same field - partnerHeightFrom
      this.setFormDataIndividual({ key: 'partnerHeightFromCms', value: partnerHeightFromCms })

      var partnerHeightToCms = this.convertHeightToCms(
        this.formData.partnerHeightTo
      )
      this.setFormDataIndividual({ key: 'partnerHeightToCms', value: partnerHeightToCms })

      if (this.formData.heightCms === '') {
        var heightCms = this.convertHeightToCms(
          this.formData.height
        )
        this.setFormDataIndividual({ key: 'heightCms', value: heightCms })
      }

      //Adding System_Source related details
      var systemSource;
      var systemAdditional;
      if(Platform.is.desktop){
        systemSource = 'Desktop Browser'
      }else if(Platform.is.mobile){
        systemSource = 'Mobile Browser'
      }else if(Platform.is.android){
        systemSource = 'Android App'
      }else if(Platform.is.ios){
        systemSource = 'iOS App'
      }
      systemAdditional = JSON.stringify(Platform);

      console.log("systemSource", systemSource,systemAdditional );

      this.setFormDataIndividual({ key: 'systemSource', value: systemSource })

      this.setFormDataIndividual({ key: 'systemAdditional', value: systemAdditional })


      // Convert From Camel to Snake Case
      // converting from CamelCase to SnakeCase
      var formDataSnakeCase = {}
      for (const key in this.formData) {
        // console.log("Key", camel);
        formDataSnakeCase[this.camelToSnake(key)] =
              this.formData[key]
      }
      //  console.log("Converted to Snake Case", formDataSnakeCase);
      try {
        await this.registerUser(formDataSnakeCase)
        // console.log("Register User", this.formData.userDetailsId, this.formData);
        if (this.hasValue(this.formData.userDetailsId)) {
          await this.$refs.photo.upload() // CP
          await this.$refs.proof.upload()
          // this.successProcess = true
          // console.log("Post Photo Upload")

          // this.postSubmit()
          this.setSuccessProcess(true)
        }
      } catch (error) {
        // console.log("Register User Error", error)
      } finally {
        this.setShowProgressBar(false)
      }

      this.setError({ key: 'finalSubmitClicked', value: false })
      this.setShowProgressBar(false)
    // console.log("Show Progress Bar", this.showProgressBar);
    },

    async updateFinalForm () {
      // creating new Object with only updated values
      var updatedFormData = {}
      var previousForm = this.previousFormData

      var form = this.formData
      for (const key in previousForm) {
        if (
          previousForm[key] !== '' &&
            previousForm[key] !== null &&
            previousForm[key] !== 'undefined'
        ) {
          // console.log("loop", key, form[key], previousForm[key], previousForm, this.previousFormData);
          // if(previousForm[key] !== form[key]){
          if (
            JSON.stringify(previousForm[key]) !== JSON.stringify(form[key])
          ) {
            // console.log("Did not match", previousForm[key], form[key]);
            updatedFormData[key] = form[key]
          }
        }
      }

      // console.log("updatedFormData", updatedFormData);

      if (Object.keys(updatedFormData).length === 0 && !this.updatePhoto && !this.updateProof) {
        this.showMessageDialog('You have not updated any fields. Please check')
        this.setShowProgressBar(false)
      } else {
        // if updatedFormData has height then convert the same field to Cms
        var keys = ['partnerHeightFrom', 'partnerHeightTo', 'height']
        for (const key of keys) {
          if (Object.prototype.hasOwnProperty.call(updatedFormData, key)) {
            updatedFormData[key] = this.convertHeightToCms(
              updatedFormData[key]
            )
          }
        }
        // console.log("updatedFormData", updatedFormData);

        // converting from CamelCase to SnakeCase
        var updatedFormDataSnakeCase = {}
        for (const key in updatedFormData) {
          // console.log("Key", camel);
          updatedFormDataSnakeCase[this.camelToSnake(key)] =
              updatedFormData[key]
        }
        // console.log("Converted to Snake Case", updatedFormDataSnakeCase);

        await this.updateUser(updatedFormDataSnakeCase)

        // Update Photos and Proof if applicable
        // console.log(
        //   "UserSubmitted",
        //   this.userSubmitted,
        //   this.$refs.photo,
        //   this.$refs
        // );
        if (this.userSubmitted === true) {
          if (this.updatePhoto === true) {
            await this.$refs.photo.upload()

            // delete the photo
            if (this.previousPhotosFiles.length > 0) {
              for (const pFile of this.previousPhotosFiles) {
                // console.log("Previous File", pFile.name, pFile);
                this.deleteFile(pFile.name)
              }
            }
          }
          if (this.updateProof === true) {
            await this.$refs.proof.upload()

            // delete Proof
            if (this.previousProofFile.length > 0) {
              // console.log("Previous File", this.previousProofFile[0].name);
              this.deleteFile(this.previousProofFile[0].name)
            }
          }
        }// if updateUserStatus is TRUE

        this.postSubmit()
      } // if No fields are updated
    },
    postSubmit () {
      this.setShowProgressBar(false)
      this.setError({ key: 'finalSubmitClicked', value: false })
      this.setSuccessProcess(true)
    },
    updateUser (data) {
      var userDetailsId = this.formData.userDetailsId

      var endPoint = ''
      // console.log('selectedIdByAdmin', this.selectedIdByAdmin)
      if (this.selectedIdByAdmin !== '' && this.selectedIdByAdmin != null) {
        endPoint = process.env.API + '/admin/users/' + userDetailsId
      } else {
        endPoint = process.env.API + '/users/' + userDetailsId
      }
      return axios
        .put(endPoint, data)
        .then(({ data }) => {
          // console.log("Updated Successfully", data);
          this.setUserSubmitted(true)
          /* this.$router.push('/login') */
        })
        .catch(error => {
          // console.log(
          //   "Update User",
          //   error,
          //   JSON.stringify(error),
          //   this.hasKey(error, "response.data")
          // );
          this.showErrorDialog(error)
        })
    },
    uploadImage (fd, file) {
      return axios
        .post(process.env.API + '/photos', fd, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(resolve => {
          // console.log("uploadImage - Then");

          // this.$q.notify({
          //   type: 'positive',
          //   message: file + ' successfully uploaded'
          // })
          var message =  file + ' successfully uploaded'
          this.showNotification('positive', message)
          // if(file == 'Photo'){
          //   this.isErrorPhoto = false;
          // }else if(file == 'Proof'){
          //   this.isErrorProof = false;
          // }
          // console.log("uploadImage - DONE");
        })
        .catch(error => {
          var message = 'Only your ' + file + ' was not uploaded. Your registration is successful. Please login and upload your ' + file + '.'
          // console.log("Error", error, message);
          this.showErrorDialog(error, message)
          // this.showMessageDialog(message);
        })
    },
    /*
    uploadImage(file) {
      return new Promise ((resolve) => {
        resolve({
          url: process.env.API + '/photos',
          method: 'POST'
        })
      })
    }, */
    hasKey (obj, key) {
      return key.split('.').every(function (x) {
        if (typeof obj !== 'object' || obj === null || !(x in obj)) return false
        obj = obj[x]
        return true
      })
    },
    registerUser (data) {
      return axios
        .post(process.env.API + '/users', data)
        .then(({ data }) => {
          // console.log("Register User", data);
          // this.formData.userDetailsId = data.user_details_id
          this.setFormDataIndividual({
            key: 'userDetailsId',
            value: data.user_details_id
          })

          // console.log("this.userDetailsId", this.formData.userDetailsId, typeof data);
          this.showNotification('positive','Succesfully registered')
          // this.$q.notify({
          //   type: 'positive',
          //   message: 'Successfully registered',
          //   position : 'top-right'
          // })
          /* this.$router.push('/login') */
        })
        .catch(error => {
          var message = 'Due to some technical reasons, your profile is not registered. Please try again. If issue continues, please let us know and try in some time.'
          this.showErrorDialog(error, message)
        })
    },

    deleteFile (fileName) {
      axios({
        url: process.env.API + '/photos/' + this.formData.userDetailsId + '/' + fileName,
        method: 'DELETE'
      })
        .then(response => {
          // console.log("File Deleted Response", response);
        })
        .catch(error => {
          this.showErrorDialog(error)
        })
    },

    // Photo Upload - Error Message
    onRejected (rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      // this.$q.notify({
      //   type: 'negative',
      //   message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      // })
      var message = `${rejectedEntries.length} file(s) did not pass validation constraints`
      this.showNotification('negative', message)
    },
    goBack () {
      this.$store.commit('registerUpdate/setTab', 'personal')
    }
  }
}
</script>

<style></style>
