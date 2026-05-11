import type { GapFillSet } from "../../core/types/index.js";

export interface TextSegmentData {
  id: string;
  text: string;
}

export interface TypingBlankData {
  id: string;
  label?: string;
  expected: string | string[];
  hint?: string;
  feedback?: string;
}

export interface ContextualTypingData {
  segments: Array<TextSegmentData | TypingBlankData>;
  caseSensitive?: boolean;
  accentSensitive?: boolean;
}

export function gapFillToContextualTypingData(object: GapFillSet): ContextualTypingData {
  const { context, blanks, caseSensitive, accentSensitive } = object.content.core;
  const segments: Array<TextSegmentData | TypingBlankData> = [];
  const sortedBlanks = [...blanks].sort(
    (a, b) => (a.start ?? Number.MAX_SAFE_INTEGER) - (b.start ?? Number.MAX_SAFE_INTEGER)
  );

  let cursor = 0;
  let textSegmentIndex = 0;

  for (const blank of sortedBlanks) {
    if (
      blank.start === undefined ||
      blank.end === undefined ||
      blank.start < cursor ||
      blank.end > context.length ||
      blank.start >= blank.end
    ) {
      continue;
    }

    if (blank.start > cursor) {
      segments.push({
        id: `text-${textSegmentIndex}`,
        text: context.slice(cursor, blank.start)
      });
      textSegmentIndex += 1;
    }

    const blankData: TypingBlankData = {
      id: blank.id,
      expected: blank.expected
    };

    if (blank.label !== undefined) {
      blankData.label = blank.label;
    }

    if (blank.hint !== undefined) {
      blankData.hint = blank.hint;
    }

    if (blank.feedback !== undefined) {
      blankData.feedback = blank.feedback;
    }

    segments.push(blankData);

    cursor = blank.end;
  }

  if (cursor < context.length) {
    segments.push({
      id: `text-${textSegmentIndex}`,
      text: context.slice(cursor)
    });
  }

  const contextualTypingData: ContextualTypingData = { segments };

  if (caseSensitive !== undefined) {
    contextualTypingData.caseSensitive = caseSensitive;
  }

  if (accentSensitive !== undefined) {
    contextualTypingData.accentSensitive = accentSensitive;
  }

  return contextualTypingData;
}
