(()=>{"use strict";var e,n={305:(e,n,o)=>{var i=o(212),r=o(886),t=o(875);const l=new i.xsS,a=new i.cPb(75,window.innerWidth/window.innerHeight,.1,1e3),s=new i.CP7({alpha:!0});s.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(s.domElement),new r.z(a,s.domElement);const d=new i.vmT(16777215,13421772,1);l.add(d),a.position.z=5;const v=function(){requestAnimationFrame(v),s.render(l,a)},f="#8fcf1b";var c=new i.jyz({uniforms:{splitValue:{type:"f",value:0},fillColor:{type:"c",value:new i.Ilk(f)}},vertexShader:"\nvarying vec3 vPosition;\nvoid main() \n{\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n  vPosition = position;\n}\n",side:i.ehD,fragmentShader:"\nvarying vec3 vPosition;\nuniform vec3 fillColor;\nuniform float splitValue;\nvoid main() \n{\n  // 如果Y轴坐标小于分割值，就填充色，小于这个值就取消渲染。\n  if(vPosition.y> splitValue ){\n    discard;\n  }else{\n    gl_FragColor = vec4( fillColor, 0.9 );\n  }\n}\n"});const p=new i.XvJ(1,.4),u=new i.Kj0(p,c),w=new i.vBJ({color:"#ffffff",transparent:!0,opacity:.15}),m=new i.XvJ(1,.45),h=new i.Kj0(m,w),g=(new i.ZzF).setFromObject(u),y=g.max.y,C=g.min.y,b=new i.ZAu;b.add(u),b.add(h),l.add(b);const j=new i.vBJ({color:f}),x=new i.Kj0(p,j);x.position.x=-3,l.add(x);const O=new t.XS,P={splitValue:30,fillColor:f};O.add(P,"splitValue",0,100).onChange((e=>{const n=C+(y-C)*e/100;c.uniforms.splitValue.value=n})),O.addColor(P,"fillColor").onChange((e=>{c.uniforms.fillColor.value.set(e)})),v()}},o={};function i(e){var r=o[e];if(void 0!==r)return r.exports;var t=o[e]={exports:{}};return n[e](t,t.exports,i),t.exports}i.m=n,e=[],i.O=(n,o,r,t)=>{if(!o){var l=1/0;for(v=0;v<e.length;v++){for(var[o,r,t]=e[v],a=!0,s=0;s<o.length;s++)(!1&t||l>=t)&&Object.keys(i.O).every((e=>i.O[e](o[s])))?o.splice(s--,1):(a=!1,t<l&&(l=t));if(a){e.splice(v--,1);var d=r();void 0!==d&&(n=d)}}return n}t=t||0;for(var v=e.length;v>0&&e[v-1][2]>t;v--)e[v]=e[v-1];e[v]=[o,r,t]},i.d=(e,n)=>{for(var o in n)i.o(n,o)&&!i.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},i.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={481:0};i.O.j=n=>0===e[n];var n=(n,o)=>{var r,t,[l,a,s]=o,d=0;if(l.some((n=>0!==e[n]))){for(r in a)i.o(a,r)&&(i.m[r]=a[r]);if(s)var v=s(i)}for(n&&n(o);d<l.length;d++)t=l[d],i.o(e,t)&&e[t]&&e[t][0](),e[t]=0;return i.O(v)},o=self.webpackChunkthreejs_example=self.webpackChunkthreejs_example||[];o.forEach(n.bind(null,0)),o.push=n.bind(null,o.push.bind(o))})();var r=i.O(void 0,[886,557],(()=>i(305)));r=i.O(r)})();