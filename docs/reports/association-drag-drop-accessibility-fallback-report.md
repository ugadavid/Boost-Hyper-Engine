# Association drag-drop accessibility fallback report

## Why this fallback was added

Association drag-drop now supports multimodal `ContentUnit` rendering, including image, audio, and video items. Mouse drag/drop alone is not enough for this interaction, especially when media controls appear inside draggable items.

This fallback adds a second placement path:

- select an item;
- choose a destination zone;
- move the item without dragging;
- return the item to the tray when needed.

The goal is improved interaction robustness, not a full accessibility solution yet.

## Similarities with Classification

The fallback mirrors the Classification drag-drop experiment:

- click selects an item;
- Enter and Space also select an item;
- one item is selected at a time;
- selected items receive `is-selected`;
- selected items use `aria-pressed`;
- each destination exposes a `Move here` action;
- the tray exposes `Return here`;
- an `aria-live` region announces movement.

This confirms that a common DOM accessibility pattern is emerging.

## Differences caused by association groups

Association drag-drop differs from Classification because zones represent expected groups, not categories.

That means:

- a zone can expect two, three, or more entries;
- correctness is group-based;
- feedback is about missing and extra entries;
- moving one item may improve or break a whole group.

The fallback therefore moves the same DOM items, but does not attempt to explain correctness before Check.

## Behavior with ContentUnit

The fallback works with:

- text items;
- image items;
- audio items;
- video items.

Selection uses the item's textual `aria-label`, which is still based on the fallback label. This is important because rendered media may not provide enough visible text.

Audio and video controls remain usable. A previous guard prevents native dragstart from starting inside `audio` or `video` controls, while dragging from the wrapper remains possible.

## Why UserInput and evaluator do not change

The fallback changes only the way items are moved in the DOM.

The Check button still reads:

- `entryId`;
- `zoneId`.

It still creates the same `AssociationDragDropUserInput`, then calls `evaluateAssociationDragDrop`.

No scoring, routing, feedback mapping, or `BHEResult` shape changed.

## Observed media behavior

Current expected behavior:

- clicking media controls should interact with media;
- dragging from media controls is prevented;
- dragging from the item wrapper still works;
- selecting a media item via click may compete with media control clicks depending on exact target;
- keyboard focus can enter native media controls.

This is acceptable for the POC but still needs human browser testing.

## Remaining limits

- No screen reader test has been performed.
- Touch/mobile behavior is still unknown.
- Focus management is minimal.
- The item wrapper is still a `button`, which may become questionable for complex nested media controls.
- Audio/video inside draggable items may eventually need a drag handle.
- Association feedback remains group-based and is only shown after Check.

## Is a common helper becoming credible?

Yes, but not yet mandatory.

The repeated pattern is now clearer:

- selected item state;
- clearing selection;
- moving selected item to a container;
- announcing movement;
- destination actions.

A small DOM helper may soon be justified, but only if it stays independent of:

- `AssociationSet`;
- `ClassificationSet`;
- evaluators;
- scoring;
- semantic `UserInput`.

Before extracting it, the current duplicated implementations should be manually tested in previews.

## Next step

The next controlled step should be a short comparison report focused only on the click-to-move fallback in Association and Classification.

If the pattern holds, BHE can then extract a tiny DOM accessibility helper.
