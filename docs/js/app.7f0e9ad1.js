(function(e){function t(t){for(var c,o,i=t[0],l=t[1],u=t[2],s=0,d=[];s<i.length;s++)o=i[s],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&d.push(r[o][0]),r[o]=0;for(c in l)Object.prototype.hasOwnProperty.call(l,c)&&(e[c]=l[c]);b&&b(t);while(d.length)d.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],c=!0,o=1;o<n.length;o++){var l=n[o];0!==r[l]&&(c=!1)}c&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var c={},r={app:0},a=[];function o(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-2d0af44c":"939039dd","chunk-2d0c08f0":"bc14b6f5","chunk-2d0c734e":"ccc42e28","chunk-2d0cbcf5":"f64fef5f","chunk-2d0cc03b":"54e64724","chunk-2d0d3868":"0f158f4d","chunk-2d20869b":"4536106d","chunk-2d21b4c8":"c16a6747","chunk-2d226cfa":"15396451"}[e]+".js"}function i(t){if(c[t])return c[t].exports;var n=c[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n=r[e];if(0!==n)if(n)t.push(n[2]);else{var c=new Promise((function(t,c){n=r[e]=[t,c]}));t.push(n[2]=c);var a,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=o(e);var u=new Error;a=function(t){l.onerror=l.onload=null,clearTimeout(s);var n=r[e];if(0!==n){if(n){var c=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;u.message="Loading chunk "+e+" failed.\n("+c+": "+a+")",u.name="ChunkLoadError",u.type=c,u.request=a,n[1](u)}r[e]=void 0}};var s=setTimeout((function(){a({type:"timeout",target:l})}),12e4);l.onerror=l.onload=a,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=c,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)i.d(n,c,function(t){return e[t]}.bind(null,c));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var s=0;s<l.length;s++)t(l[s]);var b=u;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0b65":function(e,t,n){},"0dc4":function(e,t,n){},"11c2":function(e,t,n){"use strict";n("71c7")},"17fd":function(e,t,n){},"31cd":function(e,t,n){},5169:function(e,t,n){"use strict";n("d160")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var c=n("7a23"),r=n("ab42"),a={key:0,class:"not-support"},o={class:"not-support__wrap"},i={class:"not-support__title"},l={class:"not-support__description"};function u(e,t,n,r,u,s){var b=Object(c["A"])("app"),d=Object(c["A"])("loading");return e.error?(Object(c["t"])(),Object(c["h"])("article",a,[Object(c["j"])("div",o,[Object(c["j"])("h1",i,Object(c["C"])(e.$t("error.".concat(e.error,".title"))),1),Object(c["j"])("p",l,Object(c["C"])(e.$t("error.".concat(e.error,".description"))),1)])])):(Object(c["t"])(),Object(c["h"])(c["b"],{key:1},{default:Object(c["E"])((function(){return[Object(c["j"])(b)]})),fallback:Object(c["E"])((function(){return[Object(c["j"])(d)]})),_:1}))}var s=Object(c["G"])("data-v-39d5541f"),b=s((function(e,t,n,r,a,o){var i=Object(c["A"])("buttons-icon"),l=Object(c["A"])("app-header"),u=Object(c["A"])("board-item"),b=Object(c["A"])("preference"),d=Object(c["A"])("box-list"),j=Object(c["A"])("board-list");return Object(c["t"])(),Object(c["h"])(c["a"],null,[Object(c["j"])("main",null,[Object(c["j"])(l,{title:"하루하루의 운동운동~",class:"app-header"},{navRight:s((function(){return[Object(c["j"])(i,{title:"box list",icon:"grid",class:"app-header__button",onClick:t[1]||(t[1]=function(t){return e.state.showBoxList=!0})}),Object(c["j"])(i,{title:"board list",icon:"menu",class:"app-header__button",onClick:t[2]||(t[2]=function(t){return e.state.showBoardList=!0})}),Object(c["j"])(i,{title:"preference",icon:"setting",class:"app-header__button",onClick:t[3]||(t[3]=function(t){return e.state.showPreference=!0})})]})),_:1}),Object(c["j"])(u)]),(Object(c["t"])(),Object(c["h"])(c["c"],{to:"body"},[Object(c["j"])(c["e"],{name:"modal-fade"},{default:s((function(){return[e.state.showPreference?(Object(c["t"])(),Object(c["h"])(b,{key:0,onClose:t[4]||(t[4]=function(t){return e.state.showPreference=!1})})):Object(c["i"])("",!0)]})),_:1}),Object(c["j"])(c["e"],{name:"modal-fade"},{default:s((function(){return[e.state.showBoxList?(Object(c["t"])(),Object(c["h"])(d,{key:0,onSelectItem:e.onSelectBox,onClose:t[5]||(t[5]=function(t){return e.state.showBoxList=!1})},null,8,["onSelectItem"])):Object(c["i"])("",!0)]})),_:1}),Object(c["j"])(c["e"],{name:"modal-fade"},{default:s((function(){return[e.state.showBoardList?(Object(c["t"])(),Object(c["h"])(j,{key:0,onSelectItem:e.onSelectBoard,onClose:t[6]||(t[6]=function(t){return e.state.showBoardList=!1})},null,8,["onSelectItem"])):Object(c["i"])("",!0)]})),_:1})]))],64)})),d=(n("96cf"),n("1da1")),j=n("5502");function f(){return!!window&&!!window.indexedDB&&!!window.localStorage}var O=Object(c["G"])("data-v-5eacc6e9");Object(c["v"])("data-v-5eacc6e9");var p={class:"header"},m={key:0,class:"header__nav left"},v={key:1,class:"header__title"},h={key:2,class:"header__nav right"};Object(c["u"])();var _=O((function(e,t,n,r,a,o){return Object(c["t"])(),Object(c["h"])("header",p,[e.$slots.navLeft?(Object(c["t"])(),Object(c["h"])("nav",m,[Object(c["z"])(e.$slots,"navLeft")])):Object(c["i"])("",!0),e.title?(Object(c["t"])(),Object(c["h"])("h2",v,Object(c["C"])(e.title),1)):Object(c["i"])("",!0),e.$slots.navRight?(Object(c["t"])(),Object(c["h"])("nav",h,[Object(c["z"])(e.$slots,"navRight")])):Object(c["i"])("",!0)])})),g=Object(c["l"])({name:"app-header",components:{},props:{title:String},setup:function(){return{}}});n("aee5");g.render=_,g.__scopeId="data-v-5eacc6e9";var k=g,w=Object(c["G"])("data-v-7b3de08a"),y=w((function(e,t,n,r,a,o){var i=Object(c["A"])("icons");return Object(c["t"])(),Object(c["h"])("button",{type:"button",title:e.title,class:"buttons-icon"},[Object(c["j"])(i,{icon:e.icon,class:"buttons-icon__icon"},null,8,["icon"])],8,["title"])})),x=Object(c["G"])("data-v-e2ab8b84");Object(c["v"])("data-v-e2ab8b84");var C={fill:"none","fill-rule":"evenodd"};Object(c["u"])();var S=x((function(e,t,n,r,a,o){return Object(c["t"])(),Object(c["h"])("svg",{xmlns:"http://www.w3.org/2000/svg",width:e.size,height:e.size,viewBox:"0 0 24 24","aria-labelledby":e.icon,role:"presentation",class:"icons"},[Object(c["j"])("title",{id:e.icon,lang:"en"},Object(c["C"])(e.icon)+" icon",9,["id"]),Object(c["j"])("g",C,[(Object(c["t"])(),Object(c["h"])(Object(c["B"])(e.state.computedIconComponent),{class:"icons__unit"}))])],8,["width","height","aria-labelledby"])})),I=(n("a9e3"),n("d3b7"),Object(c["l"])({name:"icons",props:{size:{type:Number,default:24},icon:{type:String,required:!0}},setup:function(e,t){var r=Object(c["w"])({computedIconComponent:Object(c["f"])((function(){switch(e.icon){case"grid":return Object(c["k"])((function(){return n.e("chunk-2d0af44c").then(n.bind(null,"0e34"))}));case"setting":return Object(c["k"])((function(){return n.e("chunk-2d0cc03b").then(n.bind(null,"4bb9"))}));case"edit":return Object(c["k"])((function(){return n.e("chunk-2d0d3868").then(n.bind(null,"5cae"))}));case"x":return Object(c["k"])((function(){return n.e("chunk-2d0cbcf5").then(n.bind(null,"4af8"))}));case"down":return Object(c["k"])((function(){return n.e("chunk-2d0c08f0").then(n.bind(null,"41fc"))}));case"trash":return Object(c["k"])((function(){return n.e("chunk-2d226cfa").then(n.bind(null,"e9f6"))}));case"plus":return Object(c["k"])((function(){return n.e("chunk-2d0c734e").then(n.bind(null,"5041"))}));case"check":return Object(c["k"])((function(){return n.e("chunk-2d20869b").then(n.bind(null,"a54e"))}));case"menu":return Object(c["k"])((function(){return n.e("chunk-2d21b4c8").then(n.bind(null,"bed3"))}));default:return null}}))});return{state:r}}}));n("87fb");I.render=S,I.__scopeId="data-v-e2ab8b84";var A=I,B=Object(c["l"])({name:"buttons-icon",components:{icons:A},props:{title:{type:String,default:"button"},icon:{type:String,required:!0}}});n("6368");B.render=y,B.__scopeId="data-v-7b3de08a";var $=B,F=Object(c["G"])("data-v-37b4f547");Object(c["v"])("data-v-37b4f547");var P={class:"board-item"},L=Object(c["j"])("div",{class:"board-item__body"}," preview body ",-1);Object(c["u"])();var R=F((function(e,t,n,r,a,o){var i=Object(c["A"])("board-item-top"),l=Object(c["A"])("board-item-bottom"),u=Object(c["A"])("board-manage");return Object(c["t"])(),Object(c["h"])(c["a"],null,[Object(c["j"])("article",P,[Object(c["j"])(i),L,Object(c["j"])(l,{onClickEdit:t[1]||(t[1]=function(t){return e.state.showBoardEdit=!0})})]),(Object(c["t"])(),Object(c["h"])(c["c"],{to:"body"},[Object(c["j"])(c["e"],{name:"modal-fade"},{default:F((function(){return[e.state.showBoardManage?(Object(c["t"])(),Object(c["h"])(u,{key:0,onClose:t[2]||(t[2]=function(t){return e.state.showBoardManage=!1})})):Object(c["i"])("",!0)]})),_:1})]))],64)})),V=Object(c["G"])("data-v-46d25a41");Object(c["v"])("data-v-46d25a41");var G={class:"board-item-top"},E=Object(c["j"])("h2",{class:"board-item-top__date"},"2020년 12월 24일",-1);Object(c["u"])();var N=V((function(e,t,n,r,a,o){return Object(c["t"])(),Object(c["h"])("article",G,[E,(Object(c["t"])(),Object(c["h"])("button",{key:0,type:"button",class:"board-item-top__today",onClick:t[1]||(t[1]=function(t){return e.$emit("click-today")})},Object(c["C"])(e.$t("board.today")),1))])})),M=Object(c["l"])({name:"board-item-top",components:{},emits:{"click-today":null}});n("6498");M.render=N,M.__scopeId="data-v-46d25a41";var q=M,z=Object(c["G"])("data-v-6c877e8b");Object(c["v"])("data-v-6c877e8b");var D={class:"board-item-bottom"},T={class:"board-item-bottom__graph"},U={class:"board-item-bottom__percent"};Object(c["u"])();var J=z((function(e,t,n,r,a,o){var i=Object(c["A"])("Icons");return Object(c["t"])(),Object(c["h"])("div",D,[Object(c["j"])("button",{class:"board-item-bottom__edit",onClick:t[1]||(t[1]=function(t){return e.$emit("click-edit")})},[Object(c["j"])(i,{icon:"edit"})]),Object(c["j"])("p",T,[Object(c["j"])("i",{style:"--width: ".concat(e.state.percent,"%")},null,4)]),Object(c["j"])("p",U,Object(c["C"])(e.state.percent)+"% ",1)])})),Y=Object(c["l"])({name:"board-item-bottom",components:{Icons:A},setup:function(){var e=Object(c["w"])({percent:Object(c["f"])((function(){return 69}))});return{state:e}},emits:{"click-edit":null}});n("ba18");Y.render=J,Y.__scopeId="data-v-6c877e8b";var H=Y,K={class:"board-manage"},Q=Object(c["j"])("p",null,"board edit",-1);function W(e,t,n,r,a,o){return Object(c["t"])(),Object(c["h"])("div",K,[Q,Object(c["j"])("nav",null,[Object(c["j"])("button",{type:"button",onClick:t[1]||(t[1]=function(t){return e.$emit("close")})},"close")])])}var X=Object(c["l"])({name:"board-manage",components:{},setup:function(){return console.warn("call setup() in board-manage"),{}}});X.render=W;var Z=X,ee=Object(c["l"])({name:"board-item",components:{"board-item-top":q,"board-item-bottom":H,"board-manage":Z},setup:function(){return{state:Object(c["w"])({showBoardManage:!1})}}});n("6d32");ee.render=R,ee.__scopeId="data-v-37b4f547";var te=ee,ne=Object(c["G"])("data-v-9d534068");Object(c["v"])("data-v-9d534068");var ce=Object(c["j"])("legend",null,"preference form",-1),re={class:"field"},ae={class:"field__label"},oe={for:"language"},ie={class:"field__body"},le=Object(c["j"])("option",{value:"ko"},"한국어",-1),ue=Object(c["j"])("option",{value:"en"},"English",-1),se={class:"field"},be={class:"field__label"},de={for:"dateFormat"},je={class:"field__body"},fe=Object(c["j"])("option",{value:"0"},"2020-12-25",-1),Oe=Object(c["j"])("option",{value:"1"},"2020/12/25",-1),pe=Object(c["j"])("option",{value:"2"},"12-25-2020",-1),me=Object(c["j"])("option",{value:"3"},"12/25/2020",-1),ve=Object(c["j"])("option",{value:"4"},"2020년 12월 25일",-1);Object(c["u"])();var he=ne((function(e,t,n,r,a,o){var i=Object(c["A"])("modal-header"),l=Object(c["A"])("forms-select"),u=Object(c["A"])("modal-wrapper");return Object(c["t"])(),Object(c["h"])(u,null,{default:ne((function(){return[Object(c["j"])(i,{title:e.$t("preference.title"),class:"preference-header",onClose:t[1]||(t[1]=function(t){return e.$emit("close")})},null,8,["title"]),Object(c["j"])("form",{class:"preference",onSubmit:t[4]||(t[4]=Object(c["F"])((function(){return e.save&&e.save.apply(e,arguments)}),["prevent"]))},[Object(c["j"])("fieldset",null,[ce,Object(c["j"])("div",re,[Object(c["j"])("p",ae,[Object(c["j"])("label",oe,Object(c["C"])(e.$t("preference.language")),1)]),Object(c["j"])("p",ie,[Object(c["j"])(l,{name:"language",id:"language",modelValue:e.state.forms.language,"onUpdate:modelValue":[t[2]||(t[2]=function(t){return e.state.forms.language=t}),e.save]},{default:ne((function(){return[le,ue]})),_:1},8,["modelValue","onUpdate:modelValue"])])]),Object(c["j"])("div",se,[Object(c["j"])("p",be,[Object(c["j"])("label",de,Object(c["C"])(e.$t("preference.dateFormat")),1)]),Object(c["j"])("p",je,[Object(c["j"])(l,{name:"dateFormat",id:"dateFormat",modelValue:e.state.forms.dateFormat,"onUpdate:modelValue":[t[3]||(t[3]=function(t){return e.state.forms.dateFormat=t}),e.save]},{default:ne((function(){return[fe,Oe,pe,me,ve]})),_:1},8,["modelValue","onUpdate:modelValue"])])])])],32)]})),_:1})})),_e=Object(c["G"])("data-v-1ef4fd7a");Object(c["v"])("data-v-1ef4fd7a");var ge={class:"modal-wrapper"},ke={class:"modal-wrapper__body"};Object(c["u"])();var we=_e((function(e,t,n,r,a,o){return Object(c["t"])(),Object(c["h"])("div",ge,[Object(c["j"])("div",ke,[Object(c["z"])(e.$slots,"default")])])})),ye=Object(c["l"])({name:"modal-wrapper",props:{zIndex:Number},setup:function(){Object(c["r"])((function(){var e,t;null===(e=document)||void 0===e||null===(t=e.querySelector("html"))||void 0===t||t.classList.add("mode-modal")})),Object(c["s"])((function(){var e,t;null===(e=document)||void 0===e||null===(t=e.querySelector("html"))||void 0===t||t.classList.remove("mode-modal")}))}});n("11c2");ye.render=we,ye.__scopeId="data-v-1ef4fd7a";var xe=ye,Ce=Object(c["G"])("data-v-31559a1f");Object(c["v"])("data-v-31559a1f");var Se={class:"modal-header"},Ie={key:0,class:"modal-header__nav"},Ae={class:"modal-header__title"},Be={class:"modal-header__nav"};Object(c["u"])();var $e=Ce((function(e,t,n,r,a,o){var i=Object(c["A"])("buttons-icon");return Object(c["t"])(),Object(c["h"])("header",Se,[e.$slots.navLeft?(Object(c["t"])(),Object(c["h"])("nav",Ie,[Object(c["z"])(e.$slots,"navLeft")])):Object(c["i"])("",!0),Object(c["j"])("h1",Ae,Object(c["C"])(e.title),1),Object(c["j"])("nav",Be,[Object(c["z"])(e.$slots,"navRight"),Object(c["j"])(i,{icon:"x",onClick:t[1]||(t[1]=function(t){return e.$emit("close")})})])])})),Fe=Object(c["l"])({name:"modal-header",components:{"buttons-icon":$},props:{title:{type:String,required:!0}},emits:{close:null}});n("77b1");Fe.render=$e,Fe.__scopeId="data-v-31559a1f";var Pe=Fe,Le=(n("b0c0"),Object(c["G"])("data-v-3b9f044c"));Object(c["v"])("data-v-3b9f044c");var Re={class:"forms-select"};Object(c["u"])();var Ve=Le((function(e,t,n,r,a,o){var i=Object(c["A"])("icons");return Object(c["t"])(),Object(c["h"])("label",Re,[Object(c["j"])("select",{name:e.name,id:e.id,value:e.modelValue,class:"forms-select__unit",onChange:t[1]||(t[1]=function(t){return e.$emit("update:modelValue",t.target.value)})},[Object(c["z"])(e.$slots,"default")],40,["name","id","value"]),Object(c["j"])(i,{icon:"down",class:"forms-select__icon"})])})),Ge=Object(c["l"])({name:"forms-select",components:{icons:A},props:{name:{type:String,required:!0},id:String,modelValue:[String,Number]},emits:{"update:modelValue":null}});n("7876");Ge.render=Ve,Ge.__scopeId="data-v-3b9f044c";var Ee=Ge,Ne=Object(c["l"])({name:"preference",components:{"modal-wrapper":xe,"modal-header":Pe,"forms-select":Ee},setup:function(){var e=Object(j["b"])(),t=Object(r["b"])({useScope:"global"}),n=t.locale,a=Object(c["w"])({forms:{language:e.state.preference.language,dateFormat:e.state.preference.dateFormat}}),o=function(){var t=Object(d["a"])(regeneratorRuntime.mark((function t(c){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.dispatch("updatePreference",a.forms);case 2:n.value!==a.forms.language&&(n.value=a.forms.language);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return{state:a,save:o}},emits:{close:null}});n("d91f");Ne.render=he,Ne.__scopeId="data-v-9d534068";var Me=Ne,qe=Object(c["G"])("data-v-49e80fc9");Object(c["v"])("data-v-49e80fc9");var ze={class:"box-list"},De=Object(c["j"])("h2",{class:"box-list__title"},"Box list",-1),Te={class:"box-list__index"};Object(c["u"])();var Ue=qe((function(e,t,n,r,a,o){var i=Object(c["A"])("modal-header"),l=Object(c["A"])("add-item"),u=Object(c["A"])("item"),s=Object(c["A"])("modal-wrapper");return Object(c["t"])(),Object(c["h"])(s,null,{default:qe((function(){return[Object(c["j"])(i,{title:e.$t("box.title"),onClose:t[1]||(t[1]=function(t){return e.$emit("close")}),class:"box-list-header"},null,8,["title"]),Object(c["j"])("article",ze,[De,Object(c["j"])("ul",Te,[Object(c["j"])("li",null,[Object(c["j"])(l,{onClick:t[2]||(t[2]=function(){})})]),(Object(c["t"])(!0),Object(c["h"])(c["a"],null,Object(c["y"])(Array(10),(function(t,n){return Object(c["t"])(),Object(c["h"])("li",{key:n},[Object(c["j"])(u,{title:"아이템 item-title",description:"description text",onClickItem:function(t){return e.$emit("select-item",n)},onClickEdit:function(t){return e.onClickEditItem(n)},onClickRemove:function(t){return e.onClickRemoveItem(n)}},null,8,["onClickItem","onClickEdit","onClickRemove"])])})),128))])])]})),_:1})})),Je=Object(c["G"])("data-v-3c881077");Object(c["v"])("data-v-3c881077");var Ye={type:"button",title:"Add item",class:"add-item"};Object(c["u"])();var He=Je((function(e,t,n,r,a,o){var i=Object(c["A"])("icons");return Object(c["t"])(),Object(c["h"])("button",Ye,[Object(c["j"])(i,{icon:"plus",class:"add-item__icon"})])})),Ke=Object(c["l"])({name:"box-list-add-item",components:{icons:A}});n("dfc1");Ke.render=He,Ke.__scopeId="data-v-3c881077";var Qe=Ke,We=(n("a4d3"),n("e01a"),Object(c["G"])("data-v-37f57792"));Object(c["v"])("data-v-37f57792");var Xe={class:"item__title"},Ze={class:"item__description"},et={class:"item__nav"};Object(c["u"])();var tt=We((function(e,t,n,r,a,o){var i=Object(c["A"])("buttons-icon");return Object(c["t"])(),Object(c["h"])("a",{href:"#",class:"item",onClick:t[3]||(t[3]=Object(c["F"])((function(t){return e.$emit("click-item")}),["prevent"]))},[Object(c["j"])("h3",Xe,Object(c["C"])(e.title),1),Object(c["j"])("p",Ze,Object(c["C"])(e.description),1),Object(c["j"])("nav",et,[Object(c["j"])(i,{icon:"edit",class:"button",onClick:t[1]||(t[1]=Object(c["F"])((function(t){return e.$emit("click-edit")}),["prevent","stop"]))}),Object(c["j"])(i,{icon:"trash",class:"button",onClick:t[2]||(t[2]=Object(c["F"])((function(t){return e.$emit("click-remove")}),["prevent","stop"]))})])])})),nt=Object(c["l"])({name:"box-list-item",components:{"buttons-icon":$},props:{title:{type:String,required:!0},description:String},emits:{"click-item":null,"click-edit":null,"click-remove":null}});n("a996");nt.render=tt,nt.__scopeId="data-v-37f57792";var ct=nt,rt=Object(c["l"])({name:"box-list",components:{"modal-wrapper":xe,"modal-header":Pe,"add-item":Qe,item:ct},setup:function(e,t){var n=function(e){console.log("edit: ",e)},c=function(e){console.log("remove: ",e)};return console.warn("call setup() in box-list"),{onClickEditItem:n,onClickRemoveItem:c}},emits:{"select-item":null,close:null}});n("8cb9");rt.render=Ue,rt.__scopeId="data-v-49e80fc9";var at=rt,ot=Object(c["G"])("data-v-5db92ddc");Object(c["v"])("data-v-5db92ddc");var it={class:"board-list__control"},lt={class:"board-list__filter"},ut=Object(c["j"])("legend",null,"filter",-1),st=Object(c["j"])("span",null,"년도:",-1),bt=Object(c["j"])("span",null,"월:",-1),dt={class:"board-list__top-nav"},jt={class:"board-list__body"},ft=Object(c["j"])("h2",{class:"board-list__title"},"Board list",-1),Ot={class:"board-list__index"};Object(c["u"])();var pt=ot((function(e,t,n,r,a,o){var i=Object(c["A"])("modal-header"),l=Object(c["A"])("forms-select"),u=Object(c["A"])("buttons-icon"),s=Object(c["A"])("item"),b=Object(c["A"])("modal-wrapper");return Object(c["t"])(),Object(c["h"])(b,{class:"board-list"},{default:ot((function(){return[Object(c["j"])(i,{title:e.state.boxName,onClose:t[1]||(t[1]=function(t){return e.$emit("close")}),class:"board-list__header"},null,8,["title"]),Object(c["j"])("div",it,[Object(c["j"])("fieldset",lt,[ut,Object(c["j"])("label",null,[st,Object(c["j"])(l,{name:"filter_year",modelValue:e.state.selectedFilter.year,"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.state.selectedFilter.year=t})},{default:ot((function(){return[(Object(c["t"])(!0),Object(c["h"])(c["a"],null,Object(c["y"])(e.state.filters.years,(function(e){return Object(c["t"])(),Object(c["h"])("option",{value:e,key:e},Object(c["C"])(e),9,["value"])})),128))]})),_:1},8,["modelValue"])]),Object(c["j"])("label",null,[bt,Object(c["j"])(l,{name:"filter_month",modelValue:e.state.selectedFilter.month,"onUpdate:modelValue":t[3]||(t[3]=function(t){return e.state.selectedFilter.month=t})},{default:ot((function(){return[(Object(c["t"])(!0),Object(c["h"])(c["a"],null,Object(c["y"])(e.state.filters.months,(function(e){return Object(c["t"])(),Object(c["h"])("option",{value:e,key:e},Object(c["C"])(e),9,["value"])})),128))]})),_:1},8,["modelValue"])])]),Object(c["j"])("nav",dt,[Object(c["j"])(u,{icon:"edit",class:"button",onClick:e.onClickEditBox},null,8,["onClick"]),Object(c["j"])(u,{icon:"trash",class:"button",onClick:e.onClickRemoveBox},null,8,["onClick"])])]),Object(c["j"])("article",jt,[ft,Object(c["j"])("ul",Ot,[(Object(c["t"])(!0),Object(c["h"])(c["a"],null,Object(c["y"])(e.state.index,(function(t,n){return Object(c["t"])(),Object(c["h"])("li",{key:n},[Object(c["j"])(s,{date:new Date("1995-12-17T03:24:00"),onSelectItem:e.onSelectItem},null,8,["date","onSelectItem"])])})),128))])])]})),_:1})}));n("a630"),n("3ca3");function mt(e,t){return Array.from({length:t-e+1},(function(t,n){return e+n}))}var vt=Object(c["G"])("data-v-791fb07e");Object(c["v"])("data-v-791fb07e");var ht={class:"label"};Object(c["u"])();var _t=vt((function(e,t,n,r,a,o){var i=Object(c["A"])("icons");return Object(c["t"])(),Object(c["h"])("a",{href:"#",class:["board-list-item",e.state.today&&"board-list-item--today"],onClick:t[1]||(t[1]=Object(c["F"])((function(t){return e.$emit("select-item")}),["prevent"]))},[Object(c["j"])("p",ht,Object(c["C"])(e.state.label),1),e.state.today?(Object(c["t"])(),Object(c["h"])(i,{key:0,icon:"check",class:"icon"})):Object(c["i"])("",!0)],2)})),gt=(n("99af"),n("fb6a"),n("b64b"),{0:"2020-12-25",1:"12-25-2020",2:"2020年 12月 25日",3:"25 December, 2020"}),kt=["January","February","March","April","May","June","July","August","September","October","November","December"];function wt(e,t){var n=Object.keys(gt),c=function(e){return"0".concat(e).slice(-2)},r=e.getFullYear(),a=c(e.getMonth()+1),o=kt[e.getMonth()],i=c(e.getDate());switch(t){case Number(n[0]):default:return"".concat(r,"-").concat(a,"-").concat(i);case Number(n[1]):return"".concat(a,"-").concat(i,"-").concat(r);case Number(n[2]):return"".concat(r,"{0} ").concat(a,"{1} ").concat(i,"{2}");case Number(n[3]):return"".concat(i," ").concat(o,", ").concat(r)}}function yt(e){var t=new Date;return e.getDate()===t.getDate()&&e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear()}var xt=Object(c["l"])({name:"board-list-item",components:{Icons:A},props:{date:{type:Date,required:!0}},setup:function(e){return{state:Object(c["w"])({label:Object(c["f"])((function(){return wt(e.date,3)})),today:Object(c["f"])((function(){return yt(e.date)}))})}},emits:{"select-item":null}});n("5169");xt.render=_t,xt.__scopeId="data-v-791fb07e";var Ct=xt,St=Object(c["l"])({name:"board-list",components:{"modal-wrapper":xe,"modal-header":Pe,"forms-select":Ee,"buttons-icon":$,item:Ct},setup:function(e,t){var n=Object(c["w"])({boxName:"box-name",selectedFilter:{year:2e3,month:1},index:new Array(30),filters:{years:Object(c["f"])((function(){return mt(2e3,2010)})),months:Object(c["f"])((function(){return mt(1,12)}))}}),r=function(){console.log("on select item in board-list"),t.emit("select-item")},a=function(){console.log("on click edit box in board-list")},o=function(){console.log("on click remove box in board-list")};return console.warn("call setup() in board-list"),{state:n,onSelectItem:r,onClickEditBox:a,onClickRemoveBox:o}},emits:{"select-item":null,close:null}});n("db30");St.render=pt,St.__scopeId="data-v-5db92ddc";var It=St,At=Object(c["l"])({name:"app",components:{"app-header":k,"buttons-icon":$,"board-item":te,preference:Me,"box-list":at,"board-list":It},setup:function(){return Object(d["a"])(regeneratorRuntime.mark((function e(){var t,n,a,o,i,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=Object(j["b"])(),n=Object(r["b"])({useScope:"global"}),a=n.locale,o=Object(c["w"])({showPreference:!1,showBoxList:!1,showBoardList:!1}),i=function(){o.showBoxList=!1,o.showBoardList=!0},l=function(){o.showBoardList=!1},f()){e.next=7;break}throw"NOT_SUPPORT";case 7:return e.next=9,t.dispatch("setup");case 9:return a.value!==t.state.preference.language&&(a.value=t.state.preference.language),e.abrupt("return",{state:o,onSelectBox:i,onSelectBoard:l});case 11:case"end":return e.stop()}}),e)})))()}});n("8179");At.render=b,At.__scopeId="data-v-39d5541f";var Bt=At;function $t(e,t){return Object(c["t"])(),Object(c["h"])("p",null,"loading...")}const Ft={};Ft.render=$t;var Pt=Ft,Lt=Object(c["l"])({name:"app-main",components:{loading:Pt,app:Bt},setup:function(){var e=Object(c["x"])(null);return Object(c["q"])((function(t){switch("string"!==typeof t&&console.error(t),t){case"NOT_SUPPORT":e.value="notSupport";break;default:e.value="unknown";break}})),{error:e}}});Lt.render=u;var Rt=Lt,Vt=n("5530");function Gt(){return!!window.localStorage}function Et(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(Gt()&&e){var n=window.localStorage.getItem(e);return t?JSON.parse(n):n}}function Nt(e,t){Gt()&&e&&t&&("string"!==typeof t&&"number"!==typeof t&&(t=JSON.stringify(t)),window.localStorage.setItem(e,t))}function Mt(e){if(Gt()&&e)return!!window.localStorage.getItem(e)}var qt={language:"ko",dateFormat:"0",selectedBox:0},zt={preference:qt},Dt={setup:function(e){return Object(d["a"])(regeneratorRuntime.mark((function t(){var n,c,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=e.commit,c=e.state,Mt("preference")?(r=Et("preference",!0),n("updatePreference",r)):Nt("preference",c.preference);case 2:case"end":return t.stop()}}),t)})))()},updatePreference:function(e,t){return Object(d["a"])(regeneratorRuntime.mark((function n(){var c,r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:c=e.commit,r=e.state,c("updatePreference",t),Nt("preference",r.preference);case 3:case"end":return n.stop()}}),n)})))()}},Tt={updatePreference:function(e,t){e.preference=Object(Vt["a"])(Object(Vt["a"])({},e.preference),t)}},Ut={},Jt=Object(j["a"])({state:zt,mutations:Tt,actions:Dt,modules:Ut}),Yt={en:{box:{title:"Box list"},board:{today:"Go to today"},preference:{title:"Preference",save:"Save",language:"Language",dateFormat:"Date format"},error:{notSupport:{title:"Support error",description:"This browser is not supported."},unknown:{title:"Unknown error",description:""}}},ko:{box:{title:"박스목록"},board:{today:"오늘로 이동"},preference:{title:"설정",save:"저장",language:"언어",dateFormat:"날짜포맷"},error:{notSupport:{title:"지원오류",description:"이 브라우저는 지원되지 않습니다."},unknown:{title:"알 수 없는 오류",description:"알 수 없는 오류가 발생했습니다."}}}},Ht=(n("31cd"),Object(r["a"])({locale:"ko",fallbackLocale:"en",messages:Yt}));Object(c["g"])(Rt).use(Jt).use(Ht).mount("#app")},6368:function(e,t,n){"use strict";n("da0b")},6498:function(e,t,n){"use strict";n("cb3d")},"6d32":function(e,t,n){"use strict";n("17fd")},"71c7":function(e,t,n){},"77b1":function(e,t,n){"use strict";n("0b65")},7876:function(e,t,n){"use strict";n("f778")},8179:function(e,t,n){"use strict";n("950b")},"87fb":function(e,t,n){"use strict";n("ba36")},"8cb9":function(e,t,n){"use strict";n("b7f7")},"950b":function(e,t,n){},a996:function(e,t,n){"use strict";n("d91a")},aee5:function(e,t,n){"use strict";n("0dc4")},b7f7:function(e,t,n){},ba18:function(e,t,n){"use strict";n("d832")},ba36:function(e,t,n){},c5fe:function(e,t,n){},cb3d:function(e,t,n){},cba5:function(e,t,n){},d160:function(e,t,n){},d4b4:function(e,t,n){},d832:function(e,t,n){},d91a:function(e,t,n){},d91f:function(e,t,n){"use strict";n("c5fe")},da0b:function(e,t,n){},db30:function(e,t,n){"use strict";n("cba5")},dfc1:function(e,t,n){"use strict";n("d4b4")},f778:function(e,t,n){}});
//# sourceMappingURL=app.7f0e9ad1.js.map