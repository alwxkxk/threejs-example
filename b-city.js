(()=>{"use strict";var e,t={146:(e,t,n)=>{var o=n(212),r=n(886),i=n(47),a=n(297),s=n(194),c=n(50),l=n(426),d=n(336);const w=new o.xsS,u=new o.cPb(75,window.innerWidth/window.innerHeight,.1,1e3);u.position.set(1.61,2.05,2.47);const p=new o.SUY,m=new o.CP7;m.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(m.domElement),new r.z(u,m.domElement);const f=new o.vmT(16777215,13421772,1);w.add(f);const h=new l.C(w,u),y=new d.m(new o.FM8(window.innerWidth,window.innerHeight),1.5,.4,.85);y.threshold=.3,y.strength=2,y.radius=.3;const g=new c.x(m);g.addPass(h),g.addPass(y);const v=function(){const e=p.getDelta();s.Z.update(),b.forEach((t=>{t.update(e)}));const t=function(e){const t={},n=window.innerWidth/2,r=window.innerHeight/2,i=new o.Pa4;return O.setFromObject(e),O.getCenter(i),i.project(u),t.x=i.x*n+n,t.y=-i.y*r+r,t}(w.getObjectByName("road003")),n=document.getElementById("warnIcon");n.style.top=t.y,n.style.left=t.x,g.render(),requestAnimationFrame(v)},b=[];(new i.E).load("./static/3d/b-city.glb",(function(e){document.getElementById("loadingText").style.display="none",console.log("load gltf file:",e),w.add(e.scene),[...w.children[1].children].forEach((e=>{e.traverse((e=>{e.material&&(e.material=x)}))}));for(let e=1;e<=4;e++){const t="road"+(e?"00"+e:"");j(w.getObjectByName(t))}["Elevator","Elevator001"].forEach(((t,n)=>{const r=function(e){const t=new o.ZAu,n=new o.nls({color:65535}),r=new o.vBJ({opacity:.1,color:52428,side:o._Li,transparent:!0}),i=new o.TOt(e.geometry),a=new o.ejS(i,n),s=new o.Kj0(e.geometry,r);return t.add(a).add(s),t.position.set(e.position.x,e.position.y,e.position.z),t.rotation.set(e.rotation.x,e.rotation.y,e.rotation.z),t.scale.set(e.scale.x,e.scale.y,e.scale.z),e.parent.add(t),e.visible=!1,t}(w.getObjectByName(t)),i=new o.Xcj(r);i.clipAction(e.animations[n]).play(),b.push(i)})),v()}),(function(e){console.log("handleProgress",e.loaded,e.total),document.getElementById("loadingText").innerText=`加载模型中:${(e.loaded/e.total*100).toFixed(0)}%`}));const x=new o.vBJ({opacity:.25,color:2053817,side:o._Li,transparent:!0});function j(e){const t=new o.vBJ({vertexColors:o.jSK,side:o._Li}),n=e.geometry.clone(),r=n.attributes.position.count,i=(0,a.Z)("#00ffff","#000000"),c=new Array(r);for(let e=0;e<r;e++){const t=i(e/r).match(/\d+/g),n=Number(t[0])/255,o=Number(t[1])/255,a=Number(t[2])/255;c[3*e]=n,c[3*e+1]=o,c[3*e+2]=a}const l=Number((Math.random()*r).toFixed(0)),d=c.slice(3*l),w=c.slice(0,3*l),u=[].concat(d,w);n.setAttribute("color",new o.a$l(u,3));const p=new o.Kj0(n,t);p.position.set(e.position.x,e.position.y,e.position.z),p.rotation.set(e.rotation.x,e.rotation.y,e.rotation.z),p.scale.set(e.scale.x,e.scale.y,e.scale.z),e.parent.add(p),setInterval((()=>{!function(e,t){const n=t.length/3;new s.Z.Tween({value:0}).to({value:1},2e3).onUpdate((function(r){const i=Number((r.value*n).toFixed(0)),a=t.slice(3*i),s=t.slice(0,3*i),c=[].concat(a,s);e.geometry.setAttribute("color",new o.a$l(c,3))})).start()}(p,u)}),2e3)}const O=new o.ZzF}},n={};function o(e){var r=n[e];if(void 0!==r)return r.exports;var i=n[e]={exports:{}};return t[e](i,i.exports,o),i.exports}o.m=t,e=[],o.O=(t,n,r,i)=>{if(!n){var a=1/0;for(d=0;d<e.length;d++){for(var[n,r,i]=e[d],s=!0,c=0;c<n.length;c++)(!1&i||a>=i)&&Object.keys(o.O).every((e=>o.O[e](n[c])))?n.splice(c--,1):(s=!1,i<a&&(a=i));if(s){e.splice(d--,1);var l=r();void 0!==l&&(t=l)}}return t}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[n,r,i]},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={178:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var r,i,[a,s,c]=n,l=0;if(a.some((t=>0!==e[t]))){for(r in s)o.o(s,r)&&(o.m[r]=s[r]);if(c)var d=c(o)}for(t&&t(n);l<a.length;l++)i=a[l],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(d)},n=self.webpackChunkthreejs_example=self.webpackChunkthreejs_example||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var r=o.O(void 0,[886,47,458,577,977],(()=>o(146)));r=o.O(r)})();