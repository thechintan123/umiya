import axios from 'axios'
import mixinComputations from 'src/mixins/Mixin_Computations.js'
import mixinUtils from 'src/mixins/Mixin_Utils.js'
import { testData, testTmpData } from 'src/constants/testingDefaults'

const getDefaultState = () => {
  return {
    tab: 'basic',
    error: {
      basicHasError: false,
      personalHasError: false,
      uploadHasError: false,

      basicValidated: false,
      personalValidated: false,
      uploadValidated: false,
      // Error for Photo and Proofs

      finalSubmitClicked: false

    },

    list: {
      countryOptions: [],
      gotraOptions: [],
      whereKnowOptions: [],
      maritalOptions: [],
      genderOptions: []
    },
    // form fields
    formData: {
      userDetailsId: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      gender: '',
      dateOfBirth: '',
      age: 0,
      country: {},
      state: '',
      city: '',
      primaryContact: '',
      alternateContact: '',
      maritalStatus: '',
      height: '',
      heightCms: '',
      gotra: '',
      originalSurname: '',
      fatherName: '',
      residentialAddress: '',
      aboutYourself: '',
      partnerAgeFrom: '',
      partnerAgeTo: '',
      partnerHeightFrom: '',
      partnerHeightFromCms: '',
      partnerHeightTo: '',
      partnerHeightToCms: '',
      partnerMaritalStatus: [],
      emailMatchedNotification: true,
      agreeTc: false,
      whereKnow: ''
    },

    // This fields are used to later club them into form fields of primaryContact and alternateContcts
    tmpData: {
      primaryContact: '',
      primaryContactCountryCode: '',
      alternateContactCountryCode: '',
      alternateContact: '',
      countryRadio: 'India',
      otherCountry: '',
      age: 0,
      countryList: []
    },

    // previous Form Data for Update
    previousFormData: { },
    genderOptions: [{ id: 1, name: 'Male' }, { id: 2, name: 'Female' }],

    // userDetailsId : '',

    showProgressBar: false,

    // For update of Photos
    previousPhotosFiles: [],

    userSubmitted: false,

    successProcess: false,

    loggedInUserDetailsId: ''

  }
}

const state = getDefaultState()

const mutations = {

  resetState (state) {
    Object.assign(state, getDefaultState())
  },
  setFormData (state, userDetail) {
    state.formData = userDetail
  },
  setFormDataIndividual (state, object) {
    state.formData[object.key] = object.value
    // console.log("setFormDataIndividual", object.key, object.value, state.formData[object.key]);
  },
  setTmpData (state, object) {
    state.tmpData[object.key] = object.value
    // console.log("tmpdata", state.tmpData, object.key, object.key);
  },
  setTmpDataFull (state, object) {
    // state.tmpData = object;
    const mergedObject = Object.assign(state.tmpData, object)
    state.tmpData = mergedObject
  },

  setShowProgressBar (state, value) {
    state.showProgressBar = value
  },
  setList (state, object) {
    state.list[object.key] = object.value
    // console.log("tmpdata", state.tmpData, object.key, object.key);
  },
  setGender (state, value) {
    state.formData.gender = value
  },
  setTab (state, value) {
    state.tab = value
  },
  setError (state, object) {
    state.error[object.key] = object.value
  },
  setPreviousFormData (state, object) {
    state.previousFormData = object
  },
  setUserSubmitted (state, value) {
    state.userSubmitted = value
  },
  setSuccessProcess (state, value) {
    state.successProcess = value
  },
  setLoggedInUserDetailsId (state, value) {
    state.loggedInUserDetailsId = value
  }
}

const actions = {
  setFormData2 ({ commit }) {
    commit('setFormData')
  },
  fetchList ({ commit }) {
    return axios
      .get(process.env.API + '/lists')
      .then(response => {
        // this.countryList = response.data.country
        var countryOptions = response.data.country
        commit('setList', { key: 'countryOptions', value: countryOptions })
        commit('setTmpData', { key: 'countryList', value: countryOptions })

        var gotraOptions = response.data.gotra
        commit('setList', { key: 'gotraOptions', value: gotraOptions })

        var whereKnowOptions = response.data.where_know
        commit('setList', { key: 'whereKnowOptions', value: whereKnowOptions })

        var maritalOptions = response.data.marital_status
        commit('setList', { key: 'maritalOptions', value: maritalOptions })

        var genderOptions = response.data.gender
        commit('setList', { key: 'genderOptions', value: genderOptions })
      })
      .catch(error => {
        console.log("Fetch List",error)
        mixinUtils.methods.showErrorDialog(error)
      })
  },

  fetchLoggedInUserDetails ({ commit }) {
    var user = JSON.parse(localStorage.getItem('user'))
    if (user !== null) {
      var userDetailsId = user.user_details_id
      commit('setLoggedInUserDetailsId', userDetailsId)
    }
  },
  // For Update Profile
  fetchUserDetails ({ commit }, { userDetailsId, selectedByAdmin }) {
    commit('setShowProgressBar', true)
    // var user = JSON.parse(localStorage.getItem('user'))
    var userDetail

    if (userDetailsId !== null && userDetailsId !== '') {
      // var userDetailsId = user.user_details_id

      var endPoint = ''
      if (selectedByAdmin) {
        endPoint = process.env.API + '/admin/users/' + userDetailsId
      } else {
        endPoint = process.env.API + '/users/' + userDetailsId
      }
      return axios
        .get(endPoint)
        .then(({ data }) => {
          // console.log("data", data, data.upload_proof);

          // converting from CamelCase to SnakeCase
          userDetail = {}
          for (const key in data) {
            // console.log("Key", camel);
            userDetail[
              mixinComputations.methods.snakeToCamel(key)
            ] = data[key]
          }

          // console.log("userDetail", userDetail);
          // state.formData = userDetail
          commit('setFormData', userDetail)

          commit('setFormDataIndividual', {
            key: 'userDetailsId',
            value: userDetailsId
          })

          // console.log("formData", state.formData);

          // Converting the data to match the form fields requirements

          /* for Primary Phone and Alternate Phone. It is stored in the following format "+91 1234567890"
    so extracting the information */

          var primaryContactCountryCode = state.formData.primaryContact.substr(
            1,
            2
          )
          // console.log("FormData Details", state.formData.primaryContact, primaryContactCountryCode);

          commit('setTmpData', {
            key: 'primaryContactCountryCode',
            value: primaryContactCountryCode
          })

          var primaryContact = state.formData.primaryContact.substr(
            4
          )
          commit('setTmpData', {
            key: 'primaryContact',
            value: primaryContact
          })

          var alternateContactCountryCode = state.formData.alternateContact.substr(
            1,
            2
          )

          commit('setTmpData', {
            key: 'alternateContactCountryCode',
            value: alternateContactCountryCode
          })

          var alternateContact = state.formData.alternateContact.substr(
            4
          )

          commit('setTmpData', {
            key: 'alternateContact',
            value: alternateContact
          })

          // Map country and other country

          var country = state.formData.country
          if (country.name === 'India') {
            // state.tmpData.countryRadio = 'India'
            commit('setTmpData', {
              key: 'countryRadio',
              value: 'India'
            })
          } else {
            // state.tmpData.countryRadio = 'Other'
            commit('setTmpData', {
              key: 'countryRadio',
              value: 'Other'
            })

            commit('setTmpData', {
              key: 'otherCountry',
              value: state.formData.country
            })
          }

          // Calculate Age
          // console.log("mixinComputations", mixinComputations);
          var dateFormatted = new Date(
            state.formData.dateOfBirth
          )
            .toISOString()
            .split('T')[0]
          commit('setFormDataIndividual', {
            key: 'dateOfBirth',
            value: dateFormatted
          })

          var age = mixinComputations.methods.computeAge(
            state.formData.dateOfBirth
          )
          commit('setTmpData', { key: 'age', value: age })

          // Mapping Height in Cms to Ft and Inch
          // state.formData.heightCms = state.formData.height
          var heightCms = state.formData.heightCms
          var heightFtInch = mixinComputations.methods.convertHeightToFtInch(
            heightCms
          )
          commit('setFormDataIndividual', {
            key: 'height',
            value: heightFtInch
          })
          commit('setFormDataIndividual', {
            key: 'heightCms',
            value: heightCms
          })

          // Map Partner Height From and To. First, Convert to Ft and Inches
          var partnerHeightFromCms =
                                state.formData.partnerHeightFromCms
          var partnerHeightFromFtInch = mixinComputations.methods.convertHeightToFtInch(
            partnerHeightFromCms
          )

          commit('setFormDataIndividual', {
            key: 'partnerHeightFrom',
            value: partnerHeightFromFtInch
          })
          commit('setFormDataIndividual', {
            key: 'partnerHeightFromCms',
            value: partnerHeightFromCms
          })

          var partnerHeightToCms =
                                state.formData.partnerHeightToCms
          var partnerHeightToFtInch = mixinComputations.methods.convertHeightToFtInch(
            partnerHeightToCms
          )

          commit('setFormDataIndividual', {
            key: 'partnerHeightTo',
            value: partnerHeightToFtInch
          })
          commit('setFormDataIndividual', {
            key: 'partnerHeightToCms',
            value: partnerHeightToCms
          })

          // Storing FormData into Other Object
          var previousFormData = Object.assign(
            {},
            state.formData
          )
          commit('setPreviousFormData', previousFormData)

          // console.log('Previous Form Data', state.previousFormData)

          commit('setShowProgressBar', false)
        })
        .catch(error => {
          console.log('Store Fetch User List', error, this)
          mixinUtils.methods.showErrorDialog(error)
        })
    } // end of if user!==null
  }, // end of fetchUSerDetails
  fetchPhotos ({ commit }) {
    // Get Photos

    // console.log("Before Photo Loop", this.formData);
    commit('setShowProgressBar', true)
    var photos = state.formData.uploadPhotos
    var photo = {}
    var fileObj = {}
    var blobObject = {}
    var userDetailsId = state.formData.userDetailsId

    for (photo of photos) {
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

          state.previousPhotosFiles.push(fileObj)

          commit('setShowProgressBar', false)

          return state.previousPhotosFiles
          // console.log("Photos Loaded", fileName, fileObj, state.previousPhotosFiles);
        })
        .catch(error => {
          mixinUtils.methods.showErrorDialog(error)
        })

      // console.log("File List", fileList);
    } // for of Photo loop
  }, // end of fetchPhotos

  calculateAge ({ commit }) {
    var dob = state.formData.dateOfBirth
    // console.log("calculateAge", this.formData, dob, typeof(dob))
    if (dob !== null && typeof (dob) !== 'undefined' && dob !== '') {
      var age = mixinComputations.methods.computeAge(state.formData.dateOfBirth)
      commit('setTmpData', { key: 'age', value: age })
    }
  },
  filterCountryOptions ({ commit }, filteredCountryList) {
    commit('setTmpData', { key: 'countryOptions', value: filteredCountryList })
  },
  // setFormDataIndividual({commit},genderObject){
  //   commit('setFormDataIndividual', {key  : 'gender',value : genderObject.value});

  // },
  defaultTestingData ({ commit }) {
    // this.formData = this.testData
    // console.log("Test Data", JSON.stringify(testData));
    
    var newTestObject= Object.assign({}, testData)
    commit('setFormData', newTestObject)

    commit('setTmpDataFull', testTmpData)

    // this.tmpData = this.testTmpData
    // defaults email with random string
    var email =
      'test' +
      Math.random()
        .toString(20)
        .substr(2, 6) +
      '@test.com'

    commit('setFormDataIndividual', { key: 'email', value: email })
  }

}

const getters = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
