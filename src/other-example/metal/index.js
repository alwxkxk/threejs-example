import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";

const params = {
    color: 0xcccccc,
    roughness: 0.4,
    metalness: 0.9,
    envMapIntensity:0.8
};



const stats = new Stats();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
document.body.appendChild(stats.dom);
// renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.toneMapping = THREE.ACESFilmicToneMapping;


new OrbitControls( camera, renderer.domElement );

const ambientLight = new THREE.AmbientLight( 0x000000 );
scene.add( ambientLight );

const directionalLight = new THREE.DirectionalLight(0xaaaaaa, 0.5);
directionalLight.position.set(20, 20, 20);
scene.add(directionalLight);

const light1 = new THREE.PointLight( 0xffffff, 1, 0 );
light1.position.set( 0, 200, 0 );
scene.add( light1 );

const light2 = new THREE.PointLight( 0xffffff, 1, 0 );
light2.position.set( 100, 200, 100 );
scene.add( light2 );

const light3 = new THREE.PointLight( 0xffffff, 1, 0 );
light3.position.set( - 100, - 200, - 100 );
scene.add( light3 );

camera.position.z = 60;

const geometry2 = new THREE.TorusKnotGeometry( 10, 3, 200, 32 );

// 加载纹理图
const roughnessMap = new THREE.TextureLoader().load("/static/img/texture/texture1.jpg");

// 将图片重复倍数
roughnessMap.wrapS = THREE.RepeatWrapping;
roughnessMap.wrapT = THREE.RepeatWrapping;
roughnessMap.repeat.set( 4, 4 );

//https://threejs.org/docs/index.html?q=stand#api/en/materials/MeshStandardMaterial
const mat = new THREE.MeshStandardMaterial({
    color:params.color,
    roughness:params.roughness,
    metalness:params.metalness,
    roughnessMap:roughnessMap,
    envMapIntensity:params.roughness.envMapIntensity
});

// 加载环境图片
// https://stackoverflow.com/questions/65974012/three-js-how-to-add-envmap-correctly
const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();
new THREE.TextureLoader().load("/static/img/texture/env.jpg",(envMap)=>{
    let exrCubeRenderTarget = pmremGenerator.fromEquirectangular(envMap);
    mat.envMap = exrCubeRenderTarget ? exrCubeRenderTarget.texture : null;
    mat.needsUpdate = true;
});
const torusKnot = new THREE.Mesh( geometry2,mat  );
scene.add( torusKnot );


const gui = new GUI();
gui.addColor( params, "color" );
gui.add( params, "roughness", 0, 1, 0.01 );
gui.add( params, "metalness", 0, 1, 0.01 );
gui.add( params, "envMapIntensity", 0, 1, 0.01 );
gui.open();

const animate = function () {
  requestAnimationFrame( animate );
  torusKnot.rotation.y += 0.01;
  mat.color.set(params.color);
  mat.roughness=params.roughness;
  mat.metalness=params.metalness;
  mat.envMapIntensity=params.envMapIntensity;

  renderer.render( scene, camera );
  stats.update();

};

animate();





