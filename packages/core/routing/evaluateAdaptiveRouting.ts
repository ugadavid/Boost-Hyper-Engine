import type {
  AdaptiveRoute,
  AdaptiveRouting,
  AdaptiveRoutingCondition,
  BHEResult
} from "../types/index.js";

function readResultField(
  result: BHEResult,
  field: AdaptiveRoutingCondition["field"]
): unknown {
  return result[field];
}

function evaluateCondition(
  result: BHEResult,
  condition: AdaptiveRoutingCondition
): boolean {
  const actual = readResultField(result, condition.field);
  const expected = condition.value;

  switch (condition.operator) {
    case "equals":
      return actual === expected;
    case "notEquals":
      return actual !== expected;
    case "greaterThan":
      return typeof actual === "number" && typeof expected === "number" && actual > expected;
    case "greaterThanOrEquals":
      return typeof actual === "number" && typeof expected === "number" && actual >= expected;
    case "lessThan":
      return typeof actual === "number" && typeof expected === "number" && actual < expected;
    case "lessThanOrEquals":
      return typeof actual === "number" && typeof expected === "number" && actual <= expected;
    case "contains":
      return Array.isArray(actual) && actual.includes(String(expected));
  }
}

function routeMatches(result: BHEResult, route: AdaptiveRoute): boolean {
  const mode = route.conditionMode ?? "all";
  const checks = route.conditions.map((condition) => evaluateCondition(result, condition));
  return mode === "any" ? checks.some(Boolean) : checks.every(Boolean);
}

export function evaluateAdaptiveRouting(
  result: BHEResult,
  routing: AdaptiveRouting
): string | undefined {
  const matchingRoute = routing.routes.find((route) => routeMatches(result, route));
  return matchingRoute?.targetObjectId ?? routing.fallbackObjectId;
}
