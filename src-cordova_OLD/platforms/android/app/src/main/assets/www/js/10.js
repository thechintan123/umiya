(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[10],{"9fe4":function(e,s,r){"use strict";r.r(s);var a=function(){var e=this,s=e.$createElement,r=e._self._c||s;return r("div",{staticClass:"fit column"},[r("banner",{directives:[{name:"show",rawName:"v-show",value:e.successProcess,expression:"successProcess"}],attrs:{isSuccess:!0,iconName:"done_outline",bannerTitle:e.successMessage}}),r("progressBar",{directives:[{name:"show",rawName:"v-show",value:e.showProgressBar,expression:"showProgressBar"}]}),r("spinner",{directives:[{name:"show",rawName:"v-show",value:e.showProgressBar,expression:"showProgressBar"}]}),r("q-card",{attrs:{bordered:""}},[r("banner",{attrs:{iconName:"vpn_key",bannerTitle:"Forgot Password"}}),r("q-card-section",[r("q-form",{ref:"forgotPasswordForm",attrs:{"no-reset-focus":"",greedy:""},on:{submit:function(s){return s.preventDefault(),e.forgotPassword(s)},reset:e.resetForm}},[r("q-input",{attrs:{outlined:"",label:"Email","lazy-rules":"",tabIndex:"1",rules:[function(e){return!!e||"Please type something"},function(s){return e.checkEmail(s)||"Please enter valid email address."}],clearable:"",dense:""},model:{value:e.formData.email,callback:function(s){e.$set(e.formData,"email",s)},expression:"formData.email"}}),r("div",{staticClass:"row"},[r("q-space"),r("q-btn",{attrs:{tabIndex:"2",label:"Reset Password",type:"submit","icon-right":"keyboard_arrow_right",color:"primary"}})],1)],1)],1)],1)],1)},o=[],t=r("664d"),n=r("3293"),c=r("7338"),i=r.n(c),l={mixins:[t["a"],n["a"]],data:function(){return{formData:{email:""},successProcess:!1,successMessage:"Password has been reset. Please check your email.",showProgressBar:!1}},methods:{forgotPassword:function(){var e=this;this.showProgressBar=!0;var s=this.formData.email;i.a.post("https://thechintan123.pythonanywhere.com/api/forgot_password/"+s).then((function(s){e.$q.notify({type:"positive",message:e.successMessage}),e.successProcess=!0,e.$refs.forgotPasswordForm.reset(),e.showProgressBar=!1})).catch((function(s){e.showErrorDialog(s),e.showProgressBar=!1,e.successProcess=!1}))},resetForm:function(){this.formData.email=""}},components:{progressBar:r("5629").default,spinner:r("b62d").default,banner:r("8bae").default}},u=l,d=r("a6c2"),f=Object(d["a"])(u,a,o,!1,null,"dd0b6e82",null);s["default"]=f.exports},f8ac:function(e,s,r){"use strict";r.r(s);var a=function(){var e=this,s=e.$createElement,r=e._self._c||s;return r("q-page",{attrs:{padding:""}},[r("forgot-password")],1)},o=[],t={components:{"forgot-password":r("9fe4").default}},n=t,c=r("a6c2"),i=Object(c["a"])(n,a,o,!1,null,"3a83dd54",null);s["default"]=i.exports}}]);