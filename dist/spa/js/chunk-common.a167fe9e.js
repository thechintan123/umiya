(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[0],{"30e8":function(e,t,o){"use strict";o.r(t);var i=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"q-pt-sm"},[o("q-btn",{attrs:{label:"Click for Terms & Privacy Policy",flat:"",color:"secondary"},on:{click:function(t){e.termsDialog=!0}}}),o("q-dialog",{model:{value:e.termsDialog,callback:function(t){e.termsDialog=t},expression:"termsDialog"}},[o("q-layout",{staticClass:"bg-white",attrs:{view:"Lhh lpR fff",container:""}},[o("q-header",{staticClass:"bg-primary"},[o("q-toolbar",[o("q-toolbar-title",[e._v("Terms & Conditions")]),o("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",round:"",dense:"",icon:"close"}})],1)],1),o("q-splitter",{staticClass:"q-mt-xl",scopedSlots:e._u([{key:"before",fn:function(){return[o("div",{staticClass:"q-pa-md"},[o("q-tree",{attrs:{nodes:e.simple,"node-key":"label","selected-color":"primary",selected:e.selected,"default-expand-all":""},on:{"update:selected":function(t){e.selected=t}}})],1)]},proxy:!0},{key:"after",fn:function(){return[o("q-tab-panels",{attrs:{animated:"","transition-prev":"jump-up","transition-next":"jump-up"},model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}},[o("q-tab-panel",{attrs:{name:"Terms & Conditions"}},[o("terms")],1),o("q-tab-panel",{attrs:{name:"Privacy"}},[o("privacy")],1)],1)]},proxy:!0}]),model:{value:e.splitterModel,callback:function(t){e.splitterModel=t},expression:"splitterModel"}})],1)],1)],1)},r=[],a={data:function(){return{termsDialog:!1,moreContent:!0,lorem:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!",splitterModel:40,selected:"Terms & Conditions",simple:[{label:"Details",selectable:!1,children:[{label:"Terms & Conditions",icon:"settings"},{label:"Privacy",icon:"rss_feed"}]}]}},computed:{contentSize:function(){return this.moreContent?150:5}},components:{terms:o("9461").default,privacy:o("8e30").default}},n=a,s=o("2877"),m=Object(s["a"])(n,i,r,!1,null,null,null);t["default"]=m.exports},"4cea":function(e,t,o){"use strict";t["a"]={methods:{computeAge:function(e){var t=Date.parse(e),o=Date.now()-t,i=new Date(o);return Math.abs(i.getUTCFullYear()-1970)}}}},"7b33":function(e,t,o){"use strict";t["a"]={methods:{checkEmail:function(e){var t=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return t.test(String(e).toLowerCase())},compareHeightFromHeightTo:function(e,t){var o=parseInt(e.charAt(0)),i=parseInt(t.charAt(0));if(i<o)return!1;if(i===o){var r=parseInt(e.substr(5,2)),a=parseInt(t.substr(5,2));return!(a<r)}return!0}}}},"8e30":function(e,t,o){"use strict";o.r(t);var i=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},r=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("b",[e._v("Privacy Policy")]),o("br"),e._v("UmiyaMatrimony.com is an online matrimonial portal endeavoring constantly to provide you with matrimonial information. Since we are strongly committed to your right to privacy, we have drawn a privacy statement in place with regard to the information we collect from you.\n  "),o("br"),e._v("We use a secure server and Cookies are used to store the login information.\n  "),o("br"),o("br"),e._v("What information does UmiyaMatrimony.com collects from you?\n  "),o("br"),e._v("We gather information from members and guests who apply for the various services our site offers. It includes, but may not be limited to, email address, first name, last name, a user-specified password, e-mail Id, mailing address, zip code and telephone number or fax number.\n  "),o("br"),o("br"),e._v("How UmiyaMatrimony.com uses the information it collects/tracks?\n  "),o("br"),e._v("We collect information from our members primarily to ensure that we are able to fulfill your requirements and to deliver personalized experience.\n  "),o("br"),o("br"),e._v("With whom does the site shares the information it collects?\n  "),o("br"),e._v("The information collected from any of our members is not shared with any individual or organization without the former’s approval. UmiyaMatrimony.com does not sell, rent, or loan any identifiable information at the individual level regarding its members to any third party. Any information you give us is held with the utmost care and security. We are also bound to cooperate fully should a situation arise where we are required by law or legal process to provide information about a member.\n  "),o("br"),o("br"),e._v("Do all the visitors have to pay?\n  "),o("br"),e._v("All visitors to our site may browse the site, search the ads and view any articles or features our site has to offer without entering any personal information or paying money.\n  "),o("br"),o("br"),e._v("How UmiyaMatrimony.com can contact you?\n  "),o("br"),e._v("The UmiyaMatrimony.com team will contact you from time to time to apprise you on various features and functionalities of the website. They will contact you for “services” through a variety of mediums like Email, SMS, Whatsapp and Telephonic calls. The calls made to you will be made by the regular mobile number used by the website.\n  "),o("br"),e._v("Notice: We may change this Privacy Policy from time to time based on your comments or as a result of a change of policy of our samaj. If you have any questions regarding our Privacy Statement, please contact us on our email shared on this website.\n  "),o("br")])}],a={},n=a,s=o("2877"),m=Object(s["a"])(n,i,r,!1,null,null,null);t["default"]=m.exports},9461:function(e,t,o){"use strict";o.r(t);var i=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},r=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("b",[e._v("Terms & Conditions")]),o("br"),e._v("BY YOUR POSITIVE ACTS OF ACCESSING UMIYAMATRIMONY.COM, YOU AGREE TO BE BOUND BY THE TERMS AND CONDITIONS SET FORTH BELOW. IF YOU DO NOT AGREE WITH ANY OF THESE TERMS AND CONDITIONS, YOU SHOULD NOT ACCESS OR USE UMIYAMATRIMONY.COM.\n            "),o("br"),e._v("Welcome to UmiyaMatrimony.com, your personal matrimonial advertiser. UmiyaMatrimony.com is an advertising platform providing targeted advertising services for matrimonial alliances and replaces the traditional newspaper classified. UmiyaMatrimony.com helps you promote and advertise your profile to the prospective alliance partner to drive an 'Accept', the first step in seeking a life-partner. Access to the UmiyaMatrimony.com website is free.\n            "),o("br"),o("u",[e._v("Terms of Use")]),o("br"),e._v('In order to use the UmiyaMatrimony.com Site ("Site"), you must register as a member of the Site ("Member"). The Member or any users using the Site agree to be bound by these Terms of Use ("Agreement"). If you wish to become a Member and promote/ advertise your profile to other Members and make use of the UmiyaMatrimony.com service ("Service"), read these Terms of Use and follow the instructions in the Registration process. The Service shall inter alia assist you in promoting and making your profile visible to other Members to drive higher ‘Accepts’ from relevant members. This Agreement sets out the legally binding terms for your use of the Site and membership. This Agreement may be modified by UmiyaMatrimony.com from time to time.\n            '),o("br"),o("u",[e._v("Eligibility.")]),o("br"),e._v("To register as a member of UmiyaMatrimony.com or use this Site, you must be of legal marriageable age as per the laws of India (currently, 18 years or over for females and 21 years or over for males). The UmiyaMatrimony.com site is only to facilitate personal advertisement for lawful matrimonial alliance between persons who are legally competent to enter into matrimony under the laws to which they are subject. Membership in the Service is void where prohibited. By using this Site, you represent and warrant that you have the right, authority, and legal capacity to enter into this Agreement and that you are not prohibited or prevented by any applicable law for the time being in force or any order or decree or injunction from any court, tribunal or any such competent authority restraining you from entering into matrimony. You also agree to abide by all of the terms and conditions of this Agreement. If at any time UmiyaMatrimony.com is of the opinion (in its sole discretion) or has any reason to believe that you are not eligible to become a member or that you have made any misrepresentation about your eligibility, UmiyaMatrimony.com reserves the right to forthwith terminate your membership and / or your right to use the Service without any refund to you of any of your unutilized subscription fee.\n            "),o("br"),o("u",[e._v("Term.")]),o("br"),e._v("You may terminate your membership at any time, for any reason by writing to UmiyaMatrimony.com. In the event you terminate your membership, you will not be entitled to a refund of any unutilized subscription fees, if any, paid by you, except where otherwise stated in writing. UmiyaMatrimony.com may terminate your access to the Site and/or your membership for any reason effective upon sending notice to you at the email address as provided you in your application for membership or such other email address as you may later provided to UmiyaMatrimony.com. If UmiyaMatrimony.com terminates your membership for breach of terms of this Agreement, you will not be entitled to any refund of any unused Subscription fees, if any, paid by you. Certain provisions of this Agreement including sections 4, 5, 7 and sections 9 to14, of this Agreement shall remain effective even on termination. Term for the paid Membership would be in accordance with the type of membership undertaken.\n            "),o("br"),o("u",[e._v("Non-Commercial Use by Members.")]),o("br"),e._v("The UmiyaMatrimony.com Site is for the personal use of individual members to advertise and promote their profiles for the purpose of generating Accepts from relevant matches and cannot be used in connection with any commercial endeavors. This includes providing links to other web sites, whether deemed competitive to UmiyaMatrimony.com or otherwise. Organizations, companies, and/or businesses cannot become Members of UmiyaMatrimony.com and should not use the UmiyaMatrimony.com Service or Site for any purpose. Illegal and/or unauthorized uses of the Site, including unauthorized framing of or linking to the Site will be investigated, and appropriate legal action will be taken, including without limitation, civil, criminal, and injunctive redress.\n            "),o("br"),o("u",[e._v("Other Terms of Use by Members.")]),o("br"),e._v("UmiyaMatrimony.com reserves the right in its sole discretion to review the activity & status of each account & block the account of a member based on such review.\n            "),o("br"),e._v("You hereby confirm that as on date of this registration, you do not have any objection to receiving emails, messages and calls from UmiyaMatrimony.com and members of UmiyaMatrimony.com as long as you are a registered member of UmiyaMatrimony.com. This consent shall supersede any preferences set by you with or registration done with the Do Not Disturb (DND Register)/ National Customer Preference Register (NCPR). This consent extends to emails, messages or calls relating but not limited to phone number verification, the provision of matrimonial advertising service, matrimonial enquiries and promotions.\n            Multiple profiles of the same person are not allowed on UmiyaMatrimony.com. UmiyaMatrimony.com reserves the right to deactivate all multiple profiles without any refund of subscription fees.\n            Except for the purpose of promoting/advertising your profile for matrimonial purposes, you cannot engage in advertising to, or solicitation of, other Members to buy or sell any products or services through the Service. You will not transmit any chain letters or junk email to other UmiyaMatrimony.com Members. Although UmiyaMatrimony.com cannot monitor the conduct of its Members off the UmiyaMatrimony.com Site, it is also a violation of these rules to use any information obtained from other members in order to harass, abuse, or harm another person, or in order to contact, advertise to, solicit, or sell to any Member without their prior explicit consent.\n            In order to protect UmiyaMatrimony.com and/or our Members from any abuse / misuse, UmiyaMatrimony.com reserves the right to take appropriate steps as it deems appropriate in its sole discretion in order to protect interest of other Members.\n            You cannot use any automated processes, including IRC Bots, EXE's, CGI or any other programs/scripts to view content on or communicate / contact / respond / interact with UmiyaMatrimony.com and/or its members.\n            UmiyaMatrimony.com reserves the right to screen communications/advertisements that you may send to other Member(s) and also regulate the same by deleting unwarranted/obscene communications/advertisements at any time at its sole discretion without prior notice to any Member.\n            UmiyaMatrimony.com Members are expected to exercise simple precautions for their privacy and safety. A suggestive guideline of such precautions is enlisted under “Security Tips”. By becoming a Member you hereby agree to abide and adhere to the said Tips.\n            UmiyaMatrimony.com Members who subscribe to the UmiyaMatrimony.com Select Service hereby, unconditionally and irrevocably confirm that you have read terms and conditions and agree to abide by them.\n            "),o("br"),e._v("Proprietary Rights in the Content on UmiyaMatrimony.com\n            "),o("br"),e._v("UmiyaMatrimony.com owns and retains all proprietary rights in the UmiyaMatrimony.com Site and the UmiyaMatrimony.com Service. The Site contains the copyrighted material, trademarks, and other proprietary information of UmiyaMatrimony.com, and its licensors. Except for that information which is in the public domain such as member profile or for which permission has been obtained from the user, you cannot copy, modify, publish, transmit, distribute, perform, display, or sell any such proprietary information. Any such act or an attempted act on your part shall constitute a violation of this Agreement and your membership is liable to be terminated forthwith by UmiyaMatrimony.com without refund of any of your unused Subscription fees. We also reserve our right to take legal action (civil and/or criminal) wherever applicable for any violations.\n            "),o("br"),o("u",[e._v("Content Posted on the Site.")]),o("br"),e._v('You understand and agree that UmiyaMatrimony.com may delete any listing, content, communication, photos or profiles (collectively, "Content") that in the sole judgment of UmiyaMatrimony.com violate this Agreement or which might be offensive, illegal, or that might violate the rights, harm, or threaten the safety of either UmiyaMatrimony.com and/or its Members.\n            With respect to Content you submit or make available for inclusion on publicly accessible areas of the Site including but not limited to your contact details, you hereby unconditionally and irrevocably grant to UmiyaMatrimony.com the license to use, distribute, reproduce, modify, adapt, publicly perform and publicly display such Content on the Site and to Shaadi Centre members from time to time.\n            You shall use the Services only to market and promote your profile and to reach out to other Members for the purpose of driving an ‘Accept’ from relevant matches. You understand and hereby agree that all information, data, text, photographs, graphics, communications, tags, or other Content whether publicly posted or privately transmitted or otherwise made available to UmiyaMatrimony.com or Shaadi Centre members, are the sole responsibility of the person from whom such Content originated and shall be at the member\'s/person\'s sole risks and consequences. This means that you (and not UmiyaMatrimony.com) are solely responsible for all Content that you upload, post, email, transmit or otherwise make available via the Service. UmiyaMatrimony.com does not control the Content posted via the Service and, as such, does not guarantee the accuracy, integrity or quality of such Content. Under no circumstances will UmiyaMatrimony.com be liable in any way for any Content, including, but not limited to, any errors or omissions in any Content, or any loss or damage of any kind incurred as a result of the use of any Content posted, emailed, transmitted or otherwise made available via the Service. UmiyaMatrimony.com reserves the right to verify the authenticity of Content posted on the Site. In exercising this right, UmiyaMatrimony.com may ask you to provide any documentary or other form of evidence supporting the Content you post on the Site. If you fail to produce such evidence, UmiyaMatrimony.com may, in its sole discretion, terminate your Membership without a refund.\n            By posting Content/ advertising to any public area of UmiyaMatrimony.com, you automatically grant, and you represent and warrant that you have the right to grant, to UmiyaMatrimony.com, and other UmiyaMatrimony.com Members, an irrevocable, perpetual, non-exclusive, fully-paid, worldwide license to use, copy, perform, display, and distribute such information and content and to prepare derivative works of, or incorporate into other works, such information and content, and to grant and authorize sublicenses of the foregoing.\n            The following is an indicative list of the kind of Content that is illegal or prohibited on the Site. UmiyaMatrimony.com will investigate and take appropriate legal action in its sole discretion against anyone who violates this Agreement, including without limitation, removing the offending communication / Content from the Service and terminating the Membership of such violators without a refund.\n            Illegal and prohibitive Content includes Content which:\n            is blatantly offensive to the community, such as Content that promotes racism, bigotry , hatred or physical harm of any kind against any group or individual;\n            harasses or advocates harassment of another person;\n            involves the transmission of "junk mail", "chain letters," or unsolicited mass mailing or "spamming";\n            promotes information that you know is false, misleading or promotes illegal activities or conduct that is abusive, threatening, obscene, defamatory or libelous;\n            promotes an illegal or unauthorized copy of another person\'s copyrighted work, such as providing pirated computer programs or links to them, providing information to circumvent manufacture-installed copy-protect devices, or providing pirated music or links to pirated music files;\n            contains restricted or password only access pages, or hidden pages or images (those not linked to or from another accessible page) ;\n            displays pornographic or sexually explicit material of any kind;\n            provides material that exploits people under the age of 18 in a sexual or violent manner, or solicits personal information from anyone under 18;\n            provides instructional information about illegal activities such as making or buying illegal weapons, violating someone\'s privacy, or providing or creating computer viruses;\n            solicits passwords or personal identifying information for commercial or unlawful purposes from other users; and\n            engages in commercial activities and/or sales without our prior written consent such as contests, sweepstakes, barter, advertising, and pyramid schemes\n            You must use the UmiyaMatrimony.com Service in a manner consistent with any and all applicable local, state, and federal laws, rules and regulations.\n            You cannot include in your Member profile, visible to other members, any telephone numbers, street addresses, URL\'s, and email addresses.\n            '),o("br"),o("u",[e._v("Copyright Policy.")]),o("br"),e._v("You cannot post, distribute, or reproduce in any way any copyrighted material, trademarks, or other proprietary information without obtaining the prior written consent of the owner of such proprietary rights. Without limiting the foregoing, if you believe that your work has been copied and posted on the UmiyaMatrimony.com service in a way that constitutes copyright infringement, please provide us with the following information:\n            an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest;\n            a description of the copyrighted work that you claim has been infringed;\n            a description of where the material that you claim is infringing is located on the our Site;\n            your address, telephone number, and email address;\n            a written statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law;\n            a statement by you, made under penalty of perjury, that the above information in your Notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.\n            Notice of claims of copyright infringement can be sent to us in writing to the Mumbai address located under the Help/Contact section on the site.\n            "),o("br"),o("u",[e._v("Member Disputes.")]),o("br"),e._v("You are solely responsible for your advertisement/communications with other UmiyaMatrimony.com Members. UmiyaMatrimony.com reserves the right, but has no obligation, to monitor disputes between you and other Members. UmiyaMatrimony.com also reserves the right to take appropriate action against errant members. However, UmiyaMatrimony.com is not obliged to share such action with other members, including complainants. UmiyaMatrimony.com expressly disclaims any responsibility or liability for any transactions or interactions between the members inter-se.\n            "),o("br"),o("u",[e._v("Privacy.")]),e._v("\n            Use of the UmiyaMatrimony.com Site and/or the UmiyaMatrimony.com Service is governed by our Privacy Policy.\n            "),o("br"),o("u",[e._v("Disclaimers.")]),o("br"),e._v('UmiyaMatrimony.com is not responsible for any incorrect or inaccurate Content/listing posted on the Site or in connection with the UmiyaMatrimony.com Service, whether caused by Users, Members or by any of the equipment or programming associated with or utilized in the Service, nor for the conduct of any User and/or Member of the UmiyaMatrimony.com Service whether online or offline.\n            UmiyaMatrimony.com assumes no responsibility for any error, omission, interruption, deletion, defect, delay in operation or transmission, communications line failure, theft or destruction or unauthorized access to, or alteration of, User and/or Member communications or any communications by UmiyaMatrimony.com to its Members.\n            UmiyaMatrimony.com is not responsible for any problems or technical malfunction of any telephone network or lines, computer on-line-systems, servers or providers, computer equipment, software, failure of email or players on account of technical problems or traffic congestion on the Internet or at any web site or combination thereof, including injury or damage to Users and/or Members or to any other person\'s computer related to or resulting and/or in connection with the UmiyaMatrimony.com Service.\n            Under no circumstances will UmiyaMatrimony.com be responsible for any loss or damage resulting from anyone\'s use of the Site or the Service and/or any Content posted on the UmiyaMatrimony.com Site or transmitted to UmiyaMatrimony.com Members.\n            The exchange of matrimonial profile(s) through or by "UmiyaMatrimony.com" is not a matrimonial offer and/or recommendation from/by UmiyaMatrimony.com. UmiyaMatrimony.com shall not be responsible for any loss or damage to any individual arising out of, or subsequent to, any relations (including but not limited to matrimonial relations) established pursuant to the use of UmiyaMatrimony.com.\n            The Site and the Service are provided "AS-IS" and UmiyaMatrimony.com expressly disclaims any warranty of fitness for a particular purpose or non-infringement. UmiyaMatrimony.com cannot guarantee and does not promise any specific results from use of the Site and/or the UmiyaMatrimony.com Service.\n            UmiyaMatrimony.com expressly disclaims any liability or responsibility whatsoever and howsoever arising as a result of any Content/listing posted on the Site / made available to UmiyaMatrimony.com by any Members or the users of the Site or any third party.\n            UmiyaMatrimony.com does not assume any responsibility or liability for any illegal Content posted on the Site by any Members, users or any third party.\n            All liability, whether civil or criminal arising out of any Content that is Posted on the Site will be of that Member / user / third party who has Posted such Content and UmiyaMatrimony.com reserves its right to claim damages from such Member/ user / third party that it may suffer as a result of such Content Posted on the Site. UmiyaMatrimony.com does not claim ownership of Content you submit or make available for inclusion on the Service.\n            '),o("br"),o("u",[e._v("Limitation on Liability.")]),o("br"),e._v("In no event will UmiyaMatrimony.com be liable to you or any third person for any indirect, consequential, exemplary, incidental, special or punitive damages, including also lost profits arising from your use of the Site or the UmiyaMatrimony.com Service, even if UmiyaMatrimony.com has been advised of the possibility of such damages. Notwithstanding anything to the contrary contained herein, UmiyaMatrimony.com's liability to you for any cause whatsoever, and regardless of the form of the action, will at all times be limited to the amount paid, if any, by you to UmiyaMatrimony.com, for the Service during the term of membership.\n            "),o("br"),o("u",[e._v("Jurisdiction.")]),o("br"),e._v("If there is any dispute about or involving the Site and/or the Service, by using the Site, you unconditionally agree that all such disputes and/or differences will be governed by the laws of India and shall be subject to the exclusive jurisdiction of the Competent Courts in Mumbai, India only.\n            "),o("br"),o("u",[e._v("Indemnity.")]),o("br"),e._v("You agree to indemnify and hold UmiyaMatrimony.com, its subsidiaries, affiliates, officers, agents, and other partners and employees, fully indemnified and harmless from any loss, liability, claim, or demand, including reasonable attorney's fees, made by any third party due to or arising out of your use of the Service in violation of this Agreement and/or arising from a breach of these Terms of Use and/or any breach of your representations and warranties set forth above and/or any fraudulent act on your part.\n            "),o("u",[e._v("Other.")]),o("br"),e._v("By becoming a Member of the UmiyaMatrimony.com service, you agree to receive certain specific email from UmiyaMatrimony.com and/or its group sites. You can unsubscribe at any time for any reason quickly and easily by clicking on the unsubscribe link enclosed in the mail. You can also manage your subscription to these emails using the My Alert Manager option.\n            This Agreement, accepted upon use of the Site and further affirmed by becoming a Member of the UmiyaMatrimony.com service, contains the entire agreement between you and UmiyaMatrimony.com regarding the use of the Site and/or the Service. If any provision of this Agreement is held invalid, the remainder of this Agreement shall continue in full force and effect.\n            By becoming a member of UmiyaMatrimony.com and/or using the Services of the Site, you unconditionally and irrevocably confirm that you have read and understood the above provisions and agree to abide by them.\n            Please contact us with any questions regarding this service agreement.\n          ")])}],a={},n=a,s=o("2877"),m=Object(s["a"])(n,i,r,!1,null,null,null);t["default"]=m.exports},e37e:function(e,t,o){"use strict";o.d(t,"a",(function(){return r}));var i=o("436b");function r(e){i["a"].create({title:"<font color='red'><b><u>Error!</u></b></font>",persistent:!0,transitionShow:"scale",transitionHide:"scale",message:e,backgroundColor:"blue",html:!0})}}}]);