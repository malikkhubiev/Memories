"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[107],{4645:(e,t,n)=>{n.d(t,{A:()=>o});var r=n(6540);const o=function(e,t){var n=(0,r.useState)(!1),o=n[0],a=(n[1],(0,r.useState)(null)),i=a[0],c=a[1],u=(0,r.useState)(""),l=u[0],s=u[1],f=(0,r.useRef)(null);(0,r.useEffect)((function(){return o||(f.current=new WebSocket("wss://memories-3-ov6w.onrender.com/"),f.current.onopen=function(){f.current.send(JSON.stringify({token:localStorage.getItem("token"),type:e,imageId:t,method:"connection"})),s("Соединение открыто")},f.current.onclose=function(){return s("Соединение закрыто")},p()),function(){return f.current.close()}}),[f,o]);var p=(0,r.useCallback)((function(){f.current&&(f.current.onmessage=function(e){if(!o){var t=JSON.parse(e.data);c(t)}})}),[o]);return{data:i,sendData:function(e){f.current&&"Соединение открыто"===l&&f.current.send(JSON.stringify({token:localStorage.getItem("token"),method:"message",data:e}))}}}},3107:(e,t,n)=>{n.r(t),n.d(t,{default:()=>A});var r=n(9067),o=n(3357),a=n(6990),i=n(6540),c=n(2389),u=n(8106),l=n(2434),s=n(3222),f=n(7707),p=n(7739),d=n(7008),h=n(8890),m=n(3748),g=n(5834),v=n(9753),y=n(1467),b=n(4645),w=n(6248);const x={above:{width:"100vw",height:"100vh",overflow:"hidden",position:"fixed",zIndex:"9999",display:"flex",justifyContent:"center",alignItems:"center",top:"0",left:"0"},stack:{flexDirection:"column",paddingBottom:"120px",position:"relative"},smallGoldenRatioBox:{alignItems:"center"},insideStack:{width:"375px",justifyContent:"start",flexDirection:"column",padding:"0 15px"},changeInput:{marginTop:"20px",width:"100%"}};var S=function(){return S=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},S.apply(this,arguments)},k=function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{u(r.next(e))}catch(e){a(e)}}function c(e){try{u(r.throw(e))}catch(e){a(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,c)}u((r=r.apply(e,t||[])).next())}))},E=function(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function c(c){return function(u){return function(c){if(n)throw new TypeError("Generator is already executing.");for(;a&&(a=0,c[0]&&(i=0)),i;)try{if(n=1,r&&(o=2&c[0]?r.return:c[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,c[1])).done)return o;switch(r=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return i.label++,{value:c[1],done:!1};case 5:i.label++,r=c[1],c=[0];continue;case 7:c=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==c[0]&&2!==c[0])){i=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){i.label=c[1];break}if(6===c[0]&&i.label<o[1]){i.label=o[1],o=c;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(c);break}o[2]&&i.ops.pop(),i.trys.pop();continue}c=t.call(e,i)}catch(e){c=[6,e],r=0}finally{n=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,u])}}},I=function(e,t,n){if(n||2===arguments.length)for(var r,o=0,a=t.length;o<a;o++)!r&&o in t||(r||(r=Array.prototype.slice.call(t,0,o)),r[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))};const A=function(){var e=(0,c.Bd)("authorized").t;(0,i.useEffect)((function(){(0,w.o)("authorized")}),[]);var t=(0,i.useState)(!1),n=t[0],A=(t[1],(0,i.useState)(null)),C=(A[0],A[1],(0,i.useState)(null)),O=(C[0],C[1]),j=(0,i.useState)(null),z=j[0],B=j[1],D=(0,i.useState)(""),F=D[0],J=D[1],N=(0,i.useState)([]),P=N[0],G=N[1],R=(0,y.Ao)()[0],_=(0,u.Zp)(),M=(0,v.j)(),T=(0,b.A)("images"),U=T.data,W=T.sendData;return(0,i.useEffect)((function(){U&&M((0,m.e9)(U))}),[U]),i.createElement(i.Fragment,null,n?i.createElement(r.A,{sx:x.above},i.createElement(o.A,{size:100})):"",i.createElement(h.Ai,{sx:x.stack},i.createElement(s.z,{isShowing:!1},i.createElement(l.Y,{text:"Post"}),i.createElement(f.F,null)),i.createElement(h.J,{sx:x.smallGoldenRatioBox},i.createElement(p.B,{readyImageCallback:function(e,t){return k(void 0,void 0,void 0,(function(){return E(this,(function(n){return O((function(t){return e})),B((function(e){return t})),[2]}))}))}}),i.createElement(h.Ai,{sx:x.insideStack},i.createElement(d.d,{text:F,isMultiline:!0,changeInputCallback:function(e){J((function(t){return e}))},placeholder:e("posting_description"),sx:x.changeInput}),i.createElement(d.d,{changeInputCallback:function(e){var t=[],n=e.split("#");n.splice(0,1),(n=Array.from(new Set(n))).forEach((function(e){var n=e.trim().split(" ");n=1!==n.length?(n=n.map((function(e,t){return 0!==t&&(e=e[0].toUpperCase()+e.slice(1)),e}))).join(""):n[0],t.push(n)})),G((function(e){return e.length?Array.from(new Set(I(I([],e,!0),t,!0))):t}))},placeholder:e("posting_tags"),isMultiline:!0,sx:x.changeInput}),i.createElement(a.A,{sx:x.changeInput,onClick:function(){return k(void 0,void 0,void 0,(function(){var e,t;return E(this,(function(n){return F&&P&&z&&(e=P.map((function(e){return{name:e,isPrivate:!1}})),(t=new FormData).append("img",z),t.append("description",F),t.append("tags",JSON.stringify(e)),J((function(e){return""})),G((function(e){return[]})),M((0,g.F6)(!0)),R(t).unwrap().then((function(e){W({type:"images",body:S({ownId:e.authorId},e)}),_(-1)})).catch((function(e){return console.error(e)})),M((0,g.F6)(!1))),[2]}))}))},variant:"contained",disabled:!(F&&P.length&&z)},e("posting_button"))))))}}}]);