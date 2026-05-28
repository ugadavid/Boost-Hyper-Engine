import type { ContentUnit, MemorizationSet } from "../../core/types/index.js";
import type { FlashcardsData } from "./associationToFlashcardsAdapter.js";

function contentUnitToText(unit: ContentUnit): string {
  switch (unit.kind) {
    case "text":
      return unit.text;
    case "image":
      return unit.alt ? `[image: ${unit.alt}]` : `[image: ${unit.src}]`;
    case "audio":
      return unit.transcript ? `[audio: ${unit.transcript}]` : `[audio: ${unit.src}]`;
    case "video":
      return unit.transcript ? `[video: ${unit.transcript}]` : `[video: ${unit.src}]`;
  }
}

export function memorizationToFlashcardsData(object: MemorizationSet): FlashcardsData {
  return {
    cards: object.content.core.items.map((item) => ({
      id: item.id,
      front: item.unit ? contentUnitToText(item.unit) : item.cue,
      back: item.target
    }))
  };
}
