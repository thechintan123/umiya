(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[10],{7746:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("h4",[e._v("Register")]),r("q-form",{staticClass:"q-gutter-md",on:{submit:function(t){return t.preventDefault(),e.register(t)}}},[r("q-input",{ref:"email",attrs:{outlined:"",label:"Email","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}],dense:""},model:{value:e.formData.email,callback:function(t){e.$set(e.formData,"email",t)},expression:"formData.email"}}),r("q-input",{ref:"password",attrs:{outlined:"","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}],label:"Password",type:"password",dense:""},model:{value:e.formData.password,callback:function(t){e.$set(e.formData,"password",t)},expression:"formData.password"}}),r("q-btn",{attrs:{label:"Submit",type:"submit",color:"primary"}})],1)],1)},o=[],s=(r("8e6e"),r("8a81"),r("ac6a"),r("cadf"),r("06db"),r("456d"),r("9523")),a=r.n(s),i=r("2f62");function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var u={data:function(){return{formData:{email:"",password:""}}},methods:c(c({},Object(i["b"])("auth",["registerUser"])),{},{register:function(){this.registerUser(this.formData)},showNotif:function(e){this.$q.notify({message:e,color:"purple"})}}),computed:c({},Object(i["d"])("auth",["loggedIn"])),watch:{loggedIn:function(e){e&&this.showNotif("You have successfully registered")}}},f=u,p=r("2877"),d=Object(p["a"])(f,n,o,!1,null,"6c9f424d",null);t["default"]=d.exports}}]);