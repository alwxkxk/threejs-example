import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = window.scene = new THREE.Scene();
const camera = window.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(3,3,3);

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0xaaaaaa } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );


let plane = null;
const ctx = document.createElement("canvas").getContext("2d");

const img = new Image();
img.onload = function() {
    // draw background image
    ctx.canvas.height = img.height;
    ctx.canvas.width = img.width;
    // 由于我画的雪碧图是竖着的画的，每一帧图片的高宽一致，所以是高除宽。（1280/256=5）
    const frame = ctx.canvas.height / ctx.canvas.width;

    ctx.drawImage(img, 0, 0,ctx.canvas.width,ctx.canvas.height);
    const texture = new THREE.CanvasTexture(ctx.canvas);
    // 缩放到对应倍数，显示一帧的图片而不是显示整张雪碧图
    texture.repeat.y = 1/frame;
    texture.offset.y = - 1/frame;

    // 让图片可以无限循环
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    setInterval(() => {
      // 每0.1S 移动一帧
      texture.offset.y -=  1/frame;
    }, 100);
    

    window.texture =texture;
    const pGeometry = new THREE.PlaneGeometry( 0.5, 0.5);
    const pMaterial = new THREE.MeshBasicMaterial( {
      map:texture,
      transparent: true,
      side: THREE.DoubleSide,
    } );
    plane = new THREE.Mesh( pGeometry, pMaterial );
    plane.position.set(0,1,0);
    scene.add( plane );
};

img.src = "./static/img/arrow-sprit.png";


new OrbitControls( camera, renderer.domElement );
const light = new THREE.HemisphereLight( 0xffffff, 0xcccccc, 1 );
scene.add( light );

const animate = function () {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  // 让平板一直朝向摄像头
  if(plane){
    plane.lookAt(camera.position);
  }
};

animate();





