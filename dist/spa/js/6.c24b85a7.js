(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{"1a01":function(t,e,r){t.exports=r.p+"img/LogoMakr_Ring_RED.1bce3379.png"},"2da0":function(t,e,r){"use strict";var n=r("a331"),o=r.n(n);o.a},"713b":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-layout",{attrs:{view:"hHh lpR fFf"}},[n("link",{attrs:{href:"https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap",rel:"stylesheet"}}),n("q-header",{staticClass:"bg-primary text-white",attrs:{elevated:"","height-hint":"98"}},[n("q-toolbar",[n("q-btn",{attrs:{dense:"",flat:"",round:"",icon:"menu"},on:{click:function(e){t.left=!t.left}}}),n("q-toolbar-title",[n("div",{staticClass:"row"},[n("div",{staticClass:"col-auto q-mr-xs"},[n("q-avatar",{attrs:{square:"",size:"42px"}},[n("img",{attrs:{src:r("1a01"),size:"50%"}})])],1),n("div",{staticClass:"col-auto text-secondary UM_title",staticStyle:{"font-family":"'Great Vibes', cursive","font-size":"36px"}},[n("span",{staticClass:"text-white"},[t._v("Umiya")]),t._v("Matrimony.\n              "),n("span",{staticClass:"text-white"},[t._v("com")])])])])],1)],1),n("q-drawer",{attrs:{"content-class":"bg-secondary",breakpoint:600,"show-if-above":"",side:"left",elevated:"",width:250},model:{value:t.left,callback:function(e){t.left=e},expression:"left"}},t._l(t.filteredMenuList,(function(e,r){return n("q-list",{key:r},[n("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"text-grey-1",attrs:{exact:"",to:e.link}},[n("q-item-section",{attrs:{avatar:""}},[n("q-icon",{attrs:{name:e.icon}})],1),n("q-item-section",[t._v(t._s(e.label))])],1),e.separator?n("q-separator"):t._e()],1)})),1),n("q-page-container",[n("router-view")],1)],1)},o=[],a=(r("ac4d"),r("5df3"),r("1c4c"),r("7f7f"),r("6b54"),r("8e6e"),r("8a81"),r("ac6a"),r("cadf"),r("06db"),r("456d"),r("9523")),i=r.n(a),l=r("2f62");function s(t){if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(t=c(t))){var e=0,r=function(){};return{s:r,n:function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,o,a=!0,i=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return a=t.done,t},e:function(t){i=!0,o=t},f:function(){try{a||null==n.return||n.return()}finally{if(i)throw o}}}}function c(t,e){if(t){if("string"===typeof t)return u(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?u(t,e):void 0}}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function f(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function p(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?f(Object(r),!0).forEach((function(e){i()(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var d=[{icon:"home",label:"Home",link:"/",separator:!0},{icon:"toggle_on",label:"Login",link:"/login",separator:!0,loggedIn:!1},{icon:"toggle_off",label:"Logout",link:"/logout",separator:!0,loggedIn:!0,clicable:!0},{icon:"person_add",label:"Register",link:"/register",separator:!0},{icon:"search",label:"Search",link:"/search",separator:!0},{icon:"assignment_ind",label:"Profile",link:"/profile",loggedIn:!0,separator:!0},{icon:"edit",label:"Update Profile",link:"/update-profile",loggedIn:!0,separator:!0}],g={data:function(){return{drawer:!1,left:!0,menuList:d}},methods:p(p({},Object(l["b"])("auth",["logoutUser"])),{},{logout:function(){this.logoutUser(),this.$q.notify({type:"positive",message:"You are now logged out"}),this.$router.push("/")},showMenuItem:function(t){var e=this.loggedIn,r=t.loggedIn;return void 0===r||null===r||(!1===r?!1===e:!0===r&&!0===e)}}),computed:p(p({},Object(l["e"])("auth",["loggedIn"])),{},{filteredMenuList:function(){var t,e,r,n=[],o=this.loggedIn,a=s(this.menuList);try{for(a.s();!(r=a.n()).done;)if(e=r.value,t=e.loggedIn,void 0===t||null===t)n.push(e);else if(!1===t){if(!1!==o)continue;n.push(e)}else{if(!0!==t)continue;if(!0!==o)continue;n.push(e)}}catch(i){a.e(i)}finally{a.f()}return n}})},b=g,h=(r("2da0"),r("2877")),y=Object(h["a"])(b,n,o,!1,null,null,null);e["default"]=y.exports},a331:function(t,e,r){}}]);