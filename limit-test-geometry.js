(()=>{"use strict";var e,n={220:(e,n,t)=>{var r=t(212),o=t(886);const i=new r.xsS,a=new r.cPb(75,window.innerWidth/window.innerHeight,.1,1e3),d=new r.CP7;d.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(d.domElement);const s=new o.z(a,d.domElement),c=new r.vmT(16777215,13421772,1);i.add(c),a.position.z=100,a.position.y=100,s.update();const l=new r.vBJ({color:13421772});let p=0;function u(){const e=new r.DvJ,n=new r.Kj0(e,l);n.position.set(100*Math.random()-50,100*Math.random()-50,100*Math.random()-50),i.add(n),p++}u();let f,m=(performance||Date).now(),w=0;const v=function(){requestAnimationFrame(v),d.render(i,a),function(){const e=(performance||Date).now();w++,e>=m+1e3&&(f=1e3*w/(e-m),m=e,w=0)}(),f>30&&function(e){for(let e=0;e<10;e++)u()}()};v(),setInterval((()=>{document.getElementById("fps").innerText=f.toFixed(0),document.getElementById("cube-number").innerText=p/1e4+"万"}),1e3),window.debugThis={orbit:s,renderer:d}}},t={};function r(e){var o=t[e];if(void 0!==o)return o.exports;var i=t[e]={exports:{}};return n[e](i,i.exports,r),i.exports}r.m=n,e=[],r.O=(n,t,o,i)=>{if(!t){var a=1/0;for(l=0;l<e.length;l++){for(var[t,o,i]=e[l],d=!0,s=0;s<t.length;s++)(!1&i||a>=i)&&Object.keys(r.O).every((e=>r.O[e](t[s])))?t.splice(s--,1):(d=!1,i<a&&(a=i));if(d){e.splice(l--,1);var c=o();void 0!==c&&(n=c)}}return n}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[t,o,i]},r.d=(e,n)=>{for(var t in n)r.o(n,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},r.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={470:0};r.O.j=n=>0===e[n];var n=(n,t)=>{var o,i,[a,d,s]=t,c=0;if(a.some((n=>0!==e[n]))){for(o in d)r.o(d,o)&&(r.m[o]=d[o]);if(s)var l=s(r)}for(n&&n(t);c<a.length;c++)i=a[c],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return r.O(l)},t=self.webpackChunkthreejs_example=self.webpackChunkthreejs_example||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))})();var o=r.O(void 0,[886,348],(()=>r(220)));o=r.O(o)})();