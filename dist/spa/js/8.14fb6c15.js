(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{"56c8":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"fit"},[e.showProgressBar?r("progressBar"):e._e(),e.showProgressBar?r("spinner"):e._e(),r("adminSearchUser",{attrs:{bannerTitle:"Search User for Admin Approval"}}),Object.keys(e.searchResultsPerPage).length?r("adminSearchResults"):e._e(),!Object.keys(e.searchResultsPerPage).length&&e.searchPerformed?r("noSearchResult"):e._e(),r("div",{staticClass:"q-mt-sm flex flex-center"},[e.totalPages>0?r("q-pagination",{attrs:{max:e.totalPages,color:"secondary"},on:{click:e.changePage},model:{value:e.page,callback:function(t){e.page=t},expression:"page"}}):e._e()],1)],1)},s=[],n=(r("8e6e"),r("8a81"),r("ac6a"),r("cadf"),r("06db"),r("456d"),r("9523")),o=r.n(n),i=r("2f62"),c=r("7b33");function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){o()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var m={mixins:[c["a"]],computed:u(u({},Object(i["e"])("admin",["searchResults","searchResultsPerPage","showProgressBar","searchPerformed","totalPages"])),{},{page:{get:function(){return this.$store.state.admin.page},set:function(e){this.setPage(e)}}}),methods:u(u(u({},Object(i["b"])("admin",["updatePage"])),Object(i["d"])("admin",["setPage"])),{},{changePage:function(e){this.updatePage(this.page)}}),components:{adminSearchUser:r("de69").default,adminSearchResults:r("c489").default,noSearchResult:r("bed5").default,progressBar:r("5c84").default,spinner:r("375d").default}},d=m,p=r("2877"),h=Object(p["a"])(d,a,s,!1,null,"8cdb2c7e",null);t["default"]=h.exports},7307:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-page",{attrs:{padding:""}},[r("adminApproval")],1)},s=[],n=r("1278"),o={mixins:[n["a"]],components:{adminApproval:r("56c8").default},beforeMount:function(){this.checkUserLoggedIn("admin")}},i=o,c=r("2877"),l=Object(c["a"])(i,a,s,!1,null,"f50f1d5a",null);t["default"]=l.exports},c489:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"q-mt-md"},[r("q-card",[r("q-banner",{staticClass:"bg-dark text-secondary",attrs:{"inline-actions":"",rounded:"",dense:""},scopedSlots:e._u([{key:"action",fn:function(){return[r("q-select",{attrs:{dense:"","options-dense":"",borderless:"",options:e.sortByOptions,"option-value":"id","option-label":"value",label:"Sort By"},on:{input:e.changeSort},scopedSlots:e._u([{key:"prepend",fn:function(){return[r("q-icon",{attrs:{name:"fas fa-sort-amount-up-alt"}})]},proxy:!0}]),model:{value:e.sortBy,callback:function(t){e.sortBy=t},expression:"sortBy"}})]},proxy:!0}])},[e._v("\n      Results :\n      "),r("i",[e._v("\n        You have "),r("b",[e._v(e._s(e.searchResults.length))]),e._v(" matches\n      ")])]),e._l(e.searchResultsPerPage,(function(t,a){return r("q-list",{key:a},[r("div",{staticClass:"q-ma-sm row justify-evenly"},[r("div",{staticClass:"col-4"},[r("search-results-photo-slide",{attrs:{profileID:t.id,photos:e.photosAndProof(t),gender:t.gender}})],1),r("q-item",{staticClass:"col-8 text-capitalize"},[r("q-item-section",[r("q-item-label",[r("div",{staticClass:"text-h6"},[e._v("\n                "+e._s(t.firstName)+" "+e._s(t.lastName)+"\n              ")])]),r("q-item-label",[r("u",[e._v("Profile ID")]),e._v("\n              :\n              "+e._s(t.userDetailsId)),r("i",[e._v(" (Email : "+e._s(t.email)+" )")])]),r("q-item-label",[r("u",[e._v("Date of Birth")]),e._v("\n              :\n              "+e._s(e.removeTimeStamp(t.dateOfBirth))+" "),r("i",[e._v(" (Age : "+e._s(e.computeAge(t.dateOfBirth))+" )")])]),r("q-item-label",[r("u",[e._v("Gender")]),e._v("\n                      :\n                      "+e._s(t.gender.name)+"\n                    ")]),r("q-item-label",[r("u",[e._v("Location")]),e._v("\n                      :\n                      "+e._s(t.city)+", "+e._s(t.state)+",\n                      "+e._s(t.country.name)+"\n                    ")]),r("q-item-label",[r("u",[e._v("Address")]),e._v("\n                      :\n                      "+e._s(t.residentialAddress)+"\n                    ")]),r("q-item-label",[r("u",[e._v("Current Status")]),e._v("\n                      :\n                      "),r("b",[e._v(e._s(t.status.name)+" ")]),r("i",[e._v("(Approval Date : "+e._s(t.approvalDate)+")")])]),r("q-item-label",[r("u",[e._v("Previous Correction Comments")]),e._v("\n                      :\n                      "),r("i",[e._v(e._s(t.correctionComments))])]),r("q-item-label",[e._l(e.list.profileStatusOptions,(function(a,s){return[r("q-radio",{key:s,attrs:{val:a.id,label:a.name},model:{value:e.profileStatus[t.userDetailsId],callback:function(r){e.$set(e.profileStatus,t.userDetailsId,r)},expression:"profileStatus[searchItem.userDetailsId]"}})]}))],2),r("q-item-label",[3===e.profileStatus[t.userDetailsId]?r("q-input",{attrs:{label:"Correction Comments",outlined:"",autogrow:"",maxlength:e.correctionCommentsMax,rules:[function(r){return e.checkCorrectionCommentsLength(r,t.correctionComments)||e.correctionErrorMessage}]},model:{value:e.correctionComments[t.userDetailsId],callback:function(r){e.$set(e.correctionComments,t.userDetailsId,r)},expression:"correctionComments[searchItem.userDetailsId]"}}):e._e(),r("q-btn",{attrs:{color:"primary",label:"Change Status"},on:{click:function(r){return e.changeStatus(t)}}})],1),r("q-expansion-item",{attrs:{"switch-toggle-side":"","expand-separator":"",caption:"Click for more details",dense:"","dense-toggle":""}},[r("q-card",[r("q-card-section",[r("q-item-section",[r("q-item-label",[r("u",[e._v("Marital Status")]),e._v("\n                      :\n                      "+e._s(t.maritalStatus.name)+"\n                    ")]),r("q-item-label",[r("u",[e._v("Father Name")]),e._v("\n                      :\n                      "+e._s(t.fatherName)+"\n                    ")]),r("q-item-label",[r("u",[e._v("Gotra")]),e._v("\n                      :\n                      "+e._s(t.gotra.name)+"\n                    ")]),r("q-item-label",[r("u",[e._v("Original Surname")]),e._v("\n                      :\n                      "+e._s(t.originalSurname)+"\n                    ")]),r("q-item-label",[r("u",[e._v("Education")]),e._v("\n                      :\n                      "+e._s(t.education)+"\n                    ")]),r("q-item-label",[r("u",[e._v("\n                        About\n                        "+e._s(t.firstName)+"\n                      ")]),e._v("\n                      :\n                      "+e._s(t.aboutYourself)+"\n                    ")]),r("q-item-label",[r("u",[e._v("Primary Contact")]),e._v("\n                      :\n                      "+e._s(t.primaryContact)+"\n                    ")]),r("q-item-label",[r("u",[e._v("Alternate Contact")]),e._v("\n                      :\n                      "+e._s(t.alternateContact)+"\n                    ")]),r("q-item-label",[r("u",[e._v("Last Login")]),e._v("\n                      :\n                      "+e._s(e.hasBlank(t.lastLogin))+"\n                    ")])],1)],1)],1)],1)],1)],1)],1),r("q-separator",{attrs:{color:"secondary",inset:""}})],1)}))],2)],1)},s=[],n=(r("8e6e"),r("8a81"),r("ac6a"),r("cadf"),r("06db"),r("456d"),r("448a")),o=r.n(n),i=(r("7f7f"),r("9523")),c=r.n(i),l=r("bc3a"),u=r.n(l),m=r("2f62"),d=r("4cea"),p=r("1278"),h=r("f2f9"),f=r("dd50");function g(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function v(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?g(Object(r),!0).forEach((function(t){c()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):g(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var b={mixins:[d["a"],p["a"],h["a"]],components:{"search-results-photo-slide":r("41e0").default},data:function(){return{profileStatus:[],correctionComments:[],correctionCommentsMax:f["d"],correctionErrorMessage:"Max length of Correction Commments has reached"}},computed:v({},Object(m["e"])("admin",["searchResultsPerPage","searchResults","page","list"])),methods:v(v(v({},Object(m["d"])("admin",["setSearchItemParameter","setSearchResults","setShowProgressBar"])),Object(m["b"])("admin",["updatePage"])),{},{changeStatus:function(e){var t,r,a,s=this,n=e.userDetailsId,o=this.profileStatus[n],i={status:{id:o}},c=!1;3===o&&(t=this.correctionComments[n],r=(new Date).toDateString(),a="",this.hasValue(e.correctionComments)&&(a=e.correctionComments),c=!this.checkCorrectionCommentsLength(t,a)),c?this.showMessageDialog(this.correctionErrorMessage):(this.setShowProgressBar(!0),3===o&&this.hasValue(t)&&(i.correction_comments=a+r+" : "+t+"; \n "),u.a.put("http://localhost:5000/api/admin/users/"+n,i).then((function(t){var r=t.data;s.setSearchItemParameter({item:e,key:"status",value:r.status}),3===o?s.setSearchItemParameter({item:e,key:"correctionComments",value:r.correction_comments}):2===o&&s.setSearchItemParameter({item:e,key:"approvalDate",value:r.approval_date});var a="Profile status of "+r.first_name+" is updated to "+r.status.name;s.showNotification("positive",a),s.setShowProgressBar(!1)})).catch((function(e){s.showErrorDialog(e),s.setShowProgressBar(!1)})))},photosAndProof:function(e){var t=[];return t.push(e.uploadPhotos),t.push(e.uploadProof),t},changeSort:function(e){var t=[];t=o()(this.searchResults),"lastLogin"===e.key?t.sort(this.sortDate(e.key,e.order)):t.sort(this.sortList(e.key,e.order)),this.setSearchResults(t),this.updatePage(this.page)},checkCorrectionCommentsLength:function(e,t){var r=0;this.hasValue(e)&&(r=e.length);var a=0;return this.hasValue(t)&&(a=t.length),this.correctionCommentsMax>a+r}})},_=b,P=r("2877"),y=Object(P["a"])(_,a,s,!1,null,null,null);t["default"]=y.exports}}]);