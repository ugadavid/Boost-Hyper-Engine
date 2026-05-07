import type { InteractionMode } from "./InteractionMode.js";
import type { PedagogicalObject } from "./PedagogicalObject.js";

export interface SequenceItem {
  /**
   * Stable item identifier.
   */
  id: string;

  /**
   * Human-readable item label.
   */
  label: string;

  /**
   * Optional description or context for the item.
   */
  description?: string;

  /**
   * Optional media reference.
   */
  media?: string;

  /**
   * Expected position in the sequence.
   */
  position: number;

  /**
   * Optional item-specific feedback.
   */
  feedback?: string;
}

export interface SequenceSetCore {
  /**
   * Items to place in order.
   */
  items: SequenceItem[];

  /**
   * Whether partially correct ordering can be accepted or scored.
   */
  allowPartialOrder?: boolean;

  /**
   * Whether items should be shuffled before presentation.
   */
  shuffle?: boolean;
}

/**
 * Pedagogical object specialized for sequence-ordering activities.
 */
export interface SequenceSet extends PedagogicalObject<SequenceSetCore> {
  pedagogicalFamily: "structural";
  pedagogicalType: "sequence";

  /**
   * Interaction modes that can present this sequence set.
   */
  interactionModes: InteractionMode[];
}
