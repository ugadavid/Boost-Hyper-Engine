import { mapBHEResultToFeedback } from "../../core/feedback/index.js";
import type { BHEResult, FeedbackData } from "../../core/types/index.js";
import { renderFeedbackData } from "./feedbackDataDomRenderer.js";

export function mountFeedbackFromResult(options: {
  result: BHEResult;
  container: HTMLElement;
}): FeedbackData {
  const feedback = mapBHEResultToFeedback(options.result);
  options.container.replaceChildren(renderFeedbackData(feedback));
  return feedback;
}
