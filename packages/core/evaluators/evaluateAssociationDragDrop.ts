import type { AssociationDragDropUserInput, BHEResult, BHEResultStatus } from "../types/index.js";

export interface AssociationDragDropExpectedZone {
  id: string;
  expectedEntryIds: string[];
}

export interface AssociationDragDropEvaluationData {
  dropZones: AssociationDragDropExpectedZone[];
}

export interface AssociationDragDropGroupResult {
  zoneId: string;
  expectedEntryIds: string[];
  actualEntryIds: string[];
  missingEntryIds: string[];
  extraEntryIds: string[];
  isCorrect: boolean;
}

export interface AssociationDragDropResultDetails {
  groupResults: AssociationDragDropGroupResult[];
}

function sameEntrySet(left: string[], right: string[]): boolean {
  if (left.length !== right.length) return false;

  const rightSet = new Set(right);
  return left.every((entryId) => rightSet.has(entryId));
}

export function evaluateAssociationDragDrop(
  dragDropData: AssociationDragDropEvaluationData,
  input: AssociationDragDropUserInput
): BHEResult<AssociationDragDropResultDetails> {
  const placementsByZone = new Map<string, string[]>();

  for (const placement of input.placements) {
    const zonePlacements = placementsByZone.get(placement.zoneId) ?? [];
    zonePlacements.push(placement.entryId);
    placementsByZone.set(placement.zoneId, zonePlacements);
  }

  const groupResults = dragDropData.dropZones.map((zone) => {
    const actualEntryIds = placementsByZone.get(zone.id) ?? [];
    const expectedSet = new Set(zone.expectedEntryIds);
    const actualSet = new Set(actualEntryIds);
    const missingEntryIds = zone.expectedEntryIds.filter((entryId) => !actualSet.has(entryId));
    const extraEntryIds = actualEntryIds.filter((entryId) => !expectedSet.has(entryId));
    const isCorrect = sameEntrySet(actualEntryIds, zone.expectedEntryIds);

    return {
      zoneId: zone.id,
      expectedEntryIds: zone.expectedEntryIds,
      actualEntryIds,
      missingEntryIds,
      extraEntryIds,
      isCorrect
    };
  });

  const score = groupResults.filter((groupResult) => groupResult.isCorrect).length;
  const maxScore = dragDropData.dropZones.length;
  const completion = maxScore === 0 ? 1 : score / maxScore;
  const status: BHEResultStatus =
    score === maxScore ? "success" : score > 0 ? "partial" : "failed";

  return {
    objectId: "association-drag-drop",
    status,
    score,
    maxScore,
    completion,
    details: {
      groupResults
    }
  };
}
