// https://blog.mastermaps.com/2013/09/creating-webgl-earth-with-threejs.html

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import globalData from "./global-data";
import TWEEN from "@tweenjs/tween.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
camera.position.set(71,70,2);
window.camera= camera;

new OrbitControls( camera, renderer.domElement );
// const light = new THREE.HemisphereLight( 0xffffff, 0xcccccc, 1 );
// scene.add( light );

const globeRadius = 50;

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const imgEle = new Image();
let globeWidth = 0;
let globeHeight = 0;
imgEle.onload = function () {
  // draw background image
  if (ctx === null) {
    return;
  }
  ctx.canvas.height = imgEle.height;
  ctx.canvas.width = imgEle.width;
  ctx.drawImage(imgEle, 0, 0);
  globeWidth = ctx.canvas.width / 2;
  globeHeight = ctx.canvas.height / 2;

  const texture = new THREE.CanvasTexture(ctx.canvas);

  const geometry = new THREE.SphereGeometry(globeRadius, 32, 32);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    // transparent: true,
    // opacity:0.6,
  });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
};

// 地图来源： http://www.shadedrelief.com/natural3/index.html
imgEle.src = "/static/img/global.webp";

let i = 0;
setInterval(()=>{
  i += 1;
  if(i>= globalData.length){
    i = 0;
  }
  createCurve(globalData[i]);
},500);

// globalData.forEach(d=>{createCurve(d);});


function createCurve(data) {
  const v0 = convertLatLngToSphereCoords(data.gm.lat,data.gm.lon);
  const v1 = new THREE.Vector3();
  const v2 = new THREE.Vector3();
  const v3 = convertLatLngToSphereCoords(data.gop.lat,data.gop.lon);

  const centerVec = new THREE.Vector3();
  centerVec.addVectors(v0,v3).normalize().multiplyScalar(globeRadius*1.1);

  const distance = Math.abs(v0.distanceTo(v3));
  
  // 转点取决于距离，距离越远越高，同时不能低于半径
  let scale = distance * 0.9;
  if(scale<globeRadius*1.1){scale = globeRadius*1.1;}

  v1.addVectors(centerVec,v0).normalize().multiplyScalar(scale);
  v2.addVectors(centerVec,v3).normalize().multiplyScalar(scale);
  
  const curve = new THREE.CubicBezierCurve3(v0,v1,v2,v3);
  const points = curve.getPoints( 100 );
  const geometry = new THREE.BufferGeometry().setFromPoints( points );
  const material = new THREE.LineBasicMaterial( { color : 0xe778e7} );
  const curveObject = new THREE.Line( geometry, material );
  scene.add(curveObject);
  curveMove(geometry);
}


const updateGeometry = (geometry,startVal,endVal)=>{
	geometry.setDrawRange( startVal, endVal );
	geometry.attributes.position.needsUpdate = true;
};

function curveMove (geometry){
	const startPoint = {val:0};
	const endPoint = {val:0};
	
	new TWEEN.Tween(endPoint)
		.to({val:100},1000 * 3)
		.onUpdate(()=>{
			updateGeometry(geometry,startPoint.val,endPoint.val);
		})
		.start();
	
		setTimeout(() => {
			new TWEEN.Tween(startPoint)
				.to({val:100},1000 * 3)
				.onUpdate(()=>{
					updateGeometry(geometry,startPoint.val,endPoint.val);
				})
			.start();
		}, 1000 * 4);
}



// latitude 纬度
// longitude 经度
// 自行网上搜索经纬度来验证
function convertLatLngToSphereCoords (latitude, longitude) {
  const phi = (latitude * Math.PI) / 180;
  const theta = ((longitude - 180) * Math.PI) / 180;
  const x = -(globeRadius + 0.5) * Math.cos(phi) * Math.cos(theta);
  const y = (globeRadius + 0.5) * Math.sin(phi);
  const z = (globeRadius + 0.5) * Math.cos(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
}

function convertLatLngToFlatCoords (latitude, longitude) {
  // Reference: https://stackoverflow.com/questions/7019101/convert-pixel-location-to-latitude-longitude-vise-versa
  const x = Math.round((longitude + 180) * (globeWidth / 360)) * 2;
  const y = Math.round((-1 * latitude + 90) * (globeHeight / 180)) * 2;
  console.log("convertLatLngToFlatCoords:", latitude, longitude, x, y);
  return { x, y };
}

function convertFlatCoordsToSphereCoords (x, y){
  // Calculate the relative 3d coordinates using Mercator projection relative to the radius of the globe.
  // Convert latitude and longitude on the 90/180 degree axis.
  let latitude = ((x - globeWidth) / globeWidth) * -180;
  let longitude = ((y - globeHeight) / globeHeight) * -90;
  latitude = (latitude * Math.PI) / 180; // (latitude / 180) * Math.PI
  longitude = (longitude * Math.PI) / 180; // (longitude / 180) * Math.PI // Calculate the projected starting point
  const radius = Math.cos(longitude) * globeRadius;
  const targetX = Math.cos(latitude) * radius;
  const targetY = Math.sin(longitude) * globeRadius;
  const targetZ = Math.sin(latitude) * radius;
  return {
    x: targetX,
    y: targetY,
    z: targetZ
  };
}

const animate = function () {
	requestAnimationFrame( animate );
  TWEEN.update();
	renderer.render( scene, camera );
};
animate();