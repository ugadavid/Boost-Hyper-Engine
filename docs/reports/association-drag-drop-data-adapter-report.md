# Association Drag-Drop Data Adapter Report

## Why This Adapter Exists

`AssociationSet` can now represent multimodal and multi-entry associations.

The existing flashcards adapter is intentionally binary. A drag-drop interaction
needs a different interaction data shape.

This adapter tests:

```txt
AssociationSet + ContentUnit -> AssociationDragDropData
```

without creating input, evaluation, DOM, or registries.

## Why It Comes Before UserInput, Evaluator, Or Renderer

The first pressure point is the interaction data shape.

Before asking how a learner drops items, how to evaluate placements, or how the
DOM should behave, BHE needs to know what an association drag-drop interaction
receives.

This adapter makes that shape visible.

## What AssociationDragDropData Represents

`AssociationDragDropData` contains:

- `draggableItems`;
- `dropZones`.

Each draggable item comes from an `AssociationEntry`.

Each drop zone comes from an `AssociationPair`.

Each drop zone keeps:

```txt
expectedEntryIds: string[]
```

This preserves duo, trio, quadro, and larger associations.

## ContentUnit Fallback

The adapter converts `ContentUnit` into text fallback values:

- text -> unit text;
- image -> `[image: alt]` or `[image: src]`;
- audio -> `[audio: transcript]` or `[audio: src]`;
- video -> `[video: transcript]` or `[video: src]`.

It does not render media.

The goal is to keep the interaction data readable and renderer-independent for
now.

## Multi-Entry Associations

Unlike flashcards, this adapter does not ignore associations with more than two
entries.

For example:

```txt
text + image + audio
```

becomes one drop zone with three expected ids.

That makes drag-drop a better fit than flashcards for group association tasks.

## What Remains Untreated

This POC does not define:

- learner placements;
- `AssociationDragDropUserInput`;
- evaluator logic;
- DOM drag/drop behavior;
- keyboard accessibility;
- real multimedia rendering;
- feedback;
- adaptive routing.

## Recommended Next Step

Create a console-only `AssociationDragDropUserInput` and evaluator POC.

Suggested input shape:

```txt
placements: { entryId: string; zoneId: string }[]
```

This keeps the next step focused on evaluation before any DOM drag/drop
complexity appears.
