import type {
  BHEResult,
  BHEResultStatus,
  SequenceReorderData,
  SequenceReorderUserInput
} from "../types/index.js";

export interface SequenceExactPositionResult {
  position: number;
  expectedItemId: string;
  actualItemId?: string;
  isCorrect: boolean;
}

export interface SequenceAdjacentPairResult {
  firstItemId: string;
  secondItemId: string;
  isAdjacent: boolean;
  actualFirstPosition?: number;
  actualSecondPosition?: number;
}

export interface SequenceReorderResultDetails {
  expectedOrder: string[];
  actualOrder: string[];
  exactPositionResults: SequenceExactPositionResult[];
  adjacentPairResults: SequenceAdjacentPairResult[];
}

function buildExpectedOrder(data: SequenceReorderData): string[] {
  return [...data.items]
    .sort((left, right) => left.expectedPosition - right.expectedPosition)
    .map((item) => item.itemId);
}

function buildAdjacentPairResults(
  expectedOrder: string[],
  actualOrder: string[]
): SequenceAdjacentPairResult[] {
  const actualPositions = new Map(actualOrder.map((itemId, index) => [itemId, index + 1]));

  return expectedOrder.slice(0, -1).map((firstItemId, index) => {
    const secondItemId = expectedOrder[index + 1];
    const actualFirstPosition = actualPositions.get(firstItemId);
    const actualSecondPosition = secondItemId ? actualPositions.get(secondItemId) : undefined;
    const isAdjacent =
      actualFirstPosition !== undefined &&
      actualSecondPosition !== undefined &&
      actualSecondPosition === actualFirstPosition + 1;

    const result: SequenceAdjacentPairResult = {
      firstItemId,
      secondItemId: secondItemId ?? "",
      isAdjacent
    };

    if (actualFirstPosition !== undefined) {
      result.actualFirstPosition = actualFirstPosition;
    }

    if (actualSecondPosition !== undefined) {
      result.actualSecondPosition = actualSecondPosition;
    }

    return result;
  });
}

export function evaluateSequenceReorder(
  data: SequenceReorderData,
  input: SequenceReorderUserInput
): BHEResult<SequenceReorderResultDetails> {
  const expectedOrder = buildExpectedOrder(data);
  const actualOrder = input.orderedItemIds;
  const exactPositionResults = expectedOrder.map((expectedItemId, index) => {
    const actualItemId = actualOrder[index];
    const result: SequenceExactPositionResult = {
      position: index + 1,
      expectedItemId,
      isCorrect: actualItemId === expectedItemId
    };

    if (actualItemId !== undefined) {
      result.actualItemId = actualItemId;
    }

    return result;
  });
  const adjacentPairResults = buildAdjacentPairResults(expectedOrder, actualOrder);
  const score = exactPositionResults.filter((result) => result.isCorrect).length;
  const maxScore = expectedOrder.length;
  const completion = maxScore === 0 ? 1 : score / maxScore;
  const status: BHEResultStatus =
    score === maxScore ? "success" : score > 0 ? "partial" : "failed";

  return {
    objectId: "sequence-reorder",
    status,
    score,
    maxScore,
    completion,
    details: {
      expectedOrder,
      actualOrder,
      exactPositionResults,
      adjacentPairResults
    }
  };
}
