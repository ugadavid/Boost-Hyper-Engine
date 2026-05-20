import type {
  BHEResult,
  BHEResultStatus,
  IdentificationSelectionData,
  IdentificationSelectionUserInput
} from "../types/index.js";

export interface IdentificationSelectionResultDetails {
  selectedTargetIds: string[];
  expectedTargetIds: string[];
  correctTargetIds: string[];
  missingTargetIds: string[];
  extraTargetIds: string[];
}

export function evaluateIdentificationSelection(
  data: IdentificationSelectionData,
  input: IdentificationSelectionUserInput
): BHEResult<IdentificationSelectionResultDetails> {
  const expectedTargetIds = data.targets
    .filter((target) => target.expected === true)
    .map((target) => target.targetId);
  const expectedSet = new Set(expectedTargetIds);
  const selectedTargetIds = [...new Set(input.selectedTargetIds)];
  const selectedSet = new Set(selectedTargetIds);
  const correctTargetIds = selectedTargetIds.filter((targetId) => expectedSet.has(targetId));
  const missingTargetIds = expectedTargetIds.filter((targetId) => !selectedSet.has(targetId));
  const extraTargetIds = selectedTargetIds.filter((targetId) => !expectedSet.has(targetId));
  const score = correctTargetIds.length;
  const maxScore = expectedTargetIds.length;
  const completion = maxScore === 0 ? 1 : score / maxScore;
  const status: BHEResultStatus =
    score === maxScore && extraTargetIds.length === 0
      ? "success"
      : score > 0
        ? "partial"
        : "failed";

  return {
    objectId: "identification-selection",
    status,
    score,
    maxScore,
    completion,
    details: {
      selectedTargetIds,
      expectedTargetIds,
      correctTargetIds,
      missingTargetIds,
      extraTargetIds
    }
  };
}
