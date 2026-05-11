export interface BaseUserInput {
  interactionMode: string;
  timestamp?: string;
  metadata?: Record<string, unknown>;
}

export interface QcmUserInput extends BaseUserInput {
  interactionMode: "qcm";
  selectedChoiceId: string;
}

export interface ContextualTypingUserInput extends BaseUserInput {
  interactionMode: "typing";
  typedAnswers: {
    blankId: string;
    value: string;
  }[];
}

export type UserInput = QcmUserInput | ContextualTypingUserInput;
