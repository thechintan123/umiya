(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{"56c8":function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"fit"},[s("progressBar",{directives:[{name:"show",rawName:"v-show",value:e.showProgressBar,expression:"showProgressBar"}]}),s("spinner",{directives:[{name:"show",rawName:"v-show",value:e.showProgressBar,expression:"showProgressBar"}]}),s("adminSearchUser"),Object.keys(e.searchResultsPerPage).length?s("adminSearchResults"):e._e(),!Object.keys(e.searchResultsPerPage).length&&e.searchPerformed?s("noSearchResult"):e._e(),s("div",{staticClass:"q-mt-sm flex flex-center"},[e.totalPages>0?s("q-pagination",{attrs:{max:e.totalPages,color:"secondary"},on:{click:e.changePage},model:{value:e.page,callback:function(t){e.page=t},expression:"page"}}):e._e()],1)],1)},a=[],n=(s("8e6e"),s("8a81"),s("ac6a"),s("cadf"),s("06db"),s("456d"),s("9523")),o=s.n(n),i=s("2f62"),c=s("7b33");function l(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,r)}return s}function u(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?l(Object(s),!0).forEach((function(t){o()(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):l(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}var m={mixins:[c["a"]],computed:u(u({},Object(i["e"])("admin",["searchResults","searchResultsPerPage","showProgressBar","searchPerformed","totalPages"])),{},{page:{get:function(){return this.$store.state.admin.page},set:function(e){this.setPage(e)}}}),methods:u(u(u({},Object(i["b"])("admin",["updatePage"])),Object(i["d"])("admin",["setPage"])),{},{changePage:function(e){this.updatePage(this.page)}}),components:{adminSearchUser:s("de69").default,adminSearchResults:s("c489").default,noSearchResult:s("bed5").default,progressBar:s("5c84").default,spinner:s("375d").default}},d=m,h=s("2877"),p=Object(h["a"])(d,r,a,!1,null,"39a42c90",null);t["default"]=p.exports},7307:function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-page",{attrs:{padding:""}},[s("adminApproval")],1)},a=[],n=s("1278"),o={mixins:[n["a"]],components:{adminApproval:s("56c8").default},beforeMount:function(){this.checkUserLoggedIn("admin")}},i=o,c=s("2877"),l=Object(c["a"])(i,r,a,!1,null,"f50f1d5a",null);t["default"]=l.exports},c489:function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"q-mt-md"},[s("q-card",[s("q-banner",{staticClass:"bg-dark text-secondary",attrs:{"inline-actions":"",rounded:"",dense:""},scopedSlots:e._u([{key:"action",fn:function(){return[s("q-select",{attrs:{dense:"","options-dense":"",borderless:"",options:e.sortByOptions,"option-value":"id","option-label":"value",label:"Sort By"},on:{input:e.changeSort},scopedSlots:e._u([{key:"prepend",fn:function(){return[s("q-icon",{attrs:{name:"fas fa-sort-amount-up-alt"}})]},proxy:!0}]),model:{value:e.sortBy,callback:function(t){e.sortBy=t},expression:"sortBy"}})]},proxy:!0}])},[e._v("\n      Results :\n      "),s("i",[e._v("\n        You have "),s("b",[e._v(e._s(e.searchResults.length))]),e._v(" matches\n      ")])]),e._l(e.searchResultsPerPage,(function(t,r){return s("q-list",{key:r,attrs:{padding:""}},[s("div",{staticClass:"q-ma-sm row justify-evenly"},[s("div",{staticClass:"col-4"},[s("search-results-photo-slide",{attrs:{profileID:t.id,photos:e.photosAndProof(t),gender:t.gender}})],1),s("q-item",{staticClass:"col-8 text-capitalize"},[s("q-item-section",[s("q-item-label",[s("div",{staticClass:"text-h6"},[e._v("\n                "+e._s(t.firstName)+" "+e._s(t.lastName)+"\n              ")])]),s("q-item-label",[s("u",[e._v("Profile ID")]),e._v("\n              :\n              "+e._s(t.userDetailsId)),s("i",[e._v(" (Email : "+e._s(t.email)+" )")])]),s("q-item-label",[s("u",[e._v("Date of Birth")]),e._v("\n              :\n              "+e._s(e.removeTimeStamp(t.dateOfBirth))+" "),s("i",[e._v(" (Age : "+e._s(e.computeAge(t.dateOfBirth))+" )")])]),s("q-item-label",[s("u",[e._v("Location")]),e._v("\n                      :\n                      "+e._s(t.city)+", "+e._s(t.state)+",\n                      "+e._s(t.country.name)+"\n                    ")]),s("q-item-label",[s("u",[e._v("Address")]),e._v("\n                      :\n                      "+e._s(t.residentialAddress)+"\n                    ")]),s("q-item-label",[s("u",[e._v("Current Status")]),e._v("\n                      :\n                      "),s("b",[e._v(e._s(t.status.name)+" ")]),s("i",[e._v("(Approval Date : "+e._s(t.approvalDate)+")")])]),s("q-item-label",[s("u",[e._v("Previous Correction Comments")]),e._v("\n                      :\n                      "),s("i",[e._v(e._s(t.correctionComments))])]),s("q-item-label",[e._l(e.list.profileStatusOptions,(function(r,a){return[s("q-radio",{key:a,attrs:{val:r.id,label:r.name},model:{value:e.profileStatus[t.userDetailsId],callback:function(s){e.$set(e.profileStatus,t.userDetailsId,s)},expression:"profileStatus[searchItem.userDetailsId]"}})]}))],2),s("q-item-label",[3===e.profileStatus[t.userDetailsId]?s("q-input",{attrs:{label:"Correction Comments",outlined:"",autogrow:"",maxlength:e.correctionCommentsMax,rules:[function(s){return e.checkCorrectionCommentsLength(s,t.correctionComments)||e.correctionErrorMessage}]},model:{value:e.correctionComments[t.userDetailsId],callback:function(s){e.$set(e.correctionComments,t.userDetailsId,s)},expression:"correctionComments[searchItem.userDetailsId]"}}):e._e(),s("q-btn",{attrs:{color:"primary",label:"Change Status"},on:{click:function(s){return e.changeStatus(t)}}})],1),s("q-expansion-item",{attrs:{"switch-toggle-side":"","expand-separator":"",caption:"Click for more details",dense:"","dense-toggle":""}},[s("q-card",[s("q-card-section",[s("q-item-section",[s("q-item-label",[s("u",[e._v("Marital Status")]),e._v("\n                      :\n                      "+e._s(t.maritalStatus.name)+"\n                    ")]),s("q-item-label",[s("u",[e._v("Father Name")]),e._v("\n                      :\n                      "+e._s(t.fatherName)+"\n                    ")]),s("q-item-label",[s("u",[e._v("Gotra")]),e._v("\n                      :\n                      "+e._s(t.gotra.name)+"\n                    ")]),s("q-item-label",[s("u",[e._v("Original Surname")]),e._v("\n                      :\n                      "+e._s(t.originalSurname)+"\n                    ")]),s("q-item-label",[s("u",[e._v("\n                        About\n                        "+e._s(t.firstName)+"\n                      ")]),e._v("\n                      :\n                      "+e._s(t.aboutYourself)+"\n                    ")]),s("q-item-label",[s("u",[e._v("Primary Contact")]),e._v("\n                      :\n                      "+e._s(t.primaryContact)+"\n                    ")]),s("q-item-label",[s("u",[e._v("Alternate Contact")]),e._v("\n                      :\n                      "+e._s(t.alternateContact)+"\n                    ")]),s("q-item-label",[s("u",[e._v("Last Login")]),e._v("\n                      :\n                      "+e._s(e.hasBlank(t.lastLogin))+"\n                    ")])],1)],1)],1)],1)],1)],1)],1),s("q-separator",{attrs:{color:"secondary",inset:""}})],1)}))],2)],1)},a=[],n=(s("8e6e"),s("8a81"),s("ac6a"),s("cadf"),s("06db"),s("456d"),s("448a")),o=s.n(n),i=(s("7f7f"),s("9523")),c=s.n(i),l=s("bc3a"),u=s.n(l),m=s("2f62"),d=s("4cea"),h=s("1278"),p=s("f2f9"),f=s("dd50");function g(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,r)}return s}function v(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?g(Object(s),!0).forEach((function(t){c()(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):g(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}var b={mixins:[d["a"],h["a"],p["a"]],components:{"search-results-photo-slide":s("41e0").default},data:function(){return{profileStatus:[],correctionComments:[],correctionCommentsMax:f["d"],correctionErrorMessage:"Max length of Correction Commments has reached"}},computed:v({},Object(m["e"])("admin",["searchResultsPerPage","searchResults","page","list"])),methods:v(v(v({},Object(m["d"])("admin",["setSearchItemParameter","setSearchResults","setShowProgressBar"])),Object(m["b"])("admin",["updatePage"])),{},{changeStatus:function(e){var t,s,r,a=this,n=e.userDetailsId,o=this.profileStatus[n],i={status:{id:o}},c=!1;3===o&&(t=this.correctionComments[n],s=(new Date).toDateString(),r="",this.hasValue(e.correctionComments)&&(r=e.correctionComments),c=!this.checkCorrectionCommentsLength(t,r)),c?this.showMessageDialog(this.correctionErrorMessage):(this.setShowProgressBar(!0),3===o&&this.hasValue(t)&&(i.correction_comments=r+s+" : "+t+"; \n "),u.a.put("https://thechintan123.pythonanywhere.com/api/admin/users/"+n,i).then((function(t){var s=t.data;a.setSearchItemParameter({item:e,key:"status",value:s.status}),3===o?a.setSearchItemParameter({item:e,key:"correctionComments",value:s.correction_comments}):2===o&&a.setSearchItemParameter({item:e,key:"approvalDate",value:s.approval_date}),a.$q.notify({type:"positive",message:"Profile status of "+s.first_name+" is updated to "+s.status.name}),a.setShowProgressBar(!1)})).catch((function(e){a.showErrorDialog(e),a.setShowProgressBar(!1)})))},photosAndProof:function(e){var t=[];return t.push(e.uploadPhotos),t.push(e.uploadProof),t},changeSort:function(e){var t=[];t=o()(this.searchResults),"lastLogin"===e.key?t.sort(this.sortDate(e.key,e.order)):t.sort(this.sortList(e.key,e.order)),this.setSearchResults(t),this.updatePage(this.page)},checkCorrectionCommentsLength:function(e,t){var s=0;this.hasValue(e)&&(s=e.length);var r=0;return this.hasValue(t)&&(r=t.length),this.correctionCommentsMax>r+s}})},_=b,P=s("2877"),y=Object(P["a"])(_,r,a,!1,null,null,null);t["default"]=y.exports}}]);