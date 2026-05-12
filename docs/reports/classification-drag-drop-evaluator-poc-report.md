# Classification Drag-Drop Evaluator POC Report

## Why This POC Exists

The previous POC created:

```txt
ClassificationSet -> ClassificationDragDropData
```

This POC adds the return-side evaluation:

```txt
ClassificationDragDropUserInput -> evaluateClassificationDragDrop -> BHEResult
```

It remains console-only and specialized.

## Difference From evaluateAssociationDragDrop

`evaluateAssociationDragDrop` evaluates complete expected groups by zone.

`evaluateClassificationDragDrop` evaluates each item independently against its
expected category.

This confirms that the drag-drop gesture is shared, but the cognitive operation
is different.

## Why Scoring Is Item-Based

In classification, each item has one expected category.

Therefore the natural score is:

```txt
score = number of correctly placed items
maxScore = number of items
```

This differs from association drag-drop, where a whole group must match a zone.

## Why Association Remains Zone-Based

Association drag-drop represents expected groups.

A zone is correct only when its actual entries exactly match its expected
entries.

That makes zone-based scoring appropriate for the current association POC.

## What This Reveals About Drag-Drop Generalization

The two POCs now show a real distinction:

- association drag-drop is group-based;
- classification drag-drop is item-based.

This is strong evidence against a common `DragDropData` abstraction right now.

Specialized interaction data and evaluators are still clearer.

## Current Limits

- No DOM renderer exists for classification drag-drop.
- No registry exists.
- Duplicate placements are not handled deeply.
- Missing items are reported, but no error strategy exists.
- Scoring is simple item-based scoring.
- There is no adaptive routing example yet.

## Recommended Next Step

Create a comparison report between:

- `AssociationDragDropData` / `evaluateAssociationDragDrop`;
- `ClassificationDragDropData` / `evaluateClassificationDragDrop`.

Only after that should BHE decide whether a tiny shared drag-drop base is
justified.
