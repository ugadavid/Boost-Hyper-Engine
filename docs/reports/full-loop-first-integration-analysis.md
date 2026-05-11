# Full Loop First Integration Analysis

This report observes the first complete integration inside
`classificationQcmDomRenderer`.

No new architecture is introduced here.

## 1. What The Full Loop Validates

The classification QCM renderer now validates the full BHE loop:

```txt
PedagogicalObject
-> Adapter
-> InteractionData
-> Renderer
-> UserInput
-> Evaluator
-> BHEResult
-> FeedbackData
-> DOM
```

The forward path transforms a `ClassificationSet` into `QcmData`, then renders a
QCM interaction.

The return path captures a selected choice, evaluates it, maps the result to
feedback data, and displays that feedback.

This proves that the two halves can meet without a registry or a large
framework.

## 2. What The Renderer Legitimately Keeps

The renderer still owns the interaction surface.

It keeps:

- DOM structure;
- question and choice buttons;
- local selected state;
- visual button classes;
- `aria-pressed`;
- click handling;
- capture of the learner action.

These are legitimate renderer responsibilities.

## 3. What Moved Out Of The Renderer

The renderer no longer owns the core correction path.

Moved out:

- correctness check;
- score decision;
- `BHEResult` construction;
- feedback mapping;
- feedback DOM structure.

The renderer now delegates those concerns to:

```txt
evaluateClassificationQcm
mapBHEResultToFeedback
renderFeedbackData
```

## 4. What This Integration Reveals

Direct imports are acceptable at this stage.

They keep the POC readable and avoid premature infrastructure.

The integration confirms a useful separation:

```txt
renderer -> captures action
evaluator -> interprets action
feedback mapper -> prepares feedback
feedback renderer -> displays feedback
```

It also shows that other renderers can be connected progressively, one at a
time, without refactoring the whole rendering layer.

## 5. Points Of Attention

- Avoid turning each renderer into a heavy orchestrator.
- Avoid duplicating the same wiring in every renderer without reflection.
- Decide later whether a small helper should coordinate evaluation and feedback.
- Keep registries for later.
- Compare the gap-fill renderer carefully before connecting it.
- Keep local visual state in renderers, but keep evaluation outside them.
- Watch whether feedback display should be mounted inside each renderer or in a
  shared feedback region.

## 6. Recommendation

Recommended next step: **B. create an orchestration/helper analysis first, not
the helper itself yet**.

The QCM integration works, but before connecting gap-fill it would be useful to
observe what wiring is repeated:

```txt
create UserInput
call evaluator
map BHEResult
render FeedbackData
mount feedback DOM
```

Do not create a registry yet.

Do not connect gap-fill blindly yet.

The next safest move is a short design note comparing:

- direct wiring inside renderers;
- a small helper function;
- future orchestration;
- future registry needs.

After that, connect `gapFillTypingDomRenderer` if the wiring remains simple.
