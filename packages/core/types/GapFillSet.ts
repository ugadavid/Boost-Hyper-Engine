import type { InteractionMode } from "./InteractionMode.js";
import type { PedagogicalObject } from "./PedagogicalObject.js";

export interface GapFillBlank {
  /**
   * Stable blank identifier.
   */
  id: string;

  /**
   * Optional human-readable label.
   */
  label?: string;

  /**
   * Optional start offset in the context.
   */
  start?: number;

  /**
   * Optional end offset in the context.
   */
  end?: number;

  /**
   * Expected answer or accepted answers.
   */
  expected: string | string[];

  /**
   * Optional hint.
   */
  hint?: string;

  /**
   * Optional blank-specific feedback.
   */
  feedback?: string;

  /**
   * Optional blank metadata.
   */
  metadata?: Record<string, unknown>;
}

export interface GapFillSetCore {
  /**
   * Context containing missing zones.
   */
  context: string;

  /**
   * Blanks to complete.
   */
  blanks: GapFillBlank[];

  /**
   * Whether several answers can be accepted for the same blank.
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
 * Pedagogical object specialized for gap-fill activities.
 */
export interface GapFillSet extends PedagogicalObject<GapFillSetCore> {
  pedagogicalFamily: "productive";
  pedagogicalType: "gap-fill";

  /**
   * Interaction modes that can present this gap-fill set.
   */
  interactionModes: InteractionMode[];
}
