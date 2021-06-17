import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
  
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
const raycaster = new THREE.Raycaster();

const intersectList = [];

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const orbit = new OrbitControls( camera, renderer.domElement );
const light = new THREE.HemisphereLight( 0xffffff, 0xcccccc, 1 );
scene.add( light );

camera.position.set(-10,5,20);
orbit.update();


const animate = function () {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
};
animate();

//两种材质，一红一绿
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00,opacity:0.4,transparent:true} );
const material2 = new THREE.MeshBasicMaterial( {color: 0xff0000} );
const materials = [material,material2];

const geometry = new THREE.BoxGeometry( 2, 2, 2 );
const cube = new THREE.Mesh( geometry,new THREE.MeshBasicMaterial( {color: 0x0000ff} ) );


cube.material = materials;
cube.geometry.faces.forEach(face=>{
  face.materialIndex = 0; 
});
cube.geometry.faces[2].materialIndex = 1;
cube.geometry.faces[3].materialIndex = 1;
scene.add( cube );
intersectList.push(cube);


function onMouseCLick(event) {
  const mouse = new THREE.Vector2( 1, 1 );
  const mousePosition = {
    x:0,
    y:0
  };
  event.preventDefault();
  mousePosition.x =event.clientX;
  mousePosition.y =event.clientY;
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersection = raycaster.intersectObjects( intersectList );
  if(intersection.length>0){
    console.log("intersection[0]",intersection[0]);
    intersection[0].face.materialIndex = intersection[0].face.materialIndex?0:1;
    // 一面有两个三角形面，选择相邻的三角形面也一起变化
    const faces = intersection[0].object.geometry.faces;
    const faceIndex = intersection[0].faceIndex;
    const nextFace = faces[faceIndex%2?faceIndex-1:faceIndex+1];
    nextFace.materialIndex = nextFace.materialIndex?0:1;
    // 修改完后还要触发更新
    intersection[0].object.geometry.groupsNeedUpdate = true;
  }
}

document.addEventListener( "click", onMouseCLick, false );

