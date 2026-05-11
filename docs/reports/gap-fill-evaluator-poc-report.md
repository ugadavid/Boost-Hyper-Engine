# Gap-Fill Evaluator POC Report

## Why This Second Evaluator Is Useful

The first evaluator POC covered a simple QCM case:

```txt
selectedChoiceId -> BHEResult
```

The gap-fill evaluator tests a richer interaction:

```txt
typedAnswers[] -> BHEResult
```

This matters because gap-fill has multiple learner responses, per-blank
expected answers, partial scoring, and normalization rules.

## What It Reveals Compared With QCM

QCM has one selected id and one correct id.

Gap-fill needs:

- several answers;
- one result per blank;
- accepted answer arrays;
- case sensitivity;
- accent sensitivity;
- partial completion.

This confirms that `UserInput` should remain interaction-specific for now.

## Pipeline Confirmation

The POC follows the return pipeline:

```txt
ContextualTypingUserInput -> evaluateGapFillTyping -> BHEResult
```

The evaluator receives contextual typing data and structured learner input. It
produces a `BHEResult` with:

- `status`;
- `score`;
- `maxScore`;
- `completion`;
- `details.blankResults`.

## Why The Renderer Was Not Modified

The renderer still evaluates locally for now.

This keeps the DOM POC stable while the evaluator layer emerges. The next step
can compare renderer-local behavior with evaluator output before wiring them
together.

## Emerging Evaluator Conventions

Two conventions are now visible:

- evaluators accept interaction-specific input;
- evaluators produce generic `BHEResult` with interaction-specific `details`.

Current examples:

```txt
QCM -> details.selectedChoiceId / correctChoiceId / isCorrect
Gap-fill -> details.blankResults[]
```

## Why No Registry Yet

There are still only two evaluators.

It is too early to define:

- evaluator discovery;
- evaluator ids;
- supported input shapes;
- supported interaction data shapes;
- error strategy;
- lifecycle rules.

More POCs should come first.

## Current Limits

- No renderer consumes the evaluator yet.
- `status: "partial"` is now used when some, but not all, blanks are correct.
- Empty gap-fill data returns completion `1` by convention.
- The evaluator consumes structural typing data, but no shared
  `InteractionData` type hierarchy exists yet.

## Possible Next Steps

- Connect the gap-fill DOM renderer to this evaluator after comparison.
- Add a feedback mapping POC from `BHEResult`.
- Explore adaptive routing using gap-fill `BHEResult.details`.
- Still avoid a registry until evaluator conventions stabilize further.
