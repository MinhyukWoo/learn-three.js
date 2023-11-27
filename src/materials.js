import WebGL from "three/addons/capabilities/WebGL.js";
import * as THREE from "three";

function materials(canvasId) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);

  const light = new THREE.DirectionalLight();
  light.position.set(-10, 30, 20);
  scene.add(light);

  const boardGeometry = new THREE.BoxGeometry(100, 1, 100);
  const boardMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
  const board = new THREE.Mesh(boardGeometry, boardMaterial);
  board.position.set(0, -12, 0);
  scene.add(board);

  const geometry = new THREE.SphereGeometry(10, 200, 200);
  // const material = new THREE.MeshToonMaterial()
  const makeMaterial = () => {
    return new THREE.MeshPhysicalMaterial({
      color: 0x00ff00,
      roughness: 0,
      metalness: 0.7,
      clearcoat: 1,
    });
  };

  const mesh = new THREE.Mesh(geometry, makeMaterial());
  const mesh2 = new THREE.Mesh(geometry, makeMaterial());
  const mesh3 = new THREE.Mesh(geometry, makeMaterial());
  scene.add(mesh);
  mesh2.position.set(25, 0, 0);
  mesh2.material.color.setHSL(0.6, 1, 0.5);
  scene.add(mesh2);
  mesh3.material.color.setHSL(0, 1, 0.5);
  mesh3.position.set(-25, 0, 0);
  scene.add(mesh3);

  const aspect = window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
  camera.position.set(-20, 20, 50);
  camera.lookAt(0, 0, 0);

  const canvas = document.getElementById(canvasId);
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

  function animate(time) {
    const second = time / 1000;
    const value = (second / 5) % 1;
    // material.color.setHSL(value, 1, 0.5);
    resizeDisplay();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

materials("main-canvas");
