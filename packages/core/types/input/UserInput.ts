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

export interface AssociationDragDropUserInput extends BaseUserInput {
  interactionMode: "drag-drop";
  placements: {
    entryId: string;
    zoneId: string;
  }[];
}

export interface ClassificationDragDropUserInput extends BaseUserInput {
  interactionMode: "drag-drop";
  placements: {
    itemId: string;
    categoryId: string;
  }[];
}

export type UserInput =
  | QcmUserInput
  | ContextualTypingUserInput
  | AssociationDragDropUserInput
  | ClassificationDragDropUserInput;
