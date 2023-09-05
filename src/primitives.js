import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

const geometries = [
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.ConeGeometry(1, 2, 6),
  new THREE.ConeGeometry(1, 2, 24, 1, true, 0, Math.PI),
  new THREE.CylinderGeometry(1, 1, 1.5, 24, 1, false, 0, Math.PI * 1.5),
  new THREE.TorusGeometry(0.8, 0.3),
  new THREE.DodecahedronGeometry(1, 3),
  new THREE.DodecahedronGeometry(),
  new THREE.IcosahedronGeometry(),
  new THREE.OctahedronGeometry(),
  new THREE.TetrahedronGeometry(),
  new THREE.PlaneGeometry(1.5, 2.5),
  new THREE.CircleGeometry(1, 6, 0, Math.PI),
  new THREE.RingGeometry(),
  new THREE.EdgesGeometry(new THREE.BoxGeometry()),
  new THREE.WireframeGeometry(new THREE.BoxGeometry()),
];

function alignMeshes(
  geometries,
  interval = 3,
  centerX = 0,
  centerY = 0,
  maxColLength = 5
) {
  return geometries.map((geometry, idx) => {
    const rowIdx = (idx / maxColLength) | 0;
    const colIdx = idx % maxColLength;
    const rowLength = (geometries.length / maxColLength + 1) | 0;
    const colLength =
      geometries.length < maxColLength ? geometries.length : maxColLength;
    const posX = centerX - (interval * (colLength - 1 - 2 * colIdx)) / 2;
    const posY = centerY + (interval * (rowLength - 1 - 2 * rowIdx)) / 2;
    if (
      geometry instanceof THREE.EdgesGeometry ||
      geometry instanceof THREE.WireframeGeometry
    ) {
      const material = new THREE.LineBasicMaterial({ color: 0x000000 });
      const mesh = new THREE.LineSegments(geometry, material);

      mesh.position.set(posX, posY, 0);
      mesh.rotation.x = Math.random() * 10;
      mesh.rotation.y = Math.random() * 10;
      scene.add(mesh);
      return mesh;
    } else {
      const material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide });
      material.color.setHSL(Math.random(), 1, 0.5);
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(posX, posY, 0);
      mesh.rotation.x = Math.random() * 10;
      mesh.rotation.y = Math.random() * 10;
      scene.add(mesh);
      return mesh;
    }
  });
}

const meshes = alignMeshes(geometries);

const light = new THREE.DirectionalLight();
light.position.set(20, 40, 100);
scene.add(light);

const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100);
camera.position.z = 10;

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

function rotateMeshes(meshes, velocity) {
  meshes.forEach((mesh) => {
    mesh.rotation.x += velocity;
    mesh.rotation.y += velocity;
  });
}

function animate(time) {
  resizeDisplay();
  rotateMeshes(meshes, 0.01);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
