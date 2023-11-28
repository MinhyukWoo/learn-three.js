export function resizeDisplay(canvas, renderer, camera, width, height) {
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}

export function animate(renderer, scene, camera, callback = (time) => {}) {
  function render(time) {
    callback(time);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
