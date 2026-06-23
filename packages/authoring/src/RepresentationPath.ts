import type { BHEResultStatus, InteractionMode } from "../../core/types/index.js";

/**
 * Existing BHE interaction-data types referenced by the first experimental
 * authoring paths. A path points to a carrier; it does not instantiate it.
 */
export type RepresentationInteractionDataType =
  | "ClassificationDragDropData"
  | "IdentificationSelectionData"
  | "MemorizationTypingRecallData";

/** Existing BHE UserInput interfaces referenced by the prototype. */
export type RepresentationUserInputType =
  | "ClassificationDragDropUserInput"
  | "ContextualTypingUserInput"
  | "IdentificationSelectionUserInput"
  | "MemorizationTypingRecallUserInput";

/** How closely an existing BHE carrier expresses the intended response. */
export type RepresentationFit = "semantic" | "structural";

/** Whether and how the represented learner response should be evaluated. */
export type RepresentationEvaluationPolicy =
  | {
      kind: "non-evaluative";
      correctness: "not-applicable";
    }
  | {
      kind: "existing-evaluator";
      correctness: "deterministic";
      evaluator: string;
    }
  | {
      kind: "context-dependent";
      correctness: "activity-defined";
    };

/** Expected BHEResult shape, expressed without producing a result. */
export interface RepresentationResultExpectation {
  statuses: readonly BHEResultStatus[];
  score: "included" | "omitted" | "context-dependent";
  meaning: string;
}

/**
 * Experimental author-facing trace from a pedagogical use to existing BHE
 * representation vocabulary.
 *
 * This is descriptive data only. It does not select a renderer, create an
 * input, call an evaluator, or emit a BHEResult.
 */
export interface RepresentationPath {
  pedagogicalUseId: string;
  interaction: {
    suggestedShape: InteractionMode;
    interactionDataType?: RepresentationInteractionDataType;
    fit: RepresentationFit;
    meaning: string;
  };
  input: {
    type: RepresentationUserInputType;
    fit: RepresentationFit;
    meaning: string;
  };
  evaluation: RepresentationEvaluationPolicy;
  result: RepresentationResultExpectation;
  authorNotes: readonly string[];
}
