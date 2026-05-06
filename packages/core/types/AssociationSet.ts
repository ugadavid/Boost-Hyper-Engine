/**
 * Interaction modes that can use the same association content.
 */
export type AssociationInteractionMode = "drag-drop" | "memory" | "flashcards";

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

/**
 * Abstract pedagogical object for association-based activities.
 *
 * The same AssociationSet can later be presented through multiple interaction
 * modes, such as drag-drop, memory, or flashcards.
 */
export interface AssociationSet {
  /**
   * Stable content identifier.
   */
  id: string;

  /**
   * Human-readable title.
   */
  title: string;

  /**
   * Reusable entries that can be associated.
   */
  entries: AssociationEntry[];

  /**
   * Expected associations between entries.
   */
  associations: AssociationPair[];

  /**
   * Interaction modes that can present this association set.
   */
  interactionModes: AssociationInteractionMode[];
}
