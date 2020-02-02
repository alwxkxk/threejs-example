import * as THREE from "three";

export function resetCoordinate(obj) {
  obj.position.set(0, 0, 0);
  obj.scale.set(1, 1, 1);
  obj.rotation.set(0, 0, 0);
}

export function copyCoordinate(from, to) {
  to.position.copy(from.position.clone());
  to.scale.copy(from.scale.clone());
  to.rotation.copy(from.rotation.clone());
}

export function lineModel(obj,options){
  const opt = options || {};
  const group = new THREE.Group();
  const lineMaterial = new THREE.LineBasicMaterial({color: opt.color || 0x00FFFF});
  const boxMaterial = new THREE.MeshBasicMaterial({
    opacity: opt.opacity || 0 ,
    color: opt.boxColor || 0xffffff,
    side: THREE.DoubleSide,
    transparent: true,
    depthTest: !!options.depthTest,
    depthWrite: !!options.depthWrite,
  });
  group.name = obj.name + "_lineModel";
  const geo = new THREE.EdgesGeometry(obj.geometry);
  const line = new THREE.LineSegments( geo , lineMaterial);
  const box = new THREE.Mesh(obj.geometry, boxMaterial);
  resetCoordinate(line);
  resetCoordinate(box);
  group.add(line);
  group.add(box);
  copyCoordinate(obj,group);
  return group;
}