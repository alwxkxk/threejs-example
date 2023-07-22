(()=>{"use strict";var n,e={877:(n,e,o)=>{var i=o(212),r=o(886);const t=new(o(219).Z),a=new i.xsS,l=new i.cPb(75,window.innerWidth/window.innerHeight,.1,1e3),v=new i.CP7;v.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(v.domElement),document.body.appendChild(t.dom),new r.z(l,v.domElement);const d=new i.vmT(16777215,13421772,1);a.add(d),l.position.z=10;const s=new i._12(15,15),m=document.createElement("canvas").getContext("2d");m.canvas.height=10,m.canvas.width=10,function(n){for(let e=0;e<n.canvas.height;e++)for(let o=0;o<n.canvas.width;o++){const i=Math.random();n.fillStyle=`rgb(\n        ${Math.floor(255*i)},\n        ${Math.floor(255*i)},\n        ${Math.floor(255*i)})`,n.fillRect(e,o,1,1)}}(m);const c=new i.ROQ(m.canvas);document.body.appendChild(m.canvas),c.minFilter=i.TyD,c.magFilter=i.TyD,c.wrapS=i.rpg,c.wrapT=i.rpg;const u={iTime:{value:0},iResolution:{value:new i.Pa4},iChannel0:{value:c}},f=new i.jyz({vertexShader:"\n  varying vec2 vUv;\n  void main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n  }\n",fragmentShader:"\n#include <common>\n\nuniform vec3 iResolution;\nuniform float iTime;\nuniform sampler2D iChannel0;\n\n// By Daedelus: https://www.shadertoy.com/user/Daedelus\n// license: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.\n#define TIMESCALE 0.25 \n#define TILES 8\n#define COLOR 0.7, 1.6, 2.8\n\nvoid mainImage( out vec4 fragColor, in vec2 fragCoord )\n{\n  vec2 uv = fragCoord.xy / iResolution.xy;\n  uv.x *= iResolution.x / iResolution.y;\n  \n  vec4 noise = texture2D(iChannel0, floor(uv * float(TILES)) / float(TILES));\n  float p = 1.0 - mod(noise.r + noise.g + noise.b + iTime * float(TIMESCALE), 1.0);\n  p = min(max(p * 3.0 - 1.8, 0.1), 2.0);\n  \n  vec2 r = mod(uv * float(TILES), 1.0);\n  r = vec2(pow(r.x - 0.5, 2.0), pow(r.y - 0.5, 2.0));\n  p *= 1.0 - pow(min(1.0, 12.0 * dot(r, r)), 2.0);\n  \n  fragColor = vec4(COLOR, 1.0) * p;\n}\n\nvarying vec2 vUv;\n\nvoid main() {\n  mainImage(gl_FragColor, vUv * iResolution.xy);\n}\n// 通过上面的vUv 由物体大小来决定，而不是 用gl_FragCoord 由渲染面积决定\n//void main() {\n// mainImage(gl_FragColor, gl_FragCoord.xy);\n//}\n",uniforms:u});f.side=i.ehD;const p=new i.Kj0(s,f);a.add(p);const h=function(n){n*=.001,u.iResolution.value.set(200,200,1),u.iTime.value=n,requestAnimationFrame(h),v.render(a,l),t.update()};h()}},o={};function i(n){var r=o[n];if(void 0!==r)return r.exports;var t=o[n]={exports:{}};return e[n](t,t.exports,i),t.exports}i.m=e,n=[],i.O=(e,o,r,t)=>{if(!o){var a=1/0;for(s=0;s<n.length;s++){for(var[o,r,t]=n[s],l=!0,v=0;v<o.length;v++)(!1&t||a>=t)&&Object.keys(i.O).every((n=>i.O[n](o[v])))?o.splice(v--,1):(l=!1,t<a&&(a=t));if(l){n.splice(s--,1);var d=r();void 0!==d&&(e=d)}}return e}t=t||0;for(var s=n.length;s>0&&n[s-1][2]>t;s--)n[s]=n[s-1];n[s]=[o,r,t]},i.d=(n,e)=>{for(var o in e)i.o(e,o)&&!i.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},i.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),(()=>{var n={3191:0};i.O.j=e=>0===n[e];var e=(e,o)=>{var r,t,[a,l,v]=o,d=0;if(a.some((e=>0!==n[e]))){for(r in l)i.o(l,r)&&(i.m[r]=l[r]);if(v)var s=v(i)}for(e&&e(o);d<a.length;d++)t=a[d],i.o(n,t)&&n[t]&&n[t][0](),n[t]=0;return i.O(s)},o=self.webpackChunkthreejs_example=self.webpackChunkthreejs_example||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))})();var r=i.O(void 0,[2886,5518],(()=>i(877)));r=i.O(r)})();