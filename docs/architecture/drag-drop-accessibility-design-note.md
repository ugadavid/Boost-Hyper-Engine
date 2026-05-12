# Drag-drop accessibility design note

## 1. Current limits

The current BHE drag-drop renderers are useful as native DOM POCs, but they are not accessible enough yet.

Current limits:

- no keyboard placement flow;
- no touch/mobile fallback;
- native browser drag/drop behavior varies;
- draggable items are buttons, but the button behavior does not yet provide an alternative to mouse drag/drop;
- placement changes are not announced clearly;
- the tray can receive dropped items, but there is no explicit non-drag action for returning an item.

This means the current renderers validate the architecture, but not yet a robust learner interaction.

## 2. Proposed fallback strategy

The minimal accessible fallback should use a select-then-place pattern:

1. Select an item.
2. Choose a destination.
3. Move the selected item to that destination.
4. Announce the move.
5. Allow returning the item to the tray.

For example:

- clicking or pressing Enter on an item marks it as selected;
- each destination exposes a clear "Move here" action;
- the tray exposes a "Return here" action;
- after movement, an `aria-live` region announces: `Moved "livre" to "Masculin".`;
- selecting another item replaces the current selection;
- checking still builds the same semantic `UserInput` as the drag/drop path.

This keeps the renderer behavior simple:

- mouse drag/drop remains available;
- click/keyboard movement becomes the fallback;
- both paths produce the same placement state.

## 3. Why start with ClassificationDragDrop

`ClassificationDragDrop` is the best first accessibility experiment because:

- the operation is simple: item -> category;
- each item has one expected category;
- feedback is item-based;
- missing items are easy to detect;
- there is no complex group reconstruction;
- the learner action maps naturally to selecting an item and selecting a category.

Association drag-drop is more complex because zones represent expected groups, including duo/trio/quadro associations. It should benefit from the lesson learned on Classification, but it should not be the first fallback experiment.

## 4. What should remain local

The fallback must not blur the current architecture.

The following should remain local to each renderer:

- pedagogical meaning;
- semantic `UserInput`;
- evaluator call;
- visual state specific to the object type;
- local wording for zones, categories, groups, and summaries;
- item-level vs group-level feedback interpretation.

For Classification, the renderer should still create `ClassificationDragDropUserInput`. It should still call `evaluateClassificationDragDrop`. The fallback should only change how placements are made.

## 5. What could become common later

If the pattern proves stable, some low-level DOM behavior could be shared later:

- selected item state;
- moving an item element to a destination;
- clearing selected state;
- `aria-live` movement announcements;
- destination action buttons;
- basic keyboard event handling;
- returning an item to the tray.

This should remain a DOM utility layer, not a pedagogical drag-drop abstraction.

The utility should not know about:

- `AssociationSet`;
- `ClassificationSet`;
- `expectedEntryIds`;
- `expectedCategoryId`;
- evaluator details;
- scoring.

## 6. Recommendation

Recommendation: **B. implement a small click-to-move fallback in `ClassificationDragDrop` next**.

Do not create a shared helper yet.

Reason:

- the design is now clear enough to test in one renderer;
- Classification is the simplest drag-drop case;
- a real implementation will reveal whether the fallback pattern is stable;
- extracting a helper before implementing the fallback would still be premature.

The next controlled step should be:

- keep mouse drag/drop;
- add item selection;
- add destination buttons or destination click handling;
- announce movement through `aria-live`;
- keep evaluation unchanged;
- keep `ClassificationDragDropUserInput` unchanged.
