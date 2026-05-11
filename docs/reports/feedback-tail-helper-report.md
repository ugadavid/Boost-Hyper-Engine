# Feedback Tail Helper Report

## Why This Helper Is Justified

Two renderers now use the full return loop:

- `classificationQcmDomRenderer`
- `gapFillTypingDomRenderer`

Both had the same repeated tail:

```txt
BHEResult -> mapBHEResultToFeedback -> renderFeedbackData -> replace DOM
```

That repeated tail is now extracted into `mountFeedbackFromResult`.

## What It Mutualizes

The helper mutualizes only:

- mapping `BHEResult` to `FeedbackData`;
- rendering `FeedbackData` as DOM;
- replacing the feedback container contents;
- returning the produced `FeedbackData`.

It is intentionally small.

## What It Does Not Mutualize

The helper does not:

- create `UserInput`;
- call evaluators;
- know about `PedagogicalObject`;
- know about `InteractionData`;
- choose an evaluator;
- manage renderer lifecycle;
- trigger adaptive routing;
- provide a registry.

## Why It Is Not An Orchestrator

An orchestrator would coordinate the whole return loop.

This helper only coordinates the last display step:

```txt
BHEResult -> FeedbackData -> DOM
```

The renderer remains responsible for its interaction-specific work.

## Why UserInput And Evaluator Stay In Renderers

Input capture is still interaction-specific.

QCM captures:

```txt
selectedChoiceId
```

Gap-fill captures:

```txt
typedAnswers[]
```

The renderer is still the best place to create those inputs because it owns the
DOM controls and local visual state.

## Effects On QCM And Gap-Fill

Both renderers are slightly simpler.

They still:

- create their own input;
- call their own evaluator;
- update local visual state.

They no longer repeat feedback mapping and DOM replacement.

## Current Limits

- There is still no evaluator registry.
- There is still no feedback registry.
- Adaptive routing is not included.
- Error handling is minimal.
- Feedback CSS remains preview-local.

## Possible Next Steps

- Keep observing whether this helper remains enough.
- Consider adding minimal error handling only after a concrete failure mode.
- Connect adaptive routing later from `BHEResult`, not from this helper.
- Avoid `runEvaluationFeedbackLoop` until evaluator wiring itself repeats enough
  to justify it.
