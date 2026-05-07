import type { InteractionMode } from "./InteractionMode.js";
import type { PedagogicalObject } from "./PedagogicalObject.js";

export interface TransformationItem {
  /**
   * Stable item identifier.
   */
  id: string;

  /**
   * Source form shown to the learner.
   */
  source: string;

  /**
   * Expected transformed form.
   */
  expected: string;

  /**
   * Optional item-specific instruction.
   */
  instruction?: string;

  /**
   * Optional transformation kind, for example "feminine", "plural", or
   * "conjugation".
   */
  transformationType?: string;

  /**
   * Optional hint.
   */
  hint?: string;

  /**
   * Optional item-specific feedback.
   */
  feedback?: string;
}

export interface TransformationSetCore {
  /**
   * Items to transform.
   */
  items: TransformationItem[];

  /**
   * Whether several answers can be accepted for the same source.
   */
  allowMultipleAnswers?: boolean;

  /**
   * Whether uppercase/lowercase differences matter.
   */
  caseSensitive?: boolean;

  /**
   * Whether accent differences matter.
   */
  accentSensitive?: boolean;
}

/**
 * Pedagogical object specialized for transformation-based activities.
 */
export interface TransformationSet extends PedagogicalObject<TransformationSetCore> {
  pedagogicalFamily: "productive";
  pedagogicalType: "transformation";

  /**
   * Interaction modes that can present this transformation set.
   */
  interactionModes: InteractionMode[];
}
