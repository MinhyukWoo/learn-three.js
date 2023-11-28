import * as THREE from "three";
import { animate, resizeDisplay } from "./utils";

function textures(canvasId) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const loader = new THREE.TextureLoader();
  const texture = loader.load("/static/wall.jpg");
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.MeshBasicMaterial({
    map: texture,
  });

  const materials = [new THREE.MeshBasicMaterial()];

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const aspect = document.body.clientWidth / document.body.clientHeight;
  const camera = new THREE.PerspectiveCamera(75, aspect, 1, 3000);
  camera.position.set(0, 0, 2);

  const canvas = document.getElementById(canvasId);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

  animate(renderer, scene, camera, () => {
    mesh.rotateX(0.01);
    mesh.rotateY(0.02);
    resizeDisplay(
      canvas,
      renderer,
      camera,
      document.body.clientWidth,
      document.body.clientHeight
    );
  });
}

textures("main-canvas");
