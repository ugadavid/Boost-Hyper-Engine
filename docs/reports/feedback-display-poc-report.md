# Feedback Display POC Report

## Why This POC Exists

The core pipeline now produces `FeedbackData` from `BHEResult`.

This POC tests the next small step:

```txt
FeedbackData -> DOM
```

It verifies that feedback can be displayed independently from pedagogical
renderers.

## What It Validates

The POC validates that `FeedbackData` is a consumable display contract.

The DOM renderer:

- receives only `FeedbackData`;
- renders a summary;
- renders detailed messages when present;
- uses severity to apply CSS classes;
- does not know about `PedagogicalObject`;
- does not know about evaluators;
- does not create feedback decisions.

## FeedbackData Versus Pedagogical Renderer

`FeedbackData` is not a pedagogical renderer.

It does not render a QCM, gap-fill, flashcards, or any learning object.

It renders the result of an evaluation in a generic way.

This keeps the responsibilities separate:

```txt
Pedagogical renderer -> captures learner action
Evaluator -> produces BHEResult
Feedback mapper -> produces FeedbackData
Feedback display -> renders FeedbackData
```

## Why Existing Renderers Are Not Connected Yet

`classificationQcmDomRenderer` and `gapFillTypingDomRenderer` still evaluate and
display feedback locally.

They are not modified in this POC because the goal is to prove the feedback
display layer independently first.

Connecting them should happen only after comparing current local behavior with:

```txt
UserInput -> Evaluator -> BHEResult -> FeedbackData -> DOM
```

## How This Prepares Future Integration

This POC creates a small target for future renderer integration.

A pedagogical renderer could eventually:

1. capture `UserInput`;
2. call an evaluator;
3. map `BHEResult` to `FeedbackData`;
4. render feedback through `renderFeedbackData`.

That would remove duplicated local feedback logic gradually.

## Current Limits

- No pedagogical renderer uses `renderFeedbackData` yet.
- No feedback registry exists.
- No rich pedagogical feedback is selected.
- CSS is preview-local.
- There is no animation, focus management, or advanced accessibility behavior.
- The renderer is DOM-only.

## Possible Next Steps

- Compare current QCM local feedback with `FeedbackData` output.
- Compare current gap-fill local feedback with `FeedbackData` output.
- Connect one renderer to evaluator + feedback mapping + feedback display.
- Keep feedback selection separate from feedback display.
- Avoid a registry until multiple feedback display targets exist.
