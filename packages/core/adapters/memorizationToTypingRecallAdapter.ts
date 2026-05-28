import type {
  ContentUnit,
  MemorizationSet,
  MemorizationTypingRecallData,
  MemorizationTypingRecallItem
} from "../types/index.js";

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

function toTypingRecallItem(
  item: MemorizationSet["content"]["core"]["items"][number]
): MemorizationTypingRecallItem {
  const recallItem: MemorizationTypingRecallItem = {
    itemId: item.id,
    cueLabel: item.unit ? contentUnitToText(item.unit) : item.cue,
    expectedTarget: item.target
  };

  if (item.accepted !== undefined) {
    recallItem.acceptedTargets = item.accepted;
  }

  if (item.hint !== undefined) {
    recallItem.hint = item.hint;
  }

  return recallItem;
}

export function memorizationToTypingRecallData(
  object: MemorizationSet
): MemorizationTypingRecallData {
  return {
    recallGoal: object.content.core.recallGoal,
    items: object.content.core.items.map(toTypingRecallItem)
  };
}
