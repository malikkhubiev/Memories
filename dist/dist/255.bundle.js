"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[255],{8363:(e,t,n)=>{n.d(t,{A:()=>S});var r=n(8587),a=n(8168),i=n(6540),o=n(4164),s=n(4111),c=n(771),l=n(1848),u=n(9770),d=n(3541),f=n(2850),p=n(8256),m=n(2778),h=n(6852),g=n(7553);const y=(0,g.A)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]),x=(0,g.A)("MuiListItemIcon",["root","alignItemsFlexStart"]),v=(0,g.A)("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]);var b=n(7245);function C(e){return(0,b.Ay)("MuiMenuItem",e)}const E=(0,g.A)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]);var w=n(4848);const A=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],O=(0,l.Ay)(p.A,{shouldForwardProp:e=>(0,u.A)(e)||"classes"===e,name:"MuiMenuItem",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.dense&&t.dense,n.divider&&t.divider,!n.disableGutters&&t.gutters]}})((({theme:e,ownerState:t})=>(0,a.A)({},e.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${E.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,c.X4)(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${E.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:(0,c.X4)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${E.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:(0,c.X4)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,c.X4)(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${E.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${E.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`& + .${y.root}`]:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},[`& + .${y.inset}`]:{marginLeft:52},[`& .${v.root}`]:{marginTop:0,marginBottom:0},[`& .${v.inset}`]:{paddingLeft:36},[`& .${x.root}`]:{minWidth:36}},!t.dense&&{[e.breakpoints.up("sm")]:{minHeight:"auto"}},t.dense&&(0,a.A)({minHeight:32,paddingTop:4,paddingBottom:4},e.typography.body2,{[`& .${x.root} svg`]:{fontSize:"1.25rem"}})))),S=i.forwardRef((function(e,t){const n=(0,d.A)({props:e,name:"MuiMenuItem"}),{autoFocus:c=!1,component:l="li",dense:u=!1,divider:p=!1,disableGutters:g=!1,focusVisibleClassName:y,role:x="menuitem",tabIndex:v,className:b}=n,E=(0,r.A)(n,A),S=i.useContext(f.A),I=i.useMemo((()=>({dense:u||S.dense||!1,disableGutters:g})),[S.dense,u,g]),k=i.useRef(null);(0,m.A)((()=>{c&&k.current&&k.current.focus()}),[c]);const M=(0,a.A)({},n,{dense:I.dense,divider:p,disableGutters:g}),N=(e=>{const{disabled:t,dense:n,divider:r,disableGutters:i,selected:o,classes:c}=e,l={root:["root",n&&"dense",t&&"disabled",!i&&"gutters",r&&"divider",o&&"selected"]},u=(0,s.A)(l,C,c);return(0,a.A)({},c,u)})(n),j=(0,h.A)(k,t);let F;return n.disabled||(F=void 0!==v?v:-1),(0,w.jsx)(f.A.Provider,{value:I,children:(0,w.jsx)(O,(0,a.A)({ref:j,role:x,tabIndex:F,component:l,focusVisibleClassName:(0,o.A)(N.focusVisible,y),className:(0,o.A)(N.root,b)},E,{ownerState:M,classes:N}))})}))},5327:(e,t,n)=>{var r;n.d(t,{A:()=>d});var a=n(6540),i=n(173),o=n(7340),s=n(3951);function c(e,t,n,r,o){const[s,c]=a.useState((()=>o&&n?n(e).matches:r?r(e).matches:t));return(0,i.A)((()=>{let t=!0;if(!n)return;const r=n(e),a=()=>{t&&c(r.matches)};return a(),r.addListener(a),()=>{t=!1,r.removeListener(a)}}),[e,n]),s}const l=(r||(r=n.t(a,2))).useSyncExternalStore;function u(e,t,n,r,i){const o=a.useCallback((()=>t),[t]),s=a.useMemo((()=>{if(i&&n)return()=>n(e).matches;if(null!==r){const{matches:t}=r(e);return()=>t}return o}),[o,e,r,i,n]),[c,u]=a.useMemo((()=>{if(null===n)return[o,()=>()=>{}];const t=n(e);return[()=>t.matches,e=>(t.addListener(e),()=>{t.removeListener(e)})]}),[o,n,e]);return l(u,c,s)}function d(e,t={}){const n=(0,s.A)(),r="undefined"!=typeof window&&void 0!==window.matchMedia,{defaultMatches:a=!1,matchMedia:i=(r?window.matchMedia:null),ssrMatchMedia:d=null,noSsr:f=!1}=(0,o.A)({name:"MuiUseMediaQuery",props:t,theme:n});let p="function"==typeof e?e(n):e;return p=p.replace(/^@media( ?)/m,""),(void 0!==l?u:c)(p,a,i,d,f)}},2434:(e,t,n)=>{n.d(t,{Y:()=>i});var r=n(4073),a=n(6540),i=function(e){var t=e.text,n=e.sx;return a.createElement(r.A,{variant:"h1",sx:n||{}},t)}},7707:(e,t,n)=>{n.d(t,{F:()=>o});var r=n(6540);const a={plug:{width:"25px"}};var i=n(9067),o=function(){return r.createElement(i.A,{sx:a.plug})}},454:(e,t,n)=>{n.d(t,{l:()=>c,Q:()=>l});var r=n(9067),a=n(4073),i=n(6540);const o={component:{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center"},box:{marginLeft:"10px",maxWidth:"calc(100% - 35px)"}};var s=n(4540),c=function(e){var t=e.body,n=e.icon;return i.createElement(r.A,{sx:o.component},n&&i.createElement(s.p,{type:n}),i.createElement(r.A,{sx:o.box},i.createElement(a.A,{variant:"body2"},t)))},l=function(e){return i.createElement(e.button,{url:e.url},i.createElement(r.A,{sx:o.component},e.icon&&i.createElement(e.icon,{size:32,round:!0}),i.createElement(r.A,{sx:o.box},i.createElement(a.A,{variant:"body2"},e.name))))}},5295:(e,t,n)=>{n.d(t,{Z:()=>l});var r=n(1641),a=n(8363),i=n(8946),o=n(6540),s=n(4540),c=function(){return c=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},c.apply(this,arguments)},l=function(e){var t=e.menuOptions,n=e.imgSrc,l=e.side,u=e.callback,d=e.iconWidth,f=e.url,p=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n}(e,["menuOptions","imgSrc","side","callback","iconWidth","url"]),m=(0,o.useState)(null),h=m[0],g=m[1],y=Boolean(h),x=function(){g(null)},v=function(e){u(e),x()},b={};return d&&(b.width=d+"px"),"share"===p.icon?b.transform="translateY(-5px) scale(-1, 1)":b.transform="scale(-1, 1)",o.createElement(o.Fragment,null,o.createElement(r.A,{onClick:function(e){g(e.currentTarget)}},o.createElement(s.p,{type:p.icon,extra:b})),o.createElement(i.A,{anchorEl:h,anchorOrigin:{vertical:"bottom",horizontal:l||"right"},transformOrigin:{vertical:"top",horizontal:l||"right"},open:y,onClose:x,PaperProps:{style:{width:"300px"}}},t.map((function(e){return f?o.createElement(a.A,{key:e.id,onClick:function(){return v(e.props.body)}},e.component?e.component(c({url:f},e.props)):e.props.body):"Download"===e.props.body?o.createElement(a.A,{key:e.id},o.createElement("a",{target:"_blank",href:"https://memories-208s.onrender.com"+n,download:!0,style:{width:"100%"}},e.component(c({},e.props)))):o.createElement(a.A,{key:e.id,onClick:function(){return v(e.props.body)}},e.component?e.component(c({},e.props)):e.props.body)}))))}},9571:(e,t,n)=>{n.d(t,{c:()=>f});var r=n(9067),a=n(1104),i=n(6990),o=n(6540);const s={defaultBox:{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"},input:{margin:"0",width:{xs:"70%",md:"80%"},height:"76px"},button:{width:{xs:"30%",md:"20%"},height:"76px"}};var c=n(2389),l=n(6248),u=n(4540),d=function(){return d=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},d.apply(this,arguments)},f=function(e){var t=e.text,n=e.placeholder,f=e.addInputCallback,p=e.isMultiline,m=e.label,h=e.sx,g=e.lines,y=e.inputTestId,x=e.buttonTestId,v=e.icon,b=e.iconExtra,C=(0,o.useState)(t),E=C[0],w=C[1],A=(0,c.Bd)("authorized").t;(0,o.useEffect)((function(){(0,l.o)("authorized")}),[]),(0,o.useEffect)((function(){w((function(e){return t}))}),[t]);var O=function(){f(E)},S=s.defaultBox;return h&&(S=d(d({},S),h)),o.createElement(r.A,{sx:S},o.createElement(a.A,{sx:s.input,"data-testid":y,multiline:p,maxRows:g||null,label:m,autoComplete:"off",placeholder:n||null,value:E,onChange:function(e){w((function(t){return e.target.value}))},onKeyPress:function(e){"Enter"===e.key&&(O(),e.preventDefault())}}),o.createElement(i.A,{sx:s.button,"data-testid":x,onClick:O,variant:"contained"},v?o.createElement(u.p,{extra:b&&b,type:v}):A("addInput_send")))}},4645:(e,t,n)=>{n.d(t,{A:()=>a});var r=n(6540);const a=function(e,t){var n=(0,r.useState)(!1),a=n[0],i=(n[1],(0,r.useState)(null)),o=i[0],s=i[1],c=(0,r.useState)(""),l=c[0],u=c[1],d=(0,r.useRef)(null);(0,r.useEffect)((function(){return a||(d.current=new WebSocket("ws://localhost:5000/"),d.current.onopen=function(){d.current.send(JSON.stringify({token:localStorage.getItem("token"),type:e,imageId:t,method:"connection"})),u("Соединение открыто")},d.current.onclose=function(){return u("Соединение закрыто")},f()),function(){return d.current.close()}}),[d,a]);var f=(0,r.useCallback)((function(){d.current&&(d.current.onmessage=function(e){if(!a){var t=JSON.parse(e.data);s(t)}})}),[a]);return{data:o,sendData:function(e){d.current&&"Соединение открыто"===l&&d.current.send(JSON.stringify({token:localStorage.getItem("token"),method:"message",data:e}))}}}},6499:(e,t,n)=>{n.d(t,{A:()=>l});var r=n(6540),a=n(3288),i=n(8991),o=n(5834),s=n(9753),c=n(625);const l=function(e){if(null===e)return null;var t=(0,s.G)((function(e){return(0,o.Ge)(e)})),n=(0,s.G)((function(n){return(0,i.og)(n,e||t)})),l=(0,c.A)();return(0,r.useEffect)((function(){n||l((0,a.LM)(e||t))}),[n]),n}},9636:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Z});var r=n(4675),a=n(5327),i=n(9067),o=n(4073),s=n(6540),c=n(8106),l=n(9348),u=n(5834),d=n(9753),f=n(2434),p=n(4540),m=n(454),h=n(5295),g=n(2062),y=n(8890);const x={wrap:{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",margin:"20px 0",padding:"0 20px"},leftSide:{width:"80%",display:"flex",justifyContent:"flex-start",alignItems:"center"},mainData:{width:"70%",display:"flex",justifyContent:"center",alignItems:"flex-start",flexDirection:"column",marginLeft:"10px"},rightSide:{display:"flex",justifyContent:"center",alignItems:"center"},date:{fontSize:"20px"},avatar:{transform:"translateY(0)"},grey:function(e,t){return{color:e.palette.primary.main}},body:function(e,t){var n;return(n={cursor:"pointer",width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center"})[e.breakpoints.down("sm")]={padding:"20px 30px 20px 20px"},n[e.breakpoints.up("sm")]={padding:"20px 30px 20px 20px"},n.borderRadius="25px",n.color=e.palette.primary.main,n.backgroundColor=function(){return t?e.palette.primary.mainBg6:e.palette.primary.mainBg4},n}};var v=function(e){var t=e.setChatIdCallback,n=e.id,a=e.chatterAva,c=e.chatterName,l=e.isCurrent,u=e.lastMessage,d=(e.newMessagesNumber,(0,r.A)());return s.createElement(i.A,{sx:x.wrap},s.createElement(i.A,{onClick:function(){t(n)},sx:x.body(d,l)},s.createElement(i.A,{sx:x.leftSide},s.createElement(g.z,{extra:x.avatar,width:50,src:a}),s.createElement(i.A,{sx:x.mainData},s.createElement(y.$e,null,c),s.createElement(y.us,{sx:x.grey(d,l)},s.createElement(y.$e,null,null==u?void 0:u.text)))),s.createElement(i.A,{sx:x.rightSide},s.createElement(o.A,{sx:x.date},u&&"".concat(new Date(u.createdAt).toLocaleDateString()).slice(0,5)))))};const b=function(e){return{width:{xl:"33%",lg:"100%",md:"100%",sm:"100%",xs:"100%"},height:"100%",display:"flex",justifyContent:"flex-start",alignItems:"center",flexDirection:"column",overflowX:"hidden",overFlowY:"scroll",backgroundColor:e.palette.primary.mainBg3}},C=function(e){return{width:"100%",height:"100px",padding:"0 25px",display:"flex",justifyContent:"space-between",alignItems:"center",backgroundColor:e.palette.primary.mainBg}};var E=n(2389),w=n(6248),A=[{id:1,props:{body:"chats_clear_all_chats_button",icon:"broom"}},{id:2,props:{body:"chats_delete_all_chats_button",icon:"delete"}}],O=function(e){var t=e.currentChatId,n=e.chats,a=e.setChats,o=e.setCurrentChat,g=(0,c.Zp)(),y=(0,l.tx)()[0],x=(0,l.BE)()[0],O=(0,s.useState)([]),S=O[0],I=O[1],k=(0,E.Bd)("authorized").t;(0,s.useEffect)((function(){(0,w.o)("authorized");var e=JSON.parse(JSON.stringify(A));e.forEach((function(e){e.component=m.l,e.props.body=k(e.props.body)})),I((function(t){return e}))}),[]);var M=(0,d.j)(),N=function(e){n.length&&n.forEach((function(t,n){t.id===e&&(o((function(e){return t})),a((function(e){var t=e.map((function(e){var t=JSON.parse(JSON.stringify(e));return t.newMessagesNumber=0,t}));return t})))}))},j=(0,r.A)();return s.createElement(i.A,{sx:b(j)},s.createElement(i.A,{sx:C(j)},s.createElement("div",{onClick:function(){return g(-1)}},s.createElement(p.p,{type:"arrow_back"})),s.createElement(f.Y,{text:k("chats_header")}),s.createElement(h.Z,{menuOptions:S,callback:function(e){"Clear all chats"===e&&n.length?(M((0,u.F6)(!0)),y(null).unwrap().then((function(){a((function(e){return e.map((function(e){var t=JSON.parse(JSON.stringify(e));return t.messages=[],t.lastMessage=null,t}))})),o((function(e){return null}))})).catch((function(e){return M((0,u.g)(e.data.message))})),M((0,u.F6)(!1))):"Delete all chats"===e&&n.length&&(M((0,u.F6)(!0)),x(null).unwrap().then((function(){a((function(e){return[]})),o((function(e){return null}))})).catch((function(e){return M((0,u.g)(e.data.message))})),M((0,u.F6)(!1)))},icon:"more_vertical"})),n&&n.length?n.map((function(e){return s.createElement(v,{key:e.id,isCurrent:t===e.id,setChatIdCallback:N,id:e.id,chatterAva:e.chatterAva,chatterName:e.chatterName,lastMessage:e.lastMessage,newMessagesNumber:e.newMessagesNumber})})):"")},S=n(2320),I=n(2462),k=n(4645),M=n(7707),N=n(9571);const j=function(e){return{display:"flex",justifyContent:"start",alignItems:function(){return e?"end":"start"},flexDirection:"column"}},F=function(e){return{width:"100%",display:"flex",alignItems:"center",margin:"50px 0",justifyContent:function(){return e?"flex-end":"flex-start"}}},_=function(e){return{maxWidth:"325px",display:"flex",alignItems:"center",transform:"translateX(".concat(e?"20px":"-20px",")"),justifyContent:function(){return e?"flex-end":"flex-start"}}},D=function(e,t){return{maxWidth:"375px",display:"inline-block",padding:"35px",backgroundColor:function(){return t?e.palette.primary.violet:e.palette.primary.main},borderRadius:function(){return t?"50px 0 50px 50px":"0 50px 50px 50px"}}},J=function(e){return{overflow:"hidden",maxWidth:"255px",wordWrap:"break-word",fontSize:"25px",color:function(){return e?"#fff":"#000"}}};var $=[{id:1,component:m.l,props:{body:"chats_deleteMessage",icon:"clear"}}],B=function(e){var t=e.id,n=e.isOwn,a=e.text,c=e.createdAt,l=e.messageOptionsCallback,u=(0,E.Bd)("authorized").t,d=(0,s.useState)([]),f=d[0],p=d[1];(0,s.useEffect)((function(){(0,w.o)("authorized");var e=JSON.parse(JSON.stringify($));e.forEach((function(e){e.component=m.l,e.props.body=u(e.props.body)})),p((function(t){return e}))}),[]);var g=function(){l(t)},x=(0,r.A)();return s.createElement(i.A,{sx:F(n)},s.createElement(i.A,{sx:j(n)},s.createElement(i.A,{sx:_(n)},n?s.createElement(s.Fragment,null,s.createElement(y.us,null,"".concat(new Date(c).toLocaleDateString(),", ").concat(new Date(c).toLocaleTimeString())),s.createElement(h.Z,{callback:g,menuOptions:f,icon:"more_vertical"})):s.createElement(s.Fragment,null,s.createElement(h.Z,{side:"left",callback:g,menuOptions:f,icon:"more_vertical"}),s.createElement(y.us,null,"".concat(new Date(c).toLocaleDateString(),", ").concat(new Date(c).toLocaleTimeString())))),s.createElement(i.A,{sx:D(x,n)},s.createElement(o.A,{variant:"body2",sx:J(n)},a))))};const z={container:{width:{xl:"67%",lg:"100%",md:"100%",sm:"100%",xs:"100%"},height:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",flexDirection:"column"},messagesWindow:{width:"67%",height:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",flexDirection:"column"},header:function(e){return{width:"100%",height:"100px",padding:"0 25px",display:"flex",justifyContent:"space-between",alignItems:"center",backgroundColor:e.palette.primary.mainBg2}},chatter:{maxWidth:"79%",width:"auto",display:"flex",justifyContent:"flex-start",alignItems:"center"},body:function(e){return{width:"100%",maxHeight:"calc(100vh - 100px)",display:"flex",justifyContent:"space-between",alignItems:"center",flexDirection:"column",backgroundColor:e.palette.primary.mainBg4}},messages:{width:"100%",padding:"0 25px",overflowY:"scroll",display:"flex",justifyContent:"flex-start",alignItems:"end",flexDirection:"column"},inputBar:{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"},withEllipsis:{marginLeft:"20px",maxWidth:"70%"}};var L=[{id:1,props:{body:"chats_clearChat",icon:"broom"}},{id:2,props:{body:"chats_deleteChat",icon:"delete"}},{id:3,props:{body:"chats_blockUser",icon:"block"}}],T=function(e){var t=e.id,n=e.ownId,o=e.userId,c=e.chatterAva,l=e.chatterName,f=e.messages,x=e.setNewChatCallback,v=e.customMenuHandler,b=e.messageOptionsCallback,C=e.setCurrentChat,A=e.upTheChat,O=(0,E.Bd)("authorized").t,j=(0,s.useState)([]),F=j[0],_=j[1],D=(0,s.useState)(""),J=D[0],$=D[1],T=(0,s.useState)(!1),G=T[0],R=T[1],W=s.useState(!1),H=W[0],P=W[1],V=s.useState(0),X=V[0],Z=V[1],Y=(0,s.useRef)(),Q=function(){P((function(e){return!1})),Z((function(e){return 0}))},U=(0,k.A)("chats").sendData;(0,s.useEffect)((function(){(0,w.o)("authorized");var e=JSON.parse(JSON.stringify(L));e.forEach((function(e){e.component=m.l,e.props.body=O(e.props.body)})),_((function(t){return e}))}),[]),(0,s.useEffect)((function(){Y.current&&(Y.current.scrollHeight-Y.current.scrollTop<1.5*Y.current.clientHeight||G?Y.current.scrollTop=Y.current.scrollHeight:(P(!0),Z((function(e){return e+1}))),R((function(e){return!1})),Q(),Y.current&&(Y.current.addEventListener("scroll",(function(){Y.current.scrollHeight-Y.current.scrollTop<Y.current.clientHeight+50&&Q()})),Y.current.scrollTop=Y.current.scrollHeight))}),[f]);var K=(0,I.bR)()[0],q=(0,d.j)(),ee=(0,r.A)(),te=(0,a.A)(ee.breakpoints.down("xl"));return s.createElement(i.A,{sx:z.container},s.createElement(i.A,{sx:z.header(ee)},te?s.createElement("div",{onClick:function(){return C((function(e){return null}))}},s.createElement(p.p,{type:"arrow_back"})):"",s.createElement(i.A,{sx:z.chatter},s.createElement(g.z,{width:50,src:c}),s.createElement(y.$e,{sx:z.withEllipsis},l)),"string"!=typeof t?s.createElement(h.Z,{icon:"more_vertical",menuOptions:F,callback:v}):s.createElement(M.F,null)),s.createElement(S.A,{anchorOrigin:{vertical:"top",horizontal:"center"},open:H,message:"".concat(X," ").concat(O("chats_newMessages"))}),s.createElement(i.A,{sx:z.body(ee)},s.createElement("div",{ref:Y,style:z.messages},(null==f?void 0:f.length)?f.map((function(e){return s.createElement(B,{key:e.id,messageOptionsCallback:b,id:e.id,isOwn:e.isOwn,text:e.text,createdAt:e.createdAt})})):""),s.createElement(N.c,{isMultiline:!0,lines:3,text:J,addInputCallback:function(e){""!==e.trim()&&($((function(t){return e})),q((0,u.F6)(!0)),K({chatId:"string"==typeof t?null:t,from:n,to:o,text:e}).unwrap().then((function(e){$((function(e){return""})),e.chat&&x(e.chat),U({type:"chats",body:e.message}),R((function(e){return!0})),$((function(e){return""})),"number"==typeof t&&A(t)})).catch((function(e){var t;return q((0,u.g)(null===(t=null==e?void 0:e.data)||void 0===t?void 0:t.message))})),q((0,u.F6)(!1)))},buttonText:"Send",placeholder:O("chats_placeholder"),icon:"send"})))},G=n(2002),R=n(3288),W=n(625),H=n(6499);const P={page:{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"},plug:{width:"67%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}};var V=function(){return V=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},V.apply(this,arguments)},X=function(e,t,n){if(n||2===arguments.length)for(var r,a=0,i=t.length;a<i;a++)!r&&a in t||(r||(r=Array.prototype.slice.call(t,0,a)),r[a]=t[a]);return e.concat(r||Array.prototype.slice.call(t))};const Z=function(){var e=(0,E.Bd)("authorized").t;(0,s.useEffect)((function(){(0,w.o)("authorized")}),[]);var t=(0,s.useState)(null),n=t[0],c=t[1],f=(0,s.useState)(null),p=f[0],m=f[1],h=(0,d.G)((function(e){return(0,G.Zu)(e)})),g=(0,H.A)(h),y=(0,s.useState)(!1),x=y[0],v=y[1],b=(0,d.G)((function(e){return(0,u.Ge)(e)})),C=(0,l.pD)()[0],A=(0,k.A)("chats").data,S=(0,d.j)(),M=function(){S((0,u.F6)(!0)),C(null).unwrap().then((function(e){var t=JSON.parse(JSON.stringify(e));t.forEach((function(e){return e.newMessagesNumber=0})),c((function(e){return t}))})).catch((function(e){return S((0,u.g)(e.data.message))})),S((0,u.F6)(!1))};(0,s.useEffect)((function(){M()}),[]),(0,s.useEffect)((function(){if(A){var e=JSON.parse(JSON.stringify(A));if(e.isOwn=b===e.from,p&&e.idOfChat===p.id)if(p.messages){var t,r=!1;if(p.messages.forEach((function(n,a){n.id===e.id&&(r=!0,t=a)})),r){var a=JSON.parse(JSON.stringify(p));a.messages.splice(t,1),m((function(e){return a})),m((function(t){return V(V({},t),{messages:X(X([],t.messages,!0),[e],!1),lastMessage:e})}))}else m((function(t){return V(V({},t),{messages:X(X([],t.messages,!0),[e],!1),lastMessage:e})}))}else m((function(t){return V(V({},t),{messages:[e],lastMessage:e})}));else if(n&&n.length){var i,o=!1;if(n.forEach((function(t,n){t.id===e.idOfChat&&(o=!0,i=n)})),o){var s=JSON.parse(JSON.stringify(n)),l=s.splice(i,1)[0];l.lastMessage=e,s.unshift(l),s[0].messages?s[0].messages.push(e):s[0].messages=[e],c((function(e){return s}))}else M()}else M()}}),[A]),(0,s.useEffect)((function(){if(g&&!x&&n)if(n.length){var e=!1;if(n.forEach((function(t){(t.firstChatterId===h&&t.secondChatterId===b||t.secondChatterId===h&&t.firstChatterId===b)&&(e=!0,console.log(123),m((function(e){return t})),v((function(e){return!0})))})),!e){var t={id:"".concat(Number.MAX_SAFE_INTEGER),firstChatterId:b,secondChatterId:h,chatterAva:g.avatar,chatterName:g.name,messages:[],lastMessage:null};m((function(e){return t})),c((function(e){return X([t],e,!0)})),v((function(e){return!0}))}}else{var r={id:"".concat(Number.MAX_SAFE_INTEGER),firstChatterId:b,secondChatterId:h,chatterAva:g.avatar,chatterName:g.name,messages:[],lastMessage:null};m((function(e){return r})),c((function(e){return[r]})),v((function(e){return!0}))}}),[g,n]);var N=function(e){var t,r=JSON.parse(JSON.stringify(n));r.forEach((function(n,r){n.id===e&&(t=r)})),r.splice(t,1),r.unshift(p),c((function(e){return r}))},j=(0,W.A)(),F=(0,l.RI)()[0],_=(0,l.dz)()[0],D=(0,I.aF)()[0],J={};p&&(J=V(V({},p),{setNewChatCallback:function(e){if(n&&n.length){var t=n.slice(1);c((function(n){return X([e],t,!0)}))}else c((function(t){return[e]}));m((function(t){return e}))},customMenuHandler:function(e){if("Clear chat"===e)S((0,u.F6)(!0)),F({chatId:+p.id}).unwrap().then((function(){m((function(e){return V(V({},e),{messages:[],lastMessage:null})})),c((function(e){return e.map((function(e){if(e.id===p.id){var t=JSON.parse(JSON.stringify(e));return t.messages=[],t.lastMessage=null,t}return e}))}))})).catch((function(e){return S((0,u.g)(e.data.message))})),S((0,u.F6)(!1));else if("Delete chat"===e)S((0,u.F6)(!0)),_({chatId:+p.id}).unwrap().then((function(){m((function(e){return null})),c((function(e){return e.filter((function(e){return e.id!==p.id}))}))})).catch((function(e){return S((0,u.g)(e.data.message))})),S((0,u.F6)(!1));else if("Block user"===e){var t=p.firstChatterId===b?p.secondChatterId:p.firstChatterId;j((0,R.Gj)(t),(function(){m((function(e){return null})),c((function(e){return e.filter((function(e){return e.id!==p.id}))}))}))}},messageOptionsCallback:function(e){S((0,u.F6)(!0)),D({chatId:+p.id,messageId:e}).unwrap().then((function(){var t=p.messages.filter((function(t){return t.id!==e})),n=JSON.parse(JSON.stringify(p));n.messages=t;var r=t[t.length-1];n.lastMessage.id===e&&(n.lastMessage=r),m((function(e){return n})),c((function(e){return e.map((function(e){return e.id===n.id?V(V({},e),{lastMessage:r}):e}))}))})).catch((function(e){return S((0,u.g)(e.data.message))})),S((0,u.F6)(!1))},ownId:b,userId:(p.firstChatterId===b?p.secondChatterId:p.firstChatterId)||h}));var $=(0,r.A)(),B=(0,a.A)($.breakpoints.down("xl"));return s.createElement(i.A,{sx:P.page},B?p?s.createElement(T,V({upTheChat:N,setCurrentChat:m},J)):s.createElement(O,{setChats:c,setCurrentChat:m,chats:n}):s.createElement(s.Fragment,null,s.createElement(O,{currentChatId:null==p?void 0:p.id,setChats:c,setCurrentChat:m,chats:n}),p?s.createElement(T,V({upTheChat:N,setCurrentChat:m},J)):s.createElement(i.A,{sx:P.plug},s.createElement(o.A,{variant:"body1"},e("chats_noChatsMessage")))))}}}]);