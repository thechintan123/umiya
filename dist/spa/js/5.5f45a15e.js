(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{"013f":function(t,e,r){"use strict";r.r(e);var o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"q-pa-md fit column"},[r("q-card",{staticClass:"q-pa-md",attrs:{flat:"",bordered:""}},[r("q-banner",{staticClass:"q-mb-md bg-grey-3",scopedSlots:t._u([{key:"avatar",fn:function(){return[r("q-icon",{attrs:{name:"fas fa-sign-in-alt",color:"primary"}})]},proxy:!0}])},[t._v("\n      Login\n    ")]),r("q-card-section",[r("q-form",{ref:"loginForm",attrs:{greedy:""},on:{submit:function(e){return e.preventDefault(),t.login(e)}}},[r("q-input",{attrs:{outlined:"",label:"Email","lazy-rules":"",rules:[function(t){return!!t||"Please type something"},function(e){return t.checkEmail(e)||"Please enter valid email address."}],clearable:"",dense:""},model:{value:t.formData.email,callback:function(e){t.$set(t.formData,"email",e)},expression:"formData.email"}}),r("q-input",{attrs:{outlined:"","lazy-rules":"",rules:[function(t){return!!t||"Please type something"}],label:"Password",type:t.isPwd?"password":"text",clearable:"",dense:""},scopedSlots:t._u([{key:"append",fn:function(){return[r("q-icon",{staticClass:"cursor-pointer",attrs:{name:t.isPwd?"visibility_off":"visibility"},on:{click:function(e){t.isPwd=!t.isPwd}}})]},proxy:!0}]),model:{value:t.formData.password,callback:function(e){t.$set(t.formData,"password",e)},expression:"formData.password"}}),r("div",{staticClass:"row"},[r("q-space"),r("q-btn",{attrs:{label:"Login",type:"submit","icon-right":"keyboard_arrow_right",color:"primary"}})],1)],1)],1)],1)],1)},a=[],n=(r("8e6e"),r("8a81"),r("ac6a"),r("cadf"),r("06db"),r("456d"),r("9523")),s=r.n(n),i=r("2f62"),c=r("366c");function l(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function u(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?l(Object(r),!0).forEach((function(e){s()(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var f={mixins:[c["a"]],data:function(){return{isPwd:!0,formData:{email:"",password:""}}},methods:u(u({},Object(i["b"])("auth",["loginUser","logoutUser"])),{},{login:function(){console.log("formData",this.formData)},logout:function(){this.logoutUser()},showNotif:function(t){this.$q.notify({message:t,color:"purple"})}}),computed:u({},Object(i["c"])("auth",["loggedIn"])),watch:{loggedIn:function(t){t?this.showNotif("You are now logged in"):this.showNotif("You are now logged out")}}},d=f,p=r("2877"),m=Object(p["a"])(d,o,a,!1,null,"53bf21bc",null);e["default"]=m.exports},"366c":function(t,e,r){"use strict";e["a"]={methods:{checkEmail:function(t){var e=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return e.test(String(t).toLowerCase())}}}}}]);