# Drag-drop DOM renderers comparison

## 1. Common DOM mechanics

The two current DOM drag-drop renderers are:

- `associationDragDropDomRenderer`;
- `classificationDragDropDomRenderer`.

They are intentionally specialized, but they share a visible set of DOM mechanics.

### Draggable item creation

Both renderers create draggable `button` elements:

- `type = "button"`;
- `draggable = true`;
- visible label from interaction data;
- `aria-label` set from the label;
- a dataset identifier;
- `dragstart` writes the item identifier into `dataTransfer`.

The difference is only the identifier name:

- association uses `data-entry-id`;
- classification uses `data-item-id`.

### Zone creation

Both renderers create:

- an initial tray;
- several drop zones;
- a title for each zone;
- an inner container that receives dropped items;
- a small details area with `aria-live`.

The meaning differs, but the DOM shape is close.

### Drag events

Both use the same native DOM pattern:

- `dragstart` on the item;
- `dragover` on tray and zones with `event.preventDefault()`;
- `drop` on tray and zones;
- dropped item id read from `dataTransfer`;
- matching DOM element found with `querySelector`;
- item moved with `append`.

This proves that a small DOM utility could eventually reduce repetition.

### Movement between tray and zones

Both renderers allow items to move:

- from tray to a zone;
- from a zone to another zone;
- back to the tray.

No global state is needed for this. The DOM tree itself acts as the local placement state until Check.

### Placement collection

Both renderers collect placements by reading the current DOM:

- association reads `[data-zone-id]` and contained `[data-entry-id]`;
- classification reads `[data-category-id]` and contained `[data-item-id]`.

The traversal pattern is shared, but the output shape remains semantic.

### Check button

Both renderers:

- create a Check button;
- build a specific `UserInput`;
- call a specific evaluator;
- receive a `BHEResult`;
- update local visual state;
- call `mountFeedbackFromResult`.

### Visual classes

Both apply local classes after evaluation:

- association toggles zone-level `is-correct` / `is-incorrect`;
- classification toggles item-level `is-correct` / `is-incorrect` / `is-missing`;
- classification also toggles zone-level `contains-correct` / `contains-errors`.

### Feedback mounting

Both use the already shared helper:

`BHEResult -> FeedbackData -> DOM replacement`

through `mountFeedbackFromResult`.

This part is already properly mutualized and does not need a drag-drop-specific abstraction.

## 2. Pedagogical differences that must remain specific

### Association

Association drag-drop is built around:

- `entryId`;
- `zoneId`;
- `expectedEntryIds`;
- group reconstruction.

The evaluator is zone-based:

- a zone is correct if it contains exactly the expected entries;
- scoring is by complete zone;
- feedback details include missing and extra entries per group.

The renderer should therefore emphasize groups and zones.

### Classification

Classification drag-drop is built around:

- `itemId`;
- `categoryId`;
- `expectedCategoryId`;
- item categorization.

The evaluator is item-based:

- an item is correct if placed in its expected category;
- scoring is by item;
- feedback details include item results and missing items.

The renderer should therefore emphasize item state and category membership.

### Why this matters

The physical gesture is similar, but the pedagogical operation is different:

- association: "put these entries together";
- classification: "put this item in the right category".

Any abstraction that hides this distinction would weaken the clarity of BHE.

## 3. What could be shared without losing meaning

Several low-level utilities could eventually be extracted safely, as long as they do not define pedagogical semantics.

### `createDraggableElement`

Potentially useful if it accepts:

- visible label;
- dataset key/value;
- CSS class;
- drag payload value.

Risk: if generalized too much, it becomes harder to read than local code.

### `enableDropZone`

This is the strongest candidate.

Both renderers use almost identical logic:

- prevent default on `dragover`;
- read `text/plain` payload on `drop`;
- call a callback with the dragged id.

This utility would not need to know about association, classification, items, categories, or scoring.

### `moveDraggedElement`

A helper could move an element found by selector into a target container.

Risk: selectors differ (`data-entry-id` vs `data-item-id`), so the helper must stay low-level.

### `clearVisualState`

Possible but less urgent.

The classes differ enough that local clearing is currently more readable.

### `collectPlacements`

Possible in theory, but risky now.

The traversal shape is common, but the output is semantic:

- `{ entryId, zoneId }`;
- `{ itemId, categoryId }`.

This should stay local until at least a third drag-drop type is tested.

### Already shared

`mountFeedbackFromResult` is the right kind of shared helper:

- small;
- earned by repetition;
- independent of pedagogy;
- independent of drag-drop.

It is a good model for future helpers.

## 4. What should not be shared now

The following should remain specialized:

- `InteractionData`;
- semantic `UserInput`;
- evaluators;
- feedback details;
- complete renderers;
- renderer registry;
- global drag-drop orchestration.

A shared renderer would currently have to understand too many pedagogical differences. It would likely become either vague or over-configured.

## 5. Accessibility

Both renderers currently have only minimal accessibility:

- draggable items are buttons;
- zones have text labels;
- details and feedback use `aria-live`;
- there is no keyboard-based placement;
- there is no touch/mobile fallback;
- native drag/drop support is limited across devices and assistive contexts.

A future accessibility pass may need a second interaction path:

- select an item;
- choose a destination;
- move using click or keyboard;
- expose clear focus state;
- announce placement changes.

This may become a better candidate for shared DOM behavior than the current mouse drag/drop itself.

## 6. Recommendation

Recommendation: **C. improve accessibility before extracting a helper**.

Reason:

- the shared DOM mechanics are visible, especially `enableDropZone`;
- but the most important missing layer is not code reuse yet;
- both renderers share the same accessibility weakness;
- a keyboard/click-to-move fallback would reveal a deeper and more meaningful common interaction pattern;
- extracting a helper now may optimize the least important part first.

The next controlled step should be a small accessibility design note or POC for one renderer, preferably Classification drag-drop because item-to-category placement is simpler than association grouping.

No common `DragDropInteractionData`, renderer registry, or full drag-drop renderer should be created yet.
