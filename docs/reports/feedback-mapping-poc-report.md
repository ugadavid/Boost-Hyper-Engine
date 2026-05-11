# Feedback Mapping POC Report

## Why This POC Exists

The evaluator POCs now produce `BHEResult`.

This POC tests the next step:

```txt
BHEResult -> FeedbackData
```

It keeps feedback mapping outside renderers and avoids creating UI or a full
pedagogical feedback system.

## How It Completes The Return Pipeline

The current return pipeline becomes:

```txt
UserInput -> Evaluator -> BHEResult -> FeedbackData
```

The evaluator decides what the learner action means.

The feedback mapper turns that result into displayable feedback data.

## What FeedbackData Represents

`FeedbackData` is a simple structured feedback payload.

It contains:

- a normalized feedback status;
- one summary message;
- optional detailed messages;
- optional metadata.

It is not a renderer and does not create DOM.

## Why This Is Not Rich Pedagogical Feedback Yet

This POC only maps result status and details to generic messages:

- `Correct.`
- `Partially correct.`
- `Try again.`

It does not choose hints, explanations, remediation activities, or support
resources.

That richer layer may later consume `BHEResult`, `BHEContentBlock`, or
pedagogical object content, but this POC deliberately does not.

## Why It Does Not Read PedagogicalObject Or BHEContentBlock

The goal is to test the simplest possible bridge:

```txt
BHEResult -> FeedbackData
```

Reading `PedagogicalObject` or `BHEContentBlock` now would mix generic feedback
mapping with pedagogical feedback selection too early.

## What It Reveals About Partial Status

The mapper treats a result as partial when:

- `result.status === "partial"`;
- or `score > 0 && score < maxScore`.

Gap-fill now emits `status: "partial"` directly for partial scores. The score
check remains useful as a defensive fallback for older or external results.

This confirms that evaluators should express partial results directly when the
interaction semantics support them.

## Current Limits

- No renderer consumes `FeedbackData` yet.
- No feedback registry exists.
- Messages are generic and not pedagogically rich.
- QCM detail detection only checks `details.isCorrect`.
- Gap-fill detail detection only checks `details.blankResults`.
- Adaptive routing is not invoked here.

## Possible Next Steps

- Create a feedback display POC that consumes `FeedbackData`.
- Connect one renderer to evaluator + feedback mapping.
- Add richer feedback later using pedagogical support content.
- Keep adaptive routing attached to `BHEResult`, not `FeedbackData`.
