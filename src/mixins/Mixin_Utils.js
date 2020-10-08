import { Dialog } from 'quasar'

export default {
  methods: {
    checkUserLoggedIn(role){
      var user = JSON.parse(localStorage.getItem('user'))
      if (user === null) {
        this.$q.notify({
          type: 'negative',
          multiLine: true,
          message: 'You need to login to access this page.You are redirected to Login Page',
          icon: 'warning'
        })
        this.$router.push('/login')
    }
    else{
      if (this.hasValue(role)) {
        // if role is BLANK then it is allowed to be accessed by all roles
        var rolefromLocalStorage = user.role;
        if (rolefromLocalStorage !== role) {
          this.$q.notify({
            type: "negative",
            multiLine: true,
            message:
              "You do not have right permission to access this page.You are redirected to Home Page",
            icon: "warning"
          });
          this.$router.push("/");
        }
      }
    }
  }
    ,
    showErrorDialog (error) {
      let errorMessage = ''
      errorMessage = '<b>' + error.toString() + '</b>'

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
        message: errorMessage,
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
    hasKey (obj, key) {
      console.log("hasKey", obj, key)
      return key.split('.').every(function (x) {
        if (typeof obj !== 'object' || obj === null || !(x in obj)) { return false }
        obj = obj[x]
        return true
      })
    }
    ,
    hasValue (value) {
      if (value !== null && typeof (value) !== 'undefined' && value !== '') {
        return true
      } else {
        return false
      }
    }
    ,
    checkLoggedIn () {
      const user = localStorage.getItem('user')
      // console.log(user);
      if (user) {
        this.loggedIn = true
      } else {
        this.loggedIn = false
      }
    }
    ,
    sortList(property, order = 'asc') {
      var sort_order = 1;
      if(order === "desc"){
          sort_order = -1;
      }
      return function (a, b){
          // a should come before b in the sorted order
          // console.log("Property a and b", typeof(a[property]),typeof(b[property]) )
          if(a[property] < b[property]){
                  return -1 * sort_order;
          // a should come after b in the sorted order
          }else if(a[property] > b[property]){
                  return 1 * sort_order;
          // a and b are the same
          }else{
                  return 0 * sort_order;
          }
      }
  }
  ,
  sortDate(dateProperty, order = 'desc'){
    var sort_order = 1;
    if(order === "desc"){
        sort_order = -1;
    }
    return function (a, b){
        // a should come before b in the sorted order
        // console.log("Property a and b", a[dateProperty], b[dateProperty],typeof(a[dateProperty]),typeof(b[dateProperty]) )
        var a_date = Date.parse(a[dateProperty]);
        var b_date = Date.parse(b[dateProperty]);
        if(isNaN(a_date)) 
          a_date = Date.parse("01-Jan-2000") //Defaulted to earliest date
        if(isNaN(b_date)) 
          b_date =Date.parse("01-Jan-2000") //Defaulted to earliest date
        // console.log("Property a_date and b_date", a_date,b_date, typeof(a_date),typeof(b_date), (a_date<b_date) )

        if(a_date < b_date){
                return -1 * sort_order;
        // a should come after b in the sorted order
        }else if(a_date > b_date){
                return 1 * sort_order;
        // a and b are the same
        }else{
                return 0 * sort_order;
        }
    }  
  }
  ,
  removeTimeStamp(val) {
    if (this.hasValue(val))  {
      var d = new Date(val)
      return d.toDateString();
    }
  },
  hasBlank(val) {
    if (!this.hasValue(val)) return "No Information";
    else return val;
  }
  

}
}
