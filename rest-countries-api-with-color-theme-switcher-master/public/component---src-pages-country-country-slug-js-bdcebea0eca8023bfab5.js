"use strict";(self.webpackChunkrest_countries_api_gatsby=self.webpackChunkrest_countries_api_gatsby||[]).push([[456],{3435:function(e,l,t){t.r(l),t.d(l,{default:function(){return i}});var n=t(7294),a=t(1597),r=t(262);var m=n.forwardRef((function(e,l){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",ref:l},e),n.createElement("path",{fillRule:"evenodd",d:"M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z",clipRule:"evenodd"}))})),s=t(7059),c=t(913),o=t(9493),i=function(e){var l=e.data,t=l.country,i=l.allCountry,u=(0,s.c)(t.localImage),g=n.useContext(o.E).region,E=i.nodes&&i.nodes.filter((function(e){return t.borders&&t.borders.includes(e.cca3)}));return E.sort((function(e,l){return e.slug>l.slug?1:l.slug>e.slug?-1:0})),n.createElement(n.Fragment,null,n.createElement(r.Z,{title:t.name.common}),n.createElement("div",{className:"py-10 mx-20 country flex-1 flex flex-col"},n.createElement(a.Link,{to:g?"/region/"+g:"/",className:"font-semibold py-2 flex-none px-6 element rounded shadow inline-flex content-center hover:brightness-95"},n.createElement(m,{className:"w-4 h-5 mr-2"})," Back"),n.createElement("div",{className:"mt-20 xl:flex"},n.createElement(s.G,{className:"max-w-full max-h-full",image:u,alt:t.name.common+" flag}"}),n.createElement("div",{className:"flex-2 xl:pl-20"},n.createElement("h1",{className:"font-bold text-2xl my-10"},t.name.common),n.createElement("div",{className:"xl:flex"},n.createElement("ul",{className:"flex-1"},n.createElement("li",{className:"mb-3"},n.createElement("strong",null,"Native Name:")," ",t.name.nativeName),n.createElement("li",{className:"mb-3"},n.createElement("strong",null,"Population:")," ",(0,c.u)(t.population)),n.createElement("li",{className:"mb-3"},n.createElement("strong",null,"Region:")," ",t.region),t.subregion&&n.createElement("li",{className:"mb-3"},n.createElement("strong",null,"Sub Region:")," ",t.subregion),t.capital&&n.createElement("li",{className:"mb-3"},n.createElement("strong",null,"Capital:")," ",t.capital)),n.createElement("ul",{className:"flex-1 mt-10 xl:mt-0"},n.createElement("li",{className:"mb-3"},n.createElement("strong",null,"Top Level Domain:")," ",t.tld),t.currencies&&n.createElement("li",{className:"mb-3"},n.createElement("strong",null,"Currencies:")," ",t.currencies.join(", ")),t.languages&&n.createElement("li",{className:"mb-3"},n.createElement("strong",null,"Languages:")," ",t.languages.join(", ")))),E.length>0&&n.createElement("div",{className:"mt-8"},n.createElement("strong",{className:"mr-4 whitespace-nowrap lg:inline-block"},"Border countries:"),n.createElement("div",null,E.map((function(e){return n.createElement(a.Link,{to:"/country/"+e.slug,key:e.slug,className:"font-semibold mr-2 my-2 py-1 px-6 element rounded shadow inline-flex hover:brightness-95"},e.name.common)}))))))))}}}]);
//# sourceMappingURL=component---src-pages-country-country-slug-js-bdcebea0eca8023bfab5.js.map