import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";




const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const orbit = new OrbitControls( camera, renderer.domElement );
const light = new THREE.HemisphereLight( 0xffffff, 0xcccccc, 1 );
scene.add( light );

camera.position.z = 100;
camera.position.y = 100;
orbit.update();

const material = new THREE.MeshBasicMaterial( { color: 0xcccccc } );


let cubeNum = 0;
function createCube() {

  const geometry = new THREE.BoxGeometry();
  const cube = new THREE.Mesh( geometry, material );
  cube.position.set(Math.random() * 100-50,Math.random() * 100-50,Math.random() * 100-50);
  scene.add( cube ); 
  cubeNum++;
}
createCube();

function createCubes(num){
  for (let index = 0; index < num; index++) {
    createCube();
  }
}


// 计算 fps
let prevTime  = ( performance || Date ).now();
let fps;
let frames  = 0; 
 function getFps(){
  const time = ( performance || Date ).now();
  frames ++; 
  if ( time >= prevTime + 1000 ) {
    fps =  ( frames * 1000 ) / ( time - prevTime );
    prevTime = time;
    frames = 0;
    // console.log(fps);
  }
 }
 

const animate = function () {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  getFps();
  if(fps>30){
    createCubes(10);
  }
};

animate();

setInterval(()=>{
  document.getElementById("fps").innerText = fps.toFixed(0);
  document.getElementById("cube-number").innerText = `${cubeNum / 10000}万`; 
},1000);




window.debugThis = {
  orbit:orbit,
  renderer:renderer,
};





