import GUI from "lil-gui";
import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaaaaaa);
const objects = [];

const geometry = new THREE.SphereGeometry(1, 6, 6);

const solarSystem = new THREE.Object3D();
scene.add(solarSystem);
objects.push(solarSystem);

const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
const sunMesh = new THREE.Mesh(geometry, sunMaterial);
sunMesh.scale.set(5, 5, 5);
solarSystem.add(sunMesh);
objects.push(sunMesh);

const earthOrbit = new THREE.Object3D();
earthOrbit.position.x = 10;
solarSystem.add(earthOrbit);
objects.push(earthOrbit);

const earthMaterial = new THREE.MeshPhongMaterial({
  color: 0x2233ff,
  emissive: 0x112244,
});
const earthMesh = new THREE.Mesh(geometry, earthMaterial);
earthOrbit.add(earthMesh);
objects.push(earthMesh);

const moonOrbit = new THREE.Object3D();
moonOrbit.position.x = 2;
earthOrbit.add(moonOrbit);
objects.push(moonOrbit);

const moonMaterial = new THREE.MeshPhongMaterial({
  color: 0x888888,
  emissive: 0x222222,
});
const moonMesh = new THREE.Mesh(geometry, moonMaterial);
moonMesh.scale.set(0.5, 0.5, 0.5);
moonOrbit.add(moonMesh);
objects.push(moonMesh);

const light = new THREE.PointLight(0xffffff, 300);
scene.add(light);

const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
camera.position.set(0, 30, 0);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

const canvas = document.getElementById("main-canvas");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

function resizeDisplay() {
  const width = document.body.clientWidth;
  const height = document.body.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}

class AxisGridHelper {
  constructor(node, units = 10) {
    const axes = new THREE.AxesHelper();
    axes.material.depthTest = false;
    axes.renderOrder = 2;
    node.add(axes);

    const grid = new THREE.GridHelper(units, units);
    grid.material.depthTest = false;
    grid.renderOrder = 1;
    node.add(grid);

    this.axes = axes;
    this.grid = grid;
    this.visible = false;
  }
  get visible() {
    return this._visible;
  }
  set visible(v) {
    this._visible = v;
    this.axes.visible = v;
    this.grid.visible = v;
  }
}

const gui = new GUI();
function makeAxisGrid(node, label, units) {
  const helper = new AxisGridHelper(node, units);
  gui.add(helper, "visible").name(label);
}
makeAxisGrid(solarSystem, "solarSystem", 25);
makeAxisGrid(sunMesh, "sunMesh");
makeAxisGrid(earthOrbit, "earthOrbit");
makeAxisGrid(earthMesh, "earthMesh");
makeAxisGrid(moonOrbit, "moonOrbit");
makeAxisGrid(moonMesh, "moonMesh");

function animate(time) {
  resizeDisplay();
  time /= 1000;
  time /= 2;
  time % 360;
  for (const object of objects) {
    object.rotation.y = time;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
