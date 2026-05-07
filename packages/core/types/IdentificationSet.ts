import type { InteractionMode } from "./InteractionMode.js";
import type { PedagogicalObject } from "./PedagogicalObject.js";

export interface IdentificationTarget {
  /**
   * Stable target identifier.
   */
  id: string;

  /**
   * Human-readable target label.
   */
  label: string;

  /**
   * Optional start offset in the context.
   */
  start?: number;

  /**
   * Optional end offset in the context.
   */
  end?: number;

  /**
   * Optional target type, for example "transparent-word" or "suffix".
   */
  type?: string;

  /**
   * Whether this target is expected as a correct identification.
   */
  expected?: boolean;

  /**
   * Optional target-specific feedback.
   */
  feedback?: string;

  /**
   * Optional target metadata.
   */
  metadata?: Record<string, unknown>;
}

export interface IdentificationSetCore {
  /**
   * Context in which targets should be identified.
   */
  context: string;

  /**
   * Targets available in the context.
   */
  targets: IdentificationTarget[];

  /**
   * Whether the learner should select one target or several.
   */
  selectionMode?: "single" | "multiple";

  /**
   * Whether partial target matches can be accepted.
   */
  allowPartialMatch?: boolean;
}

/**
 * Pedagogical object specialized for identification-based activities.
 */
export interface IdentificationSet extends PedagogicalObject<IdentificationSetCore> {
  pedagogicalFamily: "interpretive";
  pedagogicalType: "identification";

  /**
   * Interaction modes that can present this identification set.
   */
  interactionModes: InteractionMode[];
}
