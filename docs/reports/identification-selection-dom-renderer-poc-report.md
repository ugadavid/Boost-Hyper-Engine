# Identification selection DOM renderer POC report

## 1. Renderer shape

The first Identification renderer V0 is checkbox-style and text-context based.

It:

- consumes an `IdentificationSet`;
- adapts it through `identificationToSelectionData`;
- displays the context as plain text;
- displays targets as native checkbox options;
- uses a Check button;
- evaluates through `evaluateIdentificationSelection`;
- mounts global feedback through `mountFeedbackFromResult`.

It does not implement text highlighting, hotspots, or multimodal identification.

## 2. Accessibility V0

The renderer uses native form controls:

- `fieldset`;
- `legend`;
- `input type="checkbox"`;
- explicit `label` bound to each input.

This gives V0:

- native keyboard behavior;
- natural focus order;
- screen reader semantics;
- visible selected/unselected state.

No custom selection widget was created.

## 3. UserInput production

On Check, the renderer reads checked checkbox values and creates:

```ts
{
  kind: "identification-selection",
  selectedTargetIds: [...]
}
```

The renderer then calls `evaluateIdentificationSelection`.

## 4. Local classes from BHEResult.details

After Check, local classes are applied from evaluator details:

- `is-correct` for `correctTargetIds`;
- `is-incorrect` for `extraTargetIds`;
- `is-missing` for `missingTargetIds`.

The renderer does not re-evaluate. It only displays the evaluator result.

## 5. What remains deferred

Deferred:

- text highlighting;
- hotspot selection;
- generic renderer;
- generalized selection engine;
- score penalties for extras;
- immediate feedback;
- multimodal Identification;
- source offset rendering;
- image coordinate model.

## 6. Files created / modified

Created:

- `packages/renderer/renderers/identificationSelectionDomRenderer.ts`
- `examples/identification-selection-dom-preview.html`
- `docs/reports/identification-selection-dom-renderer-poc-report.md`

Modified:

- `packages/core/types/InteractionMode.ts`

The `selection` interaction mode was added because this renderer is not `qcm`, `typing`, or `drag-drop`.

## 7. Verification

The renderer was verified with:

- `npm run build`;
- `npm run docs`.

The preview can be tested through:

`/examples/identification-selection-dom-preview.html`

## Final recommendation

Keep this renderer as the Identification V0 baseline.

Next, observe it manually before considering text highlighting. The likely next improvement is richer feedback display from target-level `feedback`, not hotspot or multimodal support.
