import type { SequenceSet } from "../types/index.js";
import type { SequenceReorderData, SequenceReorderItem } from "../types/interaction-data/index.js";

function sequenceItemToReorderItem(
  item: SequenceSet["content"]["core"]["items"][number],
  index: number
): SequenceReorderItem {
  return {
    itemId: item.id,
    label: item.label,
    expectedPosition: item.position,
    initialPosition: index + 1
  };
}

export function sequenceToReorderData(object: SequenceSet): SequenceReorderData {
  return {
    items: object.content.core.items.map(sequenceItemToReorderItem)
  };
}
