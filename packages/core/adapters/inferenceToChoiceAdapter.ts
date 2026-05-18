import type { InferencePrompt, InferenceSet } from "../types/index.js";
import type {
  InferenceChoiceOption,
  InferenceChoiceData
} from "../types/interaction-data/index.js";

function createChoice(promptId: string, label: string, index: number): InferenceChoiceOption {
  return {
    choiceId: `${promptId}-choice-${index + 1}`,
    label,
    isExpected: true
  };
}

function promptChoiceToInteractionChoice(
  choice: NonNullable<InferencePrompt["choices"]>[number]
): InferenceChoiceOption {
  const interactionChoice: InferenceChoiceOption = {
    choiceId: choice.id,
    label: choice.label
  };

  if (choice.isExpected !== undefined) {
    interactionChoice.isExpected = choice.isExpected;
  }

  if (choice.feedback !== undefined) {
    interactionChoice.feedback = choice.feedback;
  }

  return interactionChoice;
}

function promptToChoiceData(
  prompt: InferencePrompt,
  requireJustification?: boolean
): InferenceChoiceData {
  const choices =
    prompt.choices && prompt.choices.length > 0
      ? prompt.choices.map(promptChoiceToInteractionChoice)
      : [
          ...(prompt.expectedInference ? [prompt.expectedInference] : []),
          ...(prompt.acceptedInferences ?? [])
        ].map((label, index) => createChoice(prompt.id, label, index));
  const data: InferenceChoiceData = {
    promptId: prompt.id,
    question: prompt.question,
    choices
  };

  if (requireJustification !== undefined) {
    data.requireJustification = requireJustification;
  }

  return data;
}

export function inferenceToChoiceData(object: InferenceSet): InferenceChoiceData[] {
  return object.content.core.prompts.map((prompt) =>
    promptToChoiceData(prompt, object.content.core.requireJustification)
  );
}
