# Cognitive Operation Vocabulary Update Report

## What Changed

Created:

- `packages/core/types/CognitiveOperation.ts`;
- `docs/architecture/cognitive-operations-vocabulary.md`.

Modified:

- `packages/core/types/PedagogicalObject.ts`;
- `packages/core/types/index.ts`.

## Core Addition

The new type is:

```ts
export type CognitiveOperation =
  | "associate"
  | "identify"
  | "classify"
  | "transform"
  | "infer"
  | "notice"
  | "compare"
  | "reflect"
  | "produce"
  | "imitate"
  | "selfAdjust"
  | "transfer";
```

`PedagogicalObject` now has an optional descriptive field:

```ts
cognitiveOperations?: CognitiveOperation[];
```

## Why This Is Minimal

The field is optional.

No existing object must be updated.

No runtime logic was added.

No evaluator, renderer, adapter, registry, factory, or LearningSequence structure was created.

## What It Expresses

The update allows BHE to say that a single pedagogical object may mobilize several learner operations:

```txt
notice + compare + produce
```

or:

```txt
identify + infer
```

This reflects observations from real Boost'English bricks where one exercise can activate several cognitive operations at once.

## What It Does Not Decide

This does not decide how cognitive operations should be used later.

It does not define routing.

It does not define scoring.

It does not define sequencing.

It does not create a new object category.

It only stabilizes vocabulary.

## Recommendation

Keep this as a descriptive vocabulary for now.

The next healthy step is to use it sparingly in future examples or reports, then observe whether it remains useful before adding any logic around it.
