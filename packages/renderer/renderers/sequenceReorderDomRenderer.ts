import { sequenceToReorderData } from "../../core/adapters/index.js";
import { evaluateSequenceReorder } from "../../core/evaluators/index.js";
import type { SequenceReorderUserInput, SequenceSet } from "../../core/types/index.js";
import { mountFeedbackFromResult } from "../feedback/feedbackMounting.js";
import type { RendererDefinition } from "../types/RendererDefinition.js";

type DomRendererDefinition = RendererDefinition & {
  renderDom: (object: SequenceSet) => HTMLElement;
};

function isSequenceSet(object: Parameters<RendererDefinition["render"]>[0]): object is SequenceSet {
  return object.pedagogicalType === "sequence";
}

function createMessage(message: string): HTMLElement {
  const section = document.createElement("section");
  section.className = "bhe-sequence-reorder bhe-sequence-reorder--unavailable";

  const text = document.createElement("p");
  text.textContent = message;
  section.append(text);

  return section;
}

function orderedItemIdsFromList(list: HTMLOListElement): string[] {
  return Array.from(list.querySelectorAll<HTMLElement>("[data-item-id]")).flatMap((item) => {
    const itemId = item.dataset.itemId;
    return itemId ? [itemId] : [];
  });
}

export const sequenceReorderDomRenderer: DomRendererDefinition = {
  id: "sequence-reorder-dom-renderer",
  supportedPedagogicalTypes: ["sequence"],
  supportedInteractionModes: ["reorder"],
  render(object, interactionMode) {
    return `Renderer ${this.id} can present "${object.metadata.title ?? object.metadata.id}" as ${interactionMode}.`;
  },
  renderDom(object) {
    const reorderData = sequenceToReorderData(object);

    if (reorderData.items.length === 0) {
      return createMessage("This sequence has no item to reorder.");
    }

    const section = document.createElement("section");
    section.className = "bhe-sequence-reorder";
    section.dataset.objectId = object.metadata.id;

    const title = document.createElement("h2");
    title.textContent = object.metadata.title ?? object.metadata.id;

    const announcements = document.createElement("p");
    announcements.className = "bhe-sequence-reorder__announcements";
    announcements.setAttribute("aria-live", "polite");

    const list = document.createElement("ol");
    list.className = "bhe-sequence-reorder__list";

    const feedbackContainer = document.createElement("div");
    feedbackContainer.className = "bhe-sequence-reorder__feedback";
    feedbackContainer.setAttribute("aria-live", "polite");

    function announce(message: string): void {
      announcements.textContent = message;
    }

    function updateMoveButtons(): void {
      const items = Array.from(list.querySelectorAll<HTMLLIElement>("[data-item-id]"));

      items.forEach((item, index) => {
        const upButton = item.querySelector<HTMLButtonElement>("[data-action='move-up']");
        const downButton = item.querySelector<HTMLButtonElement>("[data-action='move-down']");

        if (upButton) {
          upButton.disabled = index === 0;
        }

        if (downButton) {
          downButton.disabled = index === items.length - 1;
        }
      });
    }

    function moveItem(item: HTMLLIElement, direction: "up" | "down"): void {
      const label = item.querySelector<HTMLElement>(".bhe-sequence-reorder__label")?.textContent ?? "item";

      if (direction === "up") {
        const previous = item.previousElementSibling;
        if (!previous) {
          announce(`"${label}" is already first.`);
          return;
        }

        list.insertBefore(item, previous);
      } else {
        const next = item.nextElementSibling;
        if (!next) {
          announce(`"${label}" is already last.`);
          return;
        }

        list.insertBefore(next, item);
      }

      updateMoveButtons();
      const newPosition = Array.from(list.children).indexOf(item) + 1;
      announce(`Moved "${label}" to position ${newPosition}.`);
      const focusTarget = item.querySelector<HTMLButtonElement>(
        direction === "up" ? "[data-action='move-up']" : "[data-action='move-down']"
      );
      focusTarget?.focus();
    }

    const itemsByInitialPosition = [...reorderData.items].sort(
      (left, right) => (left.initialPosition ?? 0) - (right.initialPosition ?? 0)
    );

    for (const itemData of itemsByInitialPosition) {
      const item = document.createElement("li");
      item.className = "bhe-sequence-reorder__item";
      item.dataset.itemId = itemData.itemId;

      const label = document.createElement("span");
      label.className = "bhe-sequence-reorder__label";
      label.textContent = itemData.label;

      const controls = document.createElement("span");
      controls.className = "bhe-sequence-reorder__controls";

      const moveUp = document.createElement("button");
      moveUp.type = "button";
      moveUp.className = "bhe-sequence-reorder__move";
      moveUp.dataset.action = "move-up";
      moveUp.textContent = "Move up";
      moveUp.setAttribute("aria-label", `Move "${itemData.label}" up`);
      moveUp.addEventListener("click", () => {
        moveItem(item, "up");
      });

      const moveDown = document.createElement("button");
      moveDown.type = "button";
      moveDown.className = "bhe-sequence-reorder__move";
      moveDown.dataset.action = "move-down";
      moveDown.textContent = "Move down";
      moveDown.setAttribute("aria-label", `Move "${itemData.label}" down`);
      moveDown.addEventListener("click", () => {
        moveItem(item, "down");
      });

      controls.append(moveUp, moveDown);
      item.append(label, controls);
      list.append(item);
    }

    updateMoveButtons();

    const checkButton = document.createElement("button");
    checkButton.type = "button";
    checkButton.className = "bhe-sequence-reorder__check";
    checkButton.textContent = "Check";
    checkButton.addEventListener("click", () => {
      const input: SequenceReorderUserInput = {
        kind: "sequence-reorder",
        timestamp: new Date().toISOString(),
        orderedItemIds: orderedItemIdsFromList(list)
      };
      const result = evaluateSequenceReorder(reorderData, input);

      for (const item of Array.from(list.querySelectorAll<HTMLElement>("[data-item-id]"))) {
        item.classList.remove("is-correct", "is-incorrect");
      }

      for (const positionResult of result.details?.exactPositionResults ?? []) {
        if (!positionResult.actualItemId) continue;

        const item = list.querySelector<HTMLElement>(
          `[data-item-id="${positionResult.actualItemId}"]`
        );
        item?.classList.toggle("is-correct", positionResult.isCorrect);
        item?.classList.toggle("is-incorrect", !positionResult.isCorrect);
      }

      mountFeedbackFromResult({ result, container: feedbackContainer });
    });

    section.append(title, announcements, list, checkButton, feedbackContainer);
    return section;
  }
};

export function renderSequenceReorderDom(
  object: Parameters<RendererDefinition["render"]>[0]
): HTMLElement {
  if (!isSequenceSet(object)) {
    return createMessage("This object cannot be rendered as sequence reorder.");
  }

  return sequenceReorderDomRenderer.renderDom(object);
}
