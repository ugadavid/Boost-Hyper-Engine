import type { BHEResultStatus } from "./BHEResult.js";

/**
 * Result fields that can drive adaptive routing.
 */
export type AdaptiveRoutingField =
  | "status"
  | "score"
  | "maxScore"
  | "completion"
  | "durationMs"
  | "signals"
  | "details";

/**
 * Supported operators for declarative routing conditions.
 */
export type AdaptiveRoutingOperator =
  | "equals"
  | "notEquals"
  | "greaterThan"
  | "greaterThanOrEquals"
  | "lessThan"
  | "lessThanOrEquals"
  | "contains";

export type AdaptiveRoutingValue =
  | BHEResultStatus
  | string
  | number
  | boolean
  | string[]
  | number[];

/**
 * Declarative condition evaluated against a BHEResult.
 * Score is only one possible field among broader result signals.
 */
export interface AdaptiveRoutingCondition {
  /**
   * Field read from the BHEResult.
   */
  field: AdaptiveRoutingField;

  /**
   * Operator used to compare the result field with the expected value.
   */
  operator: AdaptiveRoutingOperator;

  /**
   * Expected value for the condition.
   */
  value: AdaptiveRoutingValue;

  /**
   * Optional path used when field is "details".
   * Example: "attempts.count" or "error.category".
   */
  detailsPath?: string;
}

/**
 * A possible next step selected from a BHE result.
 */
export interface AdaptiveRoute {
  /**
   * Stable route identifier.
   */
  id: string;

  /**
   * Identifier of the next BHE object to activate.
   */
  targetObjectId: string;

  /**
   * Condition evaluated against the full BHE result, not only its score.
   */
  conditions: AdaptiveRoutingCondition[];

  /**
   * Defines whether every condition must match or only one of them.
   */
  conditionMode?: "all" | "any";

  /**
   * Optional human-readable explanation for authors or debugging tools.
   */
  label?: string;
}

/**
 * Adaptive routing definition for a BHE object.
 */
export interface AdaptiveRouting {
  /**
   * Ordered routes evaluated from a BHEResult.
   */
  routes: AdaptiveRoute[];

  /**
   * Fallback target when no route condition matches.
   */
  fallbackObjectId?: string;
}

/**
 * Capability interface for BHE objects that provide adaptive routing.
 */
export interface HasAdaptiveRouting {
  adaptiveRouting: AdaptiveRouting;
}
