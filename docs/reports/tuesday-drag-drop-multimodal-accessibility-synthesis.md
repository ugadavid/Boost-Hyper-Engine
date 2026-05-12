# Tuesday drag-drop multimodal accessibility synthesis

## 1. What was accomplished today

### Classification drag-drop DOM renderer

A specialized DOM renderer was added for:

`ClassificationDragDropData -> ClassificationDragDropUserInput -> evaluateClassificationDragDrop -> BHEResult -> mountFeedbackFromResult`

It validates a second concrete drag-drop renderer without creating a common drag-drop abstraction.

### Click-to-move / keyboard-friendly fallback for Classification

Classification drag-drop now supports:

- item selection by click;
- item selection by Enter / Space;
- `Move here` actions on categories;
- `Return here` action on the tray;
- `aria-live` movement announcements.

The evaluator and `UserInput` did not change.

### Isolated renderContentUnit

`renderContentUnit(unit)` was created in the renderer layer.

It renders:

- text;
- image;
- audio;
- video.

It remains independent from pedagogical objects, evaluators, routing, and registries.

### Local ContentUnit rendering in Association drag-drop

`AssociationDragDropItem` now carries:

`unit?: ContentUnit`

while keeping `label` as fallback.

`associationToDragDropAdapter` preserves the unit, and `associationDragDropDomRenderer` renders it through `renderContentUnit` when available.

### Audio/video stress test in draggable items

The Association drag-drop preview now includes audio and video units.

A minimal guard prevents native dragstart from starting inside `audio` and `video` controls, while dragging from the item wrapper remains possible.

### Click-to-move / keyboard-friendly fallback for Association

Association drag-drop now supports:

- item selection by click;
- item selection by Enter / Space;
- `Move here` actions on association zones;
- `Return here` action on the tray;
- `aria-live` movement announcements.

The group-based evaluator remains unchanged.

## 2. What this validates

### Specialized drag-drop is working

BHE now has two specialized drag-drop paths:

- Association: group/zone-based;
- Classification: item/category-based.

They share DOM mechanics but preserve different pedagogical meanings.

### Multimodal rendering does not require evaluator changes

`ContentUnit` can be rendered in Association drag-drop without changing:

- `AssociationDragDropUserInput`;
- `evaluateAssociationDragDrop`;
- `BHEResult`;
- feedback mapping;
- routing.

The learner manipulates richer content, but evaluation still relies on stable ids.

### Same UserInput for mouse and fallback interaction

Both mouse drag/drop and click-to-move produce the same DOM placement state.

The Check button still reads the DOM and creates the same semantic `UserInput`.

This confirms that accessibility fallback can be added without changing the evaluation contract.

### Feedback remains mutualized

Both Classification and Association drag-drop continue to use:

`mountFeedbackFromResult`

This confirms that the feedback tail remains a good small helper.

### An accessibility pattern is emerging

The emerging pattern is:

- select item;
- move to destination;
- return to tray;
- announce movement;
- evaluate later through existing pipeline.

This pattern now exists in both Classification and Association renderers.

## 3. What remains intentionally ungeneralized

The following were not generalized today:

- no common `DragDropData`;
- no common drag-drop renderer;
- no shared accessibility helper yet;
- no registry;
- no evaluator abstraction;
- no routing integration inside drag-drop renderers;
- no changes to `UserInput`;
- no changes to evaluators;
- no changes to AdaptiveRouting.

This restraint is important. The current duplication is still producing useful architectural evidence.

## 4. Points of vigilance

### Media inside draggable items

Audio and video controls inside draggable items introduce interaction tension:

- media controls need their own clicks/focus;
- drag should start from the wrapper, not the controls;
- small media items may not leave enough safe drag area.

### Button wrapper with audio/video

The current draggable item is still a button-like wrapper. Nested audio/video controls inside it may need a more careful structure later.

Possible future direction:

- media display area;
- explicit drag handle;
- accessible move actions.

### Screen reader behavior is not tested

The renderers use `aria-live`, `aria-label`, and `aria-pressed`, but no screen reader test has been performed.

### Touch/mobile is not tested

Native drag/drop remains fragile on touch devices. The click-to-move fallback may become more important than mouse drag/drop for mobile.

### Avoid premature abstraction

The shared pattern is now clearer, but one more observation pass is useful before extracting a helper.

The biggest risk remains confusing UI gesture with pedagogical operation.

## 5. Possible next steps

1. Compare the click-to-move fallback in Association and Classification.
2. Extract a tiny DOM accessibility helper if the comparison confirms stable duplication.
3. Test AdaptiveRouting after drag-drop evaluation.
4. Explore `SequenceSet + drag-drop` or `GapFillSet + drag-drop`.
5. Update the README / architecture docs to reflect the current validated pipeline.

## 6. Final recommendation

Recommendation: **commit now**.

This is a clean milestone:

- two specialized drag-drop renderers;
- multimodal rendering in Association;
- accessible fallback pattern in both drag-drop renderers;
- no premature registry or generic drag-drop abstraction;
- build still passing.

The next session should start from documentation and comparison, not more feature accumulation.
