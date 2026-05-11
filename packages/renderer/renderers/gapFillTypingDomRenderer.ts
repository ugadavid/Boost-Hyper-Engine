import { evaluateGapFillTyping } from "../../core/evaluators/index.js";
import type { ContextualTypingUserInput, GapFillSet } from "../../core/types/index.js";
import {
  gapFillToContextualTypingData
} from "../adapters/gapFillToContextualTypingAdapter.js";
import { mountFeedbackFromResult } from "../feedback/feedbackMounting.js";
import type { RendererDefinition } from "../types/RendererDefinition.js";

type DomRendererDefinition = RendererDefinition & {
  renderDom: (object: GapFillSet) => HTMLElement;
};

function isGapFillSet(object: Parameters<RendererDefinition["render"]>[0]): object is GapFillSet {
  return object.pedagogicalType === "gap-fill";
}

function createMessage(message: string): HTMLElement {
  const section = document.createElement("section");
  section.className = "bhe-gap-fill bhe-gap-fill--unavailable";

  const text = document.createElement("p");
  text.textContent = message;
  section.append(text);

  return section;
}

export const gapFillTypingDomRenderer: DomRendererDefinition = {
  id: "gap-fill-typing-dom-renderer",
  supportedPedagogicalTypes: ["gap-fill"],
  supportedInteractionModes: ["typing"],
  render(object, interactionMode) {
    return `Renderer ${this.id} can present "${object.metadata.title ?? object.metadata.id}" as ${interactionMode}.`;
  },
  renderDom(object) {
    const section = document.createElement("section");
    section.className = "bhe-gap-fill";
    section.dataset.objectId = object.metadata.id;

    const title = document.createElement("h2");
    title.textContent = object.metadata.title ?? object.metadata.id;

    const context = document.createElement("p");
    context.className = "bhe-gap-fill__context";

    const contextualTypingData = gapFillToContextualTypingData(object);
    const feedbackByBlankId = new Map<string, HTMLElement>();
    const inputByBlankId = new Map<string, HTMLInputElement>();

    for (const segment of contextualTypingData.segments) {
      if ("text" in segment) {
        context.append(document.createTextNode(segment.text));
        continue;
      }

      const input = document.createElement("input");
      input.className = "bhe-gap-fill__input";
      input.type = "text";
      input.name = segment.id;
      input.placeholder = segment.label ?? "answer";
      input.setAttribute("aria-label", segment.label ?? segment.id);
      if (segment.hint) {
        input.title = segment.hint;
      }

      const feedback = document.createElement("span");
      feedback.className = "bhe-gap-fill__blank-feedback";
      feedback.setAttribute("aria-live", "polite");

      inputByBlankId.set(segment.id, input);
      feedbackByBlankId.set(segment.id, feedback);
      context.append(input, feedback);
    }

    const checkButton = document.createElement("button");
    checkButton.type = "button";
    checkButton.className = "bhe-gap-fill__check";
    checkButton.textContent = "Check";

    const feedbackContainer = document.createElement("div");
    feedbackContainer.className = "bhe-gap-fill__feedback";
    feedbackContainer.setAttribute("aria-live", "polite");

    checkButton.addEventListener("click", () => {
      const input: ContextualTypingUserInput = {
        interactionMode: "typing",
        timestamp: new Date().toISOString(),
        typedAnswers: Array.from(inputByBlankId, ([blankId, inputElement]) => ({
          blankId,
          value: inputElement.value
        }))
      };
      const result = evaluateGapFillTyping(contextualTypingData, input);

      for (const blankResult of result.details?.blankResults ?? []) {
        const inputElement = inputByBlankId.get(blankResult.blankId);
        const feedback = feedbackByBlankId.get(blankResult.blankId);
        if (!inputElement || !feedback) continue;

        inputElement.classList.toggle("is-correct", blankResult.isCorrect);
        inputElement.classList.toggle("is-incorrect", !blankResult.isCorrect);
        feedback.textContent = blankResult.isCorrect ? " correct" : " incorrect";
        feedback.dataset.status = blankResult.isCorrect ? "correct" : "incorrect";
      }

      mountFeedbackFromResult({ result, container: feedbackContainer });
    });

    section.append(title, context, checkButton, feedbackContainer);
    return section;
  }
};

export function renderGapFillTypingDom(
  object: Parameters<RendererDefinition["render"]>[0]
): HTMLElement {
  if (!isGapFillSet(object)) {
    return createMessage("This object cannot be rendered as gap-fill typing.");
  }

  return gapFillTypingDomRenderer.renderDom(object);
}
