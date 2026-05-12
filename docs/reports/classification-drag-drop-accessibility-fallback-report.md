# Classification drag-drop accessibility fallback report

## Why this fallback exists

The first Classification drag-drop DOM renderer validated the full loop, but it still depended on native mouse drag/drop for placement.

This fallback adds a second placement path:

- select an item;
- choose a destination;
- move the item without mouse drag/drop.

The goal is not full accessibility yet. The goal is to prove that the renderer can support a keyboard-friendlier interaction path without changing the BHE evaluation pipeline.

## How it works

Each draggable item is still a button. It can now be selected by:

- click;
- Enter;
- Space.

Only one item can be selected at a time. The selected item receives:

- `is-selected`;
- `aria-pressed="true"`.

Each category zone now exposes a `Move here` button. The tray exposes a `Return here` button.

When a destination action is activated:

- if no item is selected, the renderer announces `No item selected.`;
- otherwise the selected DOM element is moved into the destination;
- selection is cleared;
- an `aria-live` region announces the move.

Mouse drag/drop still works as before.

## Why UserInput did not change

The fallback changes only how the DOM placement state is produced.

The Check button still reads placements from the DOM and creates the same semantic input:

`ClassificationDragDropUserInput`

This is important because the accessible path and the mouse drag/drop path must remain equivalent from the evaluator's point of view.

## Why the evaluator remains unchanged

`evaluateClassificationDragDrop` does not care how the learner placed items.

It receives:

- item placements;
- expected categories;
- no DOM;
- no accessibility state.

This confirms the separation:

- renderer handles interaction mechanics;
- evaluator handles correctness;
- feedback display remains downstream from `BHEResult`.

## Why no common helper was created

No shared helper was created because this is the first accessibility fallback implementation.

The goal is still observation:

- Which parts are stable?
- Which parts are specific to Classification?
- Which parts might also work for Association?

Creating a helper now would likely hide details that still need to be understood.

## What this reveals for a future helper

Potential future shared behavior:

- selected item state;
- clear selected state;
- move selected item to a destination;
- announce movement through `aria-live`;
- destination action buttons;
- no-selection announcement.

These are DOM-level behaviors. They should not know about:

- categories;
- associations;
- scoring;
- evaluators;
- `expectedCategoryId`;
- `expectedEntryIds`.

## Remaining limits

- Accessibility is still partial.
- No screen reader test has been performed.
- Touch/mobile behavior is not specifically handled.
- Focus management is minimal.
- Association drag-drop has not been improved yet.
- The wording is still prototype-level.
- There is no shared accessibility helper yet.

## Next steps

The next useful step is to test this fallback manually in the preview.

After that, compare whether the same pattern can be applied to Association drag-drop. If the pattern survives both renderers, a very small DOM accessibility helper may become justified.
