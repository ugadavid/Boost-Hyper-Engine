# Identification selection V0 status update report

## 1. Final V0 rule

The Identification selection evaluator now uses this V0 status rule:

- `success`: all expected targets are selected and there are no extras;
- `partial`: at least one expected target is selected, but the result is imperfect;
- `failed`: no expected target is selected, even when extras are present.

Extras still do not subtract points.

## 2. Why partial now means partial correctness

`partial` should signal that the learner identified at least some expected target.

An extra-only selection is an attempt, but it is not partial correctness. It should therefore be `failed` while still exposing the wrong selections in `details`.

This makes status cleaner for future feedback and AdaptiveRouting.

## 3. Role of extraTargetIds

`extraTargetIds` remain important.

They show:

- what the learner selected incorrectly;
- possible over-selection;
- false positives;
- targets that need feedback.

But in V0 they do not reduce the numeric score.

## 4. Console scenario results

The updated console example covers:

- `success all expected no extra`: status `success`, score `3/3`;
- `partial some expected`: status `partial`, score `1/3`;
- `partial with extra`: status `partial`, score `3/3`, with `extraTargetIds`;
- `extra-only`: status `failed`, score `0/3`, with `extraTargetIds`;
- `failed no expected`: status `failed`, score `0/3`, no extras.

## Files modified

- `packages/core/evaluators/evaluateIdentificationSelection.ts`
- `examples/identification-selection-evaluator-example.ts`
- `docs/reports/identification-selection-poc-report.md`

## Next step

With status stabilized, the next controlled step can be a renderer design note or a minimal checkbox-style renderer.

Do not add score penalties or a generalized selection engine yet.
