export interface TextMatchingOptions {
  trim?: boolean;
  caseInsensitive?: boolean;
}

export function normalizeText(value: string, options: TextMatchingOptions = {}): string {
  let normalized = options.trim === false ? value : value.trim();

  if (options.caseInsensitive !== false) {
    normalized = normalized.toLowerCase();
  }

  return normalized;
}

export function matchesAcceptedAnswer(
  actual: string,
  expected: string | string[],
  options: TextMatchingOptions = {}
): boolean {
  const normalizedActual = normalizeText(actual, options);
  const expectedAnswers = Array.isArray(expected) ? expected : [expected];

  return expectedAnswers.some(
    (expectedAnswer) => normalizeText(expectedAnswer, options) === normalizedActual
  );
}
