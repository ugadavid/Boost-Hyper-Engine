# Cognitive Operations Vocabulary

This note introduces `CognitiveOperation` as a small vocabulary for describing what the learner does mentally inside BHE pedagogical objects.

It is intentionally light.

It does not create a new architecture, runtime system, registry, factory, or moment model.

## Definition

`CognitiveOperation` describes learner cognition.

Examples:

- associate;
- identify;
- classify;
- transform;
- infer;
- notice;
- compare;
- reflect;
- produce;
- imitate;
- selfAdjust;
- transfer.

These labels describe mental actions, not renderer types.

## Why This Exists

Boost'English bricks show that a single exercise can mobilize several cognitive operations at the same time.

For example, one pedagogical object may ask the learner to:

```txt
notice + compare + produce
```

Another may involve:

```txt
identify + infer
```

The goal is to stabilize a vocabulary for describing these combinations.

## Relationship With Existing Sets

Existing sets still keep their cognitive identity:

- `AssociationSet` often involves `associate`;
- `IdentificationSet` often involves `identify`;
- `ClassificationSet` often involves `classify`;
- `TransformationSet` often involves `transform` and `produce`;
- `InferenceSet` often involves `infer` and sometimes `reflect`;
- `MemorizationSet` may involve recall-oriented production or recognition.

But a set is not limited to one operation.

For example:

```txt
TransformationSet
-> notice + compare + transform + produce
```

This vocabulary makes those secondary operations visible without changing the object model deeply.

## Minimal Core Change

`PedagogicalObject` can now optionally declare:

```ts
cognitiveOperations?: CognitiveOperation[];
```

This is optional and descriptive.

No existing object is required to use it.

## What This Does Not Do

This does not create `Moment`.

This does not create `LearningSequence`.

This does not create runtime logic.

This does not decide routing, scoring, rendering, or evaluation.

This does not replace `PedagogicalType`, `PedagogicalFamily`, `InteractionMode`, or specialized `InteractionData`.

## Principle

The purpose is:

```txt
stable vocabulary
not new architecture
```

BHE can now describe:

```txt
same object
-> multiple cognitive operations
```

without rebuilding the core.
