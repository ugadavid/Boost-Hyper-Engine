import type { BHEResult, FeedbackData, FeedbackMessage } from "../types/index.js";

interface BlankResultDetails {
  blankId: string;
  value: string;
  expected: string | string[];
  isCorrect: boolean;
}

interface DetailsWithBlankResults {
  blankResults: BlankResultDetails[];
}

interface DetailsWithIsCorrect {
  isCorrect: boolean;
}

function hasBlankResults(details: unknown): details is DetailsWithBlankResults {
  return (
    typeof details === "object" &&
    details !== null &&
    "blankResults" in details &&
    Array.isArray((details as { blankResults?: unknown }).blankResults)
  );
}

function hasIsCorrect(details: unknown): details is DetailsWithIsCorrect {
  return (
    typeof details === "object" &&
    details !== null &&
    "isCorrect" in details &&
    typeof (details as { isCorrect?: unknown }).isCorrect === "boolean"
  );
}

function feedbackStatus(result: BHEResult): FeedbackData["status"] {
  if (
    result.status === "partial" ||
    (
      typeof result.score === "number" &&
      typeof result.maxScore === "number" &&
      result.score > 0 &&
      result.score < result.maxScore
    )
  ) {
    return "partial";
  }

  return result.status === "success" ? "success" : "failed";
}

function summaryMessage(status: FeedbackData["status"]): FeedbackMessage {
  if (status === "success") {
    return {
      id: "feedback-summary-success",
      severity: "success",
      message: "Correct."
    };
  }

  if (status === "partial") {
    return {
      id: "feedback-summary-partial",
      severity: "warning",
      message: "Partially correct."
    };
  }

  return {
    id: "feedback-summary-failed",
    severity: "error",
    message: "Try again."
  };
}

function blankResultMessages(details: DetailsWithBlankResults): FeedbackMessage[] {
  return details.blankResults.map((blankResult) => ({
    id: `feedback-blank-${blankResult.blankId}`,
    severity: blankResult.isCorrect ? "success" : "error",
    message: blankResult.isCorrect ? "Correct." : "Try again.",
    targetId: blankResult.blankId,
    metadata: {
      value: blankResult.value,
      expected: blankResult.expected
    }
  }));
}

function qcmResultMessage(details: DetailsWithIsCorrect): FeedbackMessage {
  return {
    id: "feedback-qcm-result",
    severity: details.isCorrect ? "success" : "error",
    message: details.isCorrect ? "Correct." : "Try again."
  };
}

export function mapBHEResultToFeedback(result: BHEResult): FeedbackData {
  const status = feedbackStatus(result);
  const summary = summaryMessage(status);
  const messages: FeedbackMessage[] = [];

  if (hasBlankResults(result.details)) {
    messages.push(...blankResultMessages(result.details));
  } else if (hasIsCorrect(result.details)) {
    messages.push(qcmResultMessage(result.details));
  }

  const feedbackData: FeedbackData = {
    status,
    summary
  };

  if (messages.length > 0) {
    feedbackData.messages = messages;
  }

  return feedbackData;
}
