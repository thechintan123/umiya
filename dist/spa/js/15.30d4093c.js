(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[15],{"1a3e":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-page",{staticClass:"flex",attrs:{padding:""}},[r("profile")],1)},i=[],o=r("1278"),n={mixins:[o["a"]],components:{profile:r("66aa").default},beforeMount:function(){this.checkUserLoggedIn()}},s=n,l=r("2877"),c=Object(l["a"])(s,a,i,!1,null,null,null);t["default"]=c.exports},"66aa":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"fit column"},[e.showfield?r("q-card",[r("banner",{attrs:{iconName:"assignment_ind",bannerTitle:"Welcome "+e.role}}),r("q-card-section",[r("q-item",[r("q-item-label",{staticClass:"text-h6 text-capitalize"},[e._v("Welcome, "+e._s(e.userDetail.firstName)+" "+e._s(e.userDetail.lastName))])],1),r("q-item",{attrs:{dense:""}},[r("q-item-label",[e._v("Your Profile ID is  "),r("b",[e._v(e._s(e.userDetail.id))])])],1),r("q-item",[r("q-item-section",[r("q-item-label",[e._v("Your Email is "),r("b",[e._v(" "+e._s(e.userDetail.email))])]),r("q-item-label",{attrs:{caption:""}},[e._v("\n                All notifications from UmiyaMatrimony.com will be sent to this email.\n            ")])],1)],1),"admin"===e.role?r("q-item",{attrs:{dense:""}},[r("q-item-label",[e._v("Your Role is   "),r("b",[e._v(e._s(e.role))])])],1):[r("q-item",[r("q-item-section",[r("q-item-label",[e._v("Your Profile Status is  "),r("b",[e._v(e._s(e.userDetail.status.name)+" ")]),r("q-icon",{staticClass:"vertical-middle no-padding no-margin",attrs:{name:e.getIcon,color:"primary",size:"lg"}})],1),"Correction"===e.userDetail.status.name?r("q-item-label",{attrs:{lines:3}},[e._v("\n              Correction Comments from Admin : "),r("b",[e._v(e._s(e.userDetail.correctionComments))])]):e._e(),r("q-item-label",{attrs:{caption:"",lines:3}},[e._v("\n              "+e._s(e.getProfileStatusMessage)+"\n            ")])],1)],1),r("q-item",[r("q-item-section",[r("q-item-label",[e._v("Your Primary Contact is  "),r("b",[e._v(e._s(e.userDetail.primaryContact)+" ")])]),r("q-item-label",{attrs:{caption:"",lines:2}},[e._v("\n              You will be contacted by other party on this contact number.\n              Please ensure to keep your contact number active.\n            ")])],1)],1)]],2)],1):e._e()],1)},i=[],o=(r("8e6e"),r("8a81"),r("ac6a"),r("cadf"),r("06db"),r("456d"),r("7f7f"),r("9523")),n=r.n(o),s=r("bc3a"),l=r.n(s),c=r("1278"),u=r("4cea"),m=r("2f62");function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){n()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var d={mixins:[c["a"],u["a"]],components:{banner:r("8748").default},data:function(){return{showProgressBar:!0,showfield:!1,userDetail:{}}},computed:p(p({},Object(m["e"])("auth",["role"])),{},{getIcon:function(){var e=this.userDetail.status.name;return"Registered"===e?"keyboard":"Approved"===e?"verified_user":"Correction"===e?"feedback":"Deactivated"===e?"visibility_off":""},getProfileStatusMessage:function(){var e=this.userDetail.status.name;return"Registered"===e?"NEXT STEP > Admin team will approve your profile.Once approved, you can search and contact the other profiles.":"Approved"===e?"NEXT STEP > You can search and contact the other profiles.":"Correction"===e?"NEXT STEP > We have also sent an email for correction steps. Please ensure that your name and date of birth matches to that in your ID Proof. Please correct your profile so that we can verify and approve.":"Deactivated"===e?"NEXT STEP > We have deactivated your profile. Please contact us to Activate your profile. If your profile will be deactivated for long, we will delete your profile completely.":""}}),mounted:function(){var e=this;this.showProgressBar=!0;var t=JSON.parse(localStorage.getItem("user"));if(null!==t){var r=t.user_details_id;l.a.get("http://localhost:5000/api/users/"+r).then((function(t){var r=t.data,a={};for(var i in r)a[e.snakeToCamel(i)]=r[i];e.userDetail=a,e.showfield=!0,e.showProgressBar=!1})).catch((function(t){e.showErrorDialog(t)}))}}},b=d,v=r("2877"),h=Object(v["a"])(b,a,i,!1,null,null,null);t["default"]=h.exports}}]);