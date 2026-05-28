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

export interface SequenceReorderUserInput {
  kind: "sequence-reorder";
  orderedItemIds: string[];
  timestamp?: string;
  metadata?: Record<string, unknown>;
}

export interface InferenceJustifiedChoiceUserInput {
  kind: "inference-justified-choice";
  selectedChoiceId: string;
  justification?: string;
  timestamp?: string;
  metadata?: Record<string, unknown>;
}

export interface IdentificationSelectionUserInput {
  kind: "identification-selection";
  selectedTargetIds: string[];
  timestamp?: string;
  metadata?: Record<string, unknown>;
}

export interface TransformationTypingUserInput {
  kind: "transformation-typing";
  attempts: {
    itemId: string;
    value: string;
  }[];
  timestamp?: string;
  metadata?: Record<string, unknown>;
}

export interface MemorizationTypingRecallUserInput {
  kind: "memorization-typing-recall";
  attempts: {
    itemId: string;
    value: string;
  }[];
  timestamp?: string;
  metadata?: Record<string, unknown>;
}

export type UserInput =
  | QcmUserInput
  | ContextualTypingUserInput
  | AssociationDragDropUserInput
  | ClassificationDragDropUserInput
  | IdentificationSelectionUserInput
  | InferenceJustifiedChoiceUserInput
  | MemorizationTypingRecallUserInput
  | SequenceReorderUserInput
  | TransformationTypingUserInput;
