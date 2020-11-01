import "../../echart-demo/line.js";
import "../../echart-demo/heatmap.js";
import "../../echart-demo/sankey.js";
import "../../echart-demo/parallel.js";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import TWEEN from "@tweenjs/tween.js";

// outline postprocessing
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";


const containerElement = document.getElementById("container-3d");

let clientWidth,clientHeight,offsetLeft,offsetTop; // 容器元素的高宽，以及左偏移值，顶偏移值
updateContainerElement();// 计算 容器元素 高宽，左偏移值，顶偏移值


const itemList = []; // 存放raycaster检测对象
const scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, clientWidth / clientHeight, 0.1, 1000 );
camera.position.set(1.61,2.05,2.47);

var renderer = new THREE.WebGLRenderer();
// 设置与容器元素相同大小
renderer.setSize( clientWidth, clientHeight );
containerElement.appendChild( renderer.domElement );

const orbit = new OrbitControls( camera, renderer.domElement );
const light = new THREE.HemisphereLight( 0xffffff, 0xcccccc, 1 );
scene.add( light );

// outline 
const composer = new EffectComposer( renderer );

const renderPass = new RenderPass( scene, camera );
composer.addPass( renderPass );

const outlinePass = new OutlinePass( new THREE.Vector2( clientWidth, clientHeight ), scene, camera );
outlinePass.edgeStrength = 5;
outlinePass.edgeGlow = 1;
outlinePass.pulsePeriod = 2;
outlinePass.visibleEdgeColor.set("#35f2d1");
outlinePass.hiddenEdgeColor.set("#00ffff");
composer.addPass( outlinePass );

const effectFXAA = new ShaderPass( FXAAShader );
effectFXAA.uniforms[ "resolution" ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
composer.addPass( effectFXAA );



const loader = new GLTFLoader();


loader.load( "./static/3d/c-datacenter.glb", function ( gltf ) {
  console.log("load gltf file:",gltf);
  scene.add( gltf.scene );
  console.log("scene",scene,gltf);
  window.scene = scene;

  scene.traverse(item=>{
    if(!item.name.includes("floor")){
      itemList.push(item);
    }
  });

  console.log("itemList",itemList);

  animate();

});

function getRack(object3d) {
  let p = object3d;
  while(!p.name.includes("rack")){
    p = p.parent;
  }
  return p;
}

// 设置机柜高亮
function setRackOutline(object3d) {
  const p = getRack(object3d);
  const rackBody = p.children.find(i=>i.name.includes("body"));
  outlinePass.selectedObjects = [rackBody];
}

function openRackDoor(object3d){
  const p = getRack(object3d);
  const door = p.children.find(i=>i.name.includes("door"));

    // 开关门动作
    if(!door.userData.openFlag){
      new TWEEN.Tween(door.rotation)
      .to({x:0,y:Math.PI/2,z:0}, 1000)
      .onUpdate(function (val) {
        door.rotation.set(val.x || 0, val.y || 0, val.z || 0);
      })
      .start();
    }
    door.userData.openFlag = true;
}

function getRackDoorOpenFlag(object3d) {
  const p = getRack(object3d);
  const door = p.children.find(i=>i.name.includes("door"));
  return !!door.userData.openFlag;
}


// 选中高亮
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2( 1, 1 );
const mousePosition = {
  x:0,
  y:0
};
function onMouseMove( event ) {
  event.preventDefault();
  mousePosition.x =event.clientX;
  mousePosition.y =event.clientY;

  mouse.x = ( (event.clientX-offsetLeft) / clientWidth ) * 2 - 1;
  mouse.y = - ( (event.clientY-offsetTop) / clientHeight ) * 2 + 1;

}



function onMouseCLick(event) {
  const mouse = new THREE.Vector2( 1, 1 );
  const mousePosition = {
    x:0,
    y:0
  };
  event.preventDefault();
  mousePosition.x =event.clientX;
  mousePosition.y =event.clientY;
  mouse.x = ( (event.clientX-offsetLeft) / clientWidth ) * 2 - 1;
  mouse.y = - ( (event.clientY-offsetTop) / clientHeight ) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersection = raycaster.intersectObjects( itemList );
  if(intersection.length>0){
    const object3d = intersection[0].object;
    // 如果没有开门就开机柜门
    if(!getRackDoorOpenFlag(object3d)){
      openRackDoor(object3d);
    }
    // console.log("onMouseCLick",intersection[0].object.name);
  }

}


document.addEventListener( "mousemove", onMouseMove, false );
document.addEventListener( "click", onMouseCLick, false );

const animate = function () {
  TWEEN.update();
  raycaster.setFromCamera(mouse, camera);
  const intersection = raycaster.intersectObjects( itemList );
  if(intersection.length>0){
    // console.log("intersection",intersection.map(i=>i.object.name));

    // 给选中的物体 设置outline效果
    if(intersection[0].object.name.includes("door")){
      setRackOutline(intersection[0].object);
    }else{
      // console.log("intersection[0].object",intersection[0].object.name);
      outlinePass.selectedObjects = [intersection[0].object];
      

    }

  }else{
    outlinePass.selectedObjects = [];
  }

  composer.render();
  requestAnimationFrame( animate );
};


function updateContainerElement() {
  // 计算 容器元素 高宽，左偏移值，顶偏移值
  clientWidth = containerElement.clientWidth;
  clientHeight = containerElement.clientHeight;
  const rect = containerElement.getBoundingClientRect();
  offsetLeft = rect.left;
  offsetTop = rect.top;
}



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


function resize() {
  updateContainerElement();
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(clientWidth, clientHeight);
}

window.addEventListener("resize", resize);