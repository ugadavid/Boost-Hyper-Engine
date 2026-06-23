import { identificationToSelectionData } from "../../core/adapters/index.js";
import { createCompletedResultFromUserInput } from "../../core/results/index.js";
import type {
  IdentificationSelectionUserInput,
  IdentificationSet
} from "../../core/types/index.js";
import { mountFeedbackFromResult } from "../feedback/feedbackMounting.js";
import type { RendererDefinition } from "../types/RendererDefinition.js";

type DomRendererDefinition = RendererDefinition & {
  renderDom: (object: IdentificationSet) => HTMLElement;
};

function isIdentificationSet(
  object: Parameters<RendererDefinition["render"]>[0]
): object is IdentificationSet {
  return object.pedagogicalType === "identification";
}

function createMessage(message: string): HTMLElement {
  const section = document.createElement("section");
  section.className = "bhe-reflective-selection bhe-reflective-selection--unavailable";

  const text = document.createElement("p");
  text.textContent = message;
  section.append(text);

  return section;
}

function selectedTargetIdsFromFieldset(fieldset: HTMLFieldSetElement): string[] {
  return Array.from(
    fieldset.querySelectorAll<HTMLInputElement>("input[type='checkbox']")
  ).flatMap((input) => (input.checked ? [input.value] : []));
}

export const reflectiveSelectionDomRenderer: DomRendererDefinition = {
  id: "reflective-selection-dom-renderer",
  supportedPedagogicalTypes: ["identification"],
  supportedInteractionModes: ["selection"],
  render(object, interactionMode) {
    return `Renderer ${this.id} can present "${object.metadata.title ?? object.metadata.id}" as ${interactionMode}.`;
  },
  renderDom(object) {
    const selectionData = identificationToSelectionData(object);

    if (selectionData.targets.length === 0) {
      return createMessage("This reflective selection has no statement to select.");
    }

    const section = document.createElement("section");
    section.className = "bhe-reflective-selection";
    section.dataset.objectId = object.metadata.id;

    const title = document.createElement("h2");
    title.textContent = object.metadata.title ?? object.metadata.id;

    const context = document.createElement("p");
    context.className = "bhe-reflective-selection__context";
    context.textContent = selectionData.context;

    const fieldset = document.createElement("fieldset");
    fieldset.className = "bhe-reflective-selection__fieldset";

    const legend = document.createElement("legend");
    legend.textContent =
      selectionData.selectionMode === "single"
        ? "Select the statement that best describes you"
        : "Select the statements that describe you";
    fieldset.append(legend);

    for (const target of selectionData.targets) {
      const option = document.createElement("div");
      option.className = "bhe-reflective-selection__option";
      option.dataset.targetId = target.targetId;

      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = `${object.metadata.id}-${target.targetId}`;
      input.name = `${object.metadata.id}-reflective-targets`;
      input.value = target.targetId;

      const label = document.createElement("label");
      label.htmlFor = input.id;
      label.textContent = target.label;

      option.append(input, label);
      fieldset.append(option);
    }

    const actions = document.createElement("div");
    actions.className = "bhe-reflective-selection__actions";

    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.className = "bhe-reflective-selection__complete";
    completeButton.textContent = "Complete";

    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className = "bhe-reflective-selection__reset";
    resetButton.textContent = "Reset";

    const feedbackContainer = document.createElement("div");
    feedbackContainer.className = "bhe-reflective-selection__feedback";
    feedbackContainer.setAttribute("aria-live", "polite");

    completeButton.addEventListener("click", () => {
      const selectedTargetIds = selectedTargetIdsFromFieldset(fieldset);
      const input: IdentificationSelectionUserInput = {
        kind: "identification-selection",
        timestamp: new Date().toISOString(),
        selectedTargetIds
      };

      const result = createCompletedResultFromUserInput({
        objectId: object.metadata.id,
        input,
        details: {
          selectedTargetIds,
          selectedCount: selectedTargetIds.length
        },
        signals: ["reflective-selection"]
      });

      mountFeedbackFromResult({ result, container: feedbackContainer });
    });

    resetButton.addEventListener("click", () => {
      for (const input of Array.from(
        fieldset.querySelectorAll<HTMLInputElement>("input[type='checkbox']")
      )) {
        input.checked = false;
      }

      feedbackContainer.replaceChildren();
    });

    actions.append(completeButton, resetButton);
    section.append(title, context, fieldset, actions, feedbackContainer);
    return section;
  }
};

export function renderReflectiveSelectionDom(
  object: Parameters<RendererDefinition["render"]>[0]
): HTMLElement {
  if (!isIdentificationSet(object)) {
    return createMessage("This object cannot be rendered as reflective selection.");
  }

  return reflectiveSelectionDomRenderer.renderDom(object);
}
