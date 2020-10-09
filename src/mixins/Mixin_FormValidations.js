export default {
  methods: {
    checkEmail (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      // console.log('checkEmail', email, this.hasValue(email), re.test(String(email).toLowerCase()));
      if (this.hasValue(email)) {
      // var re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      //    console.log('checkEmail', re.test(String(email).toLowerCase()));
        return re.test(String(email).toLowerCase())
      } else {
        return true
      }
    },
    compareHeightFromHeightTo (heightFrom, heightTo) {
      // console.log("compareHeightFromHeightTo" , heightFrom, heightTo)
      // isNaN check is to check whether heightFom and heightTo are in Ft Inch or cms
      if (isNaN(heightFrom) && isNaN(heightTo)) {
        const heightFromFoot = parseInt(heightFrom.charAt(0)) // 0  is position for foot
        const heightToFoot = parseInt(heightTo.charAt(0))
        // console.log(heightFromFoot, heightToFoot)
        if (heightToFoot < heightFromFoot) {
          return false
        } else if (heightToFoot === heightFromFoot) {
        // in case foot is same then check inches
          const heightFromInches = parseInt(heightFrom.substr(5, 2)) // 5 is position for inches
          const heightToInches = parseInt(heightTo.substr(5, 2))
          if (heightToInches < heightFromInches) {
            return false
          } else {
            return true
          }
        } else {
          return true
        }
      } else {
      // if number then since it is already converted to cms
        if (heightFrom < heightTo) {
          return true
        } else {
          return false
        }
      }
    },
    checkConfirmPassword (confirmNewPassword, newPassword) {
      // console.log("Check Confirm Password", confirmNewPassword, newPassword)
      if (newPassword === confirmNewPassword) {
        return true
      } else {
        return false
      }
    }
  }
}
