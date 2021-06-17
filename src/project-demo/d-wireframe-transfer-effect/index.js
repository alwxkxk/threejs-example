import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const clock = new THREE.Clock();
let mixer = null; // 存放动画的mixer
let mixer2 = null;


const orbit = new OrbitControls( camera, renderer.domElement );
const light = new THREE.HemisphereLight( 0xffffff, 0xcccccc, 1 );
scene.add( light );
// NOTE：camera 坐标不能全为0，否则OrbitControls异常，无法移动视觉

camera.position.set(4.5,1,-2);
// console.log('camera',camera)
orbit.update();

const animate = function () {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  const delta = clock.getDelta();
  if(mixer){
    // 执行动画
    mixer.update( delta );
  }
  if(mixer2){
    // 执行动画2
    mixer2.update( delta );
  }
};


const loader = new GLTFLoader();
loader.load( "./static/3d/Horse.glb", function ( gltf ) {
  const horse = gltf.scene.children[0];
  horse.scale.set(0.01,0.01,0.01);

  const horse2 = horse.clone();
  horse2.material = horse.material.clone();

  horse.material.depthWrite = false;
  horse.material.transparent = true;


  // horse2.position.set(1,0,0)
  horse2.scale.set(0.0099,0.0099,0.0099);
  horse2.material.depthFunc = THREE.GreaterDepth;
  horse2.material.wireframe = true;
  horse2.material.transparent = true;

  scene.add( horse );
  scene.add( horse2 );
  // 利用不同的深度计算方法来实现类型于blender里的boolean效果，但并非所有角度都可行。
  const cubeGeometry = new THREE.BoxGeometry( 3, 6, 2 );
  const maskMaterial = new THREE.MeshBasicMaterial({color:0x000000});
  maskMaterial.opacity = 0;
  // maskMaterial.opacity = 0.2
  const maskCube = new THREE.Mesh( cubeGeometry,maskMaterial );
  maskCube.position.set(0,0,5);
  scene.add( maskCube );

  setInterval(() => {
    maskCube.position.z -= 0.1;
    if(maskCube.position.z<-3){
      maskCube.position.z = 5;
    }
  }, 50);
  console.log("scene",scene);

  // 创建mixer
  mixer = new THREE.AnimationMixer( horse );
  mixer2 = new THREE.AnimationMixer( horse2 );
  console.log(mixer,mixer2);
  const clipAction = mixer.clipAction( gltf.animations[0] );
  clipAction.play();
  const clipAction2 = mixer2.clipAction( gltf.animations[0] );
  clipAction2.play();
  animate();

} );




