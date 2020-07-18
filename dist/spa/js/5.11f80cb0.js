(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{"1feb":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"fit column"},[a("q-linear-progress",{directives:[{name:"show",rawName:"v-show",value:e.showProgressBar,expression:"showProgressBar"}],attrs:{indeterminate:"",size:"10px",color:"secondary"}}),a("q-spinner",{directives:[{name:"show",rawName:"v-show",value:e.showProgressBar,expression:"showProgressBar"}],staticClass:"z-top fixed-center",attrs:{color:"secondary",size:"3em",thickness:10}}),e.successRegistration?a("q-card",[a("q-banner",{staticClass:"bg-grey-3 q-mb-xs",scopedSlots:e._u([{key:"avatar",fn:function(){return[a("q-icon",{attrs:{name:"assignment_turned_in",color:"secondary"}})]},proxy:!0}],null,!1,1928033596)},[e._v("\n      Successful Registration!!\n    ")]),a("q-card-section",[e._v("\n      Thank you\n      "),a("span",{staticClass:"text-weight-bolder text-capitalize"},[e._v(e._s(e.formData.firstName))]),e._v(" for successful registration.\n      "),a("br"),e._v("Your Profile ID is\n      "),a("b",[e._v(e._s(e.user_id))]),e._v(".\n      Going forward, you will be notified on your\n      "),a("b",[e._v(e._s(e.formData.email))]),e._v(".\n      "),a("br"),a("br"),a("b",[e._v("Next Steps:")]),a("br"),a("q-item",[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{color:"primary",name:"done_outline"}})],1),a("q-item-section",[a("q-item-label",[e._v("Admin Approval")]),a("q-item-label",{attrs:{caption:""}},[e._v("\n            Admin will verify your ID Proof and approve the profile.\n            You will be notified on "+e._s(e.formData.email)+".\n          ")])],1)],1),a("q-item",[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{color:"secondary",name:"fas fa-heart"}})],1),a("q-item-section",[a("q-item-label",[e._v("Self Search & Contact")]),a("q-item-label",{attrs:{caption:""}},[e._v("Search your match and contact the profile directly.")])],1)],1)],1)],1):e._e(),e.successRegistration?e._e():a("q-card",[a("q-banner",{staticClass:"bg-grey-3 q-mb-xs",scopedSlots:e._u([{key:"avatar",fn:function(){return[a("q-icon",{attrs:{name:"account_circle",color:"primary"}})]},proxy:!0}],null,!1,1850744782)},[e._v("\n      Register on website!!\n    ")]),a("q-tabs",{staticClass:"text-secondary",attrs:{dense:"","active-color":"primary","indicator-color":"primary","narrow-indicator":"",align:"justify"},on:{click:e.tabChange},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[a("q-tab",{attrs:{name:"basic",icon:"fas fa-user-cog",label:"Basic"}},[e.basicHasError?a("q-badge",{attrs:{align:"top",color:"blue",floating:""}},[e._v("\n          Error\n          "),a("q-icon",{staticClass:"q-ml-sm",attrs:{name:"warning",color:"yellow"}})],1):e._e()],1),a("q-tab",{attrs:{name:"personal",icon:"ballot",label:"Personal"}},[e.personalHasError?a("q-badge",{attrs:{align:"top",color:"blue",floating:""}},[e._v("\n          Error\n          "),a("q-icon",{staticClass:"q-ml-sm",attrs:{name:"warning",color:"yellow"}})],1):e._e()],1),a("q-tab",{attrs:{name:"upload",icon:"add_a_photo",label:"Upload"}},[e.isErrorPhoto||e.isErrorProof?a("q-badge",{attrs:{align:"top",color:"blue",floating:""}},[e._v("\n          Error\n          "),a("q-icon",{staticClass:"q-ml-sm",attrs:{name:"warning",color:"yellow"}})],1):e._e()],1)],1),a("q-separator"),a("q-tab-panels",{attrs:{"keep-alive":"",animated:""},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[a("q-tab-panel",{attrs:{name:"basic"}},[a("q-form",{ref:"basicForm",attrs:{greedy:""}},[a("q-input",{attrs:{outlined:"",tabindex:"1",label:"Email (Login ID)*",rules:[function(e){return!!e||"Field is required"},function(t){return e.checkEmail(t)||"Please enter valid email address."}],dense:"",clearable:"",hint:"Hint: This Email will be used as login ID"},model:{value:e.formData.email,callback:function(t){e.$set(e.formData,"email",t)},expression:"formData.email"}}),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("q-input",{ref:"password",attrs:{tabindex:"2",outlined:"",rules:[function(e){return!!e||"Field is required"}],"lazy-rules":"",label:"Password*",dense:"",clearable:"",type:e.isPwd?"password":"text",hint:"Password with toggle"},scopedSlots:e._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:e.isPwd?"visibility_off":"visibility",clearable:""},on:{click:function(t){e.isPwd=!e.isPwd}}})]},proxy:!0}],null,!1,2649845019),model:{value:e.formData.password,callback:function(t){e.$set(e.formData,"password",t)},expression:"formData.password"}})],1),a("div",{staticClass:"col"},[a("q-input",{attrs:{tabindex:"3",outlined:"",rules:[function(e){return!!e||"Field is required"},function(t){return e.checkConfirmPassword(t)||"Password & Confirm Password are not same"}],"lazy-rules":"",label:"Confirm Password*",type:"password",dense:"",clearable:""},model:{value:e.formData.confirmPassword,callback:function(t){e.$set(e.formData,"confirmPassword",t)},expression:"formData.confirmPassword"}})],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("q-input",{attrs:{tabindex:"4",outlined:"",label:"First Name*",rules:[function(e){return!!e||"Field is required"}],dense:"",clearable:""},model:{value:e.formData.firstName,callback:function(t){e.$set(e.formData,"firstName",t)},expression:"formData.firstName"}})],1),a("div",{staticClass:"col"},[a("q-input",{attrs:{tabindex:"5",outlined:"",label:"Last Name*",rules:[function(e){return!!e||"Field is required"}],dense:"",clearable:""},model:{value:e.formData.lastName,callback:function(t){e.$set(e.formData,"lastName",t)},expression:"formData.lastName"}})],1)]),a("q-select",{attrs:{outlined:"",tabindex:"6","option-value":"id","option-label":"name",options:e.genderOptions,dense:"","options-dense":"",clearable:"",label:"Gender*",rules:[function(e){return!!e||"Field is required"}]},model:{value:e.formData.gender,callback:function(t){e.$set(e.formData,"gender",t)},expression:"formData.gender"}}),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("q-input",{attrs:{tabindex:"7",outlined:"",dense:"","stack-label":"",type:"date",label:"Date of Birth*",rules:[function(e){return!!e||"Field is required"}],clearable:""},on:{blur:e.calculateAge},model:{value:e.formData.dateOfBirth,callback:function(t){e.$set(e.formData,"dateOfBirth",t)},expression:"formData.dateOfBirth"}})],1),a("div",{staticClass:"col"},[a("q-input",{attrs:{outlined:"",label:"Age",readonly:"",disable:"",dense:""},model:{value:e.formData.age,callback:function(t){e.$set(e.formData,"age",t)},expression:"formData.age"}})],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("q-radio",{attrs:{tabindex:"8",val:"India","left-label":"",label:"Living in : India"},model:{value:e.formData.country,callback:function(t){e.$set(e.formData,"country",t)},expression:"formData.country"}}),a("q-radio",{attrs:{tabindex:"8",val:"Other","left-label":"",label:"Other"},model:{value:e.formData.country,callback:function(t){e.$set(e.formData,"country",t)},expression:"formData.country"}})],1),a("div",{staticClass:"col"},[a("q-select",{attrs:{tabindex:"8",outlined:"",disable:"India"===e.formData.country,options:e.countryOptions,"option-value":"id","option-label":"name",dense:"","options-dense":"",label:"Other Country","use-input":"","hide-selected":"","fill-input":"",rules:[function(t){return e.checkOtherCountry(t)||"Field is required"}],"input-debounce":"0",clearable:""},on:{filter:e.filterOtherCountry},model:{value:e.formData.otherCountry,callback:function(t){e.$set(e.formData,"otherCountry",t)},expression:"formData.otherCountry"}})],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("q-input",{attrs:{tabindex:"9",outlined:"",dense:"",label:"State*",rules:[function(e){return!!e||"Field is required"}],clearable:""},model:{value:e.formData.state,callback:function(t){e.$set(e.formData,"state",t)},expression:"formData.state"}})],1),a("div",{staticClass:"col"},[a("q-input",{attrs:{tabindex:"10",outlined:"",dense:"",label:"City*",rules:[function(e){return!!e||"Field is required"}],clearable:""},model:{value:e.formData.city,callback:function(t){e.$set(e.formData,"city",t)},expression:"formData.city"}})],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-1"},[a("q-input",{attrs:{outlined:"",dense:"",label:"Code",mask:"##","fill-mask":"",type:"tel",rules:[function(e){return!!e||"Field is required"}]},model:{value:e.tmpData.primaryContactCountryCode,callback:function(t){e.$set(e.tmpData,"primaryContactCountryCode",t)},expression:"tmpData.primaryContactCountryCode"}})],1),a("div",{staticClass:"col-5"},[a("q-input",{attrs:{tabindex:"11",outlined:"",dense:"",label:"Primary Contact*",type:"number",rules:[function(e){return!!e||"Field is required"}],clearable:""},model:{value:e.tmpData.primaryContact,callback:function(t){e.$set(e.tmpData,"primaryContact",t)},expression:"tmpData.primaryContact"}})],1),a("div",{staticClass:"col"},[a("q-input",{attrs:{tabindex:"12",outlined:"",dense:"",label:"Alternate Contact",type:"number",clearable:""},model:{value:e.tmpData.alternateContact,callback:function(t){e.$set(e.tmpData,"alternateContact",t)},expression:"tmpData.alternateContact"}})],1)]),a("q-field",{attrs:{borderless:"",value:e.formData.agreeTnC,rules:[function(e){return!0===e||"Field is required"}]},scopedSlots:e._u([{key:"control",fn:function(){return[a("q-toggle",{attrs:{tabindex:"13","checked-icon":"check",color:"green","unchecked-icon":"clear",label:"Agree Terms & Conditions *",dense:""},model:{value:e.formData.agreeTnC,callback:function(t){e.$set(e.formData,"agreeTnC",t)},expression:"formData.agreeTnC"}})]},proxy:!0}],null,!1,1330284309)}),a("div",{staticClass:"row"},[a("q-space"),a("q-btn",{staticClass:"my-button",attrs:{tabindex:"14",color:"primary",label:"Next >"},on:{click:function(t){return e.submitBasicForm()}}})],1)],1)],1),a("q-tab-panel",{attrs:{name:"personal"}},[a("q-form",{ref:"personalForm",attrs:{greedy:""}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("q-select",{attrs:{"option-value":"id","option-label":"name",options:e.maritalOptions,tabindex:"15",outlined:"",dense:"","options-dense":"",label:"Marital Status*",clearable:"",rules:[function(e){return!!e||"Field is required"}]},model:{value:e.formData.maritalStatus,callback:function(t){e.$set(e.formData,"maritalStatus",t)},expression:"formData.maritalStatus"}})],1),a("div",{staticClass:"col"},[a("q-select",{attrs:{tabindex:"16",clearable:"",outlined:"",dense:"","options-dense":"",label:"Height*",options:e.heightOptions,rules:[function(e){return!!e||"Field is required"}]},model:{value:e.formData.height,callback:function(t){e.$set(e.formData,"height",t)},expression:"formData.height"}})],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("q-select",{attrs:{tabindex:"17",rules:[function(e){return!!e||"Field is required"}],outlined:"",dense:"",clearable:"","options-dense":"","option-value":"id","option-label":"name",options:e.gotraOptions,label:"Gotra*"},model:{value:e.formData.gotra,callback:function(t){e.$set(e.formData,"gotra",t)},expression:"formData.gotra"}})],1),a("div",{staticClass:"col"},[a("q-input",{attrs:{clearable:"",tabindex:"18",outlined:"",dense:"",label:"Original Surname*",rules:[function(e){return!!e||"Field is required"}]},model:{value:e.formData.originalSurname,callback:function(t){e.$set(e.formData,"originalSurname",t)},expression:"formData.originalSurname"}})],1)]),a("q-input",{attrs:{tabindex:"19",clearable:"",outlined:"",label:"Father Name*",rules:[function(e){return!!e||"Field is required"}],dense:""},model:{value:e.formData.fatherName,callback:function(t){e.$set(e.formData,"fatherName",t)},expression:"formData.fatherName"}}),a("q-input",{attrs:{tabindex:"21",clearable:"",outlined:"",label:"Residential Address*",rules:[function(e){return!!e||"Field is required"}],dense:"",placeholder:"Flat/House no, Building Name, Street Name, City, State",hint:"Hint: Flat/House no, Building Name, Street Name, City, State"},model:{value:e.formData.residentialAddress,callback:function(t){e.$set(e.formData,"residentialAddress",t)},expression:"formData.residentialAddress"}}),a("q-input",{attrs:{tabindex:"22",clearable:"",outlined:"",dense:"",label:"Tell us about yourself (Optional)",type:"textarea",placeholder:"Your education, profession, Interest and family",hint:"Hint: Your education, profession, Interest and family"},model:{value:e.formData.aboutYourself,callback:function(t){e.$set(e.formData,"aboutYourself",t)},expression:"formData.aboutYourself"}}),a("div",{staticClass:"text-subtitle1"},[e._v("Partner Preferences")]),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("q-select",{attrs:{tabindex:"23",clearable:"",outlined:"",dense:"","options-dense":"",label:"Age(From)*",options:e.ageFromToOptions,rules:[function(e){return!!e||"Field is required"},function(t){return e.checkAgeFrom(t)||"Age(To) should be greater than Age(From)"}]},model:{value:e.formData.ageFrom,callback:function(t){e.$set(e.formData,"ageFrom",t)},expression:"formData.ageFrom"}})],1),a("div",{staticClass:"col"},[a("q-select",{attrs:{tabindex:"24",clearable:"",outlined:"",dense:"","options-dense":"",label:"Age(To)*",options:e.ageFromToOptions,rules:[function(e){return!!e||"Field is required"},function(t){return e.checkAgeTo(t)||"Age(To) should be greater than Age(From)"}]},model:{value:e.formData.ageTo,callback:function(t){e.$set(e.formData,"ageTo",t)},expression:"formData.ageTo"}})],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("q-select",{attrs:{tabindex:"25",clearable:"",outlined:"",dense:"","options-dense":"",label:"Height(From)*",options:e.heightOptions,rules:[function(e){return!!e||"Field is required"},function(t){return e.checkHeightFrom(t)||"Height(To) should be greater than Height(From)"}]},model:{value:e.formData.heightFrom,callback:function(t){e.$set(e.formData,"heightFrom",t)},expression:"formData.heightFrom"}})],1),a("div",{staticClass:"col"},[a("q-select",{attrs:{tabindex:"26",clearable:"",outlined:"",dense:"","options-dense":"",label:"Height(To)*",options:e.heightOptions,rules:[function(e){return!!e||"Field is required"},function(t){return e.checkHeightTo(t)||"Height(To) should be greater than Height(From)"}]},model:{value:e.formData.heightTo,callback:function(t){e.$set(e.formData,"heightTo",t)},expression:"formData.heightTo"}})],1)]),a("q-select",{attrs:{tabindex:"27","option-value":"id","option-label":"name",options:e.maritalOptions,outlined:"",dense:"","options-dense":"",label:"Marital Statuses*",rules:[function(e){return e.length>0||"Field is required"}],multiple:"","use-chips":"","input-debounce":"0",hint:"Hint: Multiple Options can be selected"},model:{value:e.formData.maritalStatusPreference,callback:function(t){e.$set(e.formData,"maritalStatusPreference",t)},expression:"formData.maritalStatusPreference"}}),a("q-select",{attrs:{"option-value":"id","option-label":"name",options:e.sourceOfWebsiteOptions,label:"Where do you come to know?",dense:"","options-dense":"",outlined:"",clearable:"",rules:[function(e){return!!e||"Field is required"}]},model:{value:e.formData.sourceOfWebsite,callback:function(t){e.$set(e.formData,"sourceOfWebsite",t)},expression:"formData.sourceOfWebsite"}}),a("div",{staticClass:"row"},[a("q-btn",{attrs:{color:"secondary",flat:"",label:"Back"},on:{click:function(t){e.tab="basic"}}}),a("q-space"),a("q-btn",{attrs:{tabindex:"28",color:"primary",label:"Next >"},on:{click:e.submitPersonalForm}})],1)],1)],1),a("q-tab-panel",{attrs:{name:"upload"}},[a("q-form",{ref:"uploadForm",attrs:{greedy:""}},[a("div",{staticClass:"q-mb-xs"},[a("q-field",{attrs:{"error-message":"Please upload atleast One Photo.",error:e.isErrorPhoto,borderless:"",dense:""},scopedSlots:e._u([{key:"control",fn:function(){return[a("q-uploader",{ref:"photo",staticClass:"my-uploader",attrs:{factory:e.uploadPhoto,label:"Upload Photos (max 4 images)",accept:"image/*, .pdf, .jpg, .jpeg, .gif, .png",multiple:"","max-files":"4","hide-upload-btn":""},on:{added:e.checkPhoto,removed:e.checkPhoto}})]},proxy:!0}],null,!1,1766553829)})],1),a("div",{staticClass:"q-mb-xs"},[a("q-field",{attrs:{"error-message":"Please upload ID Proof.",error:e.isErrorProof,borderless:"",dense:""},scopedSlots:e._u([{key:"control",fn:function(){return[a("q-uploader",{ref:"proof",staticClass:"my-uploader",attrs:{factory:e.uploadProof,label:"Upload ID Proof (only 1 image or PDF)",accept:"image/*, .pdf, .jpg, .jpeg, .gif, .png",color:"accent","hide-upload-btn":""},on:{added:e.checkProof,removed:e.checkProof}})]},proxy:!0}],null,!1,2158992471)})],1),a("div",{staticClass:"row"},[a("q-btn",{attrs:{color:"secondary",flat:"",label:"Back"},on:{click:function(t){e.tab="personal"}}}),a("q-space"),a("q-btn",{attrs:{color:"primary",label:"Submit"},on:{click:e.submitForm}})],1)])],1)],1)],1)],1)},o=[],n=(a("ac4d"),a("5df3"),a("1c4c"),a("6b54"),a("8e6e"),a("8a81"),a("ac6a"),a("cadf"),a("06db"),a("456d"),a("6762"),a("2fdb"),a("7f7f"),a("a34a")),s=a.n(n),i=(a("96cf"),a("c973")),l=a.n(i),c=a("9523"),u=a.n(c),d=a("bc3a"),f=a.n(d),m=a("7b33"),p=a("4cea"),b=a("e37e"),h=a("2f62");function g(e){if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=v(e))){var t=0,a=function(){};return{s:a,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,o,n=!0,s=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return n=e.done,e},e:function(e){s=!0,o=e},f:function(){try{n||null==r.return||r.return()}finally{if(s)throw o}}}}function v(e,t){if(e){if("string"===typeof e)return y(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?y(e,t):void 0}}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}function D(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function q(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?D(Object(a),!0).forEach((function(t){u()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):D(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var C={mixins:[m["a"],p["a"]],data:function(){return{uploadURL:"https://thechintan123.pythonanywhere.com/api/upload",showProgressBar:!1,successRegistration:!1,isPwd:!0,tab:"basic",imageSrc:"",dense:!0,basicHasError:!1,personalHasError:!1,uploadHasError:!1,isErrorProof:!1,isErrorPhoto:!1,user_id:"",countryOptions:[],countryList:[],genderOptions:[],maritalOptions:[],heightOptions:[],ageFromToOptions:[],gotraOptions:[],sourceOfWebsiteOptions:[],tmpData:{primaryContact:"11111111111",primaryContactCountryCode:"91",alternateContact:"22222222222"},formData:{email:"test9@test.com",password:"password",confirmPassword:"password",firstName:"first",lastName:"last",gender:"",dateOfBirth:"1983-09-01",age:36,country:"India",otherCountry:"",state:"state",city:"city",primaryContact:"11111111111",alternateContact:"22222222222",maritalStatus:"",height:"5 ft 0 inch",gotra:"",originalSurname:"Surname",fatherName:"father",residentialAddress:"address",aboutYourself:"about yourself",ageFrom:"30",ageTo:"40",heightFrom:"5 ft 0 inch",heightTo:"6 ft 0 inch",maritalStatusPreference:[],agreeTnC:!1,sourceOfWebsite:""}}},computed:q({},Object(h["d"])("auth",["loggedIn"])),methods:{tabChange:function(){"basic"===this.tab&&this.basicHasError?this.$refs.basicForm.validate():"personal"===this.tab&&this.personalHasError&&this.$refs.personalForm.validate()},submitBasicForm:function(){var e=this;this.$refs.basicForm.validate().then((function(t){t?(e.basicHasError=!1,e.tab="personal"):e.basicHasError=!0}))},submitPersonalForm:function(){var e=this;this.$refs.personalForm.validate().then((function(t){t?(e.personalHasError=!1,e.tab="upload"):e.personalHasError=!0}))},registerUser:function(e){var t=this;return f.a.post("https://thechintan123.pythonanywhere.com/api/users",e).then((function(e){var a=e.data;console.log("Search Success",a),t.user_id=a.user_id,t.$q.notify({type:"positive",message:"Successfully registered"})})).catch((function(e){var t="";t="message"in e.response.data?e.response.data.message:e.response.data.error,console.log(t),Object(b["a"])(t)}))},checkPhoto:function(){console.log("Photo",this.$refs.photo),console.log(this.$refs.photo.files.length),0===this.$refs.photo.files.length?this.isErrorPhoto=!0:this.isErrorPhoto=!1},checkProof:function(){console.log("Proof",this.$refs.photo),console.log(this.$refs.photo.files.length),0===this.$refs.proof.files.length?this.isErrorProof=!0:this.isErrorProof=!1},submitForm:function(){var e=this;return l()(s.a.mark((function t(){return s.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.showProgressBar=!0,"undefined"===typeof e.$refs.basicForm?e.basicHasError=!0:e.submitBasicForm(),"undefined"===typeof e.$refs.personalForm?e.personalHasError=!0:e.submitPersonalForm(),e.checkPhoto(),e.checkProof(),e.basicHasError||e.personalHasError||e.isErrorPhoto||e.isErrorProof){t.next=11;break}return e.formData.primaryContact="+"+e.tmpData.primaryContactCountryCode+" "+e.tmpData.primaryContact,e.formData.alternateContact="+"+e.tmpData.primaryContactCountryCode+" "+e.tmpData.alternateContact,t.next=10,e.registerUser(e.formData);case 10:""!==e.user_id&&(e.$refs.photo.upload(),e.$refs.proof.upload(),e.successRegistration=!0);case 11:e.showProgressBar=!1;case 12:case"end":return t.stop()}}),t)})))()},createHeightList:function(){var e,t,a=4,r=7;for(e=a;e<=r;e++)for(t=0;t<=12;t++)this.heightOptions.push(e+" ft "+t+" inches")},createAgeFromToList:function(){var e,t=18,a=60;for(e=t;e<=a;e++)this.ageFromToOptions.push(e)},calculateAge:function(){this.formData.age=this.computeAge(this.formData.dateOfBirth)},checkOtherCountry:function(e){return"Other"!==this.formData.country||null!==e},checkConfirmPassword:function(e){return this.formData.password===e},checkAgeTo:function(e){return!(e<this.formData.ageFrom)},checkAgeFrom:function(e){return!(e>this.formData.ageTo)},checkHeightTo:function(e){var t=this.formData.heightFrom;return!t||!e||this.compareHeightFromHeightTo(t,e)},checkHeightFrom:function(e){var t=this.formData.heightTo;return!e||!t||this.compareHeightFromHeightTo(e,t)},uploadImage:function(e,t){var a=this;return f.a.post("https://thechintan123.pythonanywhere.com/api/upload",e,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){console.log("uploadImage - Then"),a.$q.notify({type:"positive",message:t+" successfully uploaded"})})).catch((function(e){var t="";t="message"in e.response.data?rror.response.data.message:e.response.data.error,Object(b["a"])(t),console.log("uploadImage - Error - Error Message",t)}))},uploadPhoto:function(e){var t=this;return l()(s.a.mark((function a(){var r;return s.a.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r=new FormData,r.append("file",e[0]),r.append("filetype","photo"),r.append("user_id",t.user_id),console.log("Upload Photo",r,e),a.next=7,t.uploadImage(r,"Photo");case 7:case"end":return a.stop()}}),a)})))()},uploadProof:function(e){var t=this;return l()(s.a.mark((function a(){var r;return s.a.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r=new FormData,r.append("file",e[0]),r.append("filetype","proof"),r.append("user_id",t.user_id),console.log("Upload Proof",r,e[0]),a.next=7,t.uploadImage(r,"Proof");case 7:case"end":return a.stop()}}),a)})))()},filterOtherCountry:function(e,t,a){var r=this;t((function(){var t,a=e.toLowerCase(),o=[],n=g(r.countryList);try{for(n.s();!(t=n.n()).done;){var s=t.value,i=s.name.toLowerCase();i.includes(a)&&o.push(s)}}catch(l){n.e(l)}finally{n.f()}r.countryOptions=o}))}},created:function(){this.createHeightList(),this.createAgeFromToList()},mounted:function(){var e=this;f.a.get("https://thechintan123.pythonanywhere.com/api/lists").then((function(t){e.countryList=t.data.country,e.countryOptions=e.countryList,e.gotraOptions=t.data.gotra,e.sourceOfWebsiteOptions=t.data.where_know,e.maritalOptions=t.data.marital_status,e.genderOptions=t.data.gender})).catch((function(e){console.log(e)}))}},w=C,x=(a("59e7"),a("2877")),k=Object(x["a"])(w,r,o,!1,null,"18e8b4d7",null);t["default"]=k.exports},"4cea":function(e,t,a){"use strict";t["a"]={methods:{computeAge:function(e){var t=Date.parse(e),a=Date.now()-t,r=new Date(a);return Math.abs(r.getUTCFullYear()-1970)+" years"}}}},"59e7":function(e,t,a){"use strict";var r=a("836a"),o=a.n(r);o.a},"7b33":function(e,t,a){"use strict";t["a"]={methods:{checkEmail:function(e){var t=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return t.test(String(e).toLowerCase())},compareHeightFromHeightTo:function(e,t){var a=parseInt(e.charAt(0)),r=parseInt(t.charAt(0));if(console.log(a,r),r<a)return!1;if(r===a){var o=parseInt(e.substr(5,2)),n=parseInt(t.substr(5,2));return!(n<o)}return!0}}}},"836a":function(e,t,a){},e37e:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var r=a("436b");function o(e){r["a"].create({title:"<font color='red'><b><u>Error!</u></b></font>",persistent:!0,transitionShow:"scale",transitionHide:"scale",message:e,backgroundColor:"blue",html:!0})}},eaff:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{staticClass:"flex",attrs:{padding:""}},[a("register")],1)},o=[],n={components:{register:a("1feb").default}},s=n,i=a("2877"),l=Object(i["a"])(s,r,o,!1,null,null,null);t["default"]=l.exports}}]);