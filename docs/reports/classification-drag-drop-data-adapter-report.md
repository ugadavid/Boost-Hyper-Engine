# Classification Drag-Drop Data Adapter Report

## Why This Adapter Exists

The drag-drop generalization arbitration recommended a second specialized
drag-drop POC before creating any shared `DragDropData`.

This adapter tests:

```txt
ClassificationSet -> ClassificationDragDropData
```

without creating `UserInput`, an evaluator, a renderer, or a registry.

## Similarities With AssociationDragDropData

Both interaction data shapes contain:

- draggable items;
- drop zones;
- stable ids;
- labels for display;
- enough expected information for future evaluation.

Both are interaction-ready shapes derived from pedagogical objects.

## Differences From AssociationDragDropData

`AssociationDragDropData` stores expected ids by zone:

```txt
dropZone.expectedEntryIds
```

This fits association grouping because each zone represents one expected group.

`ClassificationDragDropData` stores expectation by item:

```txt
draggableItem.expectedCategoryId
```

This fits classification because each item belongs to one expected category.

The zone is a category. The correctness belongs primarily to the item placement.

## Why expectedCategoryId Lives On The Item

In classification, categories are reusable containers.

Many items can share the same category.

Therefore, it is clearer for each draggable item to carry its expected category
than for each zone to list every expected item.

This makes future scoring naturally item-based.

## Why Not Create Common DragDropData Now

The comparison already shows meaningful differences:

- association is group-based;
- classification is category-based;
- association scoring is currently zone-based;
- classification scoring will likely be item-based.

A common `DragDropData` now would risk hiding these cognitive differences.

The better approach is to keep specialized interaction data until more patterns
are proven.

## Possible Next Steps

- Create `ClassificationDragDropUserInput`.
- Create `evaluateClassificationDragDrop`.
- Compare item-based scoring with association zone-based scoring.
- Only then decide whether a small shared drag-drop base is useful.
