# Sequence reorder accessibility interaction note

## Scope

This note defines the healthiest shape for the first text-only Sequence renderer before implementation.

Current V0 evaluation strategy:

- exact position is scored;
- adjacency is observed in `BHEResult.details`;
- no mixed scoring yet.

## 1. Minimal interaction candidates

### Drag-to-reorder

Learner drags items into order.

Pros:

- familiar visual pattern;
- direct manipulation;
- good for mouse users.

Cons:

- keyboard fallback must be designed anyway;
- touch behavior can be inconsistent;
- screen reader behavior is difficult;
- media or complex content may later create interaction conflicts;
- risks importing the current drag-drop complexity into Sequence too early.

Conclusion:

Good later, not ideal for V0.

### Move up / move down buttons

Each item has buttons to move it one position up or down.

Pros:

- keyboard-friendly;
- screen-reader-friendly if labels are clear;
- simple DOM state;
- easy focus model;
- no drag/drop required;
- maps cleanly to `orderedItemIds`;
- works well for text-only V0.

Cons:

- can be slower than drag/drop;
- many buttons in long sequences;
- may need careful focus handling after movement.

Conclusion:

Strongest V0 candidate.

### Select item + move before/after

Learner selects one item, then chooses where to place it.

Pros:

- closer to the click-to-move pattern already tested in drag-drop renderers;
- can be accessible;
- supports larger jumps than up/down.

Cons:

- more stateful;
- more complex announcements;
- "before/after" destination semantics may be harder to explain;
- implementation is slightly heavier for V0.

Conclusion:

Good candidate for V1 or longer sequences, but not the simplest first renderer.

### Click-to-build order

Learner clicks items in the intended order, building a final sequence.

Pros:

- simple for short sequences;
- easy to understand;
- avoids reorder mechanics.

Cons:

- correction requires undo/reset;
- not really reorder, more construction;
- less compatible with an existing ordered list;
- may produce a different interaction model than `SequenceReorderData` suggests.

Conclusion:

Interesting alternate mode, but not the best first renderer.

### Keyboard-first reorder

Learner uses arrow keys or shortcuts to reorder focused items.

Pros:

- excellent accessibility target;
- efficient when implemented well.

Cons:

- more hidden behavior;
- needs instructions;
- requires careful focus and announcement management;
- harder to keep minimal without visible controls.

Conclusion:

Important later, but V0 should use visible buttons first.

## 2. Accessibility strategy for V0

The first Sequence renderer should not require drag/drop.

Recommended V0 accessibility strategy:

- render an ordered list;
- each item exposes visible `Move up` and `Move down` buttons;
- buttons have specific accessible labels, such as `Move "I wake up" up`;
- disabled states are used for first/last item;
- after movement, focus remains on the moved item's relevant control where possible;
- an `aria-live` region announces movement:
  - `Moved "I wake up" to position 2.`;
  - `Already first item.`;
  - `Already last item.`;
- Check reads the current DOM/list order and creates `SequenceReorderUserInput`;
- evaluation remains outside the renderer.

This supports:

- keyboard;
- screen readers;
- visible affordances;
- no mouse drag/drop dependency.

## 3. Coherence with existing BHE architecture

### SequenceReorderData

The renderer can consume:

- `items`;
- `itemId`;
- `label`;
- `expectedPosition`;
- `initialPosition`.

It can display items ordered by `initialPosition` and allow local rearrangement.

### SequenceReorderUserInput

The Check action can produce:

```ts
{
  kind: "sequence-reorder",
  orderedItemIds: string[]
}
```

This mirrors the current list order and avoids any drag/drop-specific placement model.

### evaluateSequenceReorder

The renderer should call the existing evaluator unchanged.

The evaluator already produces:

- exact position scoring;
- expected order;
- actual order;
- exact position results;
- adjacent pair observations.

### Feedback future

V0 can either show raw/simple local feedback or later use a feedback mapper extension.

Important: feedback should consume `BHEResult.details`, not re-evaluate inside the renderer.

Adjacency can be surfaced later without changing the scoring strategy.

## 4. What not to do now

Do not create:

- a generic renderer;
- a generalized reorder engine;
- mandatory drag/drop;
- multimodal Sequence rendering;
- mixed scoring;
- a registry;
- a Sequence-specific feedback system;
- keyboard shortcuts before visible controls exist.

Do not make Sequence inherit the Association/Classification drag-drop patterns too quickly.

## 5. Final recommendation

Recommendation: **B. move up / move down text-only**.

The first Sequence renderer V0 should be:

- text-only;
- list-based;
- no drag/drop;
- keyboard-friendly by default;
- built around visible Move up / Move down buttons;
- connected to the existing `evaluateSequenceReorder`;
- exact-position scored with adjacency observed in `details`.

This gives BHE a clean accessibility-first Sequence interaction before exploring drag/drop reorder or multimodal sequence content.
