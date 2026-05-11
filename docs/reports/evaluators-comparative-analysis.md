# Evaluators Comparative Analysis

This report compares the two current evaluator POCs:

- `evaluateClassificationQcm`
- `evaluateGapFillTyping`

No new architecture is introduced here.

## 1. Common Ground

Both evaluators follow the same return pipeline:

```txt
UserInput -> Evaluator -> BHEResult
```

They share several important traits:

- each receives a specific `UserInput`;
- each receives specific interaction data;
- each returns a generic `BHEResult`;
- each stores interaction-specific information in `details`;
- neither depends on the DOM;
- neither imports a renderer;
- neither displays UI feedback.

This confirms that evaluation can live outside renderers.

## 2. Differences

### Classification QCM

`evaluateClassificationQcm` is simple and binary.

It evaluates:

```txt
selectedChoiceId === correctChoiceId
```

It produces:

- `score: 1` or `0`;
- `maxScore: 1`;
- `completion: 1`;
- `status: "success"` or `"failed"`;
- `details.selectedChoiceId`;
- `details.correctChoiceId`;
- `details.isCorrect`.

### Gap-Fill Typing

`evaluateGapFillTyping` is richer.

It evaluates several typed answers and produces partial scoring.

It handles:

- several blanks;
- accepted answer arrays;
- case sensitivity;
- accent sensitivity;
- one result per blank.

It produces:

- `score` as the number of correct blanks;
- `maxScore` as the number of blanks;
- `completion` as `score / maxScore`;
- `details.blankResults[]`.

## 3. Emerging Conventions

### Evaluator Naming

The current naming convention is:

```txt
evaluate + Pedagogical/Interaction context
```

Examples:

- `evaluateClassificationQcm`
- `evaluateGapFillTyping`

This is clear and concrete. No generic naming is needed yet.

### UserInput Shape

`UserInput` is becoming a union of interaction-specific inputs:

```txt
QcmUserInput
ContextualTypingUserInput
```

This seems healthier than forcing one universal shape too early.

### BHEResult Status

Both evaluators currently use:

```txt
"success" | "failed"
```

However, gap-fill already exposes a tension: a score of `1 / 2` is currently
`failed`, even though `BHEResultStatus` already supports `"partial"`.

### Score / MaxScore / Completion

Both evaluators use numeric result fields.

QCM:

```txt
score: 0 or 1
maxScore: 1
completion: 1
```

Gap-fill:

```txt
score: correct blank count
maxScore: blank count
completion: score / maxScore
```

The convention is good, but `completion` may need clarification later: is it
task completion, correctness ratio, or progress ratio?

### Details

`details` is the main extension point.

It allows each evaluator to stay specific without changing `BHEResult`.

Examples:

- QCM stores selected and correct ids.
- Gap-fill stores per-blank results.

## 4. Points Of Tension

### Should `status: "partial"` Be Used?

Probably yes, but not necessarily immediately.

Gap-fill is the first strong candidate:

```txt
score > 0 && score < maxScore -> "partial"
```

This would make adaptive routing and feedback richer.

### Input Errors

Current evaluators do not distinguish:

- no question;
- missing answer;
- invalid choice id;
- unknown blank id;
- empty data.

These all collapse into ordinary failed results. That is acceptable for POCs,
but will need a convention later.

### InteractionData Hierarchy

Both evaluators define structural data locally.

There is still no shared `InteractionData` hierarchy. That is fine for now, but
duplication may grow if evaluators and adapters need the same shapes.

### UserInput Hierarchy

The current union is manageable.

A hierarchy may be needed later, but only after more input shapes exist.

### EvaluatorDefinition

An `EvaluatorDefinition` is becoming imaginable, but still premature.

We have two examples, not enough to define lifecycle, ids, supported modes, or
error behavior.

### Registry

A registry is still too early.

The lookup problem is not yet real because evaluators are called directly.

## 5. Relation With Renderers

The DOM renderers still evaluate locally.

This means there is temporary duplication:

- `classificationQcmDomRenderer` checks selected choice locally;
- `gapFillTypingDomRenderer` checks typed answers locally;
- the new evaluators do similar work outside the DOM.

This duplication is acceptable during POC development.

Before connecting renderers to evaluators, compare:

- renderer-local feedback;
- evaluator `BHEResult`;
- score behavior;
- partial behavior;
- normalization behavior;
- missing input behavior.

A renderer should be connected to an evaluator only when:

- it can produce the right `UserInput`;
- the evaluator result matches expected current behavior;
- UI feedback can consume `BHEResult` without making the renderer more complex;
- the change does not break the preview POC.

## 6. Feedback And AdaptiveRouting

`BHEResult` is becoming the shared return point.

Feedback can consume:

- `status`;
- `score`;
- `completion`;
- `details`;
- later, `signals`.

This enables richer feedback without tying pedagogical decisions to DOM code.

Adaptive routing can already consume:

- `status`;
- `score`;
- `maxScore`;
- `completion`;
- `signals`;
- `details`.

This confirms the intended shape:

```txt
Evaluator -> BHEResult -> Feedback / AdaptiveRouting
```

The evaluator layer gives adaptive routing a stable input.

## 7. Recommendation

Recommended next step: **C. create a feedback mapping POC**.

Reason:

- two evaluators already produce `BHEResult`;
- before modifying renderers, it would be useful to prove how feedback consumes
  `BHEResult`;
- this keeps the renderer untouched one more step;
- it clarifies the difference between evaluation and displayed feedback;
- it may reveal whether `status: "partial"` should be used now.

Do not create a registry yet.

Do not create `EvaluatorDefinition` yet.

Do not add a third evaluator yet unless a new interaction reveals a genuinely
new evaluation pattern.

The next useful pipeline to prove is:

```txt
BHEResult -> FeedbackData
```
