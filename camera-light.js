(()=>{"use strict";var e,n={627:(e,n,t)=>{var o=t(212),a=t(886),d=t(875);const i=new o.xsS,r=new o.cPb(75,window.innerWidth/window.innerHeight,.1,1e5);r.position.z=60,r.position.y=30;const s=new o.CP7;s.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(s.domElement);let c=new a.z(r,s.domElement);const l=new o.Mig(2236962);i.add(l);const m=new o.Ox3(11184810,.5);m.position.set(20,20,20),i.add(m);const p=new o.cBI(m,5);i.add(p);const w=new o.FE5(10,3,200,32),u=new o.Wid,b=new o.Kj0(w,u);i.add(b);const v=new o.DvJ(15,15,15),g=new o.Wid({color:204}),h=new o.Kj0(v,g);h.position.set(40,0,0),i.add(h);const y=new o.cPb(75,window.innerWidth/window.innerHeight,1,1e5);y.position.z=15,i.add(y);const f=new o.Rki(y);f.update(),i.add(f);const E={color:16777215,intensity:1,distance:50,angle:1,penumbra:1,decay:1},O=new o.PMe(E.color,E.intensity,E.distance,E.angle,E.penumbra,E.decay);O.position.copy(y.position),i.add(O);const C=new o.FvO(O);i.add(C);let x=1;const j=function(){requestAnimationFrame(j),1===x?s.render(i,r):(f.update(),O.position.copy(y.position),C.update(),s.render(i,y)),c&&c.update()};j();const k=new d.XS,B=k.add(E,"intensity",.1),I=k.add(E,"distance",1),z=k.add(E,"angle",.1),L=k.add(E,"penumbra",.1),P=k.add(E,"decay",.1),W=k.addColor(E,"color"),H=(e,n)=>{O[e]=n,C.update()};B.onChange((e=>H("intensity",e))),I.onChange((e=>H("distance",e))),z.onChange((e=>H("angle",e))),L.onChange((e=>H("penumbra",e))),P.onChange((e=>H("decay",e))),W.onChange((e=>{O.color.setHex(e)})),document.getElementById("camera1-btn").addEventListener("click",(()=>{console.log("camera1-btn"),c&&c.dispose(),document.getElementById("camera1-btn").classList.add("btn-active"),document.getElementById("camera2-btn").classList.remove("btn-active"),c=new a.z(r,s.domElement),x=1})),document.getElementById("camera2-btn").addEventListener("click",(()=>{console.log("camera2-btn"),c&&c.dispose(),document.getElementById("camera2-btn").classList.add("btn-active"),document.getElementById("camera1-btn").classList.remove("btn-active"),c=new a.z(y,s.domElement),x=2}))}},t={};function o(e){var a=t[e];if(void 0!==a)return a.exports;var d=t[e]={exports:{}};return n[e](d,d.exports,o),d.exports}o.m=n,e=[],o.O=(n,t,a,d)=>{if(!t){var i=1/0;for(l=0;l<e.length;l++){for(var[t,a,d]=e[l],r=!0,s=0;s<t.length;s++)(!1&d||i>=d)&&Object.keys(o.O).every((e=>o.O[e](t[s])))?t.splice(s--,1):(r=!1,d<i&&(i=d));if(r){e.splice(l--,1);var c=a();void 0!==c&&(n=c)}}return n}d=d||0;for(var l=e.length;l>0&&e[l-1][2]>d;l--)e[l]=e[l-1];e[l]=[t,a,d]},o.d=(e,n)=>{for(var t in n)o.o(n,t)&&!o.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},o.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={9883:0};o.O.j=n=>0===e[n];var n=(n,t)=>{var a,d,[i,r,s]=t,c=0;if(i.some((n=>0!==e[n]))){for(a in r)o.o(r,a)&&(o.m[a]=r[a]);if(s)var l=s(o)}for(n&&n(t);c<i.length;c++)d=i[c],o.o(e,d)&&e[d]&&e[d][0](),e[d]=0;return o.O(l)},t=self.webpackChunkthreejs_example=self.webpackChunkthreejs_example||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))})();var a=o.O(void 0,[2886,3875,6008],(()=>o(627)));a=o.O(a)})();