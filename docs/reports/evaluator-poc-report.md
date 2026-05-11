# Evaluator POC Report

## Why This POC Exists

The current DOM renderers still contain local evaluation logic.

This POC starts the return pipeline described in the architecture notes:

```txt
UserInput -> Evaluator -> BHEResult
```

It uses the smallest current case:

```txt
ClassificationSet + QcmData + selectedChoiceId -> BHEResult
```

## What Was Added

New input types were added in:

```txt
packages/core/types/input/
```

They define:

- `BaseUserInput`
- `QcmUserInput`
- `UserInput`

A first evaluator was added in:

```txt
packages/core/evaluators/evaluateClassificationQcm.ts
```

It produces a `BHEResult` with:

- `status`;
- `score`;
- `maxScore`;
- `completion`;
- `details.selectedChoiceId`;
- `details.correctChoiceId`;
- `details.isCorrect`.

## What It Validates

The POC validates that evaluation can run without the DOM.

The evaluator receives structured learner input and QCM interaction data, then
returns a reusable result object.

This confirms the return pipeline:

```txt
QcmUserInput -> evaluateClassificationQcm -> BHEResult
```

## Why The Renderer Was Not Modified

The current goal is to prove the evaluator layer without breaking existing DOM
POCs.

The classification QCM renderer still evaluates locally for now.

That duplication is temporary. It should be removed only after the evaluator
shape is stable enough to plug into the renderer safely.

## Why There Is No Evaluator Registry Yet

Only one evaluator exists.

Creating a registry now would freeze assumptions too early:

- evaluator lookup rules;
- supported interaction data shapes;
- result detail conventions;
- lifecycle and error handling.

More evaluator POCs are needed first.

## Current Limits

- Only QCM input is modeled.
- Only the first QCM question is evaluated when full `QcmData` is passed.
- There is no evaluator registry.
- No renderer consumes this evaluator yet.
- Feedback still remains local in the DOM renderer.
- Adaptive routing is not invoked by the example yet, though it can consume the
  produced `BHEResult`.

## Possible Next Steps

- Add a second evaluator POC for `GapFillSet + ContextualTypingData`.
- Add a small result-to-feedback POC.
- Connect the classification QCM renderer to the evaluator after the evaluator
  contract stabilizes.
- Keep adaptive routing attached to `BHEResult`.
- Avoid a universal evaluator until at least two or three concrete evaluators
  reveal stable conventions.
