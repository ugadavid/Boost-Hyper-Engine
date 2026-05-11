import type { GapFillSet } from "../../core/types/index.js";
import {
  gapFillToContextualTypingData,
  type TypingBlankData
} from "../adapters/gapFillToContextualTypingAdapter.js";
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

function acceptedAnswers(blank: TypingBlankData): string[] {
  return Array.isArray(blank.expected) ? blank.expected : [blank.expected];
}

function isCorrectAnswer(
  value: string,
  blank: TypingBlankData,
  options: { caseSensitive?: boolean; accentSensitive?: boolean }
): boolean {
  const actual = normalizeAnswer(value, options);
  return acceptedAnswers(blank).some(
    (expected) => normalizeAnswer(expected, options) === actual
  );
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
    const blankById = new Map<string, TypingBlankData>();

    for (const segment of contextualTypingData.segments) {
      if ("text" in segment) {
        context.append(document.createTextNode(segment.text));
        continue;
      }

      blankById.set(segment.id, segment);
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

    checkButton.addEventListener("click", () => {
      for (const [blankId, blank] of blankById) {
        const input = inputByBlankId.get(blankId);
        const feedback = feedbackByBlankId.get(blankId);
        if (!input || !feedback) continue;

        const isCorrect = isCorrectAnswer(input.value, blank, contextualTypingData);
        input.classList.toggle("is-correct", isCorrect);
        input.classList.toggle("is-incorrect", !isCorrect);
        feedback.textContent = isCorrect ? " correct" : " incorrect";
        feedback.dataset.status = isCorrect ? "correct" : "incorrect";
      }
    });

    section.append(title, context, checkButton);
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
