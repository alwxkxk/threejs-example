import * as THREE from "three";

const containerElement = document.getElementById("canvas-container");

let clientWidth,clientHeight,offsetLeft,offsetTop; // 容器元素的高宽，以及左偏移值，顶偏移值
updateContainerElement();// 计算 容器元素 高宽，左偏移值，顶偏移值


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, clientWidth / clientHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
// 设置与容器元素相同大小
renderer.setSize( clientWidth, clientHeight );
containerElement.appendChild( renderer.domElement );

var mouse = new THREE.Vector2();

const mouseDataContainerElement = document.getElementById("mouse-data-container");
const mouseDataElement = document.getElementById("mouse-data");
const positionDataElement = document.getElementById("position-data");
function onMouseMove( event ) {
	// calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  // // serialize value to -1 ~ +1
	mouse.x = ( (event.clientX-offsetLeft) / clientWidth ) * 2 - 1;
  mouse.y = - ( (event.clientY-offsetTop) / clientHeight ) * 2 + 1;
  mouseDataContainerElement.style.left =event.clientX;
  mouseDataContainerElement.style.top =event.clientY;
  mouseDataElement.innerText = `屏幕坐标:(${event.clientX},${event.clientY})`;
  positionDataElement.innerText = `归一坐标:(${mouse.x.toFixed(2)},${mouse.y.toFixed(2)})`;
  console.log(mouse.x,mouse.y);

}
window.addEventListener( "mousemove", onMouseMove, false );

function updateContainerElement() {
  // 计算 容器元素 高宽，左偏移值，顶偏移值
  clientWidth = containerElement.clientWidth;
  clientHeight = containerElement.clientHeight;
  const rect = containerElement.getBoundingClientRect();
  offsetLeft = rect.left;
  offsetTop = rect.top;
}

function resize() {
  updateContainerElement();
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( clientWidth, clientHeight );
}
window.addEventListener( "resize", resize, false );

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

var animate = function () {
  requestAnimationFrame( animate );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render( scene, camera );
};

animate();




