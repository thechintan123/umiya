(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{"1a01":function(t,e,a){t.exports=a.p+"img/LogoMakr_Ring_RED.1bce3379.png"},"2da0":function(t,e,a){"use strict";var r=a("a331"),n=a.n(r);n.a},"713b":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-layout",{attrs:{view:"hHh lpR fFf"}},[r("link",{attrs:{href:"https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap",rel:"stylesheet"}}),r("q-header",{staticClass:"bg-primary text-white",attrs:{elevated:"","height-hint":"98"}},[r("q-toolbar",[r("q-btn",{attrs:{dense:"",flat:"",round:"",icon:"menu"},on:{click:function(e){t.left=!t.left}}}),r("q-toolbar-title",[r("div",{staticClass:"row"},[r("div",{staticClass:"col-auto q-mr-xs"},[r("q-avatar",{attrs:{square:"",size:"42px"}},[r("img",{attrs:{src:a("1a01"),size:"50%"}})])],1),r("div",{staticClass:"col-auto text-secondary UM_title",staticStyle:{"font-family":"'Great Vibes', cursive","font-size":"36px"}},[t._v("\n          UmiyaMatrimony."),r("span",{staticClass:"text-dark"},[t._v("com")])])])])],1)],1),r("q-drawer",{attrs:{"content-class":"bg-secondary",breakpoint:600,"show-if-above":"",side:"left",elevated:"",width:250},model:{value:t.left,callback:function(e){t.left=e},expression:"left"}},t._l(t.menuList,(function(e,a){return r("q-list",{key:a},[r("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"text-grey-1",attrs:{clickable:"",active:"Outbox"===e.label,to:e.link}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{name:e.icon}})],1),r("q-item-section",[t._v("\n                "+t._s(e.label)+"\n              ")])],1),e.separator?r("q-separator"):t._e()],1)})),1),r("q-page-container",[r("router-view")],1)],1)},n=[],o=(a("8e6e"),a("8a81"),a("ac6a"),a("cadf"),a("06db"),a("456d"),a("9523")),i=a.n(o),s=a("2f62");function c(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function l(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?c(Object(a),!0).forEach((function(e){i()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var u=[{icon:"account_circle",label:"Login",link:"/login",separator:!0},{icon:"person_add",label:"Register",link:"/register",separator:!0},{icon:"search",label:"Search",link:"/search",separator:!0}],p={data:function(){return{drawer:!1,left:!1,menuList:u}},computed:l({},Object(s["d"])("auth",["loggedIn"])),methods:l(l({},Object(s["b"])("auth",["logoutUser"])),{},{logout:function(){this.logoutUser()}}),watch:{loggedIn:function(t){t?this.$q.notify("You are now logged in"):this.$q.notify("You are now logged out")}}},f=p,b=(a("2da0"),a("2877")),d=Object(b["a"])(f,r,n,!1,null,null,null);e["default"]=d.exports},a331:function(t,e,a){}}]);