# Drag-drop accessibility fallback comparison

## Scope

This report compares only the click-to-move / keyboard-friendly fallback now present in:

- `associationDragDropDomRenderer`;
- `classificationDragDropDomRenderer`.

It does not compare the whole drag-drop architecture, evaluators, adapters, or renderer registry questions.

## 1. Common mechanics actually observed

### Selected item state

Both renderers keep a local `selectedItem: HTMLElement | undefined` inside `renderDom`.

The selected item is not stored in core data, `InteractionData`, `UserInput`, or evaluator state. It is purely renderer-local UI state.

### Click-to-select

Both renderers select an item on click.

The selected item receives:

- `is-selected`;
- `aria-pressed="true"`.

Any previous selected item is cleared before selecting the new one.

### Keyboard select

Both renderers support keyboard selection on the draggable item:

- Enter;
- Space.

The key event prevents the default action and then selects the item.

This is a meaningful first step, but not a complete keyboard interaction model yet.

### Move here

Both renderers add a `Move here` button to each destination.

When activated:

- if no item is selected, an announcement says `No item selected.`;
- otherwise the selected DOM element is appended into the destination item container;
- selection is cleared;
- an announcement reports the move.

### Return here

Both renderers add a `Return here` button near the initial tray.

When activated:

- if no item is selected, an announcement says `No item selected.`;
- otherwise the selected DOM element is appended back into the tray;
- selection is cleared;
- an announcement reports the return.

### Aria-live announcements

Both renderers create a local `aria-live="polite"` region.

Both announce:

- selected item;
- item moved to a destination;
- item returned to tray;
- missing selection.

Association uses a helper to resolve the label from `aria-label`, then text content, because a rendered `ContentUnit` may not expose good plain text. Classification currently uses `textContent`, which works because its items remain text-only.

### Visual selection state

Both renderers rely on the `is-selected` class and `aria-pressed`.

The preview CSS then gives a visible outline to selected items.

### Reset / cleanup after movement

Both renderers clear selection after:

- click-to-move;
- click-to-return;
- native drag/drop if the dragged item was selected.

This prevents stale selected state after the item has changed location.

### Conservation of final UserInput

This is the key architectural validation.

Both fallbacks move the same DOM elements that mouse drag/drop moves. The Check button still reads the DOM structure and creates the same semantic `UserInput` as before:

- Association: `{ entryId, zoneId }[]`;
- Classification: `{ itemId, categoryId }[]`.

No evaluator or `UserInput` type changed.

## 2. Differences that should probably remain specific

### Pedagogical logic

Association and Classification do not mean the same thing, even when the fallback gesture is similar.

Association asks the learner to rebuild groups.

Classification asks the learner to assign items to categories.

### Zone vs category semantics

Association destinations are zones representing expected associations:

- `zoneId`;
- `expectedEntryIds`;
- group completeness.

Classification destinations are categories:

- `categoryId`;
- `expectedCategoryId`;
- item membership.

The UI action can say `Move here` in both cases, but the pedagogical meaning behind "here" differs.

### Local feedback

Association local feedback is group-based:

- correct group;
- missing entries;
- extra entries.

Classification local feedback is item-based:

- correct item;
- incorrect item;
- missing item;
- per-category count summary.

This should not be flattened into one generic feedback model yet.

### Visual state

Association toggles zone-level correctness:

- `is-correct`;
- `is-incorrect`.

Classification toggles item-level and zone summary classes:

- `is-correct`;
- `is-incorrect`;
- `is-missing`;
- `contains-correct`;
- `contains-errors`.

This reflects evaluator differences and should stay specialized.

### Placement extraction

Association extracts:

```ts
{ entryId, zoneId }
```

Classification extracts:

```ts
{ itemId, categoryId }
```

The traversal pattern is similar, but the output names are semantic. This should not be abstracted away yet.

## 3. What could become a tiny local helper

The fallback pattern is now stable enough to identify possible helper candidates.

### `setSelectedItem()`

Could:

- clear previous selection;
- set the new selected element;
- add `is-selected`;
- set `aria-pressed="true"`;
- announce selection.

Risk: label extraction differs slightly between text-only and `ContentUnit` items.

### `clearSelectedItem()`

Strong candidate.

Could:

- remove `is-selected`;
- set `aria-pressed="false"`;
- clear the local reference.

This is nearly identical in both renderers.

### `announceMove()`

Possible, but maybe too small.

Could format:

- selected;
- moved;
- returned;
- no selection.

Risk: wording may need to remain renderer-specific, especially for group vs category contexts.

### `moveSelectedItem()`

Possible, but should stay DOM-only.

Could:

- check selection;
- append selected item to destination;
- clear selection;
- announce movement.

It should not know anything about entries, items, zones, categories, or evaluators.

### `createMoveButton()`

Possible.

Could create a button with:

- text `Move here`;
- class name;
- click handler.

Risk: class names are currently renderer-specific. A helper would either need options or impose shared class names.

### `createReturnButton()`

Possible for the same reasons as `createMoveButton`.

Again, it should remain DOM-level only.

## 4. What must not be mutualized now

Do not mutualize:

- complete renderer;
- semantic `UserInput`;
- evaluator;
- `InteractionData`;
- pedagogical logic;
- placement extraction;
- feedback details;
- scoring;
- registry lookup;
- routing.

The shared layer, if created later, should know only about DOM selection and movement.

## 5. Recommendation

Recommendation: **A. create a tiny accessibility helper now, but only for DOM selection/movement**.

Reason:

- the fallback has now been implemented twice;
- the duplicated mechanics are stable and concrete;
- the helper can remain smaller than a renderer abstraction;
- it does not need to touch `UserInput`, evaluator, `InteractionData`, feedback, or routing;
- it can reduce drift between Association and Classification accessibility behavior.

The helper should be local to the renderer package, for example:

`packages/renderer/dom/selectionMove.ts`

It should stay limited to:

- selected item state;
- clear selection;
- move selected item to a destination;
- return selected item to tray;
- optional announcement callback.

It should not create semantic placements and should not know whether the renderer is Association or Classification.

If this feels too early, the safe fallback is to keep duplication intentionally until a third drag-drop renderer exists. But based on current evidence, a tiny DOM-only helper is now reasonably earned.
