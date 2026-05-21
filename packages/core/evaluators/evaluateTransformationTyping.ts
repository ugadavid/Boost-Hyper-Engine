import type {
  BHEResult,
  BHEResultStatus,
  TransformationInteractionData,
  TransformationInteractionItem,
  TransformationTypingUserInput
} from "../types/index.js";

export interface TransformationTypingItemResult {
  itemId: string;
  source: string;
  actual: string;
  expected: string | string[];
  isCorrect: boolean;
  transformationType?: string;
  instruction?: string;
  accepted?: string[];
}

export interface TransformationTypingResultDetails {
  itemResults: TransformationTypingItemResult[];
}

function normalizeAnswer(value: string): string {
  return value.trim().toLowerCase();
}

function acceptedAnswers(item: TransformationInteractionItem): string[] {
  const expected = Array.isArray(item.expected) ? item.expected : [item.expected];
  return [...expected, ...(item.accepted ?? [])];
}

function isCorrectAttempt(value: string, item: TransformationInteractionItem): boolean {
  const actual = normalizeAnswer(value);
  return acceptedAnswers(item).some((accepted) => normalizeAnswer(accepted) === actual);
}

function buildItemResult(
  item: TransformationInteractionItem,
  actual: string
): TransformationTypingItemResult {
  const result: TransformationTypingItemResult = {
    itemId: item.itemId,
    source: item.source,
    actual,
    expected: item.expected,
    isCorrect: isCorrectAttempt(actual, item)
  };

  if (item.transformationType !== undefined) {
    result.transformationType = item.transformationType;
  }

  if (item.instruction !== undefined) {
    result.instruction = item.instruction;
  }

  if (item.accepted !== undefined) {
    result.accepted = item.accepted;
  }

  return result;
}

export function evaluateTransformationTyping(
  data: TransformationInteractionData,
  input: TransformationTypingUserInput
): BHEResult<TransformationTypingResultDetails> {
  const attemptsByItemId = new Map(
    input.attempts.map((attempt) => [attempt.itemId, attempt.value])
  );
  const itemResults = data.items.map((item) =>
    buildItemResult(item, attemptsByItemId.get(item.itemId) ?? "")
  );
  const score = itemResults.filter((result) => result.isCorrect).length;
  const maxScore = data.items.length;
  const completion = maxScore === 0 ? 1 : score / maxScore;
  const status: BHEResultStatus =
    score === maxScore ? "success" : score > 0 ? "partial" : "failed";

  return {
    objectId: "transformation-typing",
    status,
    score,
    maxScore,
    completion,
    details: {
      itemResults
    }
  };
}
