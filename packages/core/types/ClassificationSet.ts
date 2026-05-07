import type { InteractionMode } from "./InteractionMode.js";
import type { PedagogicalObject } from "./PedagogicalObject.js";

export interface ClassificationCategory {
  /**
   * Stable category identifier.
   */
  id: string;

  /**
   * Human-readable category label.
   */
  label: string;

  /**
   * Optional explanation for the category.
   */
  description?: string;
}

export interface ClassificationItem {
  /**
   * Stable item identifier.
   */
  id: string;

  /**
   * Human-readable item label.
   */
  label: string;

  /**
   * Identifier of the expected category.
   */
  categoryId: string;

  /**
   * Optional item kind, for example "word", "image", or "sentence".
   */
  kind?: string;

  /**
   * Optional item-specific feedback.
   */
  feedback?: string;
}

export interface ClassificationSetCore {
  /**
   * Available categories.
   */
  categories: ClassificationCategory[];

  /**
   * Items to classify into categories.
   */
  items: ClassificationItem[];
}

/**
 * Pedagogical object specialized for classification-based activities.
 */
export interface ClassificationSet extends PedagogicalObject<ClassificationSetCore> {
  pedagogicalFamily: "structural";
  pedagogicalType: "classification";

  /**
   * Interaction modes that can present this classification set.
   */
  interactionModes: InteractionMode[];
}
