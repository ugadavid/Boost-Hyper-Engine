# Adaptive Routing v0.1

## 1. Definition

The adaptive routing engine lets a BHE object determine the next object to
activate based on a result it has produced or received.

In v0.1, this is intentionally minimal: a BHE object can expose an
`adaptiveRouting` capability, and the core can evaluate it against a `BHEResult`
to return a `targetObjectId`.

## 2. Principle

The current flow is:

```txt
BHEObject -> BHEResult -> AdaptiveRouting -> targetObjectId
```

The object produces or receives a result. The routing rules read that result.
The first matching route selects the next object.

The routing is declarative: rules are defined in data, not hardcoded in logic.

## 3. Concrete Case: Boost'English / Beci

The first concrete use case is inspired by a Boost'English activity created by
Beci:

```txt
personality adjectives quiz -> score / 16 -> one of four follow-up paths
```

Example routing:

- 0-4 points -> option 1
- 5-8 points -> option 2
- 9-12 points -> option 3
- 13-16 points -> option 4

This demonstrates that a quiz does not only return a score. It can orient the
learner toward a different pedagogical path.

## 4. Minimal Example

```ts
const adaptiveRouting = {
  routes: [
    {
      id: "option-3-route",
      label: "9-12 points",
      targetObjectId: "personality-adjectives-option-3",
      conditions: [
        { field: "score", operator: "greaterThanOrEquals", value: 9 },
        { field: "score", operator: "lessThanOrEquals", value: 12 }
      ],
      conditionMode: "all"
    }
  ]
};
```

With a result like:

```ts
const result = {
  objectId: "personality-adjectives-quiz",
  status: "completed",
  score: 11,
  maxScore: 16
};
```

the selected target is:

```txt
personality-adjectives-option-3
```

## 5. Core Function

```ts
export function evaluateAdaptiveRouting(
  result: BHEResult,
  routing: AdaptiveRouting
): string | undefined
```

The function evaluates routes in order, respects `conditionMode: "all" | "any"`,
returns the first matching `targetObjectId`, then `fallbackObjectId` if defined,
then `undefined`.

## 6. Limits v0.1

- Conditions are simple declarative comparisons.
- No advanced composition rules yet.
- Not integrated into the renderer.
- No UI, authoring interface, or activity execution engine yet.

## 7. v0.2 Tracks

- Richer conditions.
- Routing based on `signals`, errors, or detailed result data.
- Composition with `children`.
