import type { InteractionMode } from "./InteractionMode.js";
import type { PedagogicalObject } from "./PedagogicalObject.js";

export interface InferenceEvidence {
  /**
   * Stable evidence identifier.
   */
  id: string;

  /**
   * Human-readable evidence label.
   */
  label: string;

  /**
   * Optional reference to the source that contains this evidence.
   */
  sourceRef?: string;

  /**
   * Optional start offset in the source context.
   */
  start?: number;

  /**
   * Optional end offset in the source context.
   */
  end?: number;

  /**
   * Optional evidence kind, for example "transparent-word", "suffix", or
   * "context-clue".
   */
  kind?: string;

  /**
   * Optional evidence metadata.
   */
  metadata?: Record<string, unknown>;
}

export interface InferencePrompt {
  /**
   * Stable prompt identifier.
   */
  id: string;

  /**
   * Question presented to the learner.
   */
  question: string;

  /**
   * Main expected inference.
   */
  expectedInference?: string;

  /**
   * Alternative accepted inferences.
   */
  acceptedInferences?: string[];

  /**
   * Accepted justifications for the inference.
   */
  acceptedJustifications?: string[];

  /**
   * Evidence identifiers that can support this inference.
   */
  evidenceIds?: string[];

  /**
   * Optional hint.
   */
  hint?: string;

  /**
   * Optional prompt-specific feedback.
   */
  feedback?: string;

  /**
   * Optional prompt metadata.
   */
  metadata?: Record<string, unknown>;
}

export interface InferenceSetCore {
  /**
   * Context from which learners should infer information.
   */
  context: string;

  /**
   * Inference prompts.
   */
  prompts: InferencePrompt[];

  /**
   * Optional evidence available in the context.
   */
  evidence?: InferenceEvidence[];

  /**
   * Whether several inferences can be accepted for a prompt.
   */
  allowMultipleInferences?: boolean;

  /**
   * Whether learners must justify their inference.
   */
  requireJustification?: boolean;

  /**
   * Whether learners can provide a confidence level.
   */
  confidenceScale?: boolean;
}

/**
 * Pedagogical object specialized for inference-based activities.
 */
export interface InferenceSet extends PedagogicalObject<InferenceSetCore> {
  pedagogicalFamily: "interpretive";
  pedagogicalType: "inference";

  /**
   * Interaction modes that can present this inference set.
   */
  interactionModes: InteractionMode[];
}
