import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {interpolateHsl} from "d3-interpolate";
import TWEEN from "@tweenjs/tween.js";

const scene = window.debugScene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


new OrbitControls( camera, renderer.domElement );
const light = new THREE.HemisphereLight( 0xffffff, 0xcccccc, 1 );
scene.add( light );
// NOTE：camera 坐标不能全为0，否则OrbitControls异常，无法移动视觉
camera.position.z = 200;
camera.position.y = 30;



// 生成曲线
const startVec = new THREE.Vector3(500,0,0);
const controlVec = new THREE.Vector3(-400,0,20);
const endVec = new THREE.Vector3(-500,0,300);
const curve = new THREE.QuadraticBezierCurve3(startVec,controlVec,endVec);

var geometry = new THREE.TubeBufferGeometry( curve, 20, 2, 8, false );
// 使用顶点颜色 VertexColors
var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );

// 生成渐变色的color数组
const count = geometry.attributes.position.count;
const rgbInterpolate = interpolateHsl("#00ffff", "#002222");
const colorArray = new Array(count);
for (let index = 0; index < count; index++) {
  const t = index / count;
  const rgb = rgbInterpolate(t);
  const rgbValue = rgb.match(/\d+/g);

  const r = Number(rgbValue[0]) / 255;
  const g = Number(rgbValue[1]) / 255;
  const b = Number(rgbValue[2]) / 255;

  colorArray[3 * index] =  r;
  colorArray[3 * index + 1] = g;  
  colorArray[3 * index + 2] =  b;
}
geometry.addAttribute( "color", new THREE.Float32BufferAttribute( colorArray, 3 ) );

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
    mesh.geometry.addAttribute( "color", new THREE.Float32BufferAttribute( newColorArray, 3 ) );
  })
  .start();
}

setInterval(() => {
  lightMove();
}, 1200);

const animate = function () {
  TWEEN.update();
  renderer.render( scene, camera );
  requestAnimationFrame( animate );

};
animate();





