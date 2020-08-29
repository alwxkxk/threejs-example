import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import TWEEN from "@tweenjs/tween.js";

// outline postprocessing
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";


const scene = new THREE.Scene();
  
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
const raycaster = new THREE.Raycaster();
const itemList = []; // 存放raycaster检测对象
const mouse = new THREE.Vector2( 1, 1 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const orbit = new OrbitControls( camera, renderer.domElement );
const light = new THREE.HemisphereLight( 0xffffff, 0xcccccc, 1 );
scene.add( light );

camera.position.set(-10,5,20);
orbit.update();

// outline 
const composer = new EffectComposer( renderer );

const renderPass = new RenderPass( scene, camera );
composer.addPass( renderPass );
const outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera );
outlinePass.edgeStrength = 5;
outlinePass.edgeGlow = 3;
outlinePass.visibleEdgeColor.set("#ff0000");
outlinePass.hiddenEdgeColor.set("#ff0000");
composer.addPass( outlinePass );
const effectFXAA = new ShaderPass( FXAAShader );
effectFXAA.uniforms[ "resolution" ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
composer.addPass( effectFXAA );

const animate = function () {
  TWEEN.update();
  composer.render();
  requestAnimationFrame( animate );
  // renderer.render( scene, camera );
};
animate();

const geometry = new THREE.BoxGeometry( 2, 2, 2 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );


const coneGeometry = new THREE.ConeGeometry( 2, 4, 12 );
const coneMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const cone = new THREE.Mesh( coneGeometry, coneMaterial );
cone.position.set(5,5,5);
scene.add( cone );



const icosahedronGeometry = new THREE.IcosahedronGeometry( 2 );
const icosahedronMaterial = new THREE.MeshBasicMaterial( {color: 0x00ffff} );
const icosahedron = new THREE.Mesh( icosahedronGeometry, icosahedronMaterial );
icosahedron.position.set(-8,-8,0);
scene.add( icosahedron );

itemList.push(cube);
itemList.push(cone);
itemList.push(icosahedron);

// 滑过物体时显示 边缘高亮
function onMouseMove( event ) {

  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersection = raycaster.intersectObjects( itemList );
  if(intersection.length>0){
    outlinePass.selectedObjects = [intersection[0].object];
  }

}

document.addEventListener( "mousemove", onMouseMove, false );

// 双击时聚焦物体
function onClick(event) {
  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersection = raycaster.intersectObjects( itemList );
  if(intersection.length>0){
    focus(intersection[0].object);
  }
}

document.addEventListener( "dblclick", onClick, false );

const box = new THREE.Box3();
const delta = new THREE.Vector3();
const center = new THREE.Vector3();
const sphere = new THREE.Sphere();
// 聚焦靠近
function focus ( target ) {
  
  var distance;

  box.setFromObject( target );
  // 计算物体的大小
  if ( box.isEmpty() === false ) {

    box.getCenter( center );
    distance = box.getBoundingSphere( sphere ).radius;

  } else {

    // Focusing on an Group, AmbientLight, etc

    center.setFromMatrixPosition( target.matrixWorld );
    distance = 0.1;

  }
  // 物体中心位置 再加上其 4倍大小作为间距，得到摄像头新位置
  delta.set( 0, 0, 1 );
  delta.applyQuaternion( camera.quaternion );
  delta.multiplyScalar( distance * 4 );
  // 摄像头从原位置 到新位置
  const cameraStart = camera.position.clone();
  const cameraEnd = center.add( delta );
  // orbit 从原目标位置 到新目标位置，新目标为所聚焦的物体。
  const orbitStart = orbit.target.clone();
  const orbitEnd = target.position.clone();

  const start = {
    cameraX:cameraStart.x,
    cameraY:cameraStart.y,
    cameraZ:cameraStart.z,
    orbitX:orbitStart.x,
    orbitY:orbitStart.y,
    orbitZ:orbitStart.x,
  };

  const end = {
    cameraX:cameraEnd.x,
    cameraY:cameraEnd.y,
    cameraZ:cameraEnd.z,
    orbitX:orbitEnd.x,
    orbitY:orbitEnd.y,
    orbitZ:orbitEnd.x,
  };

  const position = target.position;
  orbit.target.set(position.x || 0.01,position.y|| 0.01,position.z|| 0.01);
  new TWEEN.Tween(start)
  .to(end, 1000)
  .onUpdate(function (val) {
    // 改变摄像头位置
    camera.position.set(val.cameraX || 0, val.cameraY || 0, val.cameraZ || 0);
    // 改变orbit 目标位置
    orbit.target.set(val.orbitX || 0,val.orbitY|| 0,val.orbitZ|| 0);
    orbit.update();
  })
  .start();
}



