import * as THREE from "three";

export default function light() {
  const scene = new THREE.Scene();

  const gemometry = new THREE.BoxGeometry(10, 10, 10);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(gemometry, material);
  scene.add(cube);

//   const light = new THREE.PointLight(0xffff00);
//   light.position.set(5, 0, 15);
//   scene.add(light);

  const aspect = window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(75, aspect, 1, 1000);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xdddddd));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.02;
    renderer.render(scene, camera);
  }

  animate();
}
