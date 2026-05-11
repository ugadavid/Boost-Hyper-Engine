import type { FeedbackData } from "../packages/core/types/index.js";
import { renderFeedbackData } from "../packages/renderer/feedback/feedbackDataDomRenderer.js";

const successFeedback: FeedbackData = {
  status: "success",
  summary: {
    id: "success-summary",
    severity: "success",
    message: "Correct."
  }
};

const partialFeedback: FeedbackData = {
  status: "partial",
  summary: {
    id: "partial-summary",
    severity: "warning",
    message: "Partially correct."
  },
  messages: [
    {
      id: "blank-food-feedback",
      severity: "success",
      message: "Correct.",
      targetId: "blank-food"
    },
    {
      id: "blank-drink-feedback",
      severity: "error",
      message: "Try again.",
      targetId: "blank-drink"
    }
  ]
};

document.body.append(
  renderFeedbackData(successFeedback),
  renderFeedbackData(partialFeedback)
);
