import{_ as m,o as t,c as n,F as v,r as $,a as g,b as y,d as s,e as l,f as d,t as c,p as b,g as k,h as p}from"./entry-1898479d.mjs";import{s as r}from"./index-a875bf46.mjs";const N={props:["items"]},I={class:"menu__crew navtext"};function B(e,a,i,u,h,w){const o=y;return t(),n("div",I,[(t(!0),n(v,null,$(i.items,f=>(t(),n("div",null,[g(o,{class:"menu__item",to:`/crew/${f}`},null,8,["to"])]))),256))])}var S=m(N,[["render",B],["__scopeId","data-v-07eab3fe"]]);const V={props:["data"],created(){this.crew=this.data.crew.map(a=>r(a.role));const e=r(this.$route.path.replace("/crew/",""));this.role=this.data.crew.find(a=>r(a.role)===e)},beforeCreate(){document.body.className="crew"}},_=e=>(b("data-v-803f1e2c"),e=e(),k(),e),C={class:"main"},M={class:"main__content"},x=_(()=>s("div",{class:"main__title heading5 hide-small"},[s("span",{class:"main__title__number"},"02"),p("Meet your crew ")],-1)),F=_(()=>s("div",{class:"crew__border only-small"},null,-1)),L={class:"crew__description"},D={class:"crew__text"},E={class:"heading4"},T={class:"heading3"},j={class:"normaltext"},q={class:"main__crew"},z=["alt","src"],A=_(()=>s("div",{class:"main__title heading5 only-small"},[s("span",{class:"main__title__number"},"02"),p("Meet your crew ")],-1));function G(e,a,i,u,h,w){const o=S;return t(),n("main",C,[s("div",M,[x,F,s("div",L,[s("div",D,[e.crew?(t(),l(o,{key:0,class:"crew__menu only-small",items:e.crew},null,8,["items"])):d("",!0),s("h2",E,c(e.role.role),1),s("h1",T,c(e.role.name),1),s("p",j,c(e.role.bio),1)])]),e.crew?(t(),l(o,{key:0,class:"crew__menu hide-small",items:e.crew},null,8,["items"])):d("",!0)]),s("div",q,[s("img",{alt:e.role.name,src:e.role.images.png},null,8,z)]),A])}var K=m(V,[["render",G],["__scopeId","data-v-803f1e2c"]]);export{K as default};
