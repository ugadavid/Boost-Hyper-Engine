# Partial Status Update Report

## What Changed

`evaluateGapFillTyping` now emits `status: "partial"` when some, but not all,
blank answers are correct.

The local status rule is now:

```txt
score === maxScore -> success
score > 0 && score < maxScore -> partial
score === 0 -> failed
```

The evaluator still keeps:

- `score`;
- `maxScore`;
- `completion`;
- `details.blankResults`.

## Why Partial Is Now Used

Gap-fill naturally supports partial correctness.

A learner can answer one blank correctly and another incorrectly. Calling that
result only `failed` loses useful information that already exists in the score.

Using `partial` makes the result more faithful to the learner action.

## Why This Clarifies BHEResult

`BHEResult.status` now carries the broad result category, while `score` and
`details.blankResults` carry the numerical and item-level evidence.

This makes the result easier to consume:

```txt
status -> general interpretation
score/maxScore -> quantitative result
details -> interaction-specific evidence
```

## Effect On FeedbackData

`mapBHEResultToFeedback` no longer needs to infer this gap-fill case as the
primary path.

It can read:

```txt
result.status === "partial"
```

The existing score-based partial inference remains useful as a defensive
fallback for older or external results.

## Effect On Future AdaptiveRouting

Adaptive routing can now react directly to partial gap-fill results:

```txt
field: "status"
operator: "equals"
value: "partial"
```

This is clearer than requiring routing rules to infer partiality from score
ranges.

Score-based routing still remains possible when finer thresholds are needed.

## Why This Remains Local

Only gap-fill is changed because it is the current evaluator with a real partial
scoring case.

`evaluateClassificationQcm` remains binary:

```txt
success | failed
```

No global evaluator abstraction, registry, renderer change, or `BHEResult`
change is needed for this correction.
