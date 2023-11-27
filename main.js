import WebGL from "three/addons/capabilities/WebGL.js";
import helloThreeJs from "./src/helloThreeJs";
import drawLines from "./src/drawLines";
import light from "./src/light";
import scenegraph from "./src/scenegraph";

if (WebGL.isWebGLAvailable()) {
  helloThreeJs();
  // drawLines();
  // light()
  // scenegraph();
} else {
  window.alert("WebGL를 지원하지 않는 브라우저입니다.");
}
