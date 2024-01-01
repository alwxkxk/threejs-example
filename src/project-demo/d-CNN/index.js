import * as THREE from "three";

// import TWEEN from "three/examples/jsm/libs/tween.module.js";
import TWEEN from "@tweenjs/tween.js";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";

// 适用矩阵 8*8,12*12,16*16
// 8*8矩阵
const m1 =[
    200,200,200,200,200,180,160,180,
    180,160,180,160,160,180,180,180,
    200,200,200,200,200,200,200,200,
    200,200,200,200,200,200,200,200,
    200,200,200,200,200,200,200,200,
    200,200,200,200,200,200,200,200,
    180,200,200,200,200,200,200,200,
    200,200,200,200,200,200,200,220,
];

const m2 = pooling8to4(m1);
const m3 = normalizationTo3(m2);

let camera, scene, renderer;
let controls;

const objects = [];// 保存数字板的原始对象
const targets = { table: [] };// 保存目标位置

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.x = -2200;
    camera.position.z = 400;
    camera.position.z = 1900;
    console.log("camera",camera);

    scene = new THREE.Scene();

    generateMatrix(m1,8,0,0.4);
    generateMatrix(m2,4,400,0.6);
    generateMatrix(m3,3,800,0.8);

    renderer = new CSS3DRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById( "container" ).appendChild( renderer.domElement );


    controls = new TrackballControls( camera, renderer.domElement );
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener( "change", render );


    transform( targets.table, 2000 );

    setInterval( ()=>{
        const randomIndex = Math.floor(Math.random() * objects.length);
        if(objects[randomIndex]){
            objects[randomIndex].element.classList.add("element-active");
            console.log(" objects[randomIndex]", objects[randomIndex]);
        }
    },1000);

    window.addEventListener( "resize", onWindowResize );

}

function generateMatrix(arr,len,zPosition,opacity){
    // 生成矩阵的图层效果
    const targetsArr = [];
    for ( let i = 0; i < arr.length; i += 1 ) {
        const element = document.createElement( "div" );
        element.className = "element";
        element.style.backgroundColor = `rgba(0,127,127,${opacity})`;

        const symbol = document.createElement( "div" );
        symbol.className = "symbol";
        symbol.textContent = arr[ i ];
        element.appendChild( symbol );

        const objectCSS = new CSS3DObject( element );
        objectCSS.position.x = Math.random() * 4000 - 2000;
        objectCSS.position.y = Math.random() * 4000 - 2000;
        objectCSS.position.z = Math.random() * 4000 - 2000;
        scene.add( objectCSS );
        objects.push( objectCSS );

        const object = new THREE.Object3D();
        object.position.x = ( (i%len) * 140 ) - len * 80;
        object.position.y = - ( (Math.ceil((i+1)/len)) * 140 ) + len * 50;
        object.position.z = zPosition;

        targets.table.push( object );
        targetsArr.push( object );

    }
    return targetsArr;
}

function pooling8to4(arr) {
    // 将输入矩阵8*8 池化成 4*4 矩阵 取平均值
    const result = [];
    for ( let i = 0; i < 16; i += 1 ) {
        const num1 = arr[i*2];
        const num2 = arr[i*2+1];
        const num3 = arr[i*2 + 8];
        const num4 = arr[i*2 + 9];
        result.push(Math.ceil((num1 + num2 + num3 + num4)/4));
    }
    return result;
}

function normalizationTo3(arr){
    // 伪装运算，取前9个值，单数为1，复数为0，生成3*3矩阵
    const result = [];
    for ( let i = 0; i < 9; i += 1 ) {
        result.push(arr[i]%2);
    }
    return result;
}

function transform( targets, duration ) {

    TWEEN.removeAll();

    for ( let i = 0; i < objects.length; i ++ ) {

        const object = objects[ i ];
        const target = targets[ i ];

        new TWEEN.Tween( object.position )
            .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
            .easing( TWEEN.Easing.Exponential.InOut )
            .start();

        // new TWEEN.Tween( object.rotation )
        //     .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
        //     .easing( TWEEN.Easing.Exponential.InOut )
        //     .start();

    }

    new TWEEN.Tween( this )
        .to( {}, duration * 2 )
        .onUpdate( render )
        .start();

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();

}

function animate() {

    requestAnimationFrame( animate );

    TWEEN.update();

    controls.update();

}

function render() {

    renderer.render( scene, camera );

}