import { Dialog, Notify } from 'quasar'

export default {
  methods: {
    checkUserLoggedIn (role) {
      var user = JSON.parse(localStorage.getItem('user'))
      if (user === null) {
        this.$q.notify({
          type: 'negative',
          multiLine: true,
          message: 'You need to login to access this page.You are redirected to Login Page',
          icon: 'warning',
          position: 'center'
        })
        this.$router.push('/login')
      } else {
        if (this.hasValue(role)) {
        // if role is BLANK then it is allowed to be accessed by all roles
          var rolefromLocalStorage = user.role
          if (rolefromLocalStorage !== role) {
            this.$q.notify({
              type: 'negative',
              multiLine: true,
              message:
              'You do not have right permission to access this page.You are redirected to Home Page',
              icon: 'warning',
              position: 'center'
            })
            this.$router.push('/')
          }
        }
      }
    },
    showErrorDialog (error, msg = '') {
      // console.log("showErrorDialog", error, msg);
      let errorMessage = ''
      errorMessage = error.toString()

      if (this.hasKey(error, 'response.data.message')) {
        errorMessage += '<br><br>Server Message :' + error.response.data.message
      }
      if (this.hasKey(error, 'response.data.error')) {
        errorMessage += '<br>Server Error :' + error.response.data.error
      }
      Dialog.create({
        title: "<font color='red'><b><u>Error!</u></b></font>",
        persistent: true,
        transitionShow: 'scale',
        transitionHide: 'scale',
        message: msg + '<br><br><i>' + errorMessage + '</i>',
        backgroundColor: 'blue',
        html: true
      })
    },
    showMessageDialog (message) {
      Dialog.create({
        title: '<b><u>Warning!</u></b>',
        persistent: true,
        transitionShow: 'scale',
        transitionHide: 'scale',
        message: message,
        html: true
      })
    },
    showNotification (type, message) {
      var position
      if (type === 'positive') {
        position = 'top-right'
      } else {
        position = 'center'
      }
      Notify.create({
        type: type,
        message: message,
        position: position
      })
      /* this.$router.push('/login') */
    },
    hasKey (obj, key) {
      // console.log('hasKey', obj, key)
      return key.split('.').every(function (x) {
        if (typeof obj !== 'object' || obj === null || !(x in obj)) { return false }
        obj = obj[x]
        return true
      })
    },
    hasValue (value) {
      if (value !== null && typeof (value) !== 'undefined' && value !== '') {
        return true
      } else {
        return false
      }
    },
    checkLoggedIn () {
      const user = localStorage.getItem('user')
      // console.log(user);
      if (user) {
        this.loggedIn = true
      } else {
        this.loggedIn = false
      }
    },
    sortList (property, order = 'asc') {
      var sortOrder = 1
      if (order === 'desc') {
        sortOrder = -1
      }
      return function (a, b) {
        // a should come before b in the sorted order
        // console.log("Property a and b", typeof(a[property]),typeof(b[property]) )
        if (a[property] < b[property]) {
          return -1 * sortOrder
          // a should come after b in the sorted order
        } else if (a[property] > b[property]) {
          return 1 * sortOrder
          // a and b are the same
        } else {
          return 0 * sortOrder
        }
      }
    },
    sortDate (dateProperty, order = 'desc') {
      var sortOrder = 1
      if (order === 'desc') {
        sortOrder = -1
      }
      return function (a, b) {
        // a should come before b in the sorted order
        // console.log("Property a and b", a[dateProperty], b[dateProperty],typeof(a[dateProperty]),typeof(b[dateProperty]) )
        var aDate = Date.parse(a[dateProperty])
        var bDate = Date.parse(b[dateProperty])
        if (isNaN(aDate)) { aDate = Date.parse('01-Jan-2000') } // Defaulted to earliest date
        if (isNaN(bDate)) { bDate = Date.parse('01-Jan-2000') } // Defaulted to earliest date
        // console.log("Property aDate and bDate", aDate,bDate, typeof(aDate),typeof(bDate), (aDate<bDate) )

        if (aDate < bDate) {
          return -1 * sortOrder
        // a should come after b in the sorted order
        } else if (aDate > bDate) {
          return 1 * sortOrder
        // a and b are the same
        } else {
          return 0 * sortOrder
        }
      }
    },
    removeTimeStamp (val) {
      if (this.hasValue(val)) {
        var d = new Date(val)
        return d.toDateString()
      }
    },
    hasBlank (val) {
      if (!this.hasValue(val)) return 'No Information'
      else return val
    }

  }
}
