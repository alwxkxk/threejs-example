import * as THREE from "three";
import {lineModel} from "../common.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
      
window.THREE = THREE;

const scene =window.scene= new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000 );
var gui = new GUI();

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const stats = new Stats();
document.body.appendChild( stats.dom );
camera.position.z = 1000;
const controls = new OrbitControls( camera, renderer.domElement );

// model
var loader = new FBXLoader();
loader.load( "/static/3d/building-1.fbx", function ( object ) {
  scene.add( object );
  initBloom();

  // const buildingB = scene.getObjectByName("building_B");
  // const m1 = buildingA.material;
  // m1.color = new THREE.Color(48/255,78/255,124/255);
  // m1.transparent = true;
  // m1.opacity = 0.5;
  // const buildingALine = lineModel(buildingA,{color:0x304E7C,opacity:0});
  // const buildingBLine = lineModel(buildingB,{color:0x304E7C,boxColor:0x304E7C,opacity:0.2});

  // buildingA.parent.add(buildingALine);
  // buildingA.visible = false;

  // buildingB.parent.add(buildingBLine);
  // buildingB.visible = false;

  // const across1 = scene.getObjectByName("across_1");
  // const across1Line = lineModel(across1,{
  //   color:0x304E7C,
  //   boxColor:0x304E7C,
  //   opacity:0.8,
  //   depthTest:false,
  //   depthWrite:false,
  // });
  // across1.parent.add(across1Line);
  // across1.visible = false;

  // const across2 = scene.getObjectByName("across_2");
  // const across2Line = lineModel(across2,{
  //   color:0x304E7C,
  //   boxColor:0x304E7C,
  //   opacity:0.8,
  //   depthTest:false,
  //   depthWrite:false,
  // });
  // across2.parent.add(across2Line);
  // across2.visible = false;

  // const elevatorShaft2 = scene.getObjectByName("elevator_shaft_2");
  // elevatorShaft2.material =new THREE.MeshBasicMaterial({
  //   opacity: 0.6 ,
  //   color:0x304E7C,
  //   transparent: true,
  //   depthTest: false,
  //   depthWrite: false,
  // });
  

  // const light = new THREE.DirectionalLight(0xffffff, 0.5 );
  // light.position.z = 1000;
  // light.position.y = 100;
  // scene.add(light);
} );

scene.add( new THREE.HemisphereLight( 0xffffff, 0xcccccc, 1 ) );
// scene.add( new THREE.PointLight( 0xffffff) );
// scene.add( new THREE.AmbientLight( 0xffffff ) );


// bloom
var ENTIRE_SCENE = 0, BLOOM_SCENE = 1;

var bloomLayer = new THREE.Layers();
bloomLayer.set( BLOOM_SCENE );

var params = {
  exposure: 0.7,
  bloomStrength: 5,
  bloomThreshold: 0,
  bloomRadius: 1,
  scene: "Scene with Glow"
};
var renderScene = new RenderPass( scene, camera );
var bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;

var bloomComposer = new EffectComposer( renderer );
bloomComposer.renderToScreen = false;
bloomComposer.addPass( renderScene );
bloomComposer.addPass( bloomPass );

var finalPass = new ShaderPass(
  new THREE.ShaderMaterial( {
    uniforms: {
      baseTexture: { value: null },
      bloomTexture: { value: bloomComposer.renderTarget2.texture }
    },
    vertexShader: document.getElementById( "vertexshader" ).textContent,
    fragmentShader: document.getElementById( "fragmentshader" ).textContent,
    defines: {}
  } ), "baseTexture"
);
finalPass.needsSwap = true;

var finalComposer = new EffectComposer( renderer );
finalComposer.addPass( renderScene );
finalComposer.addPass( finalPass );

var folder = gui.addFolder( "Bloom Parameters" );
renderer.toneMappingExposure = Math.pow( params.exposure, 4.0 );
folder.add( params, "exposure", 0.1, 2 ).onChange( function ( value ) {

  renderer.toneMappingExposure = Math.pow( value, 4.0 );
  render();

} );

folder.add( params, "bloomThreshold", 0.0, 1.0 ).onChange( function ( value ) {

  bloomPass.threshold = Number( value );
  render();

} );

folder.add( params, "bloomStrength", 0.0, 10.0 ).onChange( function ( value ) {

  bloomPass.strength = Number( value );
  render();

} );

folder.add( params, "bloomRadius", 0.0, 1.0 ).step( 0.01 ).onChange( function ( value ) {

  bloomPass.radius = Number( value );
  render();

} );

var darkMaterial = new THREE.MeshBasicMaterial( { color: "black" } );
var materials = {};

function initBloom(){
  const body = scene.getObjectByName("主体");
  body.material.opacity = 0.5;

  const shaft1 = scene.getObjectByName("电梯坚井1");
  shaft1.material.depthTest = false;
  shaft1.material.depthWrite = false;
  shaft1.material.opacity = 0.4;
  shaft1.layers.enable(1);

  const shaft2 = scene.getObjectByName("电梯坚井2");
  shaft2.layers.enable(1);

  const elevator1 = scene.getObjectByName("电梯1");
  elevator1.material.depthTest = false;
  elevator1.material.depthWrite = false;
  elevator1.layers.enable(1);

  const elevator2 = scene.getObjectByName("电梯2");
  elevator2.layers.enable(1);

  const floor1 = scene.getObjectByName("楼层1");
  floor1.material.depthTest = false;
  floor1.material.depthWrite = false;
  floor1.layers.enable(1);
  const floor2 = scene.getObjectByName("楼层2");
  floor2.layers.enable(1);
}

function darkenNonBloomed( obj ) {

  if ( obj.isMesh && bloomLayer.test( obj.layers ) === false ) {

    materials[ obj.uuid ] = obj.material;
    obj.material = darkMaterial;

  }

}

function restoreMaterial( obj ) {

  if ( materials[ obj.uuid ] ) {

    obj.material = materials[ obj.uuid ];
    delete materials[ obj.uuid ];

  }

}


// render
const render = function () {
  // renderer.render( scene, camera );
  // camera.layers.set( BLOOM_SCENE );
  scene.traverse( darkenNonBloomed );
  bloomComposer.render();
  scene.traverse( restoreMaterial );
  // camera.layers.set( ENTIRE_SCENE );
  finalComposer.render();
  stats.update();
};

const animate = function () {
  requestAnimationFrame( animate );
  render();
};

animate();



