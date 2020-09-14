import { Dialog } from 'quasar'

export default {
  methods: {
    showErrorDialog (error) {
        let errorMessage = ""
        errorMessage = '<b>' + error.toString() + '</b>';

        if(this.hasKey(error, 'response.data.message')){
            errorMessage += '<br><br>Server Message :' +error.response.data.message
        }
        if(this.hasKey(error, 'response.data.error')){
            errorMessage += '<br>Server Error :' +error.response.data.error
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
      }
      ,
      showMessageDialog (message) {
        Dialog.create({
          title: "<b><u>Warning!</u></b>",
          persistent: true,
          transitionShow: 'scale',
          transitionHide: 'scale',
          message: message,
          html: true
        })
      }      
      ,
      hasKey(obj, key) {
        return key.split(".").every(function(x) {
            if(typeof obj != "object" || obj === null || ! x in obj)
                return false;
            obj = obj[x];
            return true;
        });
    }
    ,

    //need to write function which will return value from nested object
  //   ,
  //   getKeyValue(obj, key) {
  //     console.log("getKeyValue 1",obj,key, this.hasKey(obj,key))
  //     var value = key.split(".").every(function(x) {
  //         if(typeof obj != "object" || obj === null || ! x in obj)
  //             return false;
  //         obj = obj[x];
  //         console.log("getKeyValue 2",obj)
  //         return obj;
  //     });
  //     console.log("getKeyValue 3",value)
  //     return value
  // }
}
}




  