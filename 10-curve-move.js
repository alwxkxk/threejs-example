(()=>{"use strict";var e,n={171:(e,n,t)=>{var o=t(212),r=t(886),a=t(194);const i=new o.xsS,s=new o.cPb(75,window.innerWidth/window.innerHeight,.1,1e3);s.position.z=25;const l=new o.CP7({alpha:!0});l.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(l.domElement),new r.z(s,l.domElement);const d=new o.vmT(16777215,13421772,1);i.add(d);const w=new o.Pa4(10,0,0),v=new o.Pa4(0,15,0),c=new o.Pa4(0,15,0),p=new o.Pa4(-10,0,0),u=new o.yj7(w,v,c,p).getPoints(100),m=(new o.u9r).setFromPoints(u),h=(e,n)=>{m.setDrawRange(e,n),m.attributes.position.needsUpdate=!0},f=new o.nls({color:15169767}),b=new o.x12(m,f);i.add(b);const O=()=>{const e={val:0},n={val:0};new a.Z.Tween(n).to({val:100},3e3).onUpdate((()=>{h(e.val,n.val)})).start(),setTimeout((()=>{new a.Z.Tween(e).to({val:100},3e3).onUpdate((()=>{h(e.val,n.val)})).start()}),4e3)};O(),document.getElementById("move").onclick=()=>{O()};const g=function(){a.Z.update(),requestAnimationFrame(g),l.render(i,s)};g()}},t={};function o(e){var r=t[e];if(void 0!==r)return r.exports;var a=t[e]={exports:{}};return n[e](a,a.exports,o),a.exports}o.m=n,e=[],o.O=(n,t,r,a)=>{if(!t){var i=1/0;for(w=0;w<e.length;w++){for(var[t,r,a]=e[w],s=!0,l=0;l<t.length;l++)(!1&a||i>=a)&&Object.keys(o.O).every((e=>o.O[e](t[l])))?t.splice(l--,1):(s=!1,a<i&&(i=a));if(s){e.splice(w--,1);var d=r();void 0!==d&&(n=d)}}return n}a=a||0;for(var w=e.length;w>0&&e[w-1][2]>a;w--)e[w]=e[w-1];e[w]=[t,r,a]},o.d=(e,n)=>{for(var t in n)o.o(n,t)&&!o.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},o.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={8499:0};o.O.j=n=>0===e[n];var n=(n,t)=>{var r,a,[i,s,l]=t,d=0;if(i.some((n=>0!==e[n]))){for(r in s)o.o(s,r)&&(o.m[r]=s[r]);if(l)var w=l(o)}for(n&&n(t);d<i.length;d++)a=i[d],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(w)},t=self.webpackChunkthreejs_example=self.webpackChunkthreejs_example||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))})();var r=o.O(void 0,[2886,2287],(()=>o(171)));r=o.O(r)})();