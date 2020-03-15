import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
const light = new THREE.HemisphereLight( 0xffffff, 0xcccccc, 1 );
scene.add( light );

camera.position.z = 5;

const animate = function () {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
};

const loader = new GLTFLoader();
loader.load( "./static/3d/1-model.glb", function ( gltf ) {
  console.log("load gltf file:",gltf);

  scene.add( gltf.scene );
  console.log("scene",scene);

  animate();

} );




