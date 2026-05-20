import type { IdentificationSet } from "../types/index.js";
import type {
  IdentificationSelectionData,
  IdentificationSelectionTarget
} from "../types/interaction-data/index.js";

function targetToSelectionTarget(
  target: IdentificationSet["content"]["core"]["targets"][number]
): IdentificationSelectionTarget {
  const selectionTarget: IdentificationSelectionTarget = {
    targetId: target.id,
    label: target.label
  };

  if (target.expected !== undefined) {
    selectionTarget.expected = target.expected;
  }

  if (target.feedback !== undefined) {
    selectionTarget.feedback = target.feedback;
  }

  return selectionTarget;
}

export function identificationToSelectionData(
  object: IdentificationSet
): IdentificationSelectionData {
  return {
    context: object.content.core.context,
    selectionMode: object.content.core.selectionMode ?? "multiple",
    targets: object.content.core.targets.map(targetToSelectionTarget)
  };
}
