# Association Drag-Drop ContentUnit Exploration

This report explores how an `AssociationSet + ContentUnit + drag-drop` POC
could fit into the current BHE architecture.

No code is proposed here.

## 1. Why Drag-Drop Is The Right Next Stress Test

Drag-drop is a strong next stress test because it brings together several open
questions:

- multimodal content;
- grouping;
- non-binary associations;
- spatial interaction;
- richer `UserInput`;
- richer evaluator logic;
- partial scoring.

Flashcards are naturally binary. Drag-drop can represent a learner placing
several units into the same zone or assembling related items.

That makes it a better candidate for testing:

```txt
text + image + audio
```

and trio/quadro associations.

## 2. What AssociationSet Already Allows

`AssociationSet` already supports:

```txt
AssociationEntry.label?: string
AssociationEntry.unit?: ContentUnit
AssociationPair.entryIds: string[]
```

This means the model can represent:

- text <-> text;
- text <-> image;
- audio <-> text;
- text + image + audio;
- associations with two, three, four, or more entries.

So multi-entry associations are not blocked by the pedagogical model.

The pressure is now on interaction data, user input, and evaluation.

## 3. Missing InteractionData

A possible future shape could be:

```ts
interface AssociationDragDropData {
  draggableItems: AssociationDragDropItem[];
  dropZones: AssociationDropZone[];
  expectedGroups: AssociationExpectedGroup[];
}
```

Where:

```ts
interface AssociationDragDropItem {
  entryId: string;
  label?: string;
  display?: unknown;
}

interface AssociationDropZone {
  id: string;
  label: string;
}

interface AssociationExpectedGroup {
  id: string;
  entryIds: string[];
}
```

This is not final. It names the missing layer:

```txt
AssociationSet -> AssociationDragDropData
```

The adapter would decide how association entries become draggable items and how
expected associations become drop targets or expected groups.

## 4. Missing UserInput

Several possible input shapes exist.

### groupedEntryIds

```ts
groupedEntryIds: {
  groupId: string;
  entryIds: string[];
}[]
```

Good for grouping tasks. It focuses on the final learner grouping.

### placements

```ts
placements: {
  entryId: string;
  zoneId: string;
}[]
```

Good for drag-drop. It records each item placement.

### droppedItemsByZone

```ts
droppedItemsByZone: Record<string, string[]>
```

Good for compact evaluation, but less explicit and less consistent with current
array-based input styles.

### Current Preference

For a first POC, `placements` is probably the clearest.

It matches drag-drop behavior and can be converted into groups during
evaluation.

## 5. Missing Evaluator

An association drag-drop evaluator would need to handle:

- binary associations;
- trio/quadro associations;
- partially correct groups;
- missing items;
- extra items;
- duplicated items;
- wrong-zone placements;
- score by group;
- score by item;
- possibly score by complete association only.

A simple first rule could be:

```txt
one expected association = one expected group
group correct if it contains exactly the expected entry ids
```

Partial scoring could count:

- correctly grouped items;
- fully correct groups;
- missing entries;
- extra entries.

The evaluator should return `BHEResult` with details such as:

```txt
groupResults[]
missingEntryIds[]
extraEntryIds[]
correctEntryIds[]
```

## 6. Relation With ContentUnit

`ContentUnit` belongs to the pedagogical model.

It should not become renderer behavior.

`AssociationDragDropData` could either:

1. keep references to `AssociationEntry` ids and let renderers resolve display;
2. include fallback display values prepared by the adapter;
3. include a lightweight display payload derived from `ContentUnit`.

For a first POC, fallback display values are probably enough.

The renderer does not need the full `AssociationSet`. It needs draggable items
and zones in an interaction-ready form.

## 7. Relation With Renderer

The drag-drop renderer should keep:

- DOM drag/drop behavior;
- zones;
- draggable items;
- local visual state;
- keyboard/accessibility behavior;
- capture of learner action.

The renderer should not own:

- association correctness;
- scoring;
- feedback mapping;
- adaptive routing.

The return path should remain:

```txt
AssociationDragDropUserInput
-> Evaluator
-> BHEResult
-> FeedbackData / AdaptiveRouting
```

## 8. Risks

- Creating a drag-drop renderer that is too specific to one Beci case.
- Recreating H5P instead of testing BHE architecture.
- Confusing grouping with drag-drop.
- Making `ContentUnit` renderer-oriented.
- Creating a universal association evaluator too early.
- Forcing multimodal rendering before display needs are clear.
- Treating every association as a drop zone problem.
- Ignoring accessibility complexity in drag/drop.

## 9. Recommendation

Recommended next micro-step: **A. create `AssociationDragDropData` adapter**.

Do not start with the DOM renderer.

Do not start with the evaluator.

Reason:

- the current architectural pressure is first on `InteractionData`;
- `AssociationSet` already models multi-entry associations;
- the adapter can reveal whether the interaction should be item/zone/group
  based;
- console examples can validate duo/trio/quadro conversion before UI exists.

Suggested first POC:

```txt
AssociationSet + ContentUnit
-> associationToDragDropData
-> console output
```

Keep it text-fallback first.

Only after that should BHE add:

```txt
AssociationDragDropUserInput
-> evaluator
```

And only after that should it add a DOM drag-drop renderer.
