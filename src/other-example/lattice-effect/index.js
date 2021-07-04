// https://threejsfundamentals.org/threejs/lessons/threejs-shadertoy.html
// https://www.shadertoy.com/user/Daedelus
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";



const stats = new Stats();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.autoClearColor = false;
document.body.appendChild( renderer.domElement );
document.body.appendChild(stats.dom);


new OrbitControls( camera, renderer.domElement );
const light = new THREE.HemisphereLight( 0xffffff, 0xcccccc, 1 );
scene.add( light );


camera.position.z = 10;

const planeGeo = new THREE.PlaneGeometry(15, 15);


// const material = new THREE.MeshBasicMaterial();

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`;


const fragmentShader = `
#include <common>

uniform vec3 iResolution;
uniform float iTime;
uniform sampler2D iChannel0;

// By Daedelus: https://www.shadertoy.com/user/Daedelus
// license: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
#define TIMESCALE 0.25 
#define TILES 8
#define COLOR 0.7, 1.6, 2.8

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
  vec2 uv = fragCoord.xy / iResolution.xy;
  uv.x *= iResolution.x / iResolution.y;
  
  vec4 noise = texture2D(iChannel0, floor(uv * float(TILES)) / float(TILES));
  float p = 1.0 - mod(noise.r + noise.g + noise.b + iTime * float(TIMESCALE), 1.0);
  p = min(max(p * 3.0 - 1.8, 0.1), 2.0);
  
  vec2 r = mod(uv * float(TILES), 1.0);
  r = vec2(pow(r.x - 0.5, 2.0), pow(r.y - 0.5, 2.0));
  p *= 1.0 - pow(min(1.0, 12.0 * dot(r, r)), 2.0);
  
  fragColor = vec4(COLOR, 1.0) * p;
}

varying vec2 vUv;

void main() {
  mainImage(gl_FragColor, vUv * iResolution.xy);
}
// 通过上面的vUv 由物体大小来决定，而不是 用gl_FragCoord 由渲染面积决定
//void main() {
// mainImage(gl_FragColor, gl_FragCoord.xy);
//}
`;


const ctx = document.createElement("canvas").getContext("2d");
const len = 10;
ctx.canvas.height = len;
ctx.canvas.width = len;

// 随机数生成 随机灰度的躁声图
function generateGray(ctx) {
  for (let height = 0; height < ctx.canvas.height; height++) {
    for (let width = 0; width < ctx.canvas.width; width++) {
      const r  = Math.random();
      ctx.fillStyle = `rgb(
        ${Math.floor(255  * r)},
        ${Math.floor(255  * r)},
        ${Math.floor(255  * r)})`;
      ctx.fillRect(height,width, 1, 1);
    }
  }
}
generateGray(ctx);

const texture = new THREE.CanvasTexture(ctx.canvas);
// 放到document里看躁声图，以供调试观察
document.body.appendChild( ctx.canvas );


texture.minFilter = THREE.NearestFilter;
texture.magFilter = THREE.NearestFilter;
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
const uniforms = {
  iTime: { value: 0 },
  iResolution:  { value: new THREE.Vector3() },
  iChannel0: { value: texture },
};
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms,
});
material.side = THREE.DoubleSide;
const plane = new THREE.Mesh(planeGeo, material);
scene.add(plane);



const animate = function (time) {
  time *= 0.001;  // convert to seconds
  // const canvas = renderer.domElement;
  // uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
  uniforms.iResolution.value.set(200, 200, 1);
  uniforms.iTime.value = time;

  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  stats.update();
};

animate();





