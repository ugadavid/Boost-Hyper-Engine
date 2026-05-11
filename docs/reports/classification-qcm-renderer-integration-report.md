# Classification QCM Renderer Integration Report

## What Was Connected

`classificationQcmDomRenderer` now uses the return pipeline:

```txt
QcmUserInput -> evaluateClassificationQcm -> BHEResult -> FeedbackData -> DOM
```

The renderer still displays the QCM question and choices, but correction and
feedback mapping now happen outside the renderer.

## UserInput Production

On choice click, the renderer creates a `QcmUserInput`:

```txt
interactionMode: "qcm"
selectedChoiceId: choice id
timestamp: current ISO timestamp
```

This keeps the learner action structured and independent from the DOM event.

## Evaluation

The renderer calls `evaluateClassificationQcm` with the current QCM question and
the `QcmUserInput`.

The evaluator produces a `BHEResult` with:

- status;
- score;
- maxScore;
- completion;
- selected choice;
- correct choice;
- correctness flag.

## Feedback Mapping

The renderer passes the `BHEResult` to `mapBHEResultToFeedback`.

This produces `FeedbackData`, not UI markup.

## Feedback Display

The renderer then calls `renderFeedbackData`.

The feedback display layer renders the summary and detailed QCM message as DOM.

## What Remains Local

The renderer still owns:

- QCM DOM structure;
- choice buttons;
- selected button state;
- `aria-pressed`;
- visual button classes.

This is appropriate because those are interaction display concerns.

## Why There Is Still No Registry

Only one pedagogical renderer is connected to the evaluator-feedback loop.

There is not enough evidence yet to define:

- evaluator lookup;
- feedback display lookup;
- renderer lifecycle integration;
- configuration rules.

Direct imports remain clearer for this POC.

## Current Limits

- Only the first QCM question is rendered.
- Only the classification QCM renderer is connected.
- Gap-fill still uses local evaluation and feedback.
- Feedback styles are still provided by preview CSS.
- No adaptive routing is triggered yet.

## Possible Next Steps

- Compare this integrated QCM renderer with the old local behavior.
- Connect `gapFillTypingDomRenderer` to the same loop.
- Decide whether feedback rendering should stay embedded or be mounted in a
  dedicated feedback region.
- Explore adaptive routing after evaluator output is stable in one renderer.
- Still avoid registries until more connected renderers reveal stable patterns.
