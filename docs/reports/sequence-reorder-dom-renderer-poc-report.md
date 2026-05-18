# Sequence reorder DOM renderer POC report

## 1. Renderer shape

The first Sequence renderer V0 is text-only and list-based.

It consumes a `SequenceSet`, adapts it through `sequenceToReorderData`, then renders:

- an ordered list;
- one text label per item;
- a `Move up` button;
- a `Move down` button;
- a Check button;
- a global feedback container.

It does not use drag/drop.

## 2. Accessibility V0

The renderer is keyboard-friendly by default because all movement controls are buttons.

Accessibility choices:

- first item has disabled `Move up`;
- last item has disabled `Move down`;
- buttons have item-specific `aria-label` values;
- an `aria-live="polite"` region announces movement;
- focus is returned to the moved item's relevant control after movement;
- no mouse drag/drop is required.

This is not a complete accessibility audit, but it gives Sequence a cleaner V0 than starting with drag/drop.

## 3. UserInput production

On Check, the renderer reads the current list order from the DOM and creates:

```ts
{
  kind: "sequence-reorder",
  orderedItemIds: [...]
}
```

It then calls `evaluateSequenceReorder`.

The evaluator remains responsible for:

- exact-position scoring;
- `BHEResult.status`;
- `BHEResult.score`;
- `exactPositionResults`;
- `adjacentPairResults`.

The renderer only applies minimal local classes:

- `is-correct`;
- `is-incorrect`.

## 4. What remains deferred

Still deferred:

- drag/drop reorder;
- renderer helper extraction;
- registry integration;
- multimodal Sequence rendering;
- scoring mix;
- adjacency-based feedback display;
- distance/block scoring;
- advanced focus management;
- screen reader testing.

## 5. Files created / modified

Created:

- `packages/renderer/renderers/sequenceReorderDomRenderer.ts`
- `examples/sequence-reorder-dom-preview.html`
- `docs/reports/sequence-reorder-dom-renderer-poc-report.md`

Modified:

- `packages/core/types/InteractionMode.ts`

The `reorder` interaction mode was added because this renderer is explicitly not `drag-drop`, `typing`, or `qcm`.

## 6. Verification

The renderer was verified with:

- `npm run build`;
- `npm run docs`.

The preview can be opened through the local server:

`/examples/sequence-reorder-dom-preview.html`

## Final recommendation

Keep this renderer as the Sequence V0 baseline.

Next, observe it manually before adding drag/drop or richer scoring. The first likely enhancement should be better local feedback from `adjacentPairResults`, not a drag/drop renderer.
