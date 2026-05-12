import type { ContentUnit } from "../../core/types/index.js";

function createTextLabel(text: string): HTMLElement {
  const label = document.createElement("span");
  label.className = "bhe-content-unit__label";
  label.textContent = text;
  return label;
}

export function renderContentUnit(unit: ContentUnit): HTMLElement {
  switch (unit.kind) {
    case "text": {
      const span = document.createElement("span");
      span.className = "bhe-content-unit bhe-content-unit--text";
      span.textContent = unit.text;
      return span;
    }

    case "image": {
      const figure = document.createElement("figure");
      figure.className = "bhe-content-unit bhe-content-unit--image";

      const image = document.createElement("img");
      image.src = unit.src;
      image.alt = unit.alt ?? unit.label ?? "";
      figure.append(image);

      if (unit.label) {
        const caption = document.createElement("figcaption");
        caption.textContent = unit.label;
        figure.append(caption);
      }

      return figure;
    }

    case "audio": {
      const wrapper = document.createElement("span");
      wrapper.className = "bhe-content-unit bhe-content-unit--audio";

      const audio = document.createElement("audio");
      audio.controls = true;
      audio.src = unit.src;
      wrapper.append(audio);

      const label = unit.transcript ?? unit.label;
      if (label) {
        wrapper.append(createTextLabel(label));
      }

      return wrapper;
    }

    case "video": {
      const wrapper = document.createElement("span");
      wrapper.className = "bhe-content-unit bhe-content-unit--video";

      const video = document.createElement("video");
      video.controls = true;
      video.src = unit.src;
      if (unit.poster !== undefined) {
        video.poster = unit.poster;
      }
      wrapper.append(video);

      const label = unit.transcript ?? unit.label;
      if (label) {
        wrapper.append(createTextLabel(label));
      }

      return wrapper;
    }
  }
}
