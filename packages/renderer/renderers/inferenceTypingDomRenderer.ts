import type { InferencePrompt, InferenceSet } from "../../core/types/index.js";
import type { RendererDefinition } from "../types/RendererDefinition.js";

type DomRendererDefinition = RendererDefinition & {
  renderDom: (object: InferenceSet) => HTMLElement;
};

function isInferenceSet(object: Parameters<RendererDefinition["render"]>[0]): object is InferenceSet {
  return object.pedagogicalType === "inference";
}

function createMessage(message: string): HTMLElement {
  const section = document.createElement("section");
  section.className = "bhe-inference bhe-inference--unavailable";

  const text = document.createElement("p");
  text.textContent = message;
  section.append(text);

  return section;
}

function normalizeAnswer(value: string): string {
  return value.trim().toLowerCase();
}

function acceptedInferenceAnswers(prompt: InferencePrompt): string[] {
  return [
    ...(prompt.expectedInference ? [prompt.expectedInference] : []),
    ...(prompt.acceptedInferences ?? [])
  ];
}

function isAcceptedInference(value: string, prompt: InferencePrompt): boolean {
  const actual = normalizeAnswer(value);
  return acceptedInferenceAnswers(prompt).some(
    (expected) => normalizeAnswer(expected) === actual
  );
}

export const inferenceTypingDomRenderer: DomRendererDefinition = {
  id: "inference-typing-dom-renderer",
  supportedPedagogicalTypes: ["inference"],
  supportedInteractionModes: ["typing"],
  render(object, interactionMode) {
    return `Renderer ${this.id} can present "${object.metadata.title ?? object.metadata.id}" as ${interactionMode}.`;
  },
  renderDom(object) {
    const section = document.createElement("section");
    section.className = "bhe-inference";
    section.dataset.objectId = object.metadata.id;

    const title = document.createElement("h2");
    title.textContent = object.metadata.title ?? object.metadata.id;

    const context = document.createElement("p");
    context.className = "bhe-inference__context";
    context.textContent = object.content.core.context;

    section.append(title, context);

    if (object.content.core.evidence && object.content.core.evidence.length > 0) {
      const evidenceList = document.createElement("ul");
      evidenceList.className = "bhe-inference__evidence";

      for (const evidence of object.content.core.evidence) {
        const item = document.createElement("li");
        item.textContent = evidence.kind
          ? `${evidence.label} (${evidence.kind})`
          : evidence.label;
        evidenceList.append(item);
      }

      section.append(evidenceList);
    }

    const promptList = document.createElement("div");
    promptList.className = "bhe-inference__prompts";

    for (const prompt of object.content.core.prompts) {
      const promptCard = document.createElement("article");
      promptCard.className = "bhe-inference__prompt";

      const question = document.createElement("h3");
      question.textContent = prompt.question;

      const inferenceLabel = document.createElement("label");
      inferenceLabel.textContent = "Inference";

      const inferenceInput = document.createElement("input");
      inferenceInput.className = "bhe-inference__input";
      inferenceInput.type = "text";
      inferenceInput.name = `${prompt.id}-inference`;
      inferenceInput.placeholder = prompt.hint ?? "Type your inference";

      inferenceLabel.append(inferenceInput);
      promptCard.append(question, inferenceLabel);

      let justificationInput: HTMLTextAreaElement | undefined;

      if (object.content.core.requireJustification) {
        const justificationLabel = document.createElement("label");
        justificationLabel.textContent = "Justification";

        justificationInput = document.createElement("textarea");
        justificationInput.className = "bhe-inference__textarea";
        justificationInput.name = `${prompt.id}-justification`;
        justificationInput.rows = 3;
        justificationInput.placeholder = "Explain your reasoning";

        justificationLabel.append(justificationInput);
        promptCard.append(justificationLabel);
      }

      const checkButton = document.createElement("button");
      checkButton.type = "button";
      checkButton.className = "bhe-inference__check";
      checkButton.textContent = "Check";

      const feedback = document.createElement("p");
      feedback.className = "bhe-inference__feedback";
      feedback.setAttribute("aria-live", "polite");

      checkButton.addEventListener("click", () => {
        const inferenceAccepted = isAcceptedInference(inferenceInput.value, prompt);
        const justificationPresent =
          !object.content.core.requireJustification ||
          !!justificationInput?.value.trim();

        inferenceInput.classList.toggle("is-correct", inferenceAccepted);
        inferenceInput.classList.toggle("is-incorrect", !inferenceAccepted);
        justificationInput?.classList.toggle("is-correct", justificationPresent);
        justificationInput?.classList.toggle("is-incorrect", !justificationPresent);

        const inferenceMessage = inferenceAccepted
          ? "Inference accepted"
          : "Inference not accepted";
        const justificationMessage = object.content.core.requireJustification
          ? justificationPresent
            ? "justification present"
            : "justification missing"
          : "no justification required";

        feedback.textContent = `${inferenceMessage}; ${justificationMessage}.`;
        feedback.dataset.status =
          inferenceAccepted && justificationPresent ? "correct" : "incorrect";
      });

      promptCard.append(checkButton, feedback);
      promptList.append(promptCard);
    }

    section.append(promptList);
    return section;
  }
};

export function renderInferenceTypingDom(
  object: Parameters<RendererDefinition["render"]>[0]
): HTMLElement {
  if (!isInferenceSet(object)) {
    return createMessage("This object cannot be rendered as inference typing.");
  }

  return inferenceTypingDomRenderer.renderDom(object);
}
