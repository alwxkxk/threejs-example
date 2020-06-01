import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {interpolateHsl} from "d3-interpolate";
import TWEEN from "@tweenjs/tween.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
// bloom
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(1.61,2.05,2.47);

const clock = new THREE.Clock();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const stats = new Stats();
document.body.appendChild( stats.dom );

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


const animate = function () {
  const delta = clock.getDelta();
  TWEEN.update();
  animateList.forEach(mixer=>{
    mixer.update( delta );
  });
  stats.update();
  bloomComposer.render();
  requestAnimationFrame( animate );
};
const animateList = [];
const loader = new GLTFLoader();
loader.load( "./static/3d/b-city.glb", function ( gltf ) {
  console.log("load gltf file:",gltf);

  scene.add( gltf.scene );
  // console.log("scene",scene,gltf);
  // window.scene = scene;
  
  const list = [...scene.children[1].children];
  list.forEach(item=>{
    change2BasicMat(item);
  });

  const roadNum = 4;
  for(let i = 1;i<=roadNum;i++){
    const name = `road${i?"00"+i:""}`;
    const road = scene.getObjectByName(name);
    change2LightTrail(road);
  }

  const elevatorList = ["Elevator","Elevator001"];
  elevatorList.forEach((item,index)=>{
    const elevator = scene.getObjectByName(item);
    const mesh = change2LightBox(elevator);
    // 创建Animation
    const mixer = new THREE.AnimationMixer( mesh );
    const clipAction = mixer.clipAction( gltf.animations[index] );
    clipAction.play();
    animateList.push(mixer);
  });

  animate();

} );


const basicMat = new THREE.MeshBasicMaterial({
  opacity: 0.25 ,
  color:0x1f56b9,
  side: THREE.BackSide,
  transparent: true,
});

function change2BasicMat(object3d){
  object3d.traverse(item=>{
    if(item.material){
      item.material = basicMat;
    }
  });
}

function change2LightBox(object3d) {
  const group = new THREE.Group();
  const lineMaterial = new THREE.LineBasicMaterial({color: 0x00FFFF});
  const boxMaterial = new THREE.MeshBasicMaterial({
    opacity: 0.1 ,
    color:0x00cccc,
    side: THREE.BackSide,
    transparent: true,
  });
  const geo = new THREE.EdgesGeometry(object3d.geometry);
  const line = new THREE.LineSegments( geo , lineMaterial);
  const box = new THREE.Mesh(object3d.geometry, boxMaterial);

  group
  .add(line)
  .add(box);

  group.position.set(object3d.position.x,object3d.position.y,object3d.position.z);
  group.rotation.set(object3d.rotation.x,object3d.rotation.y,object3d.rotation.z);
  group.scale.set(object3d.scale.x,object3d.scale.y,object3d.scale.z);

  object3d.parent.add(group);
  object3d.visible = false;
  return group;

}

function change2LightTrail(object3d) {
  // 使用顶点颜色 VertexColors
  const material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors,side: THREE.BackSide } );
  const geometry = object3d.geometry.clone();
  // 生成渐变色的color数组
  const count = geometry.attributes.position.count;
  const rgbInterpolate = interpolateHsl("#00ffff", "#000000");
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

  const anchor = Number((Math.random() * count).toFixed(0));
  const b = colorArray.slice(anchor * 3);
  const f = colorArray.slice(0, anchor * 3);
  const newColorArray = [].concat(b, f) ;

  geometry.setAttribute( "color", new THREE.Float32BufferAttribute( newColorArray, 3 ) );
  const mesh = new THREE.Mesh( geometry, material);
  mesh.position.set(object3d.position.x,object3d.position.y,object3d.position.z);
  mesh.rotation.set(object3d.rotation.x,object3d.rotation.y,object3d.rotation.z);
  mesh.scale.set(object3d.scale.x,object3d.scale.y,object3d.scale.z);
  object3d.parent.add(mesh);
  setInterval(() => {
    lightMove(mesh,newColorArray);
  }, 2000);
}

  // 颜色变化
  function lightMove(mesh,colorArray) {
    const len = colorArray.length/3;
    new TWEEN.Tween({value:0})
    .to({value:1}, 2000)
    .onUpdate(function (val) {
      // 实现环状数组变化
      const anchor = Number((val.value * len).toFixed(0));
      const b = colorArray.slice(anchor * 3);
      const f = colorArray.slice(0, anchor * 3);
      const newColorArray = [].concat(b, f) ;
      mesh.geometry.setAttribute( "color", new THREE.Float32BufferAttribute( newColorArray, 3 ) );
    })
    .start();
  }

