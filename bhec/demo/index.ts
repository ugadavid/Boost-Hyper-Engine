import { DragDropRenderer } from "../renderer/ActivityRenderer.js";

async function boot() {
  const [bhe, style] = await Promise.all([
    fetch("/protocole/drag-drop.bhe.json").then(r => r.json()),
    fetch("/style/drag-drop.style.json").then(r => r.json())
  ]);

  const app = document.getElementById("app")!;
  const renderer = new DragDropRenderer(app, bhe, style);
  renderer.render();
}

boot();
