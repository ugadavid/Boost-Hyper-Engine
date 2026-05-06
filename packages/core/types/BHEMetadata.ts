/**
 * Metadata shared by every Boost Hyper Engine object.
 *
 * This interface is intentionally small: specialized objects can require
 * stricter metadata by extending it or by using a narrower metadata type.
 */
export interface BHEMetadata {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Human-readable title.
   */
  title?: string;

  /**
   * Main language, when relevant.
   */
  language?: string;

  /**
   * Target level, when relevant.
   */
  level?: string;

  /**
   * Tags used for search, filtering, and organization.
   */
  tags?: string[];

  /**
   * Creation date, preferably as an ISO 8601 string.
   */
  createdAt?: string;

  /**
   * Last update date, preferably as an ISO 8601 string.
   */
  updatedAt?: string;

  /**
   * Author name or identifier.
   */
  author?: string;
}
