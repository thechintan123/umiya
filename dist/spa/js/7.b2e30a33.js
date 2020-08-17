(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{9952:function(t,e,a){},a9df:function(t,e,a){"use strict";var r=a("9952"),o=a.n(r);o.a},dbaf:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:"flex",attrs:{padding:""}},[a("h5",[t._v("Update Profile Page")]),a("register",{attrs:{updateProfile:!0}})],1)},o=[],n=a("a34a"),i=a.n(n),s=(a("96cf"),a("c973")),l=a.n(s),c=(a("bc3a"),{components:{register:a("e8cc").default},data:function(){return{userDetail:{}}},created:function(){var t=this;return l()(i.a.mark((function e(){return i.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log("created - UpdateProfilePage"),t.getUserDetail();case 2:case"end":return e.stop()}}),e)})))()},methods:{getUserDetail:function(){var t=this;return l()(i.a.mark((function e(){var a,r;return i.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=JSON.parse(localStorage.getItem("user")),null===a){e.next=5;break}return r=a.user_details_id,e.next=5,t.getUserDetail_DB(r);case 5:case"end":return e.stop()}}),e)})))()},getUserDetail_DB:function(t){}}}),u=c,d=a("2877"),m=Object(d["a"])(u,r,o,!1,null,null,null);e["default"]=m.exports},e8cc:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"fit column"},[a("q-linear-progress",{directives:[{name:"show",rawName:"v-show",value:t.showProgressBar,expression:"showProgressBar"}],attrs:{indeterminate:"",size:"10px",color:"secondary"}}),a("q-spinner",{directives:[{name:"show",rawName:"v-show",value:t.showProgressBar,expression:"showProgressBar"}],staticClass:"z-top fixed-center",attrs:{color:"secondary",size:"3em",thickness:10}}),t.successRegistration?a("q-card",[a("q-banner",{staticClass:"bg-grey-3 q-mb-xs",scopedSlots:t._u([{key:"avatar",fn:function(){return[a("q-icon",{attrs:{name:"assignment_turned_in",color:"secondary"}})]},proxy:!0}],null,!1,1928033596)},[t._v("\n      Successful Registration!!\n    ")]),a("q-card-section",[t._v("\n      Thank you\n      "),a("span",{staticClass:"text-weight-bolder text-capitalize"},[t._v(t._s(t.formData.firstName))]),t._v(" for successful registration.\n      "),a("br"),t._v("Your Profile ID is\n      "),a("b",[t._v("{user_details_id}")]),t._v(".\n      Going forward, you will be notified on your\n      "),a("b",[t._v(t._s(t.formData.email))]),t._v(".\n      "),a("br"),a("br"),a("b",[t._v("Next Steps:")]),a("br"),a("q-item",[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{color:"primary",name:"done_outline"}})],1),a("q-item-section",[a("q-item-label",[t._v("Admin Approval")]),a("q-item-label",{attrs:{caption:""}},[t._v("\n            Admin will verify your ID Proof and approve the profile.\n            You will be notified on "+t._s(t.formData.email)+".\n          ")])],1)],1),a("q-item",[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{color:"secondary",name:"fas fa-heart"}})],1),a("q-item-section",[a("q-item-label",[t._v("Self Search & Contact")]),a("q-item-label",{attrs:{caption:""}},[t._v("Search your match and contact the profile directly.")])],1)],1)],1)],1):t._e(),t.successRegistration?t._e():a("q-card",[a("q-banner",{staticClass:"bg-grey-3 q-mb-xs",scopedSlots:t._u([{key:"avatar",fn:function(){return[a("q-icon",{attrs:{name:"account_circle",color:"primary"}})]},proxy:!0}],null,!1,1850744782)},[t._v("\n      Register on website!!\n    ")]),a("q-tabs",{staticClass:"text-secondary",attrs:{dense:"","active-color":"primary","indicator-color":"primary","narrow-indicator":"",align:"justify"},on:{click:t.tabChange},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[a("q-tab",{attrs:{name:"basic",icon:"fas fa-user-cog",label:"Basic"}},[t.basicHasError?a("q-badge",{attrs:{align:"top",color:"blue",floating:""}},[t._v("\n          Error\n          "),a("q-icon",{staticClass:"q-ml-sm",attrs:{name:"warning",color:"yellow"}})],1):t._e()],1),a("q-tab",{attrs:{name:"personal",icon:"ballot",label:"Personal"}},[t.personalHasError?a("q-badge",{attrs:{align:"top",color:"blue",floating:""}},[t._v("\n          Error\n          "),a("q-icon",{staticClass:"q-ml-sm",attrs:{name:"warning",color:"yellow"}})],1):t._e()],1),a("q-tab",{attrs:{name:"upload",icon:"add_a_photo",label:"Upload"}},[t.isErrorPhoto||t.isErrorProof?a("q-badge",{attrs:{align:"top",color:"blue",floating:""}},[t._v("\n          Error\n          "),a("q-icon",{staticClass:"q-ml-sm",attrs:{name:"warning",color:"yellow"}})],1):t._e()],1)],1),a("q-separator"),a("q-tab-panels",{attrs:{"keep-alive":"",animated:""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[a("q-tab-panel",{attrs:{name:"basic"}},[a("q-form",{ref:"basicForm",attrs:{greedy:""}},[a("div",{staticClass:"row"},[t.testingMode?a("q-btn",{staticClass:"my-button q-mb-md",attrs:{color:"secondary",label:"For Testing - Default fields"},on:{click:t.defaultFields}}):t._e()],1),a("q-input",{attrs:{outlined:"",tabindex:"1",label:"Email (Login ID)*",rules:[function(t){return!!t||"Field is required"},function(e){return t.checkEmail(e)||"Please enter valid email address."}],dense:"",clearable:"",hint:"Hint: This Email will be used as login ID",maxlength:"50"},model:{value:t.formData.email,callback:function(e){t.$set(t.formData,"email",e)},expression:"formData.email"}}),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("q-input",{ref:"password",attrs:{tabindex:"2",outlined:"",rules:[function(t){return!!t||"Field is required"}],"lazy-rules":"",label:"Password*",dense:"",clearable:"",type:t.isPwd?"password":"text",hint:"Password with toggle",maxlength:"50"},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:t.isPwd?"visibility_off":"visibility",clearable:""},on:{click:function(e){t.isPwd=!t.isPwd}}})]},proxy:!0}],null,!1,2649845019),model:{value:t.formData.password,callback:function(e){t.$set(t.formData,"password",e)},expression:"formData.password"}})],1),a("div",{staticClass:"col"},[a("q-input",{attrs:{tabindex:"3",outlined:"",rules:[function(t){return!!t||"Field is required"},function(e){return t.checkConfirmPassword(e)||"Password & Confirm Password are not same"}],"lazy-rules":"",label:"Confirm Password*",type:"password",dense:"",clearable:"",maxlength:"50"},model:{value:t.formData.confirmPassword,callback:function(e){t.$set(t.formData,"confirmPassword",e)},expression:"formData.confirmPassword"}})],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("q-input",{attrs:{tabindex:"4",outlined:"",label:"First Name*",rules:[function(t){return!!t||"Field is required"}],dense:"",clearable:"",maxlength:"50"},model:{value:t.formData.firstName,callback:function(e){t.$set(t.formData,"firstName",e)},expression:"formData.firstName"}})],1),a("div",{staticClass:"col"},[a("q-input",{attrs:{tabindex:"5",outlined:"",label:"Last Name*",rules:[function(t){return!!t||"Field is required"}],dense:"",clearable:"",maxlength:"50"},model:{value:t.formData.lastName,callback:function(e){t.$set(t.formData,"lastName",e)},expression:"formData.lastName"}})],1)]),a("q-select",{attrs:{outlined:"",tabindex:"6","option-value":"id","option-label":"name",options:t.genderOptions,dense:"","options-dense":"",clearable:"",label:"Gender*",rules:[function(t){return!!t||"Field is required"}]},on:{blur:t.defaultHeightAgeFromTo},model:{value:t.formData.gender,callback:function(e){t.$set(t.formData,"gender",e)},expression:"formData.gender"}}),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("q-input",{attrs:{tabindex:"7",outlined:"",dense:"","stack-label":"",type:"date",label:"Date of Birth*",rules:[function(t){return!!t||"Field is required"}],clearable:""},on:{blur:t.calculateAge},model:{value:t.formData.dateOfBirth,callback:function(e){t.$set(t.formData,"dateOfBirth",e)},expression:"formData.dateOfBirth"}})],1),a("div",{staticClass:"col"},[a("q-input",{attrs:{outlined:"",label:"Age",readonly:"",disable:"",dense:""},model:{value:t.formData.age,callback:function(e){t.$set(t.formData,"age",e)},expression:"formData.age"}})],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("q-radio",{attrs:{tabindex:"8",val:"India","left-label":"",label:"Living in : India"},model:{value:t.formData.country,callback:function(e){t.$set(t.formData,"country",e)},expression:"formData.country"}}),a("q-radio",{attrs:{tabindex:"8",val:"Other","left-label":"",label:"Other"},model:{value:t.formData.country,callback:function(e){t.$set(t.formData,"country",e)},expression:"formData.country"}})],1),a("div",{staticClass:"col"},[a("q-select",{attrs:{tabindex:"8",outlined:"",disable:"India"===t.formData.country,options:t.countryOptions,"option-value":"id","option-label":"name",dense:"","options-dense":"",label:"Other Country","use-input":"","hide-selected":"","fill-input":"",rules:[function(e){return t.checkOtherCountry(e)||"Field is required"}],"input-debounce":"0",clearable:""},on:{filter:t.filterOtherCountry},model:{value:t.formData.otherCountry,callback:function(e){t.$set(t.formData,"otherCountry",e)},expression:"formData.otherCountry"}})],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("q-input",{attrs:{tabindex:"9",outlined:"",dense:"",label:"State*",rules:[function(t){return!!t||"Field is required"}],clearable:"",maxlength:"20"},model:{value:t.formData.state,callback:function(e){t.$set(t.formData,"state",e)},expression:"formData.state"}})],1),a("div",{staticClass:"col"},[a("q-input",{attrs:{tabindex:"10",outlined:"",dense:"",label:"City*",rules:[function(t){return!!t||"Field is required"}],clearable:"",maxlength:"30"},model:{value:t.formData.city,callback:function(e){t.$set(t.formData,"city",e)},expression:"formData.city"}})],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-3"},[a("q-input",{attrs:{outlined:"",dense:"",label:"Country Code",type:"tel",rules:[function(t){return!!t||"Field is required"}],hint:"Don't add + or ( )"},model:{value:t.tmpData.primaryContactCountryCode,callback:function(e){t.$set(t.tmpData,"primaryContactCountryCode",e)},expression:"tmpData.primaryContactCountryCode"}})],1),a("div",{staticClass:"col-9"},[a("q-input",{attrs:{tabindex:"11",outlined:"",dense:"",label:"Primary Contact*",type:"number",rules:[function(t){return!!t||"Field is required"}],clearable:"",maxlength:"12",hint:"Contact Numbers will be only shared to Approved profiles."},model:{value:t.tmpData.primaryContact,callback:function(e){t.$set(t.tmpData,"primaryContact",e)},expression:"tmpData.primaryContact"}})],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-3"},[a("q-input",{attrs:{tabindex:"12",outlined:"",dense:"",label:"Country Code",type:"tel",rules:[function(t){return!!t||"Field is required"}],hint:"Don't add + or ( )"},model:{value:t.tmpData.alternateContactCountryCode,callback:function(e){t.$set(t.tmpData,"alternateContactCountryCode",e)},expression:"tmpData.alternateContactCountryCode"}})],1),a("div",{staticClass:"col-9"},[a("q-input",{attrs:{tabindex:"13",outlined:"",dense:"",label:"Alternate Contact",type:"number",clearable:"",maxlength:"12",hint:"Contact Numbers will be only shared to Approved profiles."},model:{value:t.tmpData.alternateContact,callback:function(e){t.$set(t.tmpData,"alternateContact",e)},expression:"tmpData.alternateContact"}})],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-6"},[a("q-field",{attrs:{borderless:"",value:t.formData.agreeTc,rules:[function(t){return!0===t||"Field is required"}]},scopedSlots:t._u([{key:"control",fn:function(){return[a("q-toggle",{attrs:{tabindex:"13","checked-icon":"check",color:"green","unchecked-icon":"clear",label:"Agree Terms & Conditions *",dense:""},model:{value:t.formData.agreeTc,callback:function(e){t.$set(t.formData,"agreeTc",e)},expression:"formData.agreeTc"}})]},proxy:!0}],null,!1,908718651)})],1),a("div",{staticClass:"col-6"},[a("termsConditionsDialog")],1)]),a("p",{staticClass:"text-caption text-weight-light"},[a("i",[t._v("\n              UmiyaMatrimony.com and its team are only providing online platform for brige-groom search.\n              The team only validates the name and date of birth based on ID Proof.\n              The team does not perform any background check on any details.\n              Requesting to perform the background check before proceeding with any profile.\n            ")])]),a("div",{staticClass:"row"},[a("q-space"),a("q-btn",{staticClass:"my-button",attrs:{tabindex:"14",color:"primary",label:"Next >"},on:{click:function(e){return t.submitBasicForm()}}})],1)],1)],1),a("q-tab-panel",{attrs:{name:"personal"}},[a("q-form",{ref:"personalForm",attrs:{greedy:""}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("q-select",{attrs:{"option-value":"id","option-label":"name",options:t.maritalOptions,tabindex:"15",outlined:"",dense:"","options-dense":"",label:"Marital Status*",clearable:"",rules:[function(t){return!!t||"Field is required"}]},on:{blur:t.defaultMaritalStatusPreferences},model:{value:t.formData.maritalStatus,callback:function(e){t.$set(t.formData,"maritalStatus",e)},expression:"formData.maritalStatus"}})],1),a("div",{staticClass:"col"},[a("q-select",{attrs:{tabindex:"16",clearable:"",outlined:"",dense:"","options-dense":"",label:"Height*",options:t.heightOptions,rules:[function(t){return!!t||"Field is required"}]},on:{blur:t.defaultHeightFromHeightTo},model:{value:t.formData.height,callback:function(e){t.$set(t.formData,"height",e)},expression:"formData.height"}})],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("q-select",{attrs:{tabindex:"17",rules:[function(t){return!!t||"Field is required"}],outlined:"",dense:"",clearable:"","options-dense":"","option-value":"id","option-label":"name",options:t.gotraOptions,label:"Gotra*"},model:{value:t.formData.gotra,callback:function(e){t.$set(t.formData,"gotra",e)},expression:"formData.gotra"}})],1),a("div",{staticClass:"col"},[a("q-input",{attrs:{clearable:"",tabindex:"18",outlined:"",dense:"",label:"Original Surname*",rules:[function(t){return!!t||"Field is required"}],maxlength:"20"},model:{value:t.formData.originalSurname,callback:function(e){t.$set(t.formData,"originalSurname",e)},expression:"formData.originalSurname"}})],1)]),a("q-input",{attrs:{tabindex:"19",clearable:"",outlined:"",label:"Father Name*",rules:[function(t){return!!t||"Field is required"}],dense:"",maxlength:"50"},model:{value:t.formData.fatherName,callback:function(e){t.$set(t.formData,"fatherName",e)},expression:"formData.fatherName"}}),a("q-input",{attrs:{tabindex:"20",clearable:"",outlined:"",label:"Residential Address*",rules:[function(t){return!!t||"Field is required"}],dense:"",placeholder:"Flat/House no, Building Name, Street Name, City, State",hint:"Hint: Flat/House no, Building Name, Street Name, City, State",maxlength:"100"},model:{value:t.formData.residentialAddress,callback:function(e){t.$set(t.formData,"residentialAddress",e)},expression:"formData.residentialAddress"}}),a("q-input",{attrs:{tabindex:"21",clearable:"",outlined:"",dense:"",label:"Tell us about yourself (Optional)",type:"textarea",placeholder:"Your education, profession, Interest and family",hint:"Hint: Your education, profession, Interest and family",maxlength:"200"},model:{value:t.formData.aboutYourself,callback:function(e){t.$set(t.formData,"aboutYourself",e)},expression:"formData.aboutYourself"}}),a("q-select",{attrs:{tabindex:"22","option-value":"id","option-label":"name",options:t.sourceOfWebsiteOptions,label:"Where do you come to know?",dense:"","options-dense":"",outlined:"",clearable:"",rules:[function(t){return!!t||"Field is required"}]},model:{value:t.formData.whereKnow,callback:function(e){t.$set(t.formData,"whereKnow",e)},expression:"formData.whereKnow"}}),a("div",{staticClass:"text-subtitle1"},[t._v("Partner Preferences")]),a("div",{staticClass:"text-caption text-italic"},[t._v("\n            We have defaulted some of the options.\n            Please feel free to change as per your preference.\n          ")]),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("q-select",{attrs:{tabindex:"23",clearable:"",outlined:"",dense:"","options-dense":"",label:"Age(From)*",options:t.ageFromToOptions,rules:[function(t){return!!t||"Field is required"},function(e){return t.checkAgeFrom(e)||"Age(To) should be greater than Age(From)"}]},model:{value:t.formData.ageFrom,callback:function(e){t.$set(t.formData,"ageFrom",e)},expression:"formData.ageFrom"}})],1),a("div",{staticClass:"col"},[a("q-select",{attrs:{tabindex:"24",clearable:"",outlined:"",dense:"","options-dense":"",label:"Age(To)*",options:t.ageFromToOptions,rules:[function(t){return!!t||"Field is required"},function(e){return t.checkAgeTo(e)||"Age(To) should be greater than Age(From)"}]},model:{value:t.formData.ageTo,callback:function(e){t.$set(t.formData,"ageTo",e)},expression:"formData.ageTo"}})],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("q-select",{attrs:{tabindex:"25",clearable:"",outlined:"",dense:"","options-dense":"",label:"Height(From)*",options:t.heightOptions,rules:[function(t){return!!t||"Field is required"},function(e){return t.checkHeightFrom(e)||"Height(To) should be greater than Height(From)"}]},model:{value:t.formData.heightFrom,callback:function(e){t.$set(t.formData,"heightFrom",e)},expression:"formData.heightFrom"}})],1),a("div",{staticClass:"col"},[a("q-select",{attrs:{tabindex:"26",clearable:"",outlined:"",dense:"","options-dense":"",label:"Height(To)*",options:t.heightOptions,rules:[function(t){return!!t||"Field is required"},function(e){return t.checkHeightTo(e)||"Height(To) should be greater than Height(From)"}]},model:{value:t.formData.heightTo,callback:function(e){t.$set(t.formData,"heightTo",e)},expression:"formData.heightTo"}})],1)]),a("q-select",{ref:"maritalStatusPreference",attrs:{tabindex:"27","option-value":"id","option-label":"name",options:t.maritalOptions,outlined:"",dense:"","options-dense":"",label:"Marital Statuses*",rules:[function(t){return t.length>0||"Field is required"}],multiple:"","use-chips":"","input-debounce":"0",hint:"Hint: Multiple Options can be selected"},model:{value:t.formData.maritalStatusPreference,callback:function(e){t.$set(t.formData,"maritalStatusPreference",e)},expression:"formData.maritalStatusPreference"}}),a("div",{staticClass:"row"},[a("q-btn",{attrs:{color:"secondary",flat:"",label:"Back"},on:{click:function(e){t.tab="basic"}}}),a("q-space"),a("q-btn",{attrs:{tabindex:"28",color:"primary",label:"Next >"},on:{click:t.submitPersonalForm}})],1)],1)],1),a("q-tab-panel",{attrs:{name:"upload"}},[a("q-form",{ref:"uploadForm",attrs:{greedy:""}},[a("div",{staticClass:"q-mb-xs"},[a("q-field",{attrs:{"error-message":"Please upload atleast One Photo.",error:t.isErrorPhoto,borderless:"",dense:""},scopedSlots:t._u([{key:"control",fn:function(){return[a("q-uploader",{ref:"photo",staticClass:"my-uploader",attrs:{factory:t.uploadPhoto,label:"Upload Photos (max 4 images)",accept:"image/*, .pdf, .jpg, .jpeg, .gif, .png",multiple:"","max-files":"4","hide-upload-btn":""},on:{added:t.checkPhoto,removed:t.checkPhoto,rejected:t.onRejected}})]},proxy:!0}],null,!1,1153742258)})],1),a("div",{staticClass:"q-mb-xs"},[a("q-field",{attrs:{"error-message":"Please upload ID Proof.",error:t.isErrorProof,borderless:"",dense:""},scopedSlots:t._u([{key:"control",fn:function(){return[a("q-uploader",{ref:"proof",staticClass:"my-uploader",attrs:{factory:t.uploadProof,label:"Upload ID Proof (only 1 image or PDF)",accept:"image/*, .pdf, .jpg, .jpeg, .gif, .png",color:"accent","hide-upload-btn":""},on:{added:t.checkProof,removed:t.checkProof}})]},proxy:!0}],null,!1,2158992471)})],1),a("div",{staticClass:"row"},[a("q-btn",{attrs:{color:"secondary",flat:"",label:"Back"},on:{click:function(e){t.tab="personal"}}}),a("q-space"),a("q-btn",{attrs:{color:"primary",label:"Submit"},on:{click:t.submitForm}})],1)])],1)],1)],1)],1)},o=[],n=(a("ac4d"),a("5df3"),a("1c4c"),a("8e6e"),a("8a81"),a("ac6a"),a("cadf"),a("456d"),a("a481"),a("6762"),a("2fdb"),a("7f7f"),a("a34a")),i=a.n(n),s=(a("96cf"),a("c973")),l=a.n(s),c=(a("6b54"),a("06db"),a("9523")),u=a.n(c),d=a("bc3a"),m=a.n(d),f=a("7b33"),h=a("4cea"),p=a("e37e"),g=a("2f62");function b(t){if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(t=v(t))){var e=0,a=function(){};return{s:a,n:function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,o,n=!0,i=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return n=t.done,t},e:function(t){i=!0,o=t},f:function(){try{n||null==r.return||r.return()}finally{if(i)throw o}}}}function v(t,e){if(t){if("string"===typeof t)return D(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?D(t,e):void 0}}function D(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,r=new Array(e);a<e;a++)r[a]=t[a];return r}function y(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function C(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?y(Object(a),!0).forEach((function(e){u()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):y(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var w={mixins:[f["a"],h["a"]],props:["userDetails","updateProfile"],data:function(){var t;return t={uploadURL:"https://thechintan123.pythonanywhere.com/api/upload",showProgressBar:!1,successRegistration:!1,isPwd:!0,tab:"basic",imageSrc:"",dense:!0,basicHasError:!1,personalHasError:!1,uploadHasError:!1,isErrorProof:!1,isErrorPhoto:!1,user_details_id:"",countryOptions:[],countryList:[],genderOptions:[],maritalOptions:[],heightOptions:[],ageFromToOptions:[],gotraOptions:[],sourceOfWebsiteOptions:[],ageDifference:5,heightDifference:12},u()(t,"heightDifference",15.24),u()(t,"testingMode",!0),u()(t,"testData",{email:"test9@test.com",password:"password",confirmPassword:"password",firstName:"first",lastName:"last",gender:{id:1,name:"Male"},dateOfBirth:"1983-09-01",age:36,country:"India",otherCountry:"",state:"state",city:"city",primaryContact:"11111111111",alternateContact:"22222222222",maritalStatus:{id:1,name:"Never Married"},height:"5 ft 0 inch",heightCms:"",gotra:{id:1,name:"Aditya"},originalSurname:"Surname",fatherName:"father",residentialAddress:"address",aboutYourself:"about yourself",ageFrom:"30",ageTo:"40",heightFrom:"5 ft 0 inch",heightFromCms:"",heightTo:"6 ft 0 inch",heightToCms:"",maritalStatusPreference:[{id:1,name:"Never Married"}],agreeTnC:!0,sourceOfWebsite:{id:1,name:"Friends"}}),u()(t,"testTmpData",{primaryContact:"11111111111",primaryContactCountryCode:"91",alternateContactCountryCode:"91",alternateContact:"22222222222"}),u()(t,"formData",{email:"",password:"",confirmPassword:"",firstName:"",lastName:"",gender:"",dateOfBirth:"",age:0,country:"India",otherCountry:"",state:"",city:"",primaryContact:"",alternateContact:"",maritalStatus:"",height:"",heightCms:"",gotra:"",originalSurname:"",fatherName:"",residentialAddress:"",aboutYourself:"",ageFrom:"",ageTo:"",heightFrom:"",heightFromCms:"",heightTo:"",heightToCms:"",maritalStatusPreference:[],agreeTnC:!1,sourceOfWebsite:""}),u()(t,"tmpData",{primaryContact:"",primaryContactCountryCode:"",alternateContactCountryCode:"",alternateContact:""}),t},computed:C({},Object(g["d"])("auth",["loggedIn"])),methods:{defaultFields:function(){this.formData=this.testData,this.tmpData=this.testTmpData,this.formData.email="test"+Math.random().toString(20).substr(2,6)+"@test.com"},tabChange:function(){"basic"===this.tab&&this.basicHasError?this.$refs.basicForm.validate():"personal"===this.tab&&this.personalHasError&&this.$refs.personalForm.validate()},submitBasicForm:function(){var t=this;this.$refs.basicForm.validate().then((function(e){e?(t.basicHasError=!1,t.tab="personal"):t.basicHasError=!0}))},submitPersonalForm:function(){var t=this;this.$refs.personalForm.validate().then((function(e){e?(t.personalHasError=!1,t.tab="upload"):t.personalHasError=!0}))},registerUser:function(t){var e=this;return m.a.post("https://thechintan123.pythonanywhere.com/api/users",t).then((function(t){var a=t.data;e.user_details_id=a.user_details_id,e.$q.notify({type:"positive",message:"Successfully registered"})})).catch((function(t){var e="";e="message"in t.response.data?t.response.data.message:t.response.data.error,Object(p["a"])(e)}))},checkPhoto:function(){0===this.$refs.photo.files.length?this.isErrorPhoto=!0:this.isErrorPhoto=!1},checkProof:function(){0===this.$refs.proof.files.length?this.isErrorProof=!0:this.isErrorProof=!1},submitForm:function(){var t=this;return l()(i.a.mark((function e(){return i.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.showProgressBar=!0,"undefined"===typeof t.$refs.basicForm?t.basicHasError=!0:t.submitBasicForm(),"undefined"===typeof t.$refs.personalForm?t.personalHasError=!0:t.submitPersonalForm(),t.checkPhoto(),t.checkProof(),t.basicHasError||t.personalHasError||t.isErrorPhoto||t.isErrorProof){e.next=14;break}return t.formData.primaryContact="+"+t.tmpData.primaryContactCountryCode+" "+t.tmpData.primaryContact,t.formData.alternateContact="+"+t.tmpData.alternateContactCountryCode+" "+t.tmpData.alternateContact,t.formData.heightFromCms=t.convertHeightToCms(t.formData.heightFrom),t.formData.heightToCms=t.convertHeightToCms(t.formData.heightTo),""===t.formData.heightCms&&(t.formData.heightCms=t.convertHeightToCms(t.formData.height)),e.next=13,t.registerUser(t.formData);case 13:""!==t.user_details_id&&(t.$refs.photo.upload(),t.$refs.proof.upload(),t.successRegistration=!0);case 14:t.showProgressBar=!1;case 15:case"end":return e.stop()}}),e)})))()},createHeightList:function(){var t,e,a=4,r=7;for(t=a;t<=r;t++)for(e=0;e<=11;e++)this.heightOptions.push(t+" ft "+e+" inches")},createAgeFromToList:function(){var t,e=18,a=60;for(t=e;t<=a;t++)this.ageFromToOptions.push(t)},calculateAge:function(){this.formData.age=this.computeAge(this.formData.dateOfBirth),this.defaultAgeFromAgeTo()},defaultHeightAgeFromTo:function(){this.defaultAgeFromAgeTo(),this.defaultHeightFromHeightTo()},defaultAgeFromAgeTo:function(){""!==this.formData.age?"Male"==this.formData.gender.name?(this.formData.ageFrom=this.formData.age-this.ageDifference,this.formData.ageTo=this.formData.age):"Female"==this.formData.gender.name?(this.formData.ageFrom=this.formData.age,this.formData.ageTo=this.formData.age+this.ageDifference):(this.formData.ageFrom="",this.formData.ageTo=""):(this.formData.ageFrom="",this.formData.ageTo="")},defaultHeightFromHeightTo:function(){this.formData.heightCms=this.convertHeightToCms(this.formData.height);var t,e,a=this.formData.heightCms;this.convertHeightToFtInch(a),"Male"==this.formData.gender.name?(t=a-this.heightDifference,e=a):"Female"==this.formData.gender.name?(t=a,e=a+this.heightDifference):(t=a,e=a),this.formData.heightFromCms=t,this.formData.heightToCms=e,this.formData.heightFrom=this.convertHeightToFtInch(t),this.formData.heightTo=this.convertHeightToFtInch(e)},defaultMaritalStatusPreferences:function(){this.formData.maritalStatusPreference.length=0,this.formData.maritalStatusPreference.push(this.formData.maritalStatus)},convertHeightToCms:function(t){var e=t.substr(0,1),a=t.substr(5,7),r=30.48*parseFloat(e)+2.54*parseFloat(a);return r},convertHeightToFtInch:function(t){var e=.393701*t,a=Math.floor(e/12),r=Math.floor(e-12*a);return a+" ft "+r+" inches"},checkOtherCountry:function(t){return"Other"!==this.formData.country||null!==t},checkConfirmPassword:function(t){return this.formData.password===t},checkAgeTo:function(t){return!(t<this.formData.ageFrom)},checkAgeFrom:function(t){return!(t>this.formData.ageTo)},checkHeightTo:function(t){var e=this.formData.heightFrom;return!e||!t||this.compareHeightFromHeightTo(e,t)},checkHeightFrom:function(t){var e=this.formData.heightTo;return!t||!e||this.compareHeightFromHeightTo(t,e)},uploadImage:function(t,e){var a=this;return m.a.post("https://thechintan123.pythonanywhere.com/api/upload",t,{headers:{"Content-Type":"multipart/form-data"}}).then((function(t){a.$q.notify({type:"positive",message:e+" successfully uploaded"})})).catch((function(t){var e="";e="message"in t.response.data?rror.response.data.message:t.response.data.error,Object(p["a"])(e)}))},uploadPhoto:function(t){var e=this;return l()(i.a.mark((function a(){var r;return i.a.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r=new FormData,r.append("file",t[0]),r.append("filetype","photo"),r.append("user_details_id",e.user_details_id),a.next=6,e.uploadImage(r,"Photo");case 6:case"end":return a.stop()}}),a)})))()},uploadProof:function(t){var e=this;return l()(i.a.mark((function a(){var r;return i.a.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r=new FormData,r.append("file",t[0]),r.append("filetype","proof"),r.append("user_details_id",e.user_details_id),a.next=6,e.uploadImage(r,"Proof");case 6:case"end":return a.stop()}}),a)})))()},filterOtherCountry:function(t,e,a){var r=this;e((function(){var e,a=t.toLowerCase(),o=[],n=b(r.countryList);try{for(n.s();!(e=n.n()).done;){var i=e.value,s=i.name.toLowerCase();s.includes(a)&&o.push(i)}}catch(l){n.e(l)}finally{n.f()}r.countryOptions=o}))},onRejected:function(t){this.$q.notify({type:"negative",message:"".concat(t.length," file(s) did not pass validation constraints")})}},created:function(){this.createHeightList(),this.createAgeFromToList()},mounted:function(){var t=this;console.log("this.updateProfile",this.updateProfile),!0===this.updateProfile&&(this.formData=this.userDetail),console.log("FormData",this.formData),m.a.get("https://thechintan123.pythonanywhere.com/api/lists").then((function(e){t.countryList=e.data.country,t.countryOptions=t.countryList,t.gotraOptions=e.data.gotra,t.sourceOfWebsiteOptions=e.data.where_know,t.maritalOptions=e.data.marital_status,t.genderOptions=e.data.gender})).catch((function(t){}))},beforeCreate:function(){var t,e=this,a=JSON.parse(localStorage.getItem("user"));if(null!==a){var r=a.user_details_id;m.a.get("https://thechintan123.pythonanywhere.com/api/users/"+r).then((function(a){var r=a.data;console.log("data",r,r.first_name),t=JSON.parse(JSON.stringify(r).replace(/(_\w)\w+":/g,(function(t){return t[1].toUpperCase()+t.substring(2)}))),console.log("userDetail",t),e.formData=t,console.log("formData",e.formData),e.tmpData.primaryContactCountryCode=e.formData.phonePrimary.substr(1,2),e.tmpData.primaryContact=e.formData.phonePrimary.substr(4),e.tmpData.alternateContactCountryCode=e.formData.phoneAlternate.substr(1,2),e.tmpData.alternateContact=e.formData.phoneAlternate.substr(4)})).catch((function(t){}))}},components:{termsConditionsDialog:a("30e8").default}},q=w,x=(a("a9df"),a("2877")),F=Object(x["a"])(q,r,o,!1,null,"62e98832",null);e["default"]=F.exports}}]);