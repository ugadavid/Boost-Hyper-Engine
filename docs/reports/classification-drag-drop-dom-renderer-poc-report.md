# Classification drag-drop DOM renderer POC report

## Why this renderer exists

This POC adds the first human-testable DOM renderer for:

`ClassificationDragDropData -> ClassificationDragDropUserInput -> evaluateClassificationDragDrop -> BHEResult -> mountFeedbackFromResult`

It follows the recommendation from `drag-drop-specialized-pocs-comparison.md`: test a second specialized drag-drop renderer before extracting any shared drag-drop abstraction.

The goal is not to create a complete UI system. The goal is to observe what repeats between Association drag-drop and Classification drag-drop, and what remains pedagogically specific.

## What was added

The new renderer:

- receives a `ClassificationSet`;
- adapts it through `classificationToDragDropData`;
- displays an initial tray of draggable items;
- displays categories as drop zones;
- lets the learner move items between tray and categories using native DOM drag/drop;
- creates `ClassificationDragDropUserInput` on Check;
- calls `evaluateClassificationDragDrop`;
- mounts global feedback through `mountFeedbackFromResult`;
- applies simple local classes to items and zones.

The new preview:

- creates a small French gender classification set;
- renders it with the new DOM renderer;
- keeps CSS inline and minimal;
- remains a temporary human-test page.

## Comparison with Association drag-drop

The renderer confirms several similarities:

- an initial tray;
- draggable item buttons;
- drop zones;
- native `dragstart`, `dragover`, and `drop` events;
- a Check button;
- placement collection;
- visual correct/incorrect classes;
- feedback mounting through the shared feedback tail.

It also confirms important differences:

- Association zones represent expected groups.
- Classification zones represent categories.
- Association feedback is naturally zone/group based.
- Classification feedback is naturally item based.
- Classification can mark each item correct, incorrect, or missing.
- Association needs missing/extra analysis per group.

So the DOM gesture is similar, but the meaning is not the same.

## What repeats on the DOM side

The repeated DOM mechanics are now easier to see:

- creating draggable item elements;
- enabling a container as a drop target;
- moving an item between containers;
- collecting placements from zone contents;
- toggling visual state classes;
- mounting feedback into a container.

These are candidates for a future small DOM utility, but not yet for a pedagogical `DragDropData` abstraction.

## What remains specific to Classification

Classification-specific logic includes:

- `itemId`;
- `categoryId`;
- category drop zones;
- `expectedCategoryId`;
- item-based result display;
- missing item handling;
- zone summaries based on placed item correctness.

The evaluator remains outside the renderer, but the renderer still needs to understand enough of the classification interaction to collect the right `UserInput` and display useful local state.

## Evaluation impact

Because `evaluateClassificationDragDrop` is item-based, the renderer can show:

- correct items;
- incorrect items;
- missing items;
- per-category local summaries.

This differs from Association drag-drop, where a zone can be incorrect even if part of the group is close to correct.

That difference argues against a generic drag-drop evaluator or generic feedback detail shape at this stage.

## Why no generalization yet

No common `DragDropData`, renderer registry, DOM helper, or orchestrator was created because:

- only two specialized drag-drop renderers exist;
- both share mechanics but not semantics;
- the next type, especially `SequenceSet` or `GapFillSet`, may change the shape again;
- extracting now would likely freeze the wrong abstraction.

The current duplication is acceptable because it is still producing architectural evidence.

## Limits

- Accessibility is minimal: the renderer uses native drag/drop and text labels, but does not support keyboard placement yet.
- Mobile and touch behavior are not handled.
- Feedback is basic and partly generic.
- The preview uses fallback text only.
- DOM logic is duplicated with Association drag-drop.
- No routing is connected after this renderer.
- No registry or shared drag-drop helper exists.

## Next recommended step

Create a short DOM-level comparison between:

- `associationDragDropDomRenderer`;
- `classificationDragDropDomRenderer`.

That report should focus only on renderer mechanics:

- item creation;
- drop enabling;
- placement extraction;
- visual state;
- feedback mounting;
- accessibility needs.

If the repetition is stable, the next safe abstraction would be a tiny DOM utility, not a shared pedagogical `DragDropData` type.
