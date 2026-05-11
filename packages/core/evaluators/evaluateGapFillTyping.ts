import type { BHEResult, ContextualTypingUserInput } from "../types/index.js";
import type { BHEResultStatus } from "../types/index.js";

export interface GapFillTypingBlank {
  id: string;
  expected: string | string[];
}

export interface GapFillTextSegment {
  id: string;
  text: string;
}

export interface GapFillTypingData {
  segments: Array<GapFillTextSegment | GapFillTypingBlank>;
  caseSensitive?: boolean;
  accentSensitive?: boolean;
}

export interface GapFillBlankResult {
  blankId: string;
  value: string;
  expected: string | string[];
  isCorrect: boolean;
}

export interface GapFillTypingResultDetails {
  blankResults: GapFillBlankResult[];
}

function isTypingBlank(
  segment: GapFillTextSegment | GapFillTypingBlank
): segment is GapFillTypingBlank {
  return "expected" in segment;
}

function normalizeAnswer(
  value: string,
  options: { caseSensitive?: boolean; accentSensitive?: boolean }
): string {
  let normalized = value.trim();

  if (!options.caseSensitive) {
    normalized = normalized.toLowerCase();
  }

  if (!options.accentSensitive) {
    normalized = normalized.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  return normalized;
}

function acceptedAnswers(blank: GapFillTypingBlank): string[] {
  return Array.isArray(blank.expected) ? blank.expected : [blank.expected];
}

function isCorrectAnswer(
  value: string,
  blank: GapFillTypingBlank,
  options: { caseSensitive?: boolean; accentSensitive?: boolean }
): boolean {
  const actual = normalizeAnswer(value, options);
  return acceptedAnswers(blank).some(
    (expected) => normalizeAnswer(expected, options) === actual
  );
}

export function evaluateGapFillTyping(
  typingData: GapFillTypingData,
  input: ContextualTypingUserInput
): BHEResult<GapFillTypingResultDetails> {
  const answersByBlankId = new Map(
    input.typedAnswers.map((answer) => [answer.blankId, answer.value])
  );

  const blanks = typingData.segments.filter(isTypingBlank);
  const blankResults = blanks.map((blank) => {
    const value = answersByBlankId.get(blank.id) ?? "";
    const isCorrect = isCorrectAnswer(value, blank, typingData);

    return {
      blankId: blank.id,
      value,
      expected: blank.expected,
      isCorrect
    };
  });

  const score = blankResults.filter((result) => result.isCorrect).length;
  const maxScore = blanks.length;
  const completion = maxScore === 0 ? 1 : score / maxScore;
  const status: BHEResultStatus =
    score === maxScore ? "success" : score > 0 ? "partial" : "failed";

  return {
    objectId: "gap-fill-typing",
    status,
    score,
    maxScore,
    completion,
    details: {
      blankResults
    }
  };
}
