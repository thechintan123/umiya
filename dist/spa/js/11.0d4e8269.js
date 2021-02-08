(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{"641f":function(s,e,r){"use strict";r.r(e);var a=function(){var s=this,e=s.$createElement,r=s._self._c||e;return r("q-page",{staticClass:"flex",attrs:{padding:""}},[r("changePassword")],1)},n=[],t={components:{changePassword:r("eb58").default}},o=t,i=r("2877"),c=Object(i["a"])(o,a,n,!1,null,null,null);e["default"]=c.exports},eb58:function(s,e,r){"use strict";r.r(e);var a=function(){var s=this,e=s.$createElement,r=s._self._c||e;return r("div",{staticClass:"fit column"},[r("banner",{directives:[{name:"show",rawName:"v-show",value:s.successProcess,expression:"successProcess"}],attrs:{isSuccess:!0,iconName:"done_outline",bannerTitle:"Your password has been changed successfully"}}),r("q-card",[s.showProgressBar?r("progressBar"):s._e(),s.showProgressBar?r("spinner"):s._e(),r("q-form",{ref:"changePasswordForm",attrs:{"no-reset-focus":"",greedy:""},on:{reset:s.onReset}},[r("banner",{attrs:{iconName:"vpn_key",bannerTitle:"Change Password"}}),r("q-card-section",[r("q-input",{ref:"password",attrs:{tabindex:"1",outlined:"",rules:[function(s){return!!s||"Field is required"}],"lazy-rules":"",label:"Current Password*",dense:"",clearable:"",type:s.isCurrentPwd?"password":"text",hint:"Password with toggle",maxlength:"50"},scopedSlots:s._u([{key:"append",fn:function(){return[r("q-icon",{staticClass:"cursor-pointer",attrs:{name:s.isCurrentPwd?"visibility_off":"visibility",clearable:""},on:{click:function(e){s.isCurrentPwd=!s.isCurrentPwd}}})]},proxy:!0}]),model:{value:s.params.currentPassword,callback:function(e){s.$set(s.params,"currentPassword",e)},expression:"params.currentPassword"}}),r("q-input",{ref:"password",attrs:{tabindex:"2",outlined:"",rules:[function(s){return!!s||"Field is required"},function(s){return s.length>6||"Minimum Password length should be greater than 6"}],"lazy-rules":"",label:"New Password*",dense:"",clearable:"",type:s.isNewPwd?"password":"text",hint:"Password with toggle",maxlength:"50"},scopedSlots:s._u([{key:"append",fn:function(){return[r("q-icon",{staticClass:"cursor-pointer",attrs:{name:s.isNewPwd?"visibility_off":"visibility",clearable:""},on:{click:function(e){s.isNewPwd=!s.isNewPwd}}})]},proxy:!0}]),model:{value:s.params.newPassword,callback:function(e){s.$set(s.params,"newPassword",e)},expression:"params.newPassword"}}),r("q-input",{ref:"password",attrs:{outlined:"",tabindex:"3",rules:[function(s){return!!s||"Field is required"},function(e){return s.checkConfirmPassword(e,s.params.newPassword)||"Password & Confirm Password are not same"}],"lazy-rules":"",label:"Confirm New Password*",dense:"",clearable:"",type:"Password",maxlength:"50"},model:{value:s.params.confirmNewPassword,callback:function(e){s.$set(s.params,"confirmNewPassword",e)},expression:"params.confirmNewPassword"}}),r("div",{staticClass:"row"},[r("q-btn",{attrs:{flat:"",color:"primary",type:"reset",label:"Reset"}}),r("q-space"),r("q-btn",{attrs:{color:"primary",label:"Change Password"},on:{click:s.submitForm}})],1)],1)],1)],1)],1)},n=[],t=r("bc3a"),o=r.n(t),i=r("7b33"),c=r("1278"),l={mixins:[i["a"],c["a"]],data:function(){return{params:{currentPassword:"",newPassword:"",confirmNewPassword:""},showProgressBar:!1,isCurrentPwd:!0,isNewPwd:!0,successProcess:!1}},methods:{onReset:function(){this.params.currentPassword="",this.params.newPassword="",this.params.confirmNewPassword=""},submitForm:function(){var s=this;this.showProgressBar=!0,this.$refs.changePasswordForm.validate().then((function(e){if(e){var r=localStorage.getItem("user"),a=JSON.parse(r);s.params.email=a.email,s.changePassword(s.params)}else s.showProgressBar=!1}))},changePassword:function(s){var e=this;return o.a.post("https://www.umiyamatrimony.com/api/change_password",s).then((function(s){s.data;e.successProcess=!0,e.showNotification("positive","Password has been changed successfully"),e.$refs.changePasswordForm.reset(),e.showProgressBar=!1})).catch((function(s){e.showErrorDialog(s)}))}},components:{progressBar:r("5c84").default,spinner:r("375d").default,banner:r("8748").default}},u=l,d=r("2877"),w=Object(d["a"])(u,a,n,!1,null,null,null);e["default"]=w.exports}}]);