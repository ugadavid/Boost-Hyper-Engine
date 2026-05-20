# Identification selection POC report

## 1. IdentificationSelectionData shape

The first Identification interaction POC introduces:

```ts
export interface IdentificationSelectionData {
  context: string;
  selectionMode: "single" | "multiple";
  targets: {
    targetId: string;
    label: string;
    expected?: boolean;
    feedback?: string;
  }[];
}
```

This exposes `IdentificationTarget` objects as selectable candidates without implementing text highlighting or hotspots.

## 2. Scoring strategy

V0 scoring is simple:

- score = number of expected targets correctly selected;
- maxScore = number of expected targets;
- extra selections are reported but do not subtract points.

Status:

- `success` if all expected targets are selected and there are no extras;
- `partial` if at least one expected target is selected, but the result is not perfect;
- `failed` if no expected target is selected, even when extras are present.

## 3. Why extraTargetIds are observed without penalty

Extra selections matter pedagogically, but V0 does not penalize them yet.

Reasons:

- this keeps the first evaluator easy to understand;
- extra selection policies can vary by activity;
- some identification tasks may tolerate exploratory selection;
- penalties would introduce a scoring policy before enough evidence exists.

The evaluator still exposes `extraTargetIds` in `details`, so feedback and future scoring can use them later.

## 4. What the scenarios reveal

The console example tests:

1. `success all expected no extra`
   - all expected targets selected;
   - no extras;
   - status `success`.

2. `partial some expected`
   - some expected targets selected;
   - missing targets reported;
   - status `partial`.

3. `partial with extra`
   - all expected targets selected;
   - one extra selected;
   - score remains max, but status is `partial`;
   - extra is visible in `details`.

4. `extra-only`
   - no expected target selected;
   - one extra selected;
   - score is `0`;
   - status is `failed`;
   - extra is visible in `details`.

5. `failed no expected`
   - no expected target selected;
   - no extra target selected;
   - status `failed`.

The scenarios stabilize the V0 status rule: `partial` means partial correctness, not just attempted selection.

## 5. What remains deferred

Deferred:

- renderer;
- hotspot engine;
- text highlighting;
- registry;
- generalized selection engine;
- multimodal identification;
- penalty policy for extras;
- immediate feedback;
- single-selection-specific behavior;
- target coordinates or source spans rendering.

## 6. Next recommended step

Recommendation: produce a short scoring/status arbitration report before creating a renderer.

The main question:

> Should extra-only selections be `partial` or `failed`?

This decision affects feedback and learner experience.

After that, the first renderer should likely be checkbox-style candidate selection, not text highlighting.

## Files created / modified

Created:

- `packages/core/types/interaction-data/IdentificationSelectionData.ts`
- `packages/core/adapters/identificationToSelectionAdapter.ts`
- `packages/core/evaluators/evaluateIdentificationSelection.ts`
- `examples/identification-selection-evaluator-example.ts`
- `docs/reports/identification-selection-poc-report.md`

Modified:

- `packages/core/types/interaction-data/index.ts`
- `packages/core/adapters/index.ts`
- `packages/core/types/input/UserInput.ts`
- `packages/core/types/input/index.ts`
- `packages/core/types/index.ts`
- `packages/core/evaluators/index.ts`
