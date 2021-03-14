const fcm = {
  trySomeTimes(asyncFunc, onSuccess, onFailure, customTries) {
    var tries = typeof customTries === "undefined" ? 100 : customTries;
    var interval = setTimeout(function () {
      if (typeof asyncFunc !== "function") {
        onSuccess("Unavailable");
        return;
      }
      asyncFunc()
        .then(function (result) {
          if ((result !== null && result !== "") || tries < 0) {
            onSuccess(result);
          } else {
            trySomeTimes(asyncFunc, onSuccess, onFailure, tries - 1);
          }
        })
        .catch(function (e) {
          clearInterval(interval);
          onFailure(e);
        });
    }, 100);
  },
  getToken() { 
    this.trySomeTimes(
      FCM.getToken,
      function (token) {
        console.log("Started listening FCM as " + token);
      },
      function (error) {
        console.log("Error on listening for FCM token: " + error);
      }
    )
  },
  clearAllNotifications() {
    FCM.clearAllNotifications()
  },
  setupOnTokenRefresh() {
    FCM.eventTarget.addEventListener(
      "tokenRefresh",
      function (data) {
        console.log("FCM Token refreshed to " + data.detail)
      },
      false
    );
  },
  setupOnNotification() {
    FCM.eventTarget.addEventListener(
      "notification",
      function (data) {
        console.log("notification:" + JSON.stringify(data.detail, null, 2))
      },
      false
    );
    FCM.getInitialPushPayload()
      .then((payload) => {
        console.log(
          "Initial Payload" + JSON.stringify(payload, null, 2)
        )
      })
      .catch((error) => {
        console.log(
          "Initial Payload Error" + JSON.stringify(error, null, 2)
        )
      })
  },  
  init() {
    this.clearAllNotifications()
    this.getToken()
    this.setupOnTokenRefresh()
    this.setupOnNotification()
  }
}

export default fcm