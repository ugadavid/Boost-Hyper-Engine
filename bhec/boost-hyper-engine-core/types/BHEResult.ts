export type BHEResultStatus =
  | "success"
  | "partial"
  | "failed"
  | "skipped"
  | "completed";

/**
 * Standard result emitted by a BHE object after an interaction, evaluation,
 * rendering step, or any other meaningful process.
 */
export interface BHEResult<TDetails = unknown> {
  /**
   * Identifier of the object that produced the result.
   */
  objectId: string;

  /**
   * Result status, intentionally broader than correct/incorrect.
   */
  status: BHEResultStatus;

  /**
   * Optional normalized score. This is only one possible result signal.
   */
  score?: number;

  /**
   * Optional maximum score, when the result is score-based.
   */
  maxScore?: number;

  /**
   * Optional completion ratio between 0 and 1.
   */
  completion?: number;

  /**
   * Optional time spent in milliseconds.
   */
  durationMs?: number;

  /**
   * Optional tags or signals produced by the object.
   */
  signals?: string[];

  /**
   * Optional object-specific details.
   */
  details?: TDetails;
}
