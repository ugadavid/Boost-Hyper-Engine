import type { InteractionMode } from "./InteractionMode.js";
import type { PedagogicalObject } from "./PedagogicalObject.js";

export type AssociationInteractionMode = InteractionMode;

/**
 * A reusable entry in an association set.
 */
export interface AssociationEntry {
  /**
   * Stable entry identifier.
   */
  id: string;

  /**
   * Human-readable content.
   */
  label: string;

  /**
   * Optional entry kind, for example "word", "definition", "image", or
   * "audio".
   */
  kind?: string;
}

/**
 * A relationship between two or more entries.
 */
export interface AssociationPair {
  /**
   * Stable association identifier.
   */
  id: string;

  /**
   * Entry identifiers that belong together.
   */
  entryIds: string[];

  /**
   * Optional explanation or feedback for the association.
   */
  feedback?: string;
}

export interface AssociationSetCore {
  /**
   * Reusable entries that can be associated.
   */
  entries: AssociationEntry[];

  /**
   * Expected associations between entries.
   */
  associations: AssociationPair[];
}

/**
 * Pedagogical object specialized for association-based activities.
 *
 * The same AssociationSet can be presented through multiple interaction modes,
 * such as drag-drop, memory, or flashcards.
 */
export interface AssociationSet extends PedagogicalObject<AssociationSetCore> {
  pedagogicalFamily: "structural";
  pedagogicalType: "association";
  /**
   * Interaction modes that can present this association set.
   */
  interactionModes: InteractionMode[];
}
