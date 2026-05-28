import type {
  BHEResult,
  BHEResultStatus,
  MemorizationTypingRecallData,
  MemorizationTypingRecallItem,
  MemorizationTypingRecallUserInput
} from "../types/index.js";

export interface MemorizationTypingRecallItemResult {
  itemId: string;
  cueLabel: string;
  expectedTarget: string;
  acceptedTargets: string[];
  actualAnswer: string;
  isCorrect: boolean;
}

export interface MemorizationTypingRecallResultDetails {
  itemResults: MemorizationTypingRecallItemResult[];
}

function normalizeAnswer(value: string): string {
  return value.trim().toLowerCase();
}

function acceptedTargets(item: MemorizationTypingRecallItem): string[] {
  return [item.expectedTarget, ...(item.acceptedTargets ?? [])];
}

function isCorrectAnswer(value: string, item: MemorizationTypingRecallItem): boolean {
  const actual = normalizeAnswer(value);
  return acceptedTargets(item).some((target) => normalizeAnswer(target) === actual);
}

function buildItemResult(
  item: MemorizationTypingRecallItem,
  actualAnswer: string
): MemorizationTypingRecallItemResult {
  return {
    itemId: item.itemId,
    cueLabel: item.cueLabel,
    expectedTarget: item.expectedTarget,
    acceptedTargets: item.acceptedTargets ?? [],
    actualAnswer,
    isCorrect: isCorrectAnswer(actualAnswer, item)
  };
}

export function evaluateMemorizationTypingRecall(
  data: MemorizationTypingRecallData,
  input: MemorizationTypingRecallUserInput
): BHEResult<MemorizationTypingRecallResultDetails> {
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
    objectId: "memorization-typing-recall",
    status,
    score,
    maxScore,
    completion,
    details: {
      itemResults
    }
  };
}
