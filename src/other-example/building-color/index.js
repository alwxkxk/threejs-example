import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "three/examples/jsm/libs/dat.gui.module";

// webgl 灯光教程
// https://www.youtube.com/watch?v=YLHjX2bIOYc

// webgl灯光
// https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Lighting_in_WebGL

// three.js是如何拿到外部灯光信息的颜色与坐标
// https://csantosbh.wordpress.com/2014/01/09/custom-shaders-with-three-js-uniforms-textures-and-lighting/

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 100000 );
camera.position.z = 60;
camera.position.y = 30;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let orbit = new OrbitControls( camera, renderer.domElement );

// light 参数可调整。
const lightParams = {
  skyColor:0xffffbb,
  groundColor:0x080820,
  color: 0xffffff,
};

const hemisphereLight = new THREE.HemisphereLight( lightParams.skyColor,  lightParams.groundColor, 1 );
scene.add( hemisphereLight );



const directionalLight = new THREE.DirectionalLight(0x00cccc, 0.2);
directionalLight.position.set(-30, 40, 20);
scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight, 5 );
scene.add(directionalLightHelper);

// const topDirectionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
// topDirectionalLight.position.set(0, 50, 0);
// scene.add(topDirectionalLight);
// const topDirectionalLightHelper = new THREE.DirectionalLightHelper( topDirectionalLight, 5 );
// scene.add(topDirectionalLightHelper);

const vertexShader = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  void main() 
  {
    // TODO: normalMatrix 与 normal值的研究
    vNormal = normalize( normalMatrix * normal );
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    vPosition = position;
  }
`;


// 灯光效果
const fragmentShader=`
// 变量声明要在函数外面
varying vec3 vPosition;
uniform vec3 fillColor;
uniform float splitValue;
uniform float splitValue2;
varying vec3 vNormal;

// 拿外部传入的方向光
struct DirectionalLight {
  vec3 direction;
  vec3 color;
};
uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];

void main() {
  
  vec3 septColor;

  // 颜色分层，下层颜色取更暗的颜色。
  if(vPosition.y> splitValue ){
    septColor = fillColor;
  }else if(vPosition.y> splitValue2){
    float multi = 0.5 + 0.5 * ((vPosition.y-splitValue2) / (splitValue-splitValue2));
    septColor =  vec3(fillColor[0]*multi,fillColor[1]*multi,fillColor[2]*multi);
  }else{
    float multi = 0.45;
    septColor =  vec3(fillColor[0]*multi,fillColor[1]*multi,fillColor[2]*multi);
  }

  // 法向量
  vec3 normal = normalize( vNormal );

  
  // NOTE:只拿一个方向光的效果来进行计划。
  // TODO: 还要解决物体本身颜色与灯光的叠加问题（RE_Direct）
  vec3 directionalVector = directionalLights[0].direction;
  float directional = max(dot(normal.xyz, directionalVector), 0.0);
  vec3 directionalLightColor = directionalLights[0].color;
  vec3 vLighting = septColor + (directionalLightColor * directional);
  gl_FragColor = vec4( vLighting, 1.0 );
}
`;
const changeObj = {splitValue:3,splitValue2:-3,fillColor:"#233090"};
const uniforms = THREE.UniformsUtils.merge( [
  THREE.ShaderLib[ "phong" ].uniforms,
  { 
    splitValue:{ type: "f", value: changeObj.splitValue},//分割值，Y轴坐标
    splitValue2:{ type: "f", value: changeObj.splitValue2},//分割值，Y轴坐标
    fillColor: { type: "c", value: new THREE.Color(changeObj.fillColor) },
  }
] );
const customMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    side:THREE.DoubleSide,
    fragmentShader: fragmentShader,
    lights:true //使用外部light必须声明，且uniforms要包含所有灯光的声明，所以要使用THREE.UniformsUtils.merge
  });
  

const boxGet = new THREE.BoxGeometry( 1,10,1);
const box = new THREE.Mesh( boxGet,customMaterial );
box.position.set(0,0,0);
scene.add( box );

for (let i = -12; i<12;i++) {
  const cloneBox = box.clone();
  cloneBox.position.set(i*(1.3+Math.random()),0,Math.random());
  const cloneBox2 = box.clone();
  cloneBox2.position.set(i*(1.5+Math.random()),0,1.8+Math.random());
  scene.add( cloneBox );
  scene.add( cloneBox2 );
}

const animate = function () {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );

  if(orbit){
    orbit.update();
  }
  
};

animate();


// 添加gui
const gui = new dat.GUI();
const splitValueControl = gui.add(changeObj, "splitValue", -5, 5);
const splitValue2Control = gui.add(changeObj, "splitValue2", -5, 5);
splitValueControl.onChange( (v)=>{
    customMaterial.uniforms.splitValue.value = v;
  });
splitValue2Control.onChange( (v)=>{
customMaterial.uniforms.splitValue2.value = v;
});
const fillColorControl = gui.addColor(changeObj, "fillColor");
fillColorControl.onChange( (v)=>{
customMaterial.uniforms.fillColor.value.set(v);
});







