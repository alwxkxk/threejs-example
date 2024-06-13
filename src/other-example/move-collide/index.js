import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 10;
camera.position.y = 10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const orbit = new OrbitControls( camera, renderer.domElement );
// const light = new THREE.HemisphereLight( 0xffffff, 0xcccccc, 1 );
// scene.add( light );


const gridHelper = new THREE.GridHelper(100, 100);
scene.add(gridHelper);

const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
const cube = new THREE.Mesh( geometry, material ); 
cube.name = "cube";
// cube.rotation.z = THREE.Math.radToDeg(30);
scene.add( cube );

const material2 = new THREE.MeshBasicMaterial( {color: 0x00ffff} ); 
const cube2 = new THREE.Mesh( geometry, material2 ); 
cube2.position.x = 5;
cube2.position.z = 0.5;
cube2.name = "cube2";
scene.add( cube2 );

const material3 = new THREE.MeshBasicMaterial( {color: 0xffffff} ); 
const cube3 = new THREE.Mesh( geometry, material3 ); 
cube3.position.z = -8;
cube3.name = "cube3";
scene.add( cube3 );

const cube4 = new THREE.Mesh( geometry, material3 ); 
cube4.position.z = -4;
cube4.name = "cube4";
scene.add( cube4 );

const cube5 = new THREE.Mesh( geometry, material3 ); 
cube5.position.z = -3;
cube5.position.x = -4;
cube5.name = "cube5";
scene.add( cube5 );

const transformControl = new TransformControls(camera, renderer.domElement);

transformControl.addEventListener("dragging-changed", (event) => {
  if (orbit) {
    orbit.enabled = !event.value;
  }
});

transformControl.attach(cube);
scene.add(transformControl);

// wasd 移动物体,ws肯定是移动Y轴上下的，ad则需要根据计算，找出是沿＋－Ｘ轴还是 ＋－Z轴
// 通过摄像头方向判断，处于物体的哪个区域（该物体没有改变角度）
function getCameraDir (camera) {
  let lookAt = new THREE.Vector3();
  lookAt = camera.getWorldDirection(lookAt);
  // 从-X看向X，x值从1变化到-1
  // 从-Z看向Z，z值从1变化到-1
  // console.log("lookAt",lookAt);
  return lookAt;
}

// 检测碰撞所需要的移动距离，当没有碰撞时返回空，要提示没有碰撞。
// 坐标 x1,z1，向X正方向移动直到碰撞（x不断往正无穷增加），看z1Max,z1Min 与 z2Max,z2Min会不会有重叠，有重叠说明可能会碰撞。
// 碰撞范围是两物体半径之和作为斜边，x最小相关点至x2，如下所示：
// x1---x最小相交点---x2
//       \            |
//         \          |z1+max
//           \        |z2-min
//             \      |
//               \    |
//                 \  |
//                   z2
// 当前只粗略地计算x2-((x2-x2Mim)+(x1Max-x1))为碰撞点，不再继续计算。

function findCollide(target,axle="x") {
  console.log("findCollide",target,axle);
  const axleFlag = axle.replace("-","");
  const axle2Flag = axle.includes("x")?"z":"x";
  const box1 = new THREE.Box3();
  box1.setFromObject(target);
  let step1List = [];
  
  scene.children.forEach(obj=>{
    if(obj.type === "Mesh" && obj.uuid !== target.uuid){
      // 1.判断是否在该方向上,并且要排序
      // console.log(obj.name,obj.position[axleFlag],obj.position[axleFlag] < target.position[axleFlag]);
      if(axle.includes("-")){
        if(obj.position[axleFlag] < target.position[axleFlag]){
          step1List.push(obj);
        }
      }else if(obj.position[axleFlag] > target.position[axleFlag]){
        step1List.push(obj);
      }
     
    }
    // console.log(obj);
  });

  step1List = step1List.sort((a,b)=>{
    return axle.includes("-")?b.position[axleFlag] - a.position[axleFlag]:a.position[axleFlag] - b.position[axleFlag];
  });
  console.log("step1List",step1List);
  let flag2 = false;
  step1List.forEach(obj=>{
     // 2.判断另一轴是否有可能会相交
    if(flag2){
      // 只找最近相交的那一个
      return; 
    }
    const box2 = new THREE.Box3();
    box2.setFromObject(obj);
    if(obj.position[axle2Flag] >= target.position[axle2Flag] && box2.min[axle2Flag]<= box1.max[axle2Flag]){
      flag2 = true;
    }else if(obj.position[axle2Flag] < target.position[axle2Flag] && box2.max[axle2Flag]> box1.min[axle2Flag]){
      flag2 = true;
    }
    if(flag2){
      // 计算并移动到最小相交点
      console.log("flag2",obj);
      //当前只粗略地计算x2-((x2-x2Mim)+(x1Max-x1))为碰撞点，不再继续计算。
      let split;
      if(axle.includes("-")){
        split = (target.position[axleFlag]-box1.min[axleFlag])+(box2.max[axleFlag]-obj.position[axleFlag]);
      }else{
        split = (box1.max[axleFlag]-target.position[axleFlag])+(obj.position[axleFlag]-box2.min[axleFlag]);
      }
      const newVal = axle.includes("-")?obj.position[axleFlag]+split :obj.position[axleFlag] - split;
      target.position[axleFlag] = newVal;
      console.log(axle,split,newVal);

    }
  });
  if(!flag2){
    console.warn("不存在可移动直到碰撞的位置");
  }
}
window.addEventListener("keyup",(e)=>{
  // console.log("e",e);
  switch (e.code) {
    case "KeyW":{
      cube.position.y += 1;
      break;
    }
    case "KeyS":{
      cube.position.y -= 1;
      break;
    }
    case "KeyA":{
      const lookAt = getCameraDir(camera);
      if(lookAt.x>=-0.5&&lookAt.x<=0.5){
        if(lookAt.z<=-0.5){
          if(e.shiftKey){
            findCollide(cube,"-x");
          }else{
            cube.position.x -= 1;
          }
         
        }else if(lookAt.z>=0.5){
          if(e.shiftKey){
            findCollide(cube,"x");
          }else{
            cube.position.x += 1;
          }
          
        }
      }else if(lookAt.x<-0.5){
        if(e.shiftKey){
          findCollide(cube,"z");
        }else{
          cube.position.z += 1;
        }
        
      }else if(lookAt.x>0.5){
        if(e.shiftKey){
          findCollide(cube,"-z");
        }else{
          cube.position.z -= 1;
        }
        
      }
      break;
    }
      case "KeyD":{
        const lookAt = getCameraDir(camera);
        if(lookAt.x>=-0.5&&lookAt.x<=0.5){
          if(lookAt.z<=-0.5){
          if(e.shiftKey){
            findCollide(cube,"x");
          }else{
            cube.position.x += 1;
          }
            
          }else if(lookAt.z>=0.5){
            if(e.shiftKey){
              findCollide(cube,"-x");
            }else{
              cube.position.x -= 1;
            }
            
          }
        }else if(lookAt.x<-0.5){
          if(e.shiftKey){
            findCollide(cube,"-z");
          }else{
            cube.position.z -= 1;
          }
        }else if(lookAt.x>0.5){
          if(e.shiftKey){
            findCollide(cube,"x");
          }else{
            cube.position.z += 1;
          }
        }
        break;
      }
    default:
      break;
  }
});


// findCollide(cube,"-z");



const animate = function () {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
};

animate();


