import { identificationToSelectionData } from "../../core/adapters/index.js";
import { evaluateIdentificationSelection } from "../../core/evaluators/index.js";
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
  section.className = "bhe-identification-selection bhe-identification-selection--unavailable";

  const text = document.createElement("p");
  text.textContent = message;
  section.append(text);

  return section;
}

function checkedTargetIdsFromFieldset(fieldset: HTMLFieldSetElement): string[] {
  return Array.from(fieldset.querySelectorAll<HTMLInputElement>("input[type='checkbox']")).flatMap(
    (input) => (input.checked ? [input.value] : [])
  );
}

export const identificationSelectionDomRenderer: DomRendererDefinition = {
  id: "identification-selection-dom-renderer",
  supportedPedagogicalTypes: ["identification"],
  supportedInteractionModes: ["selection"],
  render(object, interactionMode) {
    return `Renderer ${this.id} can present "${object.metadata.title ?? object.metadata.id}" as ${interactionMode}.`;
  },
  renderDom(object) {
    const selectionData = identificationToSelectionData(object);

    if (selectionData.targets.length === 0) {
      return createMessage("This identification set has no target to select.");
    }

    const section = document.createElement("section");
    section.className = "bhe-identification-selection";
    section.dataset.objectId = object.metadata.id;

    const title = document.createElement("h2");
    title.textContent = object.metadata.title ?? object.metadata.id;

    const context = document.createElement("p");
    context.className = "bhe-identification-selection__context";
    context.textContent = selectionData.context;

    const fieldset = document.createElement("fieldset");
    fieldset.className = "bhe-identification-selection__fieldset";

    const legend = document.createElement("legend");
    legend.textContent =
      selectionData.selectionMode === "single"
        ? "Select the correct target"
        : "Select all correct targets";
    fieldset.append(legend);

    for (const target of selectionData.targets) {
      const option = document.createElement("div");
      option.className = "bhe-identification-selection__option";
      option.dataset.targetId = target.targetId;

      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = `${object.metadata.id}-${target.targetId}`;
      input.name = `${object.metadata.id}-targets`;
      input.value = target.targetId;

      const label = document.createElement("label");
      label.htmlFor = input.id;
      label.textContent = target.label;

      const status = document.createElement("span");
      status.className = "bhe-identification-selection__target-feedback";
      status.setAttribute("aria-live", "polite");

      option.append(input, label, status);
      fieldset.append(option);
    }

    const checkButton = document.createElement("button");
    checkButton.type = "button";
    checkButton.className = "bhe-identification-selection__check";
    checkButton.textContent = "Check";

    const feedbackContainer = document.createElement("div");
    feedbackContainer.className = "bhe-identification-selection__feedback";
    feedbackContainer.setAttribute("aria-live", "polite");

    checkButton.addEventListener("click", () => {
      const input: IdentificationSelectionUserInput = {
        kind: "identification-selection",
        timestamp: new Date().toISOString(),
        selectedTargetIds: checkedTargetIdsFromFieldset(fieldset)
      };
      const result = evaluateIdentificationSelection(selectionData, input);
      const details = result.details;

      fieldset
        .querySelectorAll<HTMLElement>("[data-target-id]")
        .forEach((option) => {
          option.classList.remove("is-correct", "is-incorrect", "is-missing");
          const status = option.querySelector<HTMLElement>(
            ".bhe-identification-selection__target-feedback"
          );
          if (status) {
            status.textContent = "";
          }
        });

      if (details) {
        for (const targetId of details.correctTargetIds) {
          const option = fieldset.querySelector<HTMLElement>(`[data-target-id="${targetId}"]`);
          const status = option?.querySelector<HTMLElement>(
            ".bhe-identification-selection__target-feedback"
          );
          option?.classList.add("is-correct");
          if (status) {
            status.textContent = "Correct target selected.";
          }
        }

        for (const targetId of details.extraTargetIds) {
          const option = fieldset.querySelector<HTMLElement>(`[data-target-id="${targetId}"]`);
          const status = option?.querySelector<HTMLElement>(
            ".bhe-identification-selection__target-feedback"
          );
          option?.classList.add("is-incorrect");
          if (status) {
            status.textContent = "Extra target selected.";
          }
        }

        for (const targetId of details.missingTargetIds) {
          const option = fieldset.querySelector<HTMLElement>(`[data-target-id="${targetId}"]`);
          const status = option?.querySelector<HTMLElement>(
            ".bhe-identification-selection__target-feedback"
          );
          option?.classList.add("is-missing");
          if (status) {
            status.textContent = "Expected target not selected.";
          }
        }
      }

      mountFeedbackFromResult({ result, container: feedbackContainer });
    });

    section.append(title, context, fieldset, checkButton, feedbackContainer);
    return section;
  }
};

export function renderIdentificationSelectionDom(
  object: Parameters<RendererDefinition["render"]>[0]
): HTMLElement {
  if (!isIdentificationSet(object)) {
    return createMessage("This object cannot be rendered as identification selection.");
  }

  return identificationSelectionDomRenderer.renderDom(object);
}
