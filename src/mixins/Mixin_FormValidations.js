export default {

  methods: {
    checkEmail (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      //    console.log('checkEmail', re.test(String(email).toLowerCase()));
      return re.test(String(email).toLowerCase())
    }
    ,
    compareHeightFromHeightTo(heightFrom,heightTo){
      const heightFromFoot = parseInt(heightFrom.charAt(0)) // 0  is position for foot
      const heightToFoot = parseInt(heightTo.charAt(0))
      console.log(heightFromFoot,heightToFoot);
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

    }
  }
}
