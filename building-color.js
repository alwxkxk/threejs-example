(()=>{"use strict";var n,o={865:(n,o,i)=>{var e=i(212),l=i(886),t=i(875);const r=new e.xsS,a=new e.cPb(75,window.innerWidth/window.innerHeight,.1,1e5);a.position.z=60,a.position.y=30;const s=new e.CP7;s.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(s.domElement);let c=new l.z(a,s.domElement);const d=new e.vmT(16777147,526368,1);r.add(d);const v=new e.Ox3(52428,.2);v.position.set(-30,40,20),r.add(v);const u=new e.cBI(v,5);r.add(u);const p={splitValue:3,splitValue2:-3,fillColor:"#233090"},m=e.rDY.merge([e.Vj0.phong.uniforms,{splitValue:{type:"f",value:p.splitValue},splitValue2:{type:"f",value:p.splitValue2},fillColor:{type:"c",value:new e.Ilk(p.fillColor)}}]),f=new e.jyz({uniforms:m,vertexShader:"\n  varying vec3 vPosition;\n  varying vec3 vNormal;\n  void main() \n  {\n    // TODO: normalMatrix 与 normal值的研究\n    vNormal = normalize( normalMatrix * normal );\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n    vPosition = position;\n  }\n",side:e.ehD,fragmentShader:"\n// 变量声明要在函数外面\nvarying vec3 vPosition;\nuniform vec3 fillColor;\nuniform float splitValue;\nuniform float splitValue2;\nvarying vec3 vNormal;\n\n// 拿外部传入的方向光\nstruct DirectionalLight {\n  vec3 direction;\n  vec3 color;\n};\nuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\nvoid main() {\n  \n  vec3 septColor;\n\n  // 颜色分层，下层颜色取更暗的颜色。\n  if(vPosition.y> splitValue ){\n    septColor = fillColor;\n  }else if(vPosition.y> splitValue2){\n    float multi = 0.5 + 0.5 * ((vPosition.y-splitValue2) / (splitValue-splitValue2));\n    septColor =  vec3(fillColor[0]*multi,fillColor[1]*multi,fillColor[2]*multi);\n  }else{\n    float multi = 0.45;\n    septColor =  vec3(fillColor[0]*multi,fillColor[1]*multi,fillColor[2]*multi);\n  }\n\n  // 法向量\n  vec3 normal = normalize( vNormal );\n\n  \n  // NOTE:只拿一个方向光的效果来进行计划。\n  // TODO: 还要解决物体本身颜色与灯光的叠加问题（RE_Direct）\n  vec3 directionalVector = directionalLights[0].direction;\n  float directional = max(dot(normal.xyz, directionalVector), 0.0);\n  vec3 directionalLightColor = directionalLights[0].color;\n  vec3 vLighting = septColor + (directionalLightColor * directional);\n  gl_FragColor = vec4( vLighting, 1.0 );\n}\n",lights:!0}),h=new e.DvJ(1,10,1),g=new e.Kj0(h,f);g.position.set(0,0,0),r.add(g);for(let n=-12;n<12;n++){const o=g.clone();o.position.set(n*(1.3+Math.random()),0,Math.random());const i=g.clone();i.position.set(n*(1.5+Math.random()),0,1.8+Math.random()),r.add(o),r.add(i)}const C=function(){requestAnimationFrame(C),s.render(r,a),c&&c.update()};C();const w=new t.XS,V=w.add(p,"splitValue",-5,5),y=w.add(p,"splitValue2",-5,5);V.onChange((n=>{f.uniforms.splitValue.value=n})),y.onChange((n=>{f.uniforms.splitValue2.value=n})),w.addColor(p,"fillColor").onChange((n=>{f.uniforms.fillColor.value.set(n)}))}},i={};function e(n){var l=i[n];if(void 0!==l)return l.exports;var t=i[n]={exports:{}};return o[n](t,t.exports,e),t.exports}e.m=o,n=[],e.O=(o,i,l,t)=>{if(!i){var r=1/0;for(d=0;d<n.length;d++){for(var[i,l,t]=n[d],a=!0,s=0;s<i.length;s++)(!1&t||r>=t)&&Object.keys(e.O).every((n=>e.O[n](i[s])))?i.splice(s--,1):(a=!1,t<r&&(r=t));if(a){n.splice(d--,1);var c=l();void 0!==c&&(o=c)}}return o}t=t||0;for(var d=n.length;d>0&&n[d-1][2]>t;d--)n[d]=n[d-1];n[d]=[i,l,t]},e.d=(n,o)=>{for(var i in o)e.o(o,i)&&!e.o(n,i)&&Object.defineProperty(n,i,{enumerable:!0,get:o[i]})},e.o=(n,o)=>Object.prototype.hasOwnProperty.call(n,o),(()=>{var n={4094:0};e.O.j=o=>0===n[o];var o=(o,i)=>{var l,t,[r,a,s]=i,c=0;if(r.some((o=>0!==n[o]))){for(l in a)e.o(a,l)&&(e.m[l]=a[l]);if(s)var d=s(e)}for(o&&o(i);c<r.length;c++)t=r[c],e.o(n,t)&&n[t]&&n[t][0](),n[t]=0;return e.O(d)},i=self.webpackChunkthreejs_example=self.webpackChunkthreejs_example||[];i.forEach(o.bind(null,0)),i.push=o.bind(null,i.push.bind(i))})();var l=e.O(void 0,[2886,3875,5977],(()=>e(865)));l=e.O(l)})();