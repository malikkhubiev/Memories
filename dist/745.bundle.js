"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[745],{1469:(e,t,n)=>{n.d(t,{R:()=>l});var o=n(6540);const r={width:"100%",display:"flex",justifyContent:"flex-start",alignItems:"center",flexDirection:"column",paddingBottom:"150px"},i={padding:0};var a=n(9067),c=function(){return c=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},c.apply(this,arguments)},l=function(e){var t=e.children,n=e.sx,l=e.removePadding,s=r;return l&&(s=c(c(c({},s),i),n)),o.createElement(a.A,{sx:s},t)}},9379:(e,t,n)=>{n.d(t,{h:()=>p});var o=n(4675),r=n(9067),i=n(4073),a=n(6540),c=n(8651),l=n(2062),s=n(5295),m=n(8890);const u={link:{width:"100%",display:"flex",justifyContent:"flex-start",alignItems:"center",color:"unset",textDecoration:"none"},nameDate:{maxWidth:"calc(100% - 50px)",display:"flex",justifyContent:"center",alignItems:"flex-start",flexDirection:"column",marginLeft:"10px"}};var p=function(e){var t=e.authorId,n=e.authorName,p=e.menuOptions,d=e.avatar,f=e.component,x=e.createdAt,g=e.isOwn,b=e.optionActionCallback,h=e.imgSrc;return(0,o.A)(),console.log(f+" "+g),a.createElement(m.Ai,null,a.createElement(c.N_,{to:"/profile:".concat(t),style:u.link},a.createElement(l.z,{src:d,width:55}),a.createElement(r.A,{sx:u.nameDate},a.createElement(i.A,{variant:"body2"},n),a.createElement(m.$e,{sx:{fontSize:"18px"},color:"grey.main"},"".concat(new Date(x).toLocaleDateString(),", ").concat(new Date(x).toLocaleTimeString())))),("image"===f||g)&&a.createElement(s.Z,{imgSrc:h,menuOptions:p,callback:b,icon:"more_vertical"}))}},4745:(e,t,n)=>{n.d(t,{_:()=>z});var o=n(4675),r=n(9067),i=n(4073),a=n(5001),c=n(6540),l=n(8106),s=n(8651),m=n(5834),u=n(9753),p=n(1467),d=n(9379),f=n(8890),x=n(1469),g=n(4540),b=n(1268),h=function(e){var t=e.imageId,n=e.commentsCallback,a=e.isCommentSectionOpened,l=e.numberOfComments,m=(0,o.A)();return c.createElement(r.A,{sx:b.A.main,onClick:function(){n&&n(!a)}},c.createElement(x.R,{removePadding:!0},n?c.createElement(g.p,{type:"comments",extra:b.A.iconExtra}):c.createElement(s.N_,{to:"/post/:".concat(t,"/:true")},c.createElement(g.p,{type:"comments",extra:b.A.iconExtra})),c.createElement(i.A,{sx:b.A.count(m),variant:"body2"},l)))},y=n(5771),E=n(1046),v=n(5295),k=n(454),A=[{id:1,props:{button:E.AI,icon:E.kA,name:"Mail.ru"}},{id:2,props:{button:E.wk,icon:E._z,name:"LinkedIn"}},{id:3,props:{button:E.AC,icon:E.uH,name:"OK"}},{id:4,props:{button:E.VI,icon:E.hZ,name:"Telegram"}},{id:5,props:{button:E.SU,icon:E.e,name:"Viber"}},{id:6,props:{button:E.rx,icon:E.Hu,name:"VK"}},{id:7,props:{button:E.Kz,icon:E.Y4,name:"WhatsApp"}}],O=function(e){var t=e.url;return(0,c.useEffect)((function(){A.forEach((function(e){e.component=k.Q}))}),[]),c.createElement("div",null,c.createElement(x.R,{removePadding:!0},c.createElement(v.Z,{menuOptions:A,callback:function(e){},icon:"share",iconWidth:"40",url:t})))};const w={stack:{padding:{xl:"25px 50px",sm:"25px 20px",xs:"25px 20px"}}};var C=function(e){var t=e.isLiked,n=e.like,o=e.unLike,r=e.numberOfLikes,i=e.numberOfComments,a=e.imageId,l=e.url,s=e.commentsCallback,m=e.isCommentSectionOpened;return c.createElement(f.Ai,{sx:w.stack},c.createElement(y.A,{imageId:a,isLiked:t,like:n,unLike:o,numberOfLikes:r}),c.createElement(h,{imageId:a,numberOfComments:i,commentsCallback:s||null,isCommentSectionOpened:m||null}),c.createElement(O,{url:l}))};const _={imageComponent:{width:"100%",position:"relative",display:"flex",justifyContent:"flex-start",alignItems:"flex-start",flexDirection:"column",padding:"25px 0"},header:{width:"100%",marginBottom:"10px"},image:{width:"100%"},bold:{fontWeight:"bold"},description:{width:"100%",display:"flex",justifyContent:"flex-start",alignItems:"flex-start",marginBottom:"10px"},desc_with_el:{overflowX:"hidden",textOverflow:"ellipsis",maxWidth:"100%"},line:function(e){return{marginTop:"20px",marginRight:"10px",width:"30px",height:"2px",backgroundColor:e.palette.primary.violet,borderRadius:"50px"}},tags:{marginTop:"10px"},tag:function(e){return{fontSize:"25px",marginRight:"10px",color:e.palette.primary.violet}}};var S=n(2389),I=n(6248),L=[{id:1,props:{body:"image_button_save",icon:"filled_bookmark"}},{id:2,props:{body:"image_button_unsave",icon:"unsave"}},{id:3,props:{body:"image_button_download",icon:"download"}},{id:4,props:{body:"image_button_hide",icon:"hide"}},{id:5,props:{body:"image_button_show",icon:"show"}},{id:6,props:{body:"image_button_delete",icon:"delete"}}],j=[{id:7,props:{body:"image_button_notInterested",icon:"not_interested"}},{id:8,props:{body:"image_button_download",icon:"download"}},{id:9,props:{body:"image_button_save",icon:"filled_bookmark"}},{id:10,props:{body:"image_button_unsave",icon:"unsave"}}],z=function(e){var t=e.setImagePosition,n=e.authorId,x=e.authorName,g=e.isOwn,b=e.avatar,h=e.id,y=e.createdAt,E=e.src,v=e.isLiked,A=e.numberOfLikes,O=e.description,w=e.tags,z=e.idOfSelected,N=e.numberOfViews,P=e.commentsCallback,D=e.isCommentSectionOpened,T=e.menuOptionsHandlerCallback,W=e.numberOfComments,R=e.isPrivate,B=e.isSaved,H=(0,o.A)(),J=(0,c.useState)([]),F=J[0],V=J[1],Z=(0,S.Bd)("authorized").t;(0,c.useEffect)((function(){var e;(0,I.o)("authorized"),g?(e=JSON.parse(JSON.stringify(L)),R?e.splice(3,1):e.splice(4,1)):e=JSON.parse(JSON.stringify(j));var t=e=(e=B?e.filter((function(e){return![1,9].includes(e.id)})):e.filter((function(e){return![2,10].includes(e.id)}))).map((function(e){return e.props.body=Z(e.props.body),e}));t.forEach((function(e){e.component=k.l})),V((function(e){return t}))}),[]);var K=(0,l.zy)().pathname.includes("post"),Q=(0,c.useState)(A),Y=Q[0],G=Q[1],M=(0,c.useState)(v),U=M[0],X=M[1],$="http://localhost:8080/#/post/:".concat(h,"/:false"),q=(0,p.GE)()[0],ee=(0,p.jx)()[0],te=(0,u.j)(),ne=(0,c.useRef)();(0,c.useEffect)((function(){if(t&&ne.current&&ne.current.offsetTop&&ne.current.clientHeight){var e=ne.current.offsetTop+ne.current.clientHeight/2;t(h,e,ne.current.clientHeight),z===h&&setTimeout((function(){var e=ne.current.offsetTop;window.scrollTo(0,e)}),100)}}),[]);var oe=JSON.parse(JSON.stringify(w)).filter((function(e){return!e.isPrivate}));return c.createElement(r.A,{id:"".concat(h),ref:ne,sx:_.imageComponent},c.createElement(r.A,{sx:_.header},c.createElement(d.h,{optionActionCallback:function(e){T(h,e)},menuOptions:F,imgSrc:E,authorId:n,component:"image",authorName:x,isOwn:g,avatar:b,createdAt:y})),c.createElement("img",{style:_.image,src:"https://memories-208s.onrender.com/"+E}),c.createElement(C,{numberOfComments:W,commentsCallback:P||null,isCommentSectionOpened:D||null,isLiked:U,like:function(){te((0,m.F6)(!0)),q({imageId:h}).unwrap().then((function(e){X((function(e){return!0})),G((function(e){return"".concat(+e+1)}))})).catch((function(e){return te((0,m.g)(e.data.message))})),te((0,m.F6)(!1))},unLike:function(){te((0,m.F6)(!0)),ee({imageId:h}).unwrap().then((function(e){X((function(e){return!1})),G((function(e){return"".concat(+e-1)}))})).catch((function(e){return te((0,m.g)(e.data.message))})),te((0,m.F6)(!1))},numberOfLikes:Y,imageId:h,url:$}),c.createElement(r.A,{sx:{width:"100%",padding:{md:"0",xs:"0 30px"}}},c.createElement(r.A,{sx:{width:"100%",justifyContent:"center"}},c.createElement(i.A,{variant:"h5"},N," ",Z("image_views"))),c.createElement(r.A,{sx:_.description},c.createElement(r.A,{sx:_.line(H)}),c.createElement(r.A,{sx:{maxWidth:"80%"}},K?c.createElement(i.A,{sx:_.desc_with_el,variant:"body2"},O):c.createElement(f.zW,null,O))),c.createElement(r.A,{sx:_.tags},oe.map((function(e){return c.createElement(a.A,{key:e.id,variant:"body2",component:s.N_,sx:_.tag,to:"/tags/:".concat(e.id,"/:").concat(e.name)},"#",e.name)})))))}},5771:(e,t,n)=>{n.d(t,{A:()=>p});var o=n(4675),r=n(9067),i=n(5406),a=n(5001),c=n(4073),l=n(6540),s=n(8651),m=n(4540),u=n(1268);const p=function(e){var t=e.imageId,n=e.isLiked,p=e.like,d=e.unLike,f=e.numberOfLikes,x=(0,o.A)(),g=(0,l.useState)(n),b=g[0],h=g[1],y=function(e){b?(h((function(e){return!1})),d()):(h((function(e){return!0})),k(e.currentTarget),p())},E=(0,l.useState)(null),v=E[0],k=E[1],A=Boolean(v),O=A?"simple-popover":void 0;return l.createElement(r.A,{sx:u.A.main},l.createElement(r.A,null,t&&l.createElement(i.Ay,{id:O,open:A,anchorEl:v,onClose:function(){k(null)},anchorOrigin:{vertical:"top",horizontal:"center"},transformOrigin:{vertical:"bottom",horizontal:"center"}},l.createElement(a.A,{variant:"body2",component:s.N_,sx:u.A.seeAll(x),to:"/liked:".concat(t)},"See all liked")),b?l.createElement("div",{"data-testid":"unLike",onClick:y},l.createElement(m.p,{type:"filled_like",extra:u.A.iconExtra})):l.createElement("div",{"data-testid":"like","aria-describedby":O,onClick:y},l.createElement(m.p,{type:"like",extra:u.A.iconExtra}))),l.createElement(c.A,{sx:u.A.count(x),variant:"body2"},f))}},1268:(e,t,n)=>{n.d(t,{A:()=>o});const o={main:{display:"flex",justifyContent:"flex-start",alignItems:"center",flexDirection:"column",position:"relative"},count:function(e){return{fontSize:"15px",position:"absolute",top:"-5px",right:"-15px",color:"dark"===e.palette.mode?e.palette.primary.main:e.palette.primary.mainBg,backgroundColor:e.palette.primary.violet,width:"20px",height:"20px",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center"}},iconExtra:{width:"40px"},seeAll:function(e){return{textDecoration:"none",color:e.palette.primary.main}}}},454:(e,t,n)=>{n.d(t,{l:()=>l,Q:()=>s});var o=n(9067),r=n(4073),i=n(6540);const a={component:{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center"},box:{marginLeft:"10px",maxWidth:"calc(100% - 35px)"}};var c=n(4540),l=function(e){var t=e.body,n=e.icon;return i.createElement(o.A,{sx:a.component},n&&i.createElement(c.p,{type:n}),i.createElement(o.A,{sx:a.box},i.createElement(r.A,{variant:"body2"},t)))},s=function(e){return i.createElement(e.button,{url:e.url},i.createElement(o.A,{sx:a.component},e.icon&&i.createElement(e.icon,{size:32,round:!0}),i.createElement(o.A,{sx:a.box},i.createElement(r.A,{variant:"body2"},e.name))))}},5295:(e,t,n)=>{n.d(t,{Z:()=>s});var o=n(1641),r=n(8363),i=n(8946),a=n(6540),c=n(4540),l=function(){return l=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},l.apply(this,arguments)},s=function(e){var t=e.menuOptions,n=e.imgSrc,s=e.side,m=e.callback,u=e.iconWidth,p=e.url,d=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(n[o[r]]=e[o[r]])}return n}(e,["menuOptions","imgSrc","side","callback","iconWidth","url"]),f=(0,a.useState)(null),x=f[0],g=f[1],b=Boolean(x),h=function(){g(null)},y=function(e){m(e),h()},E={};return u&&(E.width=u+"px"),"share"===d.icon?E.transform="translateY(-5px) scale(-1, 1)":E.transform="scale(-1, 1)",a.createElement(a.Fragment,null,a.createElement(o.A,{onClick:function(e){g(e.currentTarget)}},a.createElement(c.p,{type:d.icon,extra:E})),a.createElement(i.A,{anchorEl:x,anchorOrigin:{vertical:"bottom",horizontal:s||"right"},transformOrigin:{vertical:"top",horizontal:s||"right"},open:b,onClose:h,PaperProps:{style:{width:"300px"}}},t.map((function(e){return p?a.createElement(r.A,{key:e.id,onClick:function(){return y(e.props.body)}},e.component?e.component(l({url:p},e.props)):e.props.body):"Download"===e.props.body?a.createElement(r.A,{key:e.id},a.createElement("a",{target:"_blank",href:"https://memories-208s.onrender.com/"+n,download:!0,style:{width:"100%"}},e.component(l({},e.props)))):a.createElement(r.A,{key:e.id,onClick:function(){return y(e.props.body)}},e.component?e.component(l({},e.props)):e.props.body)}))))}}}]);