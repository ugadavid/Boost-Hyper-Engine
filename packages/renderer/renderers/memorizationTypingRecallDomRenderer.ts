import { memorizationToTypingRecallData } from "../../core/adapters/index.js";
import { evaluateMemorizationTypingRecall } from "../../core/evaluators/index.js";
import type {
  MemorizationSet,
  MemorizationTypingRecallUserInput
} from "../../core/types/index.js";
import { mountFeedbackFromResult } from "../feedback/feedbackMounting.js";
import type { RendererDefinition } from "../types/RendererDefinition.js";

type DomRendererDefinition = RendererDefinition & {
  renderDom: (object: MemorizationSet) => HTMLElement;
};

function isMemorizationSet(
  object: Parameters<RendererDefinition["render"]>[0]
): object is MemorizationSet {
  return object.pedagogicalType === "memorization";
}

function createMessage(message: string): HTMLElement {
  const section = document.createElement("section");
  section.className =
    "bhe-memorization-typing-recall bhe-memorization-typing-recall--unavailable";

  const text = document.createElement("p");
  text.textContent = message;
  section.append(text);

  return section;
}

export const memorizationTypingRecallDomRenderer: DomRendererDefinition = {
  id: "memorization-typing-recall-dom-renderer",
  supportedPedagogicalTypes: ["memorization"],
  supportedInteractionModes: ["typing"],
  render(object, interactionMode) {
    return `Renderer ${this.id} can present "${object.metadata.title ?? object.metadata.id}" as ${interactionMode}.`;
  },
  renderDom(object) {
    const recallData = memorizationToTypingRecallData(object);

    if (recallData.items.length === 0) {
      return createMessage("This memorization set has no item to recall.");
    }

    const section = document.createElement("section");
    section.className = "bhe-memorization-typing-recall";
    section.dataset.objectId = object.metadata.id;

    const title = document.createElement("h2");
    title.textContent = object.metadata.title ?? object.metadata.id;

    const goal = document.createElement("p");
    goal.className = "bhe-memorization-typing-recall__goal";
    goal.textContent = recallData.recallGoal;

    const form = document.createElement("div");
    form.className = "bhe-memorization-typing-recall__items";

    const inputByItemId = new Map<string, HTMLInputElement>();
    const feedbackByItemId = new Map<string, HTMLElement>();

    for (const item of recallData.items) {
      const card = document.createElement("article");
      card.className = "bhe-memorization-typing-recall__item";
      card.dataset.itemId = item.itemId;

      const cueLabel = document.createElement("span");
      cueLabel.className = "bhe-memorization-typing-recall__label";
      cueLabel.textContent = "Cue";

      const cue = document.createElement("p");
      cue.className = "bhe-memorization-typing-recall__cue";
      cue.textContent = item.cueLabel;

      const answerBlock = document.createElement("div");
      answerBlock.className = "bhe-memorization-typing-recall__answer-block";

      const inputId = `${object.metadata.id}-${item.itemId}-recall`;
      const label = document.createElement("label");
      label.className = "bhe-memorization-typing-recall__input-label";
      label.htmlFor = inputId;
      label.textContent = "Your recalled target";

      const input = document.createElement("input");
      input.id = inputId;
      input.className = "bhe-memorization-typing-recall__input";
      input.type = "text";
      input.name = item.itemId;
      input.autocomplete = "off";
      if (item.hint) {
        input.title = item.hint;
      }

      const feedback = document.createElement("span");
      feedback.className = "bhe-memorization-typing-recall__item-feedback";
      feedback.setAttribute("aria-live", "polite");

      inputByItemId.set(item.itemId, input);
      feedbackByItemId.set(item.itemId, feedback);
      answerBlock.append(label, input, feedback);

      card.append(cueLabel, cue);

      if (item.hint) {
        const hint = document.createElement("p");
        hint.className = "bhe-memorization-typing-recall__hint";
        hint.textContent = `Hint: ${item.hint}`;
        card.append(hint);
      }

      card.append(answerBlock);
      form.append(card);
    }

    const actions = document.createElement("div");
    actions.className = "bhe-memorization-typing-recall__actions";

    const checkButton = document.createElement("button");
    checkButton.type = "button";
    checkButton.className = "bhe-memorization-typing-recall__check";
    checkButton.textContent = "Check";

    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className = "bhe-memorization-typing-recall__reset";
    resetButton.textContent = "Reset";

    const feedbackContainer = document.createElement("div");
    feedbackContainer.className = "bhe-memorization-typing-recall__feedback";
    feedbackContainer.setAttribute("aria-live", "polite");

    checkButton.addEventListener("click", () => {
      const input: MemorizationTypingRecallUserInput = {
        kind: "memorization-typing-recall",
        timestamp: new Date().toISOString(),
        attempts: Array.from(inputByItemId, ([itemId, inputElement]) => ({
          itemId,
          value: inputElement.value
        }))
      };
      const result = evaluateMemorizationTypingRecall(recallData, input);

      for (const itemElement of Array.from(
        form.querySelectorAll<HTMLElement>("[data-item-id]")
      )) {
        itemElement.classList.remove("is-correct", "is-incorrect");
      }

      for (const itemResult of result.details?.itemResults ?? []) {
        const itemElement = form.querySelector<HTMLElement>(
          `[data-item-id="${itemResult.itemId}"]`
        );
        const itemFeedback = feedbackByItemId.get(itemResult.itemId);

        itemElement?.classList.toggle("is-correct", itemResult.isCorrect);
        itemElement?.classList.toggle("is-incorrect", !itemResult.isCorrect);

        if (itemFeedback) {
          itemFeedback.textContent = itemResult.isCorrect
            ? "Correct recall."
            : "Not recalled yet.";
          itemFeedback.dataset.status = itemResult.isCorrect ? "correct" : "incorrect";
        }
      }

      mountFeedbackFromResult({ result, container: feedbackContainer });
    });

    resetButton.addEventListener("click", () => {
      for (const inputElement of inputByItemId.values()) {
        inputElement.value = "";
        inputElement.classList.remove("is-correct", "is-incorrect");
      }

      for (const itemElement of Array.from(
        form.querySelectorAll<HTMLElement>("[data-item-id]")
      )) {
        itemElement.classList.remove("is-correct", "is-incorrect");
      }

      for (const itemFeedback of feedbackByItemId.values()) {
        itemFeedback.textContent = "";
        delete itemFeedback.dataset.status;
      }

      feedbackContainer.replaceChildren();
    });

    actions.append(checkButton, resetButton);
    section.append(title, goal, form, actions, feedbackContainer);
    return section;
  }
};

export function renderMemorizationTypingRecallDom(
  object: Parameters<RendererDefinition["render"]>[0]
): HTMLElement {
  if (!isMemorizationSet(object)) {
    return createMessage("This object cannot be rendered as memorization typing recall.");
  }

  return memorizationTypingRecallDomRenderer.renderDom(object);
}
