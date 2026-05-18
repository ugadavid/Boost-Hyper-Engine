export interface InferenceChoiceOption {
  choiceId: string;
  label: string;
  isExpected?: boolean;
  feedback?: string;
}

export interface InferenceChoiceData {
  promptId: string;
  question: string;
  choices: InferenceChoiceOption[];
  requireJustification?: boolean;
}
