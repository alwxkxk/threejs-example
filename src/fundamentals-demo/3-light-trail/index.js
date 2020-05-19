import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {interpolateHsl} from "d3-interpolate";
import TWEEN from "@tweenjs/tween.js";

// bloom
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

const scene = window.debugScene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

// NOTE：camera 坐标不能全为0，否则OrbitControls异常，无法移动视觉
camera.position.x = 500;
camera.position.z = 100;
camera.position.y = 50;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

new OrbitControls( camera, renderer.domElement );
const light = new THREE.HemisphereLight( 0xffffff, 0xcccccc, 1 );
scene.add( light );

// bloom效果
const renderScene = new RenderPass( scene, camera );
const bloomPass  = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass .threshold = 0.3;
bloomPass .strength = 2;
bloomPass .radius = 0.3;
const bloomComposer = new EffectComposer( renderer );
bloomComposer.addPass( renderScene );
bloomComposer.addPass( bloomPass  );

// 生成曲线
const startVec = new THREE.Vector3(500,0,0);
const controlVec = new THREE.Vector3(-400,0,20);
const endVec = new THREE.Vector3(-500,0,300);
const curve = new THREE.QuadraticBezierCurve3(startVec,controlVec,endVec);

const geometry = new THREE.TubeBufferGeometry( curve, 20, 2, 8, false );
// 使用顶点颜色 VertexColors
const material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors,side: THREE.BackSide } );

// 生成渐变色的color数组
const count = geometry.attributes.position.count;
const rgbInterpolate = interpolateHsl("#00ffff", "#002222");
const colorArray = new Array(count);
for (let index = 0; index < count; index++) {
  const t = index / count;
  const rgb = rgbInterpolate(t);
  const rgbValue = rgb.match(/\d+/g);
  // 从 "rgb(1,2,3)" 字符串里 提取出 1,2,3 并 归一化（ 0.0 ~ 1.0）
  const r = Number(rgbValue[0]) / 255;
  const g = Number(rgbValue[1]) / 255;
  const b = Number(rgbValue[2]) / 255;

  colorArray[3 * index] =  r;
  colorArray[3 * index + 1] = g;  
  colorArray[3 * index + 2] =  b;
}
geometry.setAttribute( "color", new THREE.Float32BufferAttribute( colorArray, 3 ) );

const mesh = new THREE.Mesh( geometry, material);
scene.add( mesh );

// 颜色变化
function lightMove() {
  new TWEEN.Tween({value:0})
  .to({value:1}, 1000)
  .onUpdate(function (val) {
    // 实现环状数组变化
    const anchor = Number((val.value * count).toFixed(0));
    const b = colorArray.slice(anchor * 3);
    const f = colorArray.slice(0, anchor * 3);
    const newColorArray = [].concat(b, f) ;
    mesh.geometry.setAttribute( "color", new THREE.Float32BufferAttribute( newColorArray, 3 ) );
  })
  .start();
}

setInterval(() => {
  lightMove();
}, 1000);

const animate = function () {
  TWEEN.update();
  // renderer.render( scene, camera );
  bloomComposer.render();
  requestAnimationFrame( animate );

};
animate();





