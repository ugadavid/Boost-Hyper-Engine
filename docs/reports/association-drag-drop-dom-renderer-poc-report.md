# Association Drag-Drop DOM Renderer POC Report

## Why This POC Exists

The previous POCs validated:

```txt
AssociationSet -> AssociationDragDropData
AssociationDragDropUserInput -> evaluateAssociationDragDrop -> BHEResult
```

This POC adds a minimal native DOM interaction for drag-drop.

## What It Validates

The renderer validates:

```txt
AssociationDragDropData
-> AssociationDragDropUserInput
-> evaluateAssociationDragDrop
-> BHEResult
-> mountFeedbackFromResult
```

It proves that the association drag-drop path can run through the same return
loop as QCM and gap-fill.

## Capturing Placements

The renderer captures placements by reading the final DOM state of each drop
zone.

It creates:

```txt
placements: { entryId, zoneId }[]
```

This becomes `AssociationDragDropUserInput`.

## Evaluation And Feedback

On Check, the renderer calls `evaluateAssociationDragDrop`.

The evaluator produces `BHEResult`.

The renderer then calls `mountFeedbackFromResult`, which handles:

```txt
BHEResult -> FeedbackData -> DOM replacement
```

## What Remains Local To The Renderer

The renderer still owns:

- DOM drag/drop;
- draggable items;
- drop zones;
- local zone classes;
- local zone detail text;
- event handling;
- placement capture.

## What Stays Outside The Renderer

The renderer does not own:

- association correctness;
- scoring;
- result construction;
- feedback mapping;
- adaptive routing.

## Current Limits

- Drag/drop accessibility is minimal.
- Keyboard interaction is not implemented.
- Mobile/touch drag-drop is not handled.
- Multimedia uses text fallback only.
- Item movement is basic native DOM movement.
- Scoring remains zone-based.
- There is no registry.
- There is no orchestrator.

## Possible Next Steps

- Add a small keyboard-accessible placement fallback.
- Improve visual affordances for zones.
- Add an example that feeds the result into adaptive routing.
- Decide whether group result feedback should become richer.
- Avoid general drag-drop architecture until more interaction needs appear.
