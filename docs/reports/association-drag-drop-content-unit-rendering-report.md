# Association drag-drop ContentUnit rendering report

## Why this graft is local

`ContentUnit` was introduced first in `AssociationSet`, and Association drag-drop is the first interaction that naturally stress-tests multimodal, non-binary groups.

This change is therefore intentionally local:

- only `AssociationDragDropData` carries `ContentUnit`;
- only `associationToDragDropAdapter` preserves it;
- only `associationDragDropDomRenderer` renders it;
- Classification drag-drop remains unchanged.

## What changed

`AssociationDragDropItem` now includes:

```ts
unit?: ContentUnit
```

The existing fields remain:

- `entryId`;
- `label`;
- `kind`;
- `metadata`.

The `label` remains required as a fallback text representation.

## Adapter behavior

`associationToDragDropAdapter` now copies `AssociationEntry.unit` into `AssociationDragDropItem.unit` when available.

It still computes `label` exactly as before:

- text units use their text;
- image units use `[image: alt]` or `[image: src]`;
- audio units use `[audio: transcript]` or `[audio: src]`;
- video units use `[video: transcript]` or `[video: src]`;
- entries without units use `label` or `id`.

This preserves console readability and fallback behavior.

## Renderer behavior

`associationDragDropDomRenderer` now checks each draggable item:

- if `item.unit` exists, it calls `renderContentUnit(item.unit)`;
- otherwise it displays `item.label` as before.

The item still keeps `aria-label` based on `item.label`, so the textual fallback remains available to assistive technology and to drag/drop logic.

## Why UserInput, evaluator, and BHEResult do not change

This change affects presentation only.

The learner still places entries into zones. The renderer still creates:

`AssociationDragDropUserInput`

with:

- `entryId`;
- `zoneId`.

`evaluateAssociationDragDrop` still evaluates groups by ids. `BHEResult` still reports group correctness, missing entries, and extra entries.

This confirms that multimodal rendering does not need to alter the return loop.

## What the test validates

The preview now shows:

- text units;
- image units;
- audio units;
- a text + image + audio association group.

It validates that `ContentUnit` can pass through:

`AssociationSet -> associationToDragDropData -> associationDragDropDomRenderer`

without changing evaluation.

## Limits

- Audio controls inside draggable elements are not fully explored.
- Video is supported by `renderContentUnit`, but not emphasized in this preview.
- Accessibility still needs deeper testing.
- Media layout is only minimally styled.
- External media can fail to load.
- `label` remains necessary as fallback and accessible text.
- Association drag-drop still lacks the click-to-move fallback added to Classification.

## Next step

The next controlled step should be manual preview testing:

- confirm text/image/audio items are readable;
- observe whether audio controls conflict with dragging;
- decide whether draggable media needs a wrapper structure instead of a button-only item.

After that, BHE can either:

- improve Association drag-drop accessibility;
- or refine `renderContentUnit` for draggable contexts.
