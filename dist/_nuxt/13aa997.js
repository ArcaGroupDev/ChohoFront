(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{472:function(t,e,n){"use strict";n(12),n(13),n(14),n(5),n(15),n(9),n(16);var r=n(2),o=(n(24),n(217),n(218),n(488),n(219)),c=n(494),l=n(72),d=n(7);function v(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(d.a)(c.a,l.a,o.a).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return h(h({"v-card":!0},l.a.options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},o.a.options.computed.classes.call(this))},styles:function(){var style=h({},o.a.options.computed.styles.call(this));return this.img&&(style.background='url("'.concat(this.img,'") center center / cover no-repeat')),style}},methods:{genProgress:function(){var t=c.a.options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render:function(t){var e=this.generateRouteLink(),n=e.tag,data=e.data;return data.style=this.styles,this.isClickable&&(data.attrs=data.attrs||{},data.attrs.tabindex=0),t(n,this.setBackgroundColor(this.color,data),[this.genProgress(),this.$slots.default])}})},488:function(t,e,n){var content=n(489);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(19).default)("03030716",content,!0,{sourceMap:!1})},489:function(t,e,n){var r=n(18)(!1);r.push([t.i,'.theme--light.v-card{background-color:#fff;color:rgba(0,0,0,.87)}.theme--light.v-card>.v-card__subtitle,.theme--light.v-card>.v-card__text{color:rgba(0,0,0,.6)}.theme--dark.v-card{background-color:#1e1e1e;color:#fff}.theme--dark.v-card>.v-card__subtitle,.theme--dark.v-card>.v-card__text{color:hsla(0,0%,100%,.7)}.v-sheet.v-card{border-radius:4px}.v-sheet.v-card:not(.v-sheet--outlined){box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.v-sheet.v-card.v-sheet--shaped{border-radius:24px 4px}.v-card{border-width:thin;display:block;max-width:100%;outline:none;text-decoration:none;transition-property:box-shadow,opacity;word-wrap:break-word;position:relative;white-space:normal}.v-card>.v-card__progress+:not(.v-btn):not(.v-chip):not(.v-avatar),.v-card>:first-child:not(.v-btn):not(.v-chip):not(.v-avatar){border-top-left-radius:inherit;border-top-right-radius:inherit}.v-card>:last-child:not(.v-btn):not(.v-chip):not(.v-avatar){border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.v-card__progress{top:0;left:0;right:0;overflow:hidden}.v-card__subtitle+.v-card__text{padding-top:0}.v-card__subtitle,.v-card__text{font-size:.875rem;font-weight:400;line-height:1.375rem;letter-spacing:.0071428571em}.v-card__subtitle,.v-card__text,.v-card__title{padding:16px}.v-card__title{align-items:center;display:flex;flex-wrap:wrap;font-size:1.25rem;font-weight:500;letter-spacing:.0125em;line-height:2rem;word-break:break-all}.v-card__title+.v-card__subtitle,.v-card__title+.v-card__text{padding-top:0}.v-card__title+.v-card__subtitle{margin-top:-16px}.v-card__text{width:100%}.v-card__actions{align-items:center;display:flex;padding:8px}.v-card__actions>.v-btn.v-btn{padding:0 8px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn+.v-btn{margin-left:8px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn .v-icon--left{margin-left:4px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn .v-icon--right{margin-right:4px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn+.v-btn{margin-right:8px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn .v-icon--left{margin-right:4px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn .v-icon--right{margin-left:4px}.v-card--flat{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)!important}.v-sheet.v-card--hover{cursor:pointer;transition:box-shadow .4s cubic-bezier(.25,.8,.25,1)}.v-sheet.v-card--hover:focus,.v-sheet.v-card--hover:hover{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.v-card--link,.v-card--link .v-chip{cursor:pointer}.v-card--link:focus:before{opacity:.08}.v-card--link:before{background:currentColor;bottom:0;content:"";left:0;opacity:0;pointer-events:none;position:absolute;right:0;top:0;transition:opacity .2s}.v-card--disabled{pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-card--disabled>:not(.v-card__progress){opacity:.6;transition:inherit}.v-card--loading{overflow:hidden}.v-card--raised{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}',""]),t.exports=r},490:function(t,e,n){"use strict";var r=n(119),o=n.n(r),c=n(179),l=n.n(c).a.get("wms_token"),d=o.a.create({baseURL:"http://localhost:8081/api",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(l)}});d.interceptors.response.use((function(t){return t}),(function(t){return 401===t.response.status&&(window.location.href="/login"),t})),e.a={login:function(data){return o.a.create({baseURL:"http://localhost:8081/api",headers:{"Content-Type":"application/json"}}).post("/login_check",data)},saveForm:function(data){return d.post("/formulario/store",data)},editField:function(data){return d.post("/campo/edit",data)},getForms:function(){return d.get("/formulario/rows")},getEntities:function(){return d.get("/formulario/entitys")},getTypeFields:function(){return d.get("/tipo/campo/all")},saveSection:function(data){return d.post("/seccion/store",data)},saveField:function(data){return d.post("/campo/store",data)},getFormEntity:function(t){return d.get("/formulario/entity/"+t)},getItems:function(t){return d.get(t)},saveClient:function(data){return d.post("/tercero/store",data)},updatedOptionsField:function(data){return d.post("/campo/options",data)},getAllClient:function(){return d.get("/tercero/all")},getDepartamentByName:function(data){return d.post("/departamentos/name",data)},getPaisByName:function(data){return d.post("/pais/name",data)},getCiudadByName:function(data){return d.post("ciudades/name",data)},getFamilys:function(){return d.get("/familia/all")},getGroups:function(t){return d.post("/grupo/all",t)},getSubgroups:function(t){return d.post("/subgrupo/all",t)},getProducts:function(){var filter=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return d.post("/producto/list",filter)},updateFamily:function(t){return d.post("/familia/edit",t)},updateGroup:function(t){return d.post("/grupo/edit",t)},getUsers:function(){return d.get("/usuario/all")},updateUser:function(t){return d.post("/usuario/"+t.id+"/edit",t)},saveUser:function(data){return d.post("/usuario/new",data)},resetPassword:function(t){return d.post("/usuario/"+t.id+"/reset-password",t)},getAllOrdenes:function(){return d.get("/ordenes/all")},findDetailOrden:function(data){return d.post("/detalleOrdenes/detallesByOrdenId",data)},getOrdenById:function(data){return d.post("/ordenes/getOrdenById",data)},saveOrden:function(data){return d.post("/ordenes/saveOrden",data)},saveProducts:function(data){return d.post("/detalleOrdenes/saveProduct",data)},updateOrdenById:function(data){return d.post("/ordenes/updateOrdenById",data)},deleteProductById:function(data){return d.post("/detalleOrdenes/deleteProductById",data)},getAllCotizaciones:function(){return d.get("/ordenes/getCot")},getAllPedidos:function(){return d.get("/ordenes/getPed")}}},519:function(t,e,n){"use strict";var r=n(2),o=(n(44),n(60),n(225),n(14),n(5),n(9),n(56),n(97),n(12),n(13),n(15),n(16),n(7)),c=n(99),l=n(143);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(o.a)(c.a,Object(l.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var t=this,e=function(input){return input.$watch("hasError",(function(e){t.$set(t.errorBag,input._uid,e)}),{immediate:!0})},n={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=input.$watch("shouldValidate",(function(r){r&&(t.errorBag.hasOwnProperty(input._uid)||(n.valid=e(input)))})):n.valid=e(input),n},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var t=this.inputs.find((function(i){return i._uid===input._uid}));if(t){var e=this.watchers.find((function(i){return i._uid===t._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==t._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:v({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},537:function(t,e,n){var content=n(538);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(19).default)("8e0b7300",content,!0,{sourceMap:!1})},538:function(t,e,n){var r=n(18)(!1);r.push([t.i,'.theme--light.v-snack__wrapper{color:rgba(0,0,0,.87)}.theme--dark.v-snack__wrapper{color:#fff}.v-sheet.v-snack__wrapper{border-radius:4px}.v-sheet.v-snack__wrapper:not(.v-sheet--outlined){box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)}.v-sheet.v-snack__wrapper.v-sheet--shaped{border-radius:24px 4px}.v-snack{bottom:0;display:flex;font-size:.875rem;justify-content:center;left:0;pointer-events:none;right:0;top:0;width:100%}.v-snack:not(.v-snack--absolute){height:100vh;position:fixed;z-index:1000}.v-snack:not(.v-snack--centered):not(.v-snack--top){align-items:flex-end}.v-snack__wrapper{align-items:center;border-color:currentColor!important;display:flex;margin:8px;max-width:672px;min-height:48px;min-width:344px;padding:0;pointer-events:auto;position:relative;transition-duration:.15s;transition-property:opacity,transform;transition-timing-function:cubic-bezier(0,0,.2,1);z-index:1}.v-snack__wrapper.theme--dark{background-color:#333;color:hsla(0,0%,100%,.87)}.v-snack__content{flex-grow:1;font-size:.875rem;font-weight:400;letter-spacing:.0178571429em;line-height:1.25rem;margin-right:auto;padding:14px 16px;text-align:left;text-align:initial}.v-snack__action{align-items:center;align-self:center;display:flex}.v-snack__action .v-ripple__container{display:none}.v-application--is-ltr .v-snack__action{margin-right:8px}.v-application--is-rtl .v-snack__action{margin-left:8px}.v-snack__action>.v-snack__btn.v-btn{padding:0 8px}.v-snack__btn{margin:0;min-width:auto}.v-snack--absolute{height:100%;position:absolute;z-index:1}.v-snack--centered{align-items:center}.v-snack--left{justify-content:flex-start;right:auto}.v-snack--multi-line .v-snack__wrapper{min-height:68px}.v-snack--right{justify-content:flex-end;left:auto}.v-snack:not(.v-snack--has-background) .v-snack__wrapper{box-shadow:none}.v-snack--bottom{top:auto}.v-snack--text .v-snack__wrapper:before{background-color:currentColor;border-radius:inherit;bottom:0;content:"";left:0;opacity:.12;pointer-events:none;position:absolute;right:0;top:0;z-index:-1}.v-snack--top{align-items:flex-start;bottom:auto}.v-snack--vertical .v-snack__wrapper{flex-direction:column}.v-snack--vertical .v-snack__wrapper .v-snack__action{align-self:flex-end;margin-bottom:8px}.v-snack-transition-enter.v-snack__wrapper{transform:scale(.8)}.v-snack-transition-enter.v-snack__wrapper,.v-snack-transition-leave-to.v-snack__wrapper{opacity:0}',""]),t.exports=r},571:function(t,e,n){var content=n(622);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(19).default)("8383740c",content,!0,{sourceMap:!1})},572:function(t,e,n){"use strict";var r=n(2),o=(n(24),n(44),n(56),n(537),n(55)),c=n(38),l=n(26),d=n(59),v=n(100),h=n(7),f=n(0),m=n(8);e.a=Object(h.a)(o.a,c.a,d.a,Object(v.b)(["absolute","bottom","left","right","top"])).extend({name:"v-snackbar",props:{app:Boolean,centered:Boolean,contentClass:{type:String,default:""},multiLine:Boolean,text:Boolean,timeout:{type:[Number,String],default:5e3},transition:{type:[Boolean,String],default:"v-snack-transition",validator:function(t){return"string"==typeof t||!1===t}},vertical:Boolean},data:function(){return{activeTimeout:-1}},computed:{classes:function(){return{"v-snack--absolute":this.absolute,"v-snack--active":this.isActive,"v-snack--bottom":this.bottom||!this.top,"v-snack--centered":this.centered,"v-snack--has-background":this.hasBackground,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--text":this.text,"v-snack--top":this.top,"v-snack--vertical":this.vertical}},hasBackground:function(){return!this.text&&!this.outlined},isDark:function(){return this.hasBackground?!this.light:l.a.options.computed.isDark.call(this)},styles:function(){if(this.absolute||!this.app)return{};var t=this.$vuetify.application,e=t.bar,n=t.bottom,footer=t.footer,r=t.insetFooter,o=t.left,c=t.right,l=t.top;return{paddingBottom:Object(f.h)(n+footer+r),paddingLeft:Object(f.h)(o),paddingRight:Object(f.h)(c),paddingTop:Object(f.h)(e+l)}}},watch:{isActive:"setTimeout",timeout:"setTimeout"},mounted:function(){this.isActive&&this.setTimeout()},created:function(){this.$attrs.hasOwnProperty("auto-height")&&Object(m.e)("auto-height",this),0==this.timeout&&Object(m.d)('timeout="0"',"-1",this)},methods:{genActions:function(){return this.$createElement("div",{staticClass:"v-snack__action "},[Object(f.t)(this,"action",{attrs:{class:"v-snack__btn"}})])},genContent:function(){return this.$createElement("div",{staticClass:"v-snack__content",class:Object(r.a)({},this.contentClass,!0),attrs:{role:"status","aria-live":"polite"}},[Object(f.t)(this)])},genWrapper:function(){var t=this,data=(this.hasBackground?this.setBackgroundColor:this.setTextColor)(this.color,{staticClass:"v-snack__wrapper",class:o.a.options.computed.classes.call(this),style:o.a.options.computed.styles.call(this),directives:[{name:"show",value:this.isActive}],on:{pointerenter:function(){return window.clearTimeout(t.activeTimeout)},pointerleave:this.setTimeout}});return this.$createElement("div",data,[this.genContent(),this.genActions()])},genTransition:function(){return this.$createElement("transition",{props:{name:this.transition}},[this.genWrapper()])},setTimeout:function(){var t=this;window.clearTimeout(this.activeTimeout);var e=Number(this.timeout);this.isActive&&![0,-1].includes(e)&&(this.activeTimeout=window.setTimeout((function(){t.isActive=!1}),e))}},render:function(t){return t("div",{staticClass:"v-snack",class:this.classes,style:this.styles},[!1!==this.transition?this.genTransition():this.genWrapper()])}})},621:function(t,e,n){"use strict";n(571)},622:function(t,e,n){var r=n(18)(!1);r.push([t.i,".google-btn{background-color:#4385f4}.apple-btn,.google-btn{width:100%;height:36px;border-radius:5px}.apple-btn{background-color:#474747}.google-icon-wrapper{position:absolute;margin-top:1px;margin-left:1px;width:40px;height:34px;border-radius:5px 0 0 5px;background-color:#fff}.google-icon{position:absolute;margin-top:8px;margin-left:-8px;width:18px;height:18px}.btn-text{display:flex;justify-content:center;flex-direction:wrap;padding-top:8px;color:#fff;font-size:14px;letter-spacing:.2px;font-weight:200}.google-btn:hover{background-color:#0c51c9;box-shadow:0 0 3px #2855a1;cursor:pointer}.google-btn:active{background:#2855a1}.apple-btn:hover{background-color:#000;box-shadow:0 0 3px #424242;cursor:pointer}.apple-btn:active{background:#000}",""]),t.exports=r},648:function(t,e,n){"use strict";n.r(e);var r=n(2),o=(n(25),n(490),n(179)),c=n.n(o),l={layout:"login",data:function(){return{checkbox:!1,snackbar:!1,text:"",color:"",timeout:2e3,submitting:!1,loginData:{username:"",password:""},validationRules:{email:[function(t){return!!t||"Required."},function(t){return/.+@.+\..+/.test(t)||"Invalid email"}],password:[function(t){return!!t||"Required."}]}}},head:{title:"Login"},methods:Object(r.a)({userLogin:function(){var t=this;this.submitting=this.$refs.form.validate(),this.$refs.form.validate()&&this.$axios.post("/login_check",this.loginData).then((function(e){t.$refs.form.reset();var n=e.data.token;c.a.set("wms_token",n,{expires:.5}),t.text="Bienvenido al WMS",t.color="success",t.snackbar=!0,window.location="/dashboard"})).catch((function(e){t.text="Credenciales invalidas. Intente otra vez..",t.color="error",t.snackbar=!0}))}},"userLogin",(function(){window.location.href="./index.html"}))},d=(n(621),n(63)),v=n(76),h=n.n(v),f=n(236),m=n(472),x=(n(237),n(241)),_=Object(x.a)("flex"),k=n(519),w=Object(x.a)("layout"),y=n(572),O=n(507),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{attrs:{"align-center":"center","justify-center":"center"}},[n("v-flex",{attrs:{xs12:""}},[n("v-card",{staticClass:"mx-auto pa-5",attrs:{"max-width":"420",outlined:""}},[n("v-form",{ref:"form",staticClass:"text-center"},[n("img",{staticClass:"mb-5",attrs:{src:"https://uploads-ssl.webflow.com/61a788a70815cbea602bdc64/61a8c9aab605850d74665f02_Choho.svg"}}),t._v(" "),n("v-text-field",{staticClass:"my-3",attrs:{"background-color":"white",outlined:"",dense:"",label:"E-mail or Username",type:"text","prepend-inner-icon":"mdi-account","hide-details":"",rules:t.validationRules.email},model:{value:t.loginData.username,callback:function(e){t.$set(t.loginData,"username",e)},expression:"loginData.username"}}),t._v(" "),n("v-text-field",{staticClass:"my-3",attrs:{"background-color":"white",outlined:"",dense:"",type:"password",label:"Password","prepend-inner-icon":"mdi-lock","hide-details":"",rules:t.validationRules.password},model:{value:t.loginData.password,callback:function(e){t.$set(t.loginData,"password",e)},expression:"loginData.password"}}),t._v(" "),n("div",{staticClass:"d-flex justify-end my-0"},[n("div",{staticClass:"text-right"},[n("p",{staticClass:"mt-1 caption"},[t._v("Forgot your password?")])])]),t._v(" "),n("hr",{staticClass:"my-6",attrs:{color:"#e2e2e2"}}),t._v(" "),n("v-btn",{staticClass:"white--text my-3 caption",attrs:{color:"#000000",elevation:"0",block:"",disabled:t.submitting},on:{click:function(e){return t.userLogin()}}},[t._v("\n          Login\n        ")]),t._v(" "),n("btn",{on:{click:function(e){return t.irHtml()}}},[t._v("\n          html\n        ")])],1)],1)],1),t._v(" "),n("v-snackbar",{attrs:{timeout:t.timeout,color:t.color,outlined:""},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\n    "+t._s(t.text)+"\n  ")])],1)}),[],!1,null,null,null);e.default=component.exports;h()(component,{VBtn:f.a,VCard:m.a,VFlex:_,VForm:k.a,VLayout:w,VSnackbar:y.a,VTextField:O.a})}}]);