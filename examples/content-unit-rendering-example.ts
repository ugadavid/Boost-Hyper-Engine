import type { AudioUnit, ImageUnit, TextUnit, VideoUnit } from "../packages/core/types/index.js";
import { renderContentUnit } from "../packages/renderer/content/index.js";

export const textUnit: TextUnit = {
  id: "unit-text-kind",
  kind: "text",
  label: "Text unit",
  text: "kind"
};

export const imageUnit: ImageUnit = {
  id: "unit-image-curious",
  kind: "image",
  label: "Image unit",
  src: "https://placehold.co/240x140?text=Curious",
  alt: "A placeholder image representing curiosity"
};

export const audioUnit: AudioUnit = {
  id: "unit-audio-creative",
  kind: "audio",
  label: "Audio unit",
  src: "https://example.com/audio/creative.mp3",
  transcript: "creative"
};

export const videoUnit: VideoUnit = {
  id: "unit-video-friendly",
  kind: "video",
  label: "Video unit",
  src: "https://example.com/video/friendly.mp4",
  poster: "https://placehold.co/320x180?text=Friendly",
  transcript: "friendly"
};

export function renderContentUnitExamples(container: HTMLElement): void {
  const units = [textUnit, imageUnit, audioUnit, videoUnit];

  for (const unit of units) {
    const item = document.createElement("article");
    item.className = "content-unit-preview__item";

    const title = document.createElement("h2");
    title.textContent = `${unit.kind}: ${unit.label ?? unit.id}`;

    item.append(title, renderContentUnit(unit));
    container.append(item);
  }
}
