import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const orbit = new OrbitControls( camera, renderer.domElement );
camera.position.set(4.5,1,-2);
orbit.update();


const animate = function () {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
};

const loader = new GLTFLoader();

// 由于fresnel需要normal来进行计算，所以模型导出时必须带有normal。
loader.load( "./static/3d/Horse.glb", function ( gltf ) {
  document.getElementById("loadingText").style.display = "none";
  console.log("load gltf file:",gltf);
  const horse = gltf.scene.children[0];
  horse.scale.set(0.01,0.01,0.01);

  const list = [...gltf.scene.children];
  list.forEach(item=>{
    changeMat(item);
  });
  scene.add( horse );

  animate();

});



const vertexShader = `
varying vec3 vNormal;
varying vec3 vPositionNormal;
void main() 
{
  vNormal = normalize( normalMatrix * normal ); // 转换到视图空间
  vPositionNormal = normalize(( modelViewMatrix * vec4(position, 1.0) ).xyz);
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const fragmentShader=`
uniform vec3 glowColor;
uniform float b;
uniform float p;
uniform float s;
varying vec3 vNormal;
varying vec3 vPositionNormal;
void main() 
{
  float a = pow( b + s * abs(dot(vNormal, vPositionNormal)), p );
  gl_FragColor = vec4( glowColor, a );
}
`;

var customMaterial = new THREE.ShaderMaterial({
  uniforms: 
  { 
    "s":   { type: "f", value: -1.0},
    "b":   { type: "f", value: 1.0},
    "p":   { type: "f", value: 2.0 },
    glowColor: { type: "c", value: new THREE.Color(0x00ffff) }
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  side: THREE.FrontSide,
  blending: THREE.AdditiveBlending,
  transparent: true
});

function changeMat(object3d){
  object3d.traverse(item=>{
    if(item.material){
      item.material = customMaterial;
    }
  });
}
