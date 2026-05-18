import type {
  BHEResult,
  BHEResultStatus,
  InferenceChoiceData,
  InferenceJustifiedChoiceUserInput
} from "../types/index.js";

export interface InferenceJustifiedChoiceResultDetails {
  selectedChoiceId: string;
  expectedChoiceId?: string;
  isChoiceCorrect: boolean;
  requireJustification: boolean;
  justificationProvided: boolean;
  justificationEvaluated: false;
}

export function evaluateInferenceJustifiedChoice(
  data: InferenceChoiceData,
  input: InferenceJustifiedChoiceUserInput
): BHEResult<InferenceJustifiedChoiceResultDetails> {
  const expectedChoice = data.choices.find((choice) => choice.isExpected === true);
  const selectedChoice = data.choices.find((choice) => choice.choiceId === input.selectedChoiceId);
  const isChoiceCorrect = selectedChoice?.isExpected === true;
  const requireJustification = data.requireJustification === true;
  const justificationProvided = !!input.justification?.trim();
  const score = Number(isChoiceCorrect) + Number(requireJustification && justificationProvided);
  const maxScore = requireJustification ? 2 : 1;
  const completion = score / maxScore;
  const status: BHEResultStatus =
    score === maxScore ? "success" : score > 0 ? "partial" : "failed";
  const details: InferenceJustifiedChoiceResultDetails = {
    selectedChoiceId: input.selectedChoiceId,
    isChoiceCorrect,
    requireJustification,
    justificationProvided,
    justificationEvaluated: false
  };

  if (expectedChoice !== undefined) {
    details.expectedChoiceId = expectedChoice.choiceId;
  }

  return {
    objectId: data.promptId,
    status,
    score,
    maxScore,
    completion,
    details
  };
}
