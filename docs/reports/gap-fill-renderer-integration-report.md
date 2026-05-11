# Gap-Fill Renderer Integration Report

## What Was Connected

`gapFillTypingDomRenderer` now uses the full return loop:

```txt
ContextualTypingUserInput
-> evaluateGapFillTyping
-> BHEResult
-> mapBHEResultToFeedback
-> renderFeedbackData
```

The renderer still builds the gap-fill interface, but it no longer owns the
correction and scoring logic.

## Differences With QCM

The QCM integration captures one selected choice.

Gap-fill captures several answers:

```txt
typedAnswers: { blankId, value }[]
```

Gap-fill also needs to preserve local per-blank visual states. The renderer now
uses `BHEResult.details.blankResults` to update each input and inline blank
feedback.

## What Remains Local In The Renderer

The renderer still owns:

- DOM structure;
- context rendering;
- input creation;
- button event handling;
- input classes;
- inline blank feedback display;
- local accessibility attributes;
- mounting the feedback DOM.

These are still interaction display concerns.

## What Moved Out Of The Renderer

The following moved out:

- answer normalization;
- accepted-answer comparison;
- scoring;
- partial status decision;
- `BHEResult` construction;
- feedback data mapping;
- feedback DOM structure.

These now live in the evaluator, feedback mapper, and feedback DOM renderer.

## Repetition With QCM

The repeated sequence is now visible:

```txt
create UserInput
call evaluator
map BHEResult to FeedbackData
render FeedbackData
replace feedback DOM
```

Both QCM and gap-fill follow that shape.

## What Converges

The converging part is the tail of the loop:

```txt
BHEResult -> FeedbackData -> DOM replacement
```

This looks like the safest candidate for future extraction.

## What Remains Different

Input capture remains interaction-specific:

- QCM captures one selected choice id.
- Gap-fill captures many typed answers.

Local visual state also remains interaction-specific:

- QCM marks the selected button.
- Gap-fill marks each input and inline blank feedback.

These differences should stay in the renderers.

## Is A Helper Justified Now?

A small helper is becoming justified, but only for the repeated tail.

The healthiest candidate is not a full evaluator orchestrator yet. It is a tiny
feedback mounting helper:

```txt
BHEResult -> mapBHEResultToFeedback -> renderFeedbackData -> replace children
```

That would reduce duplication without hiding how each renderer creates its own
`UserInput`.

## Current Limits

- No helper exists yet.
- No registry exists.
- Adaptive routing is not triggered.
- Feedback CSS remains preview-local.
- Gap-fill still renders both inline blank feedback and global feedback.

## Possible Next Steps

- Create a very small helper for the feedback tail only.
- Compare whether inline blank feedback should remain renderer-local.
- Add a test or example around partial gap-fill feedback.
- Keep evaluator lookup direct until more renderers are connected.
- Defer registry design until lookup becomes a real problem.
