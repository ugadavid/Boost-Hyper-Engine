# Interaction patterns emergence - Week 3

## Purpose

This note summarizes the interaction patterns that have emerged progressively in BHE so far.

It should be used as a reference point before opening a new interaction chantier.

## 1. AssociationSet

`AssociationSet` expresses relational grouping.

The learner is not simply placing an item somewhere. The learner is rebuilding meaningful groups:

- text <-> text;
- text <-> image;
- audio <-> text;
- text + image + audio;
- larger relation groups.

Current interaction pattern:

- specialized drag-drop;
- `AssociationDragDropData`;
- `AssociationDragDropUserInput`;
- `evaluateAssociationDragDrop`;
- group/zone-based scoring.

Scoring is based on complete groups:

- each zone expects `expectedEntryIds`;
- a group is correct only when it contains exactly the expected entries;
- `details` expose missing and extra entries.

Association also introduced the first multimodal rendering path:

- `ContentUnit`;
- local preservation of `unit?: ContentUnit` in `AssociationDragDropItem`;
- `renderContentUnit`;
- text fallback preserved through `label`.

Accessibility pattern:

- mouse drag/drop remains available;
- click-to-move fallback exists;
- Enter / Space can select an item;
- `Move here`;
- `Return here`;
- `aria-live` announcements.

## 2. ClassificationSet

`ClassificationSet` expresses category membership.

The learner decides which category each item belongs to.

Current interaction pattern:

- specialized drag-drop;
- `ClassificationDragDropData`;
- `ClassificationDragDropUserInput`;
- `evaluateClassificationDragDrop`;
- item-based scoring.

Scoring is based on individual items:

- each item has `expectedCategoryId`;
- each placement compares `actualCategoryId` with the expected category;
- missing items are reported separately.

Accessibility pattern:

- mouse drag/drop remains available;
- click-to-move fallback exists;
- Enter / Space can select an item;
- `Move here`;
- `Return here`;
- `aria-live` announcements.

Classification confirmed that a visually similar drag-drop gesture can have a different pedagogical structure from Association.

## 3. SequenceSet

`SequenceSet` expresses order.

The learner is not grouping or classifying. The learner is arranging items according to:

- chronology;
- logic;
- adjacency;
- process flow;
- narrative progression.

Current interaction pattern:

- `SequenceReorderData`;
- `SequenceReorderUserInput`;
- `evaluateSequenceReorder`;
- interaction mode `reorder`;
- text-only DOM renderer V0.

Scoring V0:

- exact-position scoring;
- `score = number of items in expected position`;
- `maxScore = total number of items`;
- `status = success | partial | failed`.

Sequence also observes adjacency:

- `adjacentPairResults` are included in `BHEResult.details`;
- adjacency is not scored yet;
- this preserves an important signal without committing to mixed scoring.

Renderer V0:

- text-only;
- ordered list;
- `Move up`;
- `Move down`;
- no drag/drop;
- keyboard-friendly from the start;
- `aria-live` movement announcements;
- connected to `evaluateSequenceReorder`.

## 4. What this confirms

### Same apparent gesture does not mean same pedagogy

Association and Classification both use drag-drop, but they do not mean the same thing.

Association is group-based.

Classification is item/category-based.

Sequence avoids drag/drop in V0 because ordering has its own interaction needs.

### InteractionData should remain specialized

Current evidence supports specialized interaction data:

- `AssociationDragDropData`;
- `ClassificationDragDropData`;
- `SequenceReorderData`.

A common interaction model would currently erase too much meaning.

### UserInput should remain semantic

Inputs are shaped by the learner action in a pedagogical context:

- `{ entryId, zoneId }`;
- `{ itemId, categoryId }`;
- `orderedItemIds`.

The names matter because they preserve meaning.

### Helpers must be earned

The only extracted interaction helper so far is DOM-only:

- selected item state;
- move selected item;
- clear selection;
- `aria-pressed`;
- optional announcements.

It does not know about pedagogical objects, scoring, or routing.

This is the right level of helper for now.

### Accessibility should appear at birth

The newer interaction POCs now include accessibility considerations immediately:

- click-to-move fallback for drag-drop;
- no drag/drop requirement for Sequence V0;
- visible buttons;
- keyboard-operable controls;
- `aria-live` announcements.

This is becoming a BHE design principle.

## 5. What remains deferred

Still intentionally deferred:

- generic renderer;
- renderer registry expansion;
- common `DragDropData`;
- common reorder engine;
- mixed Sequence scoring;
- Sequence drag/drop;
- multimodal Sequence;
- generalized feedback mapping for Sequence details;
- registry-based evaluator lookup.

These may become useful later, but none is required yet.

## 6. Recommendation

Keep this synthesis as a reference before opening a new chantier.

The current pattern is healthy:

- observe;
- create a small specialized data shape;
- create a console evaluator if needed;
- create an accessible renderer only after the interaction shape is clear;
- extract helpers only when repetition is concrete and DOM-only.

The next chantier should begin by asking:

> What cognitive operation is this object asking the learner to perform?

Only then should BHE choose the interaction shape.
