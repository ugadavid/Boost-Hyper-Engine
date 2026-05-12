import type {
  BHEResult,
  BHEResultStatus,
  ClassificationDragDropUserInput
} from "../types/index.js";

export interface ClassificationDragDropExpectedItem {
  itemId: string;
  expectedCategoryId: string;
}

export interface ClassificationDragDropEvaluationData {
  draggableItems: ClassificationDragDropExpectedItem[];
}

export interface ClassificationDragDropItemResult {
  itemId: string;
  expectedCategoryId: string;
  actualCategoryId?: string;
  isCorrect: boolean;
}

export interface ClassificationDragDropResultDetails {
  itemResults: ClassificationDragDropItemResult[];
  missingItemIds: string[];
}

export function evaluateClassificationDragDrop(
  dragDropData: ClassificationDragDropEvaluationData,
  input: ClassificationDragDropUserInput
): BHEResult<ClassificationDragDropResultDetails> {
  const placementsByItemId = new Map(
    input.placements.map((placement) => [placement.itemId, placement.categoryId])
  );

  const itemResults = dragDropData.draggableItems.map((item) => {
    const actualCategoryId = placementsByItemId.get(item.itemId);
    const isCorrect = actualCategoryId === item.expectedCategoryId;
    const itemResult: ClassificationDragDropItemResult = {
      itemId: item.itemId,
      expectedCategoryId: item.expectedCategoryId,
      isCorrect
    };

    if (actualCategoryId !== undefined) {
      itemResult.actualCategoryId = actualCategoryId;
    }

    return itemResult;
  });

  const missingItemIds = itemResults
    .filter((itemResult) => itemResult.actualCategoryId === undefined)
    .map((itemResult) => itemResult.itemId);
  const score = itemResults.filter((itemResult) => itemResult.isCorrect).length;
  const maxScore = dragDropData.draggableItems.length;
  const completion = maxScore === 0 ? 1 : score / maxScore;
  const status: BHEResultStatus =
    score === maxScore ? "success" : score > 0 ? "partial" : "failed";

  return {
    objectId: "classification-drag-drop",
    status,
    score,
    maxScore,
    completion,
    details: {
      itemResults,
      missingItemIds
    }
  };
}
