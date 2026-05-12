# Drag-drop specialized POCs comparison

## 1. InteractionData

The two POCs share the same broad interaction shape:

- a list of draggable items;
- a list of drop zones;
- labels suitable for a simple text fallback renderer;
- optional metadata for future extensions.

However, the expected data is deliberately not stored in the same place.

### AssociationDragDropData

`AssociationDragDropData` represents associations as expected groups:

- `draggableItems` contain `entryId`, `label`, optional `kind`, and optional `metadata`;
- `dropZones` contain `id`, `label`, and `expectedEntryIds`.

The expected answer belongs to the zone because the learner is expected to rebuild a whole association group. A zone is correct only when it contains exactly the expected entries.

This works well for:

- binary associations;
- trio/quadro associations;
- multimodal groupings derived from `ContentUnit`;
- group-level feedback.

### ClassificationDragDropData

`ClassificationDragDropData` represents categorization:

- `draggableItems` contain `itemId`, `label`, `expectedCategoryId`, optional `kind`, and optional `metadata`;
- `dropZones` correspond to categories, with `categoryId` and `label`.

The expected answer belongs to the item because each item has one expected category. The category zone is mostly a destination, not the full answer definition.

This works well for:

- item-by-item scoring;
- category-based placement;
- missing item detection;
- simple feedback per item.

### Why expected data differs

The difference is not accidental. It reflects the pedagogical operation:

- association asks: "which entries belong together?";
- classification asks: "which category does this item belong to?"

So the common UI gesture hides two different cognitive structures.

## 2. UserInput

### AssociationDragDropUserInput

```ts
placements: {
  entryId: string;
  zoneId: string;
}[]
```

### ClassificationDragDropUserInput

```ts
placements: {
  itemId: string;
  categoryId: string;
}[]
```

The structures are close: both capture placements of draggable units into destinations.

But the semantics differ:

- `entryId` points to an association entry;
- `zoneId` points to an association group target;
- `itemId` points to a classification item;
- `categoryId` points to a category.

A common low-level placement shape could eventually exist, such as `{ sourceId, targetId }`. But introducing it now would erase useful pedagogical naming and make reports less readable. The current explicit names make each evaluator easier to reason about.

## 3. Evaluators

### evaluateAssociationDragDrop

This evaluator is group/zone based:

- input placements are grouped by `zoneId`;
- each zone compares `actualEntryIds` with `expectedEntryIds`;
- score is the number of fully correct zones;
- details include `missingEntryIds` and `extraEntryIds` per zone.

This makes partial correctness visible inside `details`, but scoring remains strict at zone level. A trio association with two correct entries and one missing entry is still an incorrect zone in V0.

### evaluateClassificationDragDrop

This evaluator is item based:

- input placements are indexed by `itemId`;
- each item compares `actualCategoryId` with `expectedCategoryId`;
- score is the number of correctly placed items;
- details include `itemResults` and `missingItemIds`.

This makes partial correctness directly visible in the score. Each item can be independently correct, incorrect, or missing.

### Comparison

The two evaluators produce the same outer contract:

- `BHEResult`;
- `status`;
- `score`;
- `maxScore`;
- `completion`;
- domain-specific `details`.

But their scoring logic is different:

- association: complete groups;
- classification: individual items.

Their feedback implications also differ:

- association feedback should probably highlight zones and explain missing/extra entries;
- classification feedback should probably highlight each item and its expected category;
- both can use `mountFeedbackFromResult`, but richer feedback mapping will need to understand their different `details` shapes.

## 4. Renderer implications

The Association drag-drop renderer already exists and validates the full loop:

`AssociationDragDropData -> DOM -> AssociationDragDropUserInput -> evaluateAssociationDragDrop -> BHEResult -> feedback`.

The Classification drag-drop renderer does not exist yet.

Some DOM behavior could be shared later:

- draggable item creation;
- drop zone creation;
- moving items between zones;
- collecting placements;
- applying correct/incorrect classes;
- mounting feedback.

But important pieces should remain specific:

- labels and ids;
- how placements are named;
- how zones are interpreted;
- post-check visual summaries;
- feedback detail rendering;
- accessibility text.

A generic drag-drop renderer is still premature. It would likely capture the UI gesture but miss the pedagogical meaning.

## 5. Abstraction possible

### BaseDragDropItem

Possible later:

```ts
{
  id: string;
  label: string;
  kind?: string;
  metadata?: Record<string, unknown>;
}
```

But current names (`entryId`, `itemId`) are still valuable. A base item could reduce repetition, but it might also make adapters less explicit.

### BaseDropZone

Possible later:

```ts
{
  id: string;
  label: string;
  metadata?: Record<string, unknown>;
}
```

This is more plausible because both zones are display targets. Still, `categoryId` carries pedagogical meaning in classification, while `id` in association represents an association group.

### DragDropPlacement

Possible later:

```ts
{
  sourceId: string;
  targetId: string;
}
```

This is the closest common shape. But it should not replace semantic input types yet, because evaluator reports benefit from `entryId`, `zoneId`, `itemId`, and `categoryId`.

### DragDropInteractionData

Not recommended now.

The current POCs show that "drag-drop" is an interaction gesture, not a single pedagogical operation. A shared `DragDropInteractionData` would either become too vague or too complicated too quickly.

The next useful evidence would come from a third type, especially:

- `SequenceSet + drag-drop`, where placement becomes ordering;
- `GapFillSet + drag-drop`, where placement targets are blanks;
- `IdentificationSet + drag-drop`, where placement may become tagging or annotation.

## 6. Risks

### Generalizing too early

- The abstraction may confuse UI gesture with pedagogical operation.
- Evaluator details could become less readable.
- Feedback mapping could lose domain-specific information.
- Future sequence/gap-fill needs may break the abstraction quickly.

### Duplicating too long

- DOM drag/drop mechanics may be repeated.
- Accessibility behavior may diverge between renderers.
- Placement collection may be implemented several times.
- Styling and feedback mounting may drift.

### Main architectural risk

The biggest risk is creating a common type that represents "drag-drop" while hiding the difference between:

- grouping;
- categorizing;
- ordering;
- filling blanks;
- annotating.

BHE should preserve the pedagogical meaning even when the physical interaction looks similar.

## 7. Recommendation

Recommendation: **B. create the Classification drag-drop DOM renderer now**, but do not generalize the drag-drop types yet.

Reason:

- the adapter and evaluator already exist;
- a renderer will reveal which DOM mechanics are truly duplicated;
- it will show whether `mountFeedbackFromResult` remains sufficient;
- it will give a second full-loop drag-drop implementation before any abstraction;
- it avoids inventing a common model from only two partial cases.

After that renderer exists, the next comparison should focus on DOM repetition only:

- item rendering;
- zone rendering;
- drag/drop event handling;
- placement extraction;
- feedback mounting.

Only then should BHE consider a small DOM helper or low-level drag-drop utility. A shared `DragDropInteractionData` should wait until at least `SequenceSet` or `GapFillSet` has been tested.
