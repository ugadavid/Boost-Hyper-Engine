# Evaluation Pipeline

This document prepares the next architectural step in BHE: moving evaluation
logic out of renderers.

It does not introduce new types yet. It describes the intended direction before
implementation.

## 1. Why Evaluation Should Leave Renderers

A renderer should display an interaction and capture learner action.

It can:

- create DOM or HTML output;
- expose inputs, buttons, cards, drop zones, or choices;
- capture clicks, typing, drag-drop actions, or selections;
- show immediate local state.

But the renderer should not carry all correction, scoring, feedback, and routing
logic.

If evaluation stays inside renderers, several problems appear:

- the same pedagogical logic may be duplicated across renderers;
- adaptive routing cannot reliably reuse renderer-local results;
- analytics cannot consume consistent result data;
- feedback becomes tied to UI behavior;
- testing becomes harder because evaluation requires a renderer.

The renderer should capture the learner action. Another layer should evaluate
what that action means.

## 2. Return Pipeline

The expected return pipeline is:

```txt
UserInput -> Evaluator -> BHEResult -> Feedback / AdaptiveRouting
```

This mirrors the forward pipeline:

```txt
PedagogicalObject -> Adapter -> InteractionData -> Renderer
```

The forward pipeline prepares and displays an interaction.

The return pipeline interprets the learner action and produces a result.

## 3. UserInput

`UserInput` is the structured learner action captured by a renderer.

It should represent what the learner did, without deciding whether it is correct.

Examples:

```txt
QCM:
selectedChoiceId

Gap-fill:
typedAnswers

Association / drag-drop:
matchedEntryIds
groupedEntryIds

Sequence:
orderedItemIds

Inference:
inferenceText
justificationText
```

`UserInput` can be simple or interaction-specific. It should not try to solve
all interaction types in one universal shape too early.

## 4. Evaluator

An evaluator compares `UserInput` with the expected pedagogical structure.

Depending on the case, it may read:

- the original `PedagogicalObject`;
- `InteractionData`;
- expected answers;
- association rules;
- item order;
- accepted inference values;
- core content.

Its job is to produce a `BHEResult`.

An evaluator should answer:

- Was the input accepted?
- Was it partially accepted?
- What score or completion value should be produced?
- What details or signals should be included?
- What information might feedback or routing need?

## 5. BHEResult

`BHEResult` already exists as the generic result shape.

It can carry:

- `status`;
- `score`;
- `maxScore`;
- `completion`;
- `durationMs`;
- `signals`;
- `details`.

This is intentionally broader than correct/incorrect.

`BHEResult` should remain generic. Specific evaluators can use `details` for
interaction-specific data when needed.

Examples:

```txt
QCM details:
selectedChoiceId
correctChoiceId

Gap-fill details:
blankResults

Association details:
matchedPairs
missingPairs

Inference details:
acceptedInference
justificationPresent
```

## 6. Feedback

Feedback should consume `BHEResult`.

The renderer can display feedback locally, but the pedagogical decision should
come from the result rather than from renderer-only logic.

This distinction matters:

```txt
local feedback display != pedagogical feedback decision
```

For example, a renderer may show a green state or an inline message. But the
feedback layer could decide which explanation, hint, retry instruction, or next
support block should appear based on `BHEResult`.

## 7. AdaptiveRouting

Adaptive routing should remain connected to `BHEResult`.

The current routing model already supports conditions on:

- status;
- score;
- max score;
- completion;
- duration;
- signals;
- details.

This confirms the direction:

```txt
Evaluator -> BHEResult -> AdaptiveRouting -> targetObjectId
```

Routing should not depend directly on renderer state.

## 8. Relation With ContentUnit

`ContentUnit` mainly affects what is presented and manipulated.

It can make content multimodal:

- text;
- image;
- audio;
- video.

Evaluation often does not need to compare the media itself. It can usually rely
on stable identifiers or learner actions:

- selected ids;
- grouped ids;
- matched ids;
- typed answers;
- ordered ids;
- inference text;
- justification text.

So `ContentUnit` and evaluation are related, but not the same concern.

`ContentUnit` enriches the content layer. `UserInput` and evaluators interpret
learner actions over that content.

## 9. Next Controlled Graft

The next implementation should be small.

Possible first POC:

```txt
ClassificationSet + qcm
```

or:

```txt
GapFillSet + typing
```

Recommended controlled scope:

1. Create a minimal `UserInput` type or a small family of input types.
2. Create an `EvaluatorDefinition`.
3. Create one evaluator for one pair only.
4. Produce a `BHEResult`.
5. Keep existing DOM renderers working.
6. Do not migrate all renderers at once.

`ClassificationSet + qcm` is probably the simplest first POC because it already
has `QcmData` and a clear `selectedChoiceId`.

`GapFillSet + typing` is slightly richer because it involves multiple typed
answers and per-blank detail.

## 10. Points Of Attention

- Do not create a universal evaluator too early.
- Do not duplicate logic between renderer and evaluator for long.
- Do not break existing DOM POCs while extracting evaluation.
- Do not confuse local displayed feedback with structured pedagogical feedback.
- Keep `BHEResult` generic.
- Keep `UserInput` close to concrete interaction needs.
- Let one evaluator POC teach the shape before creating a registry.
- Avoid coupling evaluators too tightly to DOM events.
- Keep adaptive routing connected to `BHEResult`, not renderer internals.

## Current Recommendation

Start with a single evaluator POC:

```txt
ClassificationSet + QcmData + selectedChoiceId -> BHEResult
```

This is the smallest path because:

- the interaction has one clear learner action;
- the expected answer is already in `QcmData.correctChoiceId`;
- the result can be score-based but still use generic `BHEResult`;
- existing renderers can remain unchanged during the first pass.
