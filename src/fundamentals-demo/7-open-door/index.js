import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import TWEEN from "@tweenjs/tween.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const raycaster = new THREE.Raycaster();
const raycasterObjects = [];

const orbit = new OrbitControls( camera, renderer.domElement );
const light = new THREE.HemisphereLight( 0xffffff, 0xcccccc, 1 );
scene.add( light );
// NOTE：camera 坐标不能全为0，否则OrbitControls异常，无法移动视觉
camera.position.x = 2;
orbit.update();

const animate = function () {
  TWEEN.update();
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
};

const loader = new GLTFLoader();
let door = null;
loader.load( "./static/3d/7-open-door.glb", function ( gltf ) {
  console.log("load gltf file:",gltf);

  scene.add( gltf.scene );
  console.log("scene",scene);
  door = scene.getObjectByName("door");
  // 将门 放入可被检测点击的列表中
  raycasterObjects.push(door);

  animate();

} );

function triggerDoor() {
  // 开关门动作
    if(door.userData.openFlag){
      new TWEEN.Tween(door.rotation)
      .to({x:0,y:0,z:0}, 1000)
      .onUpdate(function (val) {
        door.rotation.set(val.x || 0, val.y || 0, val.z || 0);
      })
      .start();
    }else{
      new TWEEN.Tween(door.rotation)
      .to({x:0,y:Math.PI/2,z:0}, 1000)
      .onUpdate(function (val) {
        door.rotation.set(val.x || 0, val.y || 0, val.z || 0);
      })
      .start();
    }
    door.userData.openFlag = !door.userData.openFlag;
}

const mouse = new THREE.Vector2();
function onMouseClick(event) {
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  // raycaster 检测指向哪个物体
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(raycasterObjects);
  if(intersects.length>0){
    // 门被检测到
    triggerDoor();
  }
}

window.addEventListener( "click", onMouseClick, false );






