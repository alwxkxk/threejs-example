import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


new OrbitControls( camera, renderer.domElement );
const light = new THREE.HemisphereLight( 0xffffff, 0xcccccc, 1 );
scene.add( light );

camera.position.z = 60;

const vertices= [];
const move = [];
for(let i = 0;i<300;i++){
  vertices.push(Math.random()*100 - 50);
  move.push(Math.random() * 0.1 - 0.05);
}
const geometry = new THREE.BufferGeometry();
geometry.addAttribute( "position", new THREE.BufferAttribute( new Float32Array(vertices), 3 ) );
const pointsMaterial = new THREE.PointsMaterial( { size: 0.2, color: 0xffffff } );
const points = new THREE.Points( geometry, pointsMaterial );
scene.add(points);

console.log(scene);

const animate = function () {
  requestAnimationFrame( animate );
  let positions = points.geometry.attributes.position.array;
  positions.forEach((value,index)=>{
    positions[index] += move[index];
    if(positions[index]>50){
      positions[index] = -50;
    }else if(positions[index]>50){
      positions[index] = 50;
    }
  });
  points.geometry.attributes.position.needsUpdate = true;
  renderer.render( scene, camera );
};

animate();





