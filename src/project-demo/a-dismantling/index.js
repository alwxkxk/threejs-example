// 引入 echart 示例代码
// import "../../echart-demo/line.js";

import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// outline postprocessing
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";

const scene = new THREE.Scene();
const loader = new GLTFLoader();
const itemList = []; // 存放raycaster检测对象

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(-7,7,7);

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

new OrbitControls( camera, renderer.domElement );

// outline 
const composer = new EffectComposer( renderer );

const renderPass = new RenderPass( scene, camera );
composer.addPass( renderPass );

const outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera );
outlinePass.edgeStrength = 5;
outlinePass.edgeGlow = 1;
outlinePass.pulsePeriod = 2;
outlinePass.visibleEdgeColor.set("#35f2d1");
outlinePass.hiddenEdgeColor.set("#00ffff");
composer.addPass( outlinePass );

const effectFXAA = new ShaderPass( FXAAShader );
effectFXAA.uniforms[ "resolution" ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
composer.addPass( effectFXAA );

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


// 选中高亮并显示名称
//https://github.com/mrdoob/three.js/blob/master/examples/webgl_instancing_raycast.html
// https://threejs.org/examples/?q=outline#webgl_postprocessing_outline

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
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

document.addEventListener( "mousemove", onMouseMove, false );
const nameBox = document.getElementById("name-box");
const animate = function () {
  TWEEN.update();
  raycaster.setFromCamera(mouse, camera);
  const intersection = raycaster.intersectObjects( itemList );
  if(intersection.length>0){
    // console.log("intersection",intersection);
    // 给选中的物体 设置outline效果
    outlinePass.selectedObjects = [intersection[0].object];

    // 名称提示
    nameBox.innerHTML = intersection[0].object.name.replace("Object_","元件");
    nameBox.style.display = "block";
    nameBox.style.top = mousePosition.y;
    nameBox.style.left = mousePosition.x + 30;
  }else{
    outlinePass.selectedObjects = [];
    nameBox.style.display = "none";
  }
  composer.render();
  requestAnimationFrame( animate );
};





loader.load( "./static/3d/a-dismantling.glb", function ( gltf ) {
   
  scene.add( gltf.scene.children[0] );

  console.log("scene",scene);
  scene.traverse(item=>{
    itemList.push(item);
  });
  

  animate();

} );



