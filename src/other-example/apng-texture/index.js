import UPNG from "./UPNG.js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = window.scene = new THREE.Scene();
const camera = window.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(3,3,3);

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

new OrbitControls( camera, renderer.domElement );
const light = new THREE.HemisphereLight( 0xffffff, 0xcccccc, 1 );
scene.add( light );

const apngUrl = "./static/img/apng.png";
var xhr = new XMLHttpRequest();
xhr.open("GET", apngUrl);
xhr.responseType = "arraybuffer";
xhr.onload = function () {
    console.log("xhr",xhr);
    const imgObj = UPNG.decode(xhr.response);
    console.log(imgObj) ;
    const rgbaList = UPNG.toRGBA8(imgObj); 

    const maxIndex = rgbaList.length;
    // const imageDataList = [];
    const textureList = [];
    for (let i = 0; i < maxIndex; i++) {
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");

			// 将每一像素点画上去，每一像素四位数。
			// https://jameshfisher.com/2020/03/01/how-to-write-an-arraybuffer-to-a-canvas/
			// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas

			ctx.canvas.height = imgObj.height;
			ctx.canvas.width = imgObj.width;

			const imageData = new ImageData(new Uint8ClampedArray(rgbaList[i]), imgObj.width, imgObj.height);
			// imageDataList.push(imageData);
			ctx.putImageData(imageData, 0,0);
			const texture = new THREE.CanvasTexture(ctx.canvas);
			textureList.push(texture);
    }
    console.log("textureList",textureList);
		const pGeometry = new THREE.PlaneGeometry( 5, 5);
		const pMaterial = new THREE.MeshBasicMaterial( {
			map:textureList[0],
			transparent: true,
			side: THREE.DoubleSide,
		} );
		const plane = new THREE.Mesh( pGeometry, pMaterial );
		plane.rotation.set(Math.PI*0.5,0,0);
		scene.add( plane );

		let index = 0;
		setInterval(() => {
				// 每0.1S 移动一帧
				pMaterial.map = textureList[index];
				pMaterial.needsUpdate = true;
				index +=1;
				if(index>=rgbaList.length){
						index = 0;
				}
		}, 100);

};
xhr.send();


const animate = function () {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
};

animate();

