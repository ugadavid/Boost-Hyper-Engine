import { evaluateClassificationQcm } from "../../core/evaluators/index.js";
import type { ClassificationSet, QcmUserInput } from "../../core/types/index.js";
import { classificationToQcmData } from "../adapters/classificationToQcmAdapter.js";
import { mountFeedbackFromResult } from "../feedback/feedbackMounting.js";
import type { RendererDefinition } from "../types/RendererDefinition.js";

type DomRendererDefinition = RendererDefinition & {
  renderDom: (object: ClassificationSet) => HTMLElement;
};

function isClassificationSet(
  object: Parameters<RendererDefinition["render"]>[0]
): object is ClassificationSet {
  return object.pedagogicalType === "classification";
}

function createMessage(message: string): HTMLElement {
  const section = document.createElement("section");
  section.className = "bhe-qcm bhe-qcm--unavailable";

  const text = document.createElement("p");
  text.textContent = message;
  section.append(text);

  return section;
}

export const classificationQcmDomRenderer: DomRendererDefinition = {
  id: "classification-qcm-dom-renderer",
  supportedPedagogicalTypes: ["classification"],
  supportedInteractionModes: ["qcm"],
  render(object, interactionMode) {
    return `Renderer ${this.id} can present "${object.metadata.title ?? object.metadata.id}" as ${interactionMode}.`;
  },
  renderDom(object) {
    const qcmData = classificationToQcmData(object);
    const firstQuestion = qcmData.questions[0];

    if (!firstQuestion) {
      return createMessage("This classification set has no item to classify.");
    }

    const section = document.createElement("section");
    section.className = "bhe-qcm";
    section.dataset.objectId = object.metadata.id;

    const title = document.createElement("h2");
    title.textContent = object.metadata.title ?? object.metadata.id;

    const question = document.createElement("p");
    question.className = "bhe-qcm__question";
    question.textContent = firstQuestion.prompt;

    const choices = document.createElement("div");
    choices.className = "bhe-qcm__choices";

    const feedback = document.createElement("div");
    feedback.className = "bhe-qcm__feedback";
    feedback.setAttribute("aria-live", "polite");

    for (const choiceData of firstQuestion.choices) {
      const choice = document.createElement("button");
      choice.type = "button";
      choice.className = "bhe-qcm__choice";
      choice.textContent = choiceData.label;

      choice.addEventListener("click", () => {
        choices.querySelectorAll("button").forEach((button) => {
          button.removeAttribute("aria-pressed");
          button.classList.remove("is-selected", "is-correct", "is-incorrect");
        });

        const input: QcmUserInput = {
          interactionMode: "qcm",
          selectedChoiceId: choiceData.id,
          timestamp: new Date().toISOString()
        };
        const result = evaluateClassificationQcm(firstQuestion, input);
        const isCorrect = result.details?.isCorrect === true;

        choice.setAttribute("aria-pressed", "true");
        choice.classList.add("is-selected", isCorrect ? "is-correct" : "is-incorrect");
        mountFeedbackFromResult({ result, container: feedback });
      });

      choices.append(choice);
    }

    section.append(title, question, choices, feedback);
    return section;
  }
};

export function renderClassificationQcmDom(
  object: Parameters<RendererDefinition["render"]>[0]
): HTMLElement {
  if (!isClassificationSet(object)) {
    return createMessage("This object cannot be rendered as a classification QCM.");
  }

  return classificationQcmDomRenderer.renderDom(object);
}
