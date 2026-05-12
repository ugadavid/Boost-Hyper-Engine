# Drag-Drop Generalization Arbitration

This report examines whether BHE should generalize drag-drop now or continue
with specialized interaction data per pedagogical object.

No code changes are proposed here.

## 1. What The AssociationSet Stress Test Really Validated

The `AssociationSet + ContentUnit + drag-drop` stress test validated one
specific path:

```txt
AssociationSet
-> AssociationDragDropData
-> associationDragDropDomRenderer
-> AssociationDragDropUserInput
-> evaluateAssociationDragDrop
-> BHEResult
-> mountFeedbackFromResult
```

It proved that:

- `ContentUnit` can live in the pedagogical model;
- association entries can become draggable items;
- association pairs/groups can become drop zones;
- non-binary associations can be preserved;
- learner placements can be evaluated outside the renderer;
- feedback can stay mutualized.

It did not prove that all drag-drop interactions share the same cognitive
structure.

## 2. Pedagogical Types That Could Use Drag-Drop

### AssociationSet

Possible use:

- group related items;
- match text/image/audio units;
- build duo, trio, or larger associations.

Probable InteractionData:

```txt
draggableItems
dropZones
expectedEntryIds
```

Probable UserInput:

```txt
placements: { entryId, zoneId }[]
```

Probable Evaluator:

- compare actual groups with expected groups;
- detect missing and extra entries;
- score by complete group or by item.

Specific risks:

- confusing association with classification;
- forcing all relations into drop zones;
- weak handling of duplicate or overlapping associations.

### ClassificationSet

Possible use:

- drag items into categories.

Probable InteractionData:

```txt
draggableItems
categoryZones
expectedCategoryId per item
```

Probable UserInput:

```txt
placements: { itemId, categoryId }[]
```

Probable Evaluator:

- compare placed category with expected category;
- score by item;
- maybe summarize by category.

Specific risks:

- looks very similar to association drag-drop but evaluates differently;
- zones are semantic categories, not arbitrary association groups;
- item-level scoring may be more natural than zone-level scoring.

### SequenceSet

Possible use:

- reorder items into a correct sequence.

Probable InteractionData:

```txt
draggableItems
orderedSlots or list positions
expectedPositions
```

Probable UserInput:

```txt
orderedItemIds: string[]
```

or:

```txt
placements: { itemId, position }[]
```

Probable Evaluator:

- compare order with expected positions;
- support partial order if allowed;
- possibly evaluate adjacent pairs.

Specific risks:

- this is less “drop into zones” and more “reorder list”;
- generic drag-drop zones may obscure sequence-specific logic;
- accessibility needs are different.

### GapFillSet

Possible use:

- drag words into blanks.

Probable InteractionData:

```txt
context segments
blank drop zones
draggable answer options
```

Probable UserInput:

```txt
placements: { answerId, blankId }[]
```

or:

```txt
filledBlanks: { blankId, value }[]
```

Probable Evaluator:

- compare dropped answers with expected blank values;
- support multiple accepted answers;
- preserve case/accent rules if needed.

Specific risks:

- overlaps with typing evaluator but answer source is constrained;
- blanks are embedded in context, not free-standing zones;
- interaction data must preserve text flow.

### IdentificationSet

Possible use:

- drag tags onto text spans;
- drag labels onto targets;
- annotate transparent words, suffixes, or inferred features.

Probable InteractionData:

```txt
context
targets
availableTags
annotationZones
```

Probable UserInput:

```txt
annotations: { targetId, tagId }[]
```

or:

```txt
placements: { tagId, targetId }[]
```

Probable Evaluator:

- compare tag/target associations;
- handle expected targets;
- handle missing, extra, or wrong annotations.

Specific risks:

- annotation is not the same cognitive operation as grouping;
- target selection may matter as much as drag-drop;
- text offsets and accessibility become central.

## 3. What Is Common Across Drag-Drops

Common pieces:

- manipulable items;
- destinations, zones, slots, targets, or positions;
- learner placements;
- visual state while moving items;
- feedback after checking;
- `BHEResult`;
- `mountFeedbackFromResult`;
- DOM event handling.

At a very low level, many drag-drop interactions share:

```txt
thing -> destination
```

But that does not mean they share the same pedagogical meaning.

## 4. What Is Deeply Different

The cognitive operation differs by object type:

- AssociationSet: grouping related entries.
- ClassificationSet: categorizing items.
- SequenceSet: ordering items.
- GapFillSet: filling contextual blanks.
- IdentificationSet: annotating or tagging targets.

These operations differ in:

- expected answer shape;
- scoring logic;
- partial correctness;
- feedback granularity;
- accessibility needs;
- layout requirements;
- learner intention.

The renderer gesture may be similar, but the pedagogical operation is not.

## 5. Should BHE Create Common DragDropData Now?

Not yet.

Creating a common `DragDropData` now would likely collapse meaningful
differences too early.

The safer direction is specialized interaction data:

```txt
AssociationDragDropData
ClassificationDragDropData
SequenceDragDropData
GapFillDragDropData
IdentificationDragDropData
```

Later, after two or three more cases, BHE may extract a small shared base if it
is truly earned.

The likely future common base would be small:

```txt
items + destinations
```

but not enough is known yet.

## 6. Risks Of Generalizing Too Early

- Erasing differences between grouping, categorization, ordering, filling, and
  annotation.
- Creating a weak universal `DragDropData` that every adapter must bend around.
- Forcing evaluators into a false common model.
- Hiding important accessibility differences.
- Making renderers harder to reason about.
- Recreating a generic H5P-style activity shell instead of preserving BHE's
  pedagogical distinctions.

## 7. Risks Of Generalizing Too Late

- Repeated drag-drop DOM code.
- Repeated placement capture logic.
- Repeated feedback mounting patterns.
- Inconsistent accessibility conventions.
- Slightly different item/zone naming across adapters.
- Harder migration if five incompatible drag-drop shapes appear.

These risks are real, but they are not urgent yet.

## 8. Final Recommendation

Recommended next step: **B. create a second drag-drop POC on another type**.

Best candidate:

```txt
ClassificationSet + drag-drop
```

Reason:

- it is close enough to AssociationSet to reveal shared drag-drop structure;
- it is different enough to reveal cognitive differences;
- categories as zones are easier than sequence ordering or contextual blanks;
- evaluator scoring can be item-based, contrasting with AssociationSet's
  zone-based scoring.

Do not generalize now.

Do not create a registry.

Do not create common `DragDropData` yet.

Create a specialized:

```txt
ClassificationDragDropData
ClassificationDragDropUserInput
evaluateClassificationDragDrop
```

Then compare Association vs Classification before extracting anything common.
