# Identification selection renderer design note

## Purpose

The Identification V0 evaluator is now stabilized:

- success: all expected targets selected, no extra;
- partial: at least one expected target selected, but imperfect result;
- failed: no expected target selected, even with extras.

This note prepares the first renderer without implementing it yet.

## 1. Recommended V0 shape

The first Identification renderer should be a checkbox-style candidate selection renderer.

V0 shape:

- display the textual context plainly;
- display targets as selectable options;
- use checkbox inputs for multiple selection;
- no text highlighting;
- no hotspots;
- no multimodal-specific rendering;
- no generalized selection engine.

This is intentionally less immersive than highlighting words directly in the text, but much cleaner for a first accessible renderer.

The renderer should focus on the core operation:

> identify the relevant targets among candidates.

## 2. Accessibility strategy

V0 should rely on native form controls.

Recommended structure:

- `fieldset` for the selection group;
- `legend` naming the task;
- one real `input type="checkbox"` per target;
- explicit `label` bound to each checkbox;
- native keyboard support;
- natural focus order;
- Check button after the options;
- feedback after Check.

Native checkboxes provide:

- keyboard toggling;
- screen reader semantics;
- visible checked/unchecked state;
- lower implementation risk.

`aria-live` may be useful for feedback after Check, but the selection itself should not require custom announcement logic.

## 3. Connection to the BHE pipeline

The renderer should follow the existing BHE loop:

```txt
IdentificationSet
-> identificationToSelectionAdapter
-> IdentificationSelectionData
-> renderer
-> IdentificationSelectionUserInput
-> evaluateIdentificationSelection
-> BHEResult
-> mountFeedbackFromResult
```

On Check, the renderer should:

1. read checked checkbox target ids;
2. create:

```ts
{
  kind: "identification-selection",
  selectedTargetIds: [...]
}
```

3. call `evaluateIdentificationSelection`;
4. pass the result to `mountFeedbackFromResult`;
5. apply local visual classes based on `BHEResult.details`.

## 4. Minimal local feedback

The renderer may apply local classes after Check:

- `is-correct` for correctly selected expected targets;
- `is-incorrect` for selected extras;
- `is-missing` for expected targets that were not selected.

Important:

The renderer should not re-evaluate.

It should only read:

- `correctTargetIds`;
- `missingTargetIds`;
- `extraTargetIds`;

from `BHEResult.details`.

Possible local feedback text:

- "Correct target";
- "Expected target not selected";
- "Extra target selected".

This keeps evaluation in the evaluator and display in the renderer.

## 5. What not to do now

Do not implement:

- text highlighting;
- hotspot selection;
- generic renderer;
- generalized selection engine;
- score penalties for extras;
- immediate feedback on selection;
- multimodal Identification;
- source offset rendering;
- image coordinates;
- audio/video identification.

Do not use custom checkbox-like widgets when native checkboxes are sufficient.

## 6. Final recommendation

Recommendation: **A. create the checkbox-style V0 renderer next**.

Reasons:

- it matches the stabilized multi-select evaluator;
- it is accessible by default;
- it avoids premature text highlighting/hotspot complexity;
- it keeps the pipeline clean;
- it gives BHE a first concrete Identification renderer without inventing a generalized selection system.

The next implementation should be minimal and should not modify the evaluator, scoring rule, or InteractionData.
