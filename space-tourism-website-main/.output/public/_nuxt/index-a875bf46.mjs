const r=e=>{e=e.replace(/^\s+|\s+$/g,""),e=e.toLowerCase();for(var o="\xE0\xE1\xE4\xE2\xE8\xE9\xEB\xEA\xEC\xED\xEF\xEE\xF2\xF3\xF6\xF4\xF9\xFA\xFC\xFB\xF1\xE7\xB7/_,:;",c="aaaaeeeeiiiioooouuuunc------",a=0,g=o.length;a<g;a++)e=e.replace(new RegExp(o.charAt(a),"g"),c.charAt(a));return e=e.replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-"),e};export{r as s};
