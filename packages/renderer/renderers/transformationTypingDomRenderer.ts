import { transformationToInteractionData } from "../../core/adapters/index.js";
import { evaluateTransformationTyping } from "../../core/evaluators/index.js";
import type {
  TransformationSet,
  TransformationTypingUserInput
} from "../../core/types/index.js";
import { mountFeedbackFromResult } from "../feedback/feedbackMounting.js";
import type { RendererDefinition } from "../types/RendererDefinition.js";

type DomRendererDefinition = RendererDefinition & {
  renderDom: (object: TransformationSet) => HTMLElement;
};

function isTransformationSet(
  object: Parameters<RendererDefinition["render"]>[0]
): object is TransformationSet {
  return object.pedagogicalType === "transformation";
}

function createMessage(message: string): HTMLElement {
  const section = document.createElement("section");
  section.className = "bhe-transformation-typing bhe-transformation-typing--unavailable";

  const text = document.createElement("p");
  text.textContent = message;
  section.append(text);

  return section;
}

export const transformationTypingDomRenderer: DomRendererDefinition = {
  id: "transformation-typing-dom-renderer",
  supportedPedagogicalTypes: ["transformation"],
  supportedInteractionModes: ["typing"],
  render(object, interactionMode) {
    return `Renderer ${this.id} can present "${object.metadata.title ?? object.metadata.id}" as ${interactionMode}.`;
  },
  renderDom(object) {
    const transformationData = transformationToInteractionData(object);

    if (transformationData.items.length === 0) {
      return createMessage("This transformation set has no item to transform.");
    }

    const section = document.createElement("section");
    section.className = "bhe-transformation-typing";
    section.dataset.objectId = object.metadata.id;

    const title = document.createElement("h2");
    title.textContent = object.metadata.title ?? object.metadata.id;

    const form = document.createElement("div");
    form.className = "bhe-transformation-typing__items";

    const inputByItemId = new Map<string, HTMLInputElement>();
    const feedbackByItemId = new Map<string, HTMLElement>();

    for (const item of transformationData.items) {
      const card = document.createElement("article");
      card.className = "bhe-transformation-typing__item";
      card.dataset.itemId = item.itemId;

      const sourceBlock = document.createElement("div");
      sourceBlock.className = "bhe-transformation-typing__source-block";

      const sourceLabel = document.createElement("span");
      sourceLabel.className = "bhe-transformation-typing__label";
      sourceLabel.textContent = "Source";

      const source = document.createElement("p");
      source.className = "bhe-transformation-typing__source";
      source.textContent = item.source;

      sourceBlock.append(sourceLabel, source);

      const operationBlock = document.createElement("div");
      operationBlock.className = "bhe-transformation-typing__operation-block";

      const operationLabel = document.createElement("span");
      operationLabel.className = "bhe-transformation-typing__label";
      operationLabel.textContent = "Operation";

      const operation = document.createElement("p");
      operation.className = "bhe-transformation-typing__operation";
      operation.textContent =
        item.instruction ??
        item.transformationType ??
        "Transform the source into the expected target.";

      operationBlock.append(operationLabel, operation);

      if (item.transformationType) {
        const type = document.createElement("p");
        type.className = "bhe-transformation-typing__type";
        type.textContent = `Type: ${item.transformationType}`;
        operationBlock.append(type);
      }

      const answerBlock = document.createElement("div");
      answerBlock.className = "bhe-transformation-typing__answer-block";

      const inputId = `${object.metadata.id}-${item.itemId}-answer`;
      const label = document.createElement("label");
      label.className = "bhe-transformation-typing__input-label";
      label.htmlFor = inputId;
      label.textContent = "Your transformation";

      const input = document.createElement("input");
      input.id = inputId;
      input.className = "bhe-transformation-typing__input";
      input.type = "text";
      input.name = item.itemId;
      input.autocomplete = "off";
      if (item.hint) {
        input.title = item.hint;
      }

      const feedback = document.createElement("span");
      feedback.className = "bhe-transformation-typing__item-feedback";
      feedback.setAttribute("aria-live", "polite");

      inputByItemId.set(item.itemId, input);
      feedbackByItemId.set(item.itemId, feedback);
      answerBlock.append(label, input, feedback);

      card.append(sourceBlock, operationBlock, answerBlock);
      form.append(card);
    }

    const checkButton = document.createElement("button");
    checkButton.type = "button";
    checkButton.className = "bhe-transformation-typing__check";
    checkButton.textContent = "Check";

    const feedbackContainer = document.createElement("div");
    feedbackContainer.className = "bhe-transformation-typing__feedback";
    feedbackContainer.setAttribute("aria-live", "polite");

    checkButton.addEventListener("click", () => {
      const input: TransformationTypingUserInput = {
        kind: "transformation-typing",
        timestamp: new Date().toISOString(),
        attempts: Array.from(inputByItemId, ([itemId, inputElement]) => ({
          itemId,
          value: inputElement.value
        }))
      };
      const result = evaluateTransformationTyping(transformationData, input);

      for (const itemElement of Array.from(form.querySelectorAll<HTMLElement>("[data-item-id]"))) {
        itemElement.classList.remove("is-correct", "is-incorrect");
      }

      for (const itemResult of result.details?.itemResults ?? []) {
        const itemElement = form.querySelector<HTMLElement>(
          `[data-item-id="${itemResult.itemId}"]`
        );
        const feedback = feedbackByItemId.get(itemResult.itemId);

        itemElement?.classList.toggle("is-correct", itemResult.isCorrect);
        itemElement?.classList.toggle("is-incorrect", !itemResult.isCorrect);

        if (feedback) {
          feedback.textContent = itemResult.isCorrect ? "Correct transformation." : "Try again.";
          feedback.dataset.status = itemResult.isCorrect ? "correct" : "incorrect";
        }
      }

      mountFeedbackFromResult({ result, container: feedbackContainer });
    });

    section.append(title, form, checkButton, feedbackContainer);
    return section;
  }
};

export function renderTransformationTypingDom(
  object: Parameters<RendererDefinition["render"]>[0]
): HTMLElement {
  if (!isTransformationSet(object)) {
    return createMessage("This object cannot be rendered as transformation typing.");
  }

  return transformationTypingDomRenderer.renderDom(object);
}
