import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import TWEEN from "@tweenjs/tween.js";
// TODO: 添加管道，能设置半径
// TODO: 添加 水波纹效果

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
// NOTE：camera 坐标不能全为0，否则OrbitControls异常，无法移动视觉
camera.position.z = 25;

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


new OrbitControls( camera, renderer.domElement );
const light = new THREE.HemisphereLight( 0xffffff, 0xcccccc, 1 );
scene.add( light );

const v0 = new THREE.Vector3( 10, 0, 0 );
const v1 = new THREE.Vector3( 0, 15, 0 );
const v2 = new THREE.Vector3( 0, 15, 0 );
const v3 = new THREE.Vector3( -10, 0, 0 );

//https://threejs.org/docs/index.html?q=curve#api/en/extras/curves/CubicBezierCurve3
const curve = new THREE.CubicBezierCurve3(v0,v1,v2,v3);

const points = curve.getPoints( 100 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );

// 动态设置geometry渲染部分
// https://threejs.org/docs/#manual/en/introduction/How-to-update-things
const updateGeometry = (startVal,endVal)=>{
	geometry.setDrawRange( startVal, endVal );
	geometry.attributes.position.needsUpdate = true;
};

const material = new THREE.LineBasicMaterial( { color : 0xe778e7} );
const curveObject = new THREE.Line( geometry, material );

// Create the final object to add to the scene
scene.add( curveObject );

const curveMove = ()=>{
	const startPoint = {val:0};
	const endPoint = {val:0};
	
	new TWEEN.Tween(endPoint)
		.to({val:100},1000 * 3)
		.onUpdate(()=>{
			updateGeometry(startPoint.val,endPoint.val);
		})
		.start();
	
		setTimeout(() => {
			new TWEEN.Tween(startPoint)
				.to({val:100},1000 * 3)
				.onUpdate(()=>{
					updateGeometry(startPoint.val,endPoint.val);
				})
			.start();
		}, 1000 * 4);
};

curveMove();

document.getElementById("move").onclick=()=>{
	curveMove();
};



const animate = function () {
	TWEEN.update();
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
};

animate();







