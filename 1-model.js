(()=>{"use strict";var e,n={36:(e,n,o)=>{var r=o(212),t=o(886),i=o(47);const s=new r.xsS,a=new r.cPb(75,window.innerWidth/window.innerHeight,.1,1e3);a.position.set(4,2,4);const l=new r.CP7;l.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(l.domElement),new t.z(a,l.domElement);const d=new r.vmT(16777215,13421772,1);s.add(d);const c=function(){requestAnimationFrame(c),l.render(s,a)};(new i.E).load("./static/3d/1-model.glb",(function(e){console.log("load gltf file:",e),s.add(e.scene),console.log("scene",s),c()}))}},o={};function r(e){var t=o[e];if(void 0!==t)return t.exports;var i=o[e]={exports:{}};return n[e](i,i.exports,r),i.exports}r.m=n,e=[],r.O=(n,o,t,i)=>{if(!o){var s=1/0;for(c=0;c<e.length;c++){for(var[o,t,i]=e[c],a=!0,l=0;l<o.length;l++)(!1&i||s>=i)&&Object.keys(r.O).every((e=>r.O[e](o[l])))?o.splice(l--,1):(a=!1,i<s&&(s=i));if(a){e.splice(c--,1);var d=t();void 0!==d&&(n=d)}}return n}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[o,t,i]},r.d=(e,n)=>{for(var o in n)r.o(n,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},r.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={6788:0};r.O.j=n=>0===e[n];var n=(n,o)=>{var t,i,[s,a,l]=o,d=0;if(s.some((n=>0!==e[n]))){for(t in a)r.o(a,t)&&(r.m[t]=a[t]);if(l)var c=l(r)}for(n&&n(o);d<s.length;d++)i=s[d],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return r.O(c)},o=self.webpackChunkthreejs_example=self.webpackChunkthreejs_example||[];o.forEach(n.bind(null,0)),o.push=n.bind(null,o.push.bind(o))})();var t=r.O(void 0,[2886,7047,2212],(()=>r(36)));t=r.O(t)})();