(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{41:function(t,e,n){"use strict";n.r(e);var o=n(17),a=n.n(o),c=n(2),r=n(8),l=n(3),s=n(6),i=n.n(s),u=n(0),j=function(){var t=Object(c.useState)([]),e=Object(l.a)(t,2),n=e[0],o=e[1],a=Object(c.useState)(""),s=Object(l.a)(a,2),j=s[0],p=s[1],b=Object(c.useState)(""),d=Object(l.a)(b,2),f=d[0],h=d[1],m=Object(c.useState)(!0),O=Object(l.a)(m,2),g=O[0],v=O[1];Object(c.useEffect)((function(){console.log("effect"),i.a.get("http://localhost:3002/persons").then((function(t){console.log("promise fulfilled"),o(t.data)}))}),[]),console.log("render",n.length,"notes");var x=function(t){var e=t.person,n=t.toggleImportance,o=e.important?"make not important":"make important";return Object(u.jsxs)("li",{children:[e.name,Object(u.jsx)("button",{onClick:n,children:o})]})},k=function(t){t.preventDefault();var e={name:j};console.log("newName:n arvo ennen if-lausetta: ",j),n.map((function(t){return t.name})).indexOf(j)>-1?(console.log("alternative occurs"),alert(j+" is already added to phonebook")):i.a.post("http://localhost:3002/persons",e).then((function(t){console.log("palvelimen vastaus: ",t),o(n.concat(t.data)),p("")}))},w=n.filter((function(t){return t.name.includes(f)}));return console.log("persons to show palauttaa: ",w,"newKeyword:ll\xe4",f),Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Phonebook"}),Object(u.jsx)("form",{onSubmit:k,children:Object(u.jsxs)("div",{children:["filter with: ",Object(u.jsx)("input",{value:f,onChange:function(t){console.log(t.target.value),h(t.target.value)}})]})}),Object(u.jsx)("h2",{children:"Numbers"}),Object(u.jsxs)("form",{onSubmit:k,children:[Object(u.jsx)("input",{value:j,onChange:function(t){console.log(t.target.value),p(t.target.value)}}),Object(u.jsxs)("button",{type:"submit",onClick:function(){return v(!g)},children:["show ",g?"important":"all"]})]}),w.map((function(t){return Object(u.jsx)("li",{children:t.name})})),n.map((function(t){return Object(u.jsx)(x,{person:t.name,toggleImportance:function(){return function(t){console.log("importance of "+t+" needs to be toggled");var e="http://localhost:3002/persons/".concat(t),a=n.find((function(e){return e.id===t})),c=Object(r.a)(Object(r.a)({},a),{},{important:!a.important});i.a.put(e,c).then((function(e){o(n.map((function(n){return a.id!==t?a:e.data})))}))}(t.id)}},t.id)}))]})};a.a.render(Object(u.jsx)(j,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.a3ae9994.chunk.js.map