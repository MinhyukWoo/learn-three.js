import * as THREE from "three";
import { animate, resizeDisplay } from "./utils";

function textures(canvasId) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const loader = new THREE.TextureLoader();
  const texture = loader.load("/static/checker.png");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.repeat.set(10, 10);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
  });

  const materials = [new THREE.MeshBasicMaterial()];

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const aspect = document.body.clientWidth / document.body.clientHeight;
  const camera = new THREE.PerspectiveCamera(75, aspect, 1, 3000);
  camera.position.set(0, 0, 2);
  camera.lookAt(0, 0, 0)

  const canvas = document.getElementById(canvasId);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

  animate(renderer, scene, camera, () => {
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
