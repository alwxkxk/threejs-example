import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
// 修改成灰色背景
scene.background = new THREE.Color( 0xaaaaaa );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.x = -7;
camera.position.z = 7;
camera.position.y = 7;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

new OrbitControls( camera, renderer.domElement );
// 添加光源
const light = new THREE.HemisphereLight( 0xffffff,0xcccccc ); // soft white light
scene.add( light );

const spotLight1 = new THREE.SpotLight( 0xffffff );
spotLight1.position.set( 0, 15, 0 );
spotLight1.angle =0.6;
scene.add( spotLight1 );

const spotLight2 = new THREE.SpotLight( 0xffffff );
spotLight2.position.set( -1, 3, 10 );
spotLight2.angle =0.5;
scene.add( spotLight2 );

const spotLight3 = new THREE.SpotLight( 0xffffff );
spotLight3.position.set( -6, 9, -1 );
spotLight3.angle =1.3;
scene.add( spotLight3 );

const animate = function () {
  requestAnimationFrame( animate );
  TWEEN.update();
  renderer.render( scene, camera );
};



const loader = new GLTFLoader();
loader.load( "./static/3d/a-dismantling.glb", function ( gltf ) {

  scene.add( gltf.scene );
  console.log("scene",scene);

  animate();

} );

// 移动函数
function move(obj,position) {
  new TWEEN.Tween(obj.position)
      .to(position, 1000)
      .onUpdate(function (val) {
        obj.position.set(val.x || 0, val.y || 0, val.z || 0);
      })
      .start();
}

// 拆解按钮
document.getElementById("dismantling").onclick=()=>{
  move(scene.getObjectByName("Object_7"),{x:-5});
  move(scene.getObjectByName("Object_18"),{x:-5});

  move(scene.getObjectByName("Object_10"),{x:5});
  move(scene.getObjectByName("Object_11"),{x:5});
  move(scene.getObjectByName("Object_17"),{x:5});

  move(scene.getObjectByName("Object_27"),{z:5});
  move(scene.getObjectByName("Object_29"),{z:5});

  move(scene.getObjectByName("Object_14"),{z:-5});
  move(scene.getObjectByName("Object_16"),{z:-5});

  move(scene.getObjectByName("Object_28"),{y:2});
};

// 还原按钮
document.getElementById("recovery").onclick=()=>{
  move(scene.getObjectByName("Object_7"),{x:0});
  move(scene.getObjectByName("Object_18"),{x:0});

  move(scene.getObjectByName("Object_10"),{x:0});
  move(scene.getObjectByName("Object_11"),{x:0});
  move(scene.getObjectByName("Object_17"),{x:0});

  move(scene.getObjectByName("Object_27"),{z:0});
  move(scene.getObjectByName("Object_29"),{z:0});

  move(scene.getObjectByName("Object_14"),{z:0});
  move(scene.getObjectByName("Object_16"),{z:0});

  move(scene.getObjectByName("Object_28"),{y:0});
};




