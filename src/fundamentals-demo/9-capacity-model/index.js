import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// https://github.com/dataarts/dat.gui/blob/master/API.md
import * as dat from "three/examples/jsm/libs/dat.gui.module";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


new OrbitControls( camera, renderer.domElement );
const light = new THREE.HemisphereLight( 0xffffff, 0xcccccc, 1 );
scene.add( light );
// NOTE：camera 坐标不能全为0，否则OrbitControls异常，无法移动视觉
camera.position.z = 5;

const animate = function () {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
};

const vertexShader = `
varying vec3 vPosition;
void main() 
{
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  vPosition = position;
}
`;

const fragmentShader=`
varying vec3 vPosition;
uniform vec3 fillColor;
uniform float splitValue;
void main() 
{
  // 如果Y轴坐标小于分割值，就填充色，小于这个值就取消渲染。
  if(vPosition.y> splitValue ){
    discard;
  }else{
    gl_FragColor = vec4( fillColor, 0.9 );
  }
}
`;

const color = "#8fcf1b";
var customMaterial = new THREE.ShaderMaterial({
  uniforms: 
  { 
    splitValue:{ type: "f", value: 0.0},//分割值，Y轴坐标
    fillColor: { type: "c", value: new THREE.Color(color) },
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader
});

// NOTE: 由于Torus是中间空心的，单纯的通过放大scale来造出container会导致中间空得更大，没法包含进去。
const geo = new THREE.TorusGeometry(1,0.4);
const mesh = new THREE.Mesh(geo, customMaterial);
const containerMaterial = new THREE.MeshBasicMaterial( { 
  color:"#ffffff",
  transparent:true,  
  opacity:0.15
} );
const containerGeo = new THREE.TorusGeometry(1,0.45);
const containerMesh = new THREE.Mesh(containerGeo, containerMaterial);
const box3 = new THREE.Box3();
const meshBox3 = box3.setFromObject(mesh);
const meshMaxY = meshBox3.max.y;
const meshMinY = meshBox3.min.y;
const group = new THREE.Group();
group.add(mesh);
group.add(containerMesh);
scene.add( group );

// 放一个在旁边作对照
const material = new THREE.MeshBasicMaterial( { color:color} );
const mesh2 = new THREE.Mesh(geo, material);
mesh2.position.x = -3;
scene.add( mesh2 );



// 添加gui
const gui = new dat.GUI();
const changeObj = {splitValue: 30,fillColor:color};
const splitValueControl = gui.add(changeObj, "splitValue", 0, 100);

splitValueControl.onChange( (v)=>{
  // 百分比 转换成对应的坐标
  const value = meshMinY + (meshMaxY - meshMinY) * v / 100;
  customMaterial.uniforms.splitValue.value = value;
});
const fillColorControl = gui.addColor(changeObj, "fillColor");
fillColorControl.onChange( (v)=>{
  customMaterial.uniforms.fillColor.value.set(v);
});
animate();





