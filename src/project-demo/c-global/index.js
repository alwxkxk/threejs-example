// https://blog.mastermaps.com/2013/09/creating-webgl-earth-with-threejs.html

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import globalData from "./global-data";
import TWEEN from "@tweenjs/tween.js";
// TODO: 曲线进出时的水波效果

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

imgEle.onload = function () {
  // draw background image
  if (ctx === null) {
    return;
  }
  ctx.canvas.height = imgEle.height;
  ctx.canvas.width = imgEle.width;
  ctx.drawImage(imgEle, 0, 0);
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
const curveList = [];
setInterval(()=>{
  i += 1;
  if(i>= globalData.length){
    i = 0;
  }
  if(!curveList[i]){
    curveList[i] = createCurve(globalData[i]);
  }
  curveMove(curveList[i]);
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
  curveObject.userData.info = data;
  curveObject.userData.v0 = v0;
  curveObject.userData.v3 = v3;
  scene.add(curveObject);
  return curveObject;
  
}


const updateGeometry = (geometry,startVal,endVal)=>{
	geometry.setDrawRange( startVal, endVal );
	geometry.attributes.position.needsUpdate = true;
};

const infoBoxEle =  document.getElementById("info-box");
function curveMove (curve){
	const startPoint = {val:0};
	const endPoint = {val:0};
  const geometry = curve.geometry;
  const infoBoxItemEle = document.createElement("div");
  infoBoxItemEle.classList.add("info-box-item");
  infoBoxItemEle.innerText = `${curve.userData.info.uml} ---> ${curve.userData.info.uol}`;

	const startPlane = getPositionNamePlane(curve.userData.info.uml,curve.userData.v0);
  const endPlane = getPositionNamePlane(curve.userData.info.uol,curve.userData.v3);
	new TWEEN.Tween(endPoint)
		.to({val:100},1000 * 3)
		.onUpdate(()=>{
			updateGeometry(geometry,startPoint.val,endPoint.val);
		})
    .onStart(()=>{
      startPlane.visible = true;
      endPlane.visible = true;
      infoBoxEle.insertBefore(infoBoxItemEle,infoBoxEle.firstChild);
    })
		.start();
	
		setTimeout(() => {
			new TWEEN.Tween(startPoint)
				.to({val:100},1000 * 3)
				.onUpdate(()=>{
					updateGeometry(geometry,startPoint.val,endPoint.val);
				})
        .onComplete(()=>{
          startPlane.visible = false;
          endPlane.visible = false;
          infoBoxItemEle.remove();
        })
			.start();
		}, 1000 * 4);
}

const positionNameMap = new Map();
function getPositionNamePlane(name,positionVec3){
  const id = `${name}-${positionVec3.x}-${positionVec3.y}-${positionVec3.z}`;
  const oldPlane = positionNameMap.get(id);
  if(oldPlane){
    return oldPlane;
  }

  const ctx = document.createElement("canvas").getContext("2d");
  ctx.canvas.style.position="absolute";
  ctx.canvas.style.top =  "10px";
  ctx.canvas.style.left =  "10px";

  ctx.font = "16px";
  const measure = ctx.measureText(name);
  ctx.canvas.width = measure.width;
  ctx.canvas.height = 32;
  ctx.fillStyle = "#fff";
  ctx.fillText(name,0,16);
  
  // document.body.appendChild(ctx.canvas);
  const texture = new THREE.CanvasTexture(ctx.canvas);
  const pGeometry = new THREE.PlaneGeometry( measure.width/6, 3);
  const pMaterial = new THREE.MeshBasicMaterial( {
    map:texture,
    transparent: true,
    opacity:0.9,
    depthTest:false
  } );
  const plane = new THREE.Mesh( pGeometry, pMaterial );
  plane.position.copy(positionVec3);
  scene.add( plane );
  positionNameMap.set(id,plane);
  return plane;
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

const animate = function () {
	requestAnimationFrame( animate );
  TWEEN.update();
  // 让面板对接摄像头
  positionNameMap.forEach(plane=>{
    if(plane.visible){
      plane.lookAt(camera.position);
    }
  });
	renderer.render( scene, camera );
};
animate();