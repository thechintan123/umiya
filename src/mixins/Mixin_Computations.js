export default {
  methods: {

   computeAge (dob) {
      // console.log("computeAge", dob)
      if (this.hasValue(dob)) {
        var dobInMS = Date.parse(dob)
        var diffMs = Date.now() - dobInMS
        var ageDt = new Date(diffMs)
        return Math.abs(ageDt.getUTCFullYear() - 1970)
      } else {
        return ''
      }
    },
    convertHeightToFtInch (heightCms) {
      // console.log("convertHeightToFtInch", heightCms, this.hasValue(heightCms),isNaN(heightCms))
      if (this.hasValue(heightCms) && !isNaN(heightCms)) {
        var heightTotalInches = heightCms * 0.393701
        var heightFt = Math.floor(heightTotalInches / 12)
        var heightInches = Math.round(heightTotalInches - heightFt * 12)
        // console.log('Height Ft Inch', heightFt, heightInches)
        return heightFt + ' ft ' + heightInches + ' inches'
      } else {
        return ''
      }
    },
    convertHeightToCms (heightFtInch) {
      // console.log("convertHeightToCms", heightFtInch, this.hasValue(heightFtInch))
      if (this.hasValue(heightFtInch)) {
        var heightFt = heightFtInch.substr(0, 1)
        var heightInches = heightFtInch.substr(5, 7)
        // console.log("Height Ft Inch", heightFt, heightInches);
        var heightCms =
        parseFloat(heightFt) * 30.48 + parseFloat(heightInches) * 2.54
        // console.log("heightCms", heightCms);
        return heightCms
      } else {
        return ''
      }
    },
    camelToSnake (key) {
      return key.replace(/([A-Z])/g, '_$1').toLowerCase()
    },
    snakeToCamel (s) {
      return s.replace(/([-_][a-z])/ig, ($1) => {
        return $1.toUpperCase()
          .replace('-', '')
          .replace('_', '')
      })
    }
  }
}
