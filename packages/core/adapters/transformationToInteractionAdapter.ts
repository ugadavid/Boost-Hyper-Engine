import type {
  TransformationInteractionData,
  TransformationInteractionItem,
  TransformationSet
} from "../types/index.js";

function toTransformationInteractionItem(
  item: TransformationSet["content"]["core"]["items"][number]
): TransformationInteractionItem {
  const interactionItem: TransformationInteractionItem = {
    itemId: item.id,
    source: item.source,
    expected: item.expected
  };

  if (item.transformationType !== undefined) {
    interactionItem.transformationType = item.transformationType;
  }

  if (item.instruction !== undefined) {
    interactionItem.instruction = item.instruction;
  }

  if (item.accepted !== undefined) {
    interactionItem.accepted = item.accepted;
  }

  if (item.hint !== undefined) {
    interactionItem.hint = item.hint;
  }

  if (item.feedback !== undefined) {
    interactionItem.feedback = item.feedback;
  }

  return interactionItem;
}

export function transformationToInteractionData(
  object: TransformationSet
): TransformationInteractionData {
  return {
    items: object.content.core.items.map(toTransformationInteractionItem)
  };
}
