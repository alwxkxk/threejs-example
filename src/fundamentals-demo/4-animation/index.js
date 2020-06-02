import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(5,5,5);

const clock = new THREE.Clock();
let mixer = null; // 存放动画的mixer

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


new OrbitControls( camera, renderer.domElement );
const light = new THREE.HemisphereLight( 0xffffff, 0xcccccc, 1 );
scene.add( light );

const animate = function () {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  if(mixer){
    // 执行动画
    const delta = clock.getDelta();
    mixer.update( delta );
  }
};

const loader = new GLTFLoader();
loader.load( "./static/3d/4-animation.glb", function ( gltf ) {
  console.log("load gltf file:",gltf);

  scene.add( gltf.scene );
  console.log("scene",scene);
  
  const cube = scene.getObjectByName("Cube");
  // 创建mixer
  mixer = new THREE.AnimationMixer( cube );
  const clipAction = mixer.clipAction( gltf.animations[0] );
  clipAction.play();

  animate();

} );




