(()=>{"use strict";var e,n={335:(e,n,t)=>{var o=t(212),i=t(194),r=t(410),a=t(564);const s=[200,200,200,200,200,180,160,180,180,160,180,160,160,180,180,180,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,180,200,200,200,200,200,200,200,200,200,200,200,200,200,200,220],l=function(e){const n=[];for(let t=0;t<16;t+=1){const o=e[2*t],i=e[2*t+1],r=e[2*t+8],a=e[2*t+9];n.push(Math.ceil((o+i+r+a)/4))}return n}(s),c=function(e){const n=[];for(let t=0;t<9;t+=1)n.push(e[t]%2);return n}(l);let d,p,h,u;const m=[],w={table:[]};function f(e,n,t,i){const r=[];for(let s=0;s<e.length;s+=1){const l=document.createElement("div");l.className="element",l.style.backgroundColor=`rgba(0,127,127,${i})`;const c=document.createElement("div");c.className="symbol",c.textContent=e[s],l.appendChild(c);const d=new a.cp(l);d.position.x=4e3*Math.random()-2e3,d.position.y=4e3*Math.random()-2e3,d.position.z=4e3*Math.random()-2e3,p.add(d),m.push(d);const h=new o.Tme;h.position.x=s%n*140-80*n,h.position.y=-140*Math.ceil((s+1)/n)+50*n,h.position.z=t,w.table.push(h),r.push(h)}return r}function v(){h.render(p,d)}d=new o.cPb(40,window.innerWidth/window.innerHeight,1,1e4),d.position.x=-2200,d.position.z=400,d.position.z=1900,console.log("camera",d),p=new o.xsS,f(s,8,0,.4),f(l,4,400,.6),f(c,3,800,.8),h=new a.lX,h.setSize(window.innerWidth,window.innerHeight),document.getElementById("container").appendChild(h.domElement),u=new r.$(d,h.domElement),u.minDistance=500,u.maxDistance=6e3,u.addEventListener("change",v),function(e,n){i.Z.removeAll();for(let t=0;t<m.length;t++){const o=m[t],r=e[t];new i.Z.Tween(o.position).to({x:r.position.x,y:r.position.y,z:r.position.z},Math.random()*n+n).easing(i.Z.Easing.Exponential.InOut).start()}new i.Z.Tween(this).to({},4e3).onUpdate(v).start()}(w.table,2e3),setInterval((()=>{const e=Math.floor(Math.random()*m.length);m[e]&&(m[e].element.classList.add("element-active"),console.log(" objects[randomIndex]",m[e]))}),1e3),window.addEventListener("resize",(function(){d.aspect=window.innerWidth/window.innerHeight,d.updateProjectionMatrix(),h.setSize(window.innerWidth,window.innerHeight),v()})),function e(){requestAnimationFrame(e),i.Z.update(),u.update()}()}},t={};function o(e){var i=t[e];if(void 0!==i)return i.exports;var r=t[e]={exports:{}};return n[e](r,r.exports,o),r.exports}o.m=n,e=[],o.O=(n,t,i,r)=>{if(!t){var a=1/0;for(d=0;d<e.length;d++){for(var[t,i,r]=e[d],s=!0,l=0;l<t.length;l++)(!1&r||a>=r)&&Object.keys(o.O).every((e=>o.O[e](t[l])))?t.splice(l--,1):(s=!1,r<a&&(a=r));if(s){e.splice(d--,1);var c=i();void 0!==c&&(n=c)}}return n}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[t,i,r]},o.d=(e,n)=>{for(var t in n)o.o(n,t)&&!o.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},o.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={7260:0};o.O.j=n=>0===e[n];var n=(n,t)=>{var i,r,[a,s,l]=t,c=0;if(a.some((n=>0!==e[n]))){for(i in s)o.o(s,i)&&(o.m[i]=s[i]);if(l)var d=l(o)}for(n&&n(t);c<a.length;c++)r=a[c],o.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return o.O(d)},t=self.webpackChunkthreejs_example=self.webpackChunkthreejs_example||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))})();var i=o.O(void 0,[7949],(()=>o(335)));i=o.O(i)})();