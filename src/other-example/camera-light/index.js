import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "three/examples/jsm/libs/dat.gui.module";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 100000 );
camera.position.z = 60;
camera.position.y = 30;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let orbit = new OrbitControls( camera, renderer.domElement );


// 默认暗灰色，一个方向灯
const ambientLight = new THREE.AmbientLight( 0x222222 );
scene.add( ambientLight );

const directionalLight = new THREE.DirectionalLight(0xaaaaaa, 0.5);
directionalLight.position.set(20, 20, 20);
scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight, 5 );
scene.add(directionalLightHelper);

const geometry = new THREE.TorusKnotGeometry( 10, 3, 200, 32 );
const mat = new THREE.MeshStandardMaterial();
const torusKnot = new THREE.Mesh( geometry,mat );
scene.add( torusKnot );

const boxGet = new THREE.BoxGeometry( 15,15,15);
const mat2 = new THREE.MeshStandardMaterial({color:0x0000cc});
const box = new THREE.Mesh( boxGet,mat2 );
box.position.set(40,0,0);
scene.add( box );

const camera2 = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 100000 );
camera2.position.z=15;
scene.add(camera2);
// const camera2Helper = new THREE.CameraHelper( camera2 );
// camera2Helper.update();
// scene.add( camera2Helper );


// spot light 参数可调整。
const spotLightParams = {
  color: 0xffffff,
  intensity: 1,
  distance: 50,
  angle: 1,
  penumbra: 1,
  decay: 1
};


const spotLight = new THREE.SpotLight( 
  spotLightParams.color,
  spotLightParams.intensity,
  spotLightParams.distance,
  spotLightParams.angle,
  spotLightParams.penumbra,
  spotLightParams.decay
 );
spotLight.position.copy(camera2.position);
scene.add( spotLight );
const spotLightHelper = new THREE.SpotLightHelper( spotLight);
scene.add( spotLightHelper );
let cameraNum = 1;


const animate = function () {
  requestAnimationFrame( animate );
  if(cameraNum === 1){
    renderer.render( scene, camera );
  }else{
    // camera2Helper.update();

    // 灯光始终与摄像头2同步位置
    spotLight.position.copy(camera2.position);
    spotLightHelper.update();

    renderer.render( scene, camera2 );
  }

  if(orbit){
    orbit.update();
  }
  
};

animate();

// 添加gui
const gui = new dat.GUI();

const intensityControl = gui.add(spotLightParams,"intensity",0.1);
const distanceControl = gui.add(spotLightParams,"distance",1);
const angleControl = gui.add(spotLightParams,"angle",0.1);
const penumbraControl = gui.add(spotLightParams,"penumbra",0.1);
const decayControl = gui.add(spotLightParams,"decay",0.1);
const colorControl = gui.addColor(spotLightParams,"color");

const changeParams = (key,val)=>{
  spotLight[key] = val;
  spotLightHelper.update();
};

intensityControl.onChange(val=>changeParams("intensity",val));
distanceControl.onChange(val=>changeParams("distance",val));
angleControl.onChange(val=>changeParams("angle",val));
penumbraControl.onChange(val=>changeParams("penumbra",val));
decayControl.onChange(val=>changeParams("decay",val));
colorControl.onChange(v=>{
  spotLight.color.setHex(v);
});


document.getElementById("camera1-btn").addEventListener("click", ()=>{
    console.log("camera1-btn");
    if(orbit){
        orbit.dispose();
    }
    document.getElementById("camera1-btn").classList.add("btn-active");
    document.getElementById("camera2-btn").classList.remove("btn-active");
    orbit = new OrbitControls( camera, renderer.domElement );
    cameraNum = 1;
});

document.getElementById("camera2-btn").addEventListener("click", ()=>{
    console.log("camera2-btn");
    if(orbit){
        orbit.dispose();
    }
    document.getElementById("camera2-btn").classList.add("btn-active");
    document.getElementById("camera1-btn").classList.remove("btn-active");
    orbit = new OrbitControls( camera2, renderer.domElement );
    cameraNum = 2;
});






