import type { InteractionMode } from "./InteractionMode.js";
import type { PedagogicalObject } from "./PedagogicalObject.js";
import type { ContentUnit } from "./content/index.js";

export interface MemorizationItem {
  /**
   * Stable item identifier.
   */
  id: string;

  /**
   * Cue shown first to trigger recall.
   */
  cue: string;

  /**
   * Target content the learner should retain and retrieve.
   */
  target: string;

  /**
   * Additional accepted recall variants.
   */
  accepted?: string[];

  /**
   * Optional structured cue content.
   */
  unit?: ContentUnit;

  /**
   * Optional recall hint.
   */
  hint?: string;

  /**
   * Optional item metadata.
   */
  metadata?: Record<string, unknown>;
}

export interface MemorizationSetCore {
  /**
   * What retention or recall this set is meant to support.
   */
  recallGoal: string;

  /**
   * Items intended for retention and retrieval.
   */
  items: MemorizationItem[];
}

/**
 * Pedagogical object specialized for retention and recall.
 */
export interface MemorizationSet extends PedagogicalObject<MemorizationSetCore> {
  pedagogicalFamily: "retentive";
  pedagogicalType: "memorization";

  /**
   * Interaction modes that can present this memorization set.
   */
  interactionModes: InteractionMode[];
}
