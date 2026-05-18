# SequenceSet interaction exploration

## Scope

This report explores what `SequenceSet` seems to require as interaction forms before any implementation.

No renderer, evaluator, `InteractionData`, registry, or generalized reorder engine is proposed here.

## 1. Pedagogical nature of SequenceSet

`SequenceSet` is currently a structural pedagogical object. Like `AssociationSet` and `ClassificationSet`, it asks the learner to organize items according to a relationship.

But the relationship is different.

### Compared with AssociationSet

`AssociationSet` asks:

> Which items belong together?

Its core operation is grouping.

Correctness can be evaluated by group completeness:

- missing entries;
- extra entries;
- correct or incorrect groups.

### Compared with ClassificationSet

`ClassificationSet` asks:

> Which category does this item belong to?

Its core operation is categorization.

Correctness is naturally item-based:

- item placed in expected category;
- item missing;
- item in wrong category.

### What SequenceSet asks

`SequenceSet` asks:

> What comes before and after?

Its core operation is ordering.

This introduces a different cognitive structure:

- temporal order;
- logical progression;
- adjacency;
- proximity;
- dependency between neighboring items;
- possible start/end constraints.

Unlike association or classification, the meaning of an item may depend heavily on its neighbors. A sequence item can be globally misplaced even if it is close to the correct position.

## 2. Possible pedagogical use cases

### Simple order

Example:

- step 1;
- step 2;
- step 3;
- step 4.

Cognitive difficulty:

- low to medium;
- learner identifies a linear progression.

Feedback:

- correct position;
- wrong position;
- missing first/last step;
- "this comes before X".

Scoring:

- exact position score;
- adjacent pair score;
- full sequence score.

### Phrase reconstruction

Example:

- reorder words into a sentence.

Cognitive difficulty:

- medium;
- grammar, syntax, and word order all matter.

Feedback:

- local word order;
- grammar hints;
- adjacent errors.

Scoring:

- exact order;
- correct adjacent pairs;
- partial subsequences.

Risk:

- this may overlap with transformation or gap-fill if the task becomes too linguistic.

### Text reconstruction

Example:

- reorder sentences or paragraphs.

Cognitive difficulty:

- medium to high;
- learner uses discourse markers, cohesion, pronouns, and topic progression.

Feedback:

- paragraph-level flow;
- "this sentence introduces the topic";
- "this sentence depends on previous information".

Scoring:

- exact order;
- adjacency;
- correct blocks.

### Timeline

Example:

- order historical events;
- order events in a story.

Cognitive difficulty:

- variable;
- depends on prior knowledge and temporal cues.

Feedback:

- before/after;
- date or clue-based hints;
- local swaps.

Scoring:

- exact position;
- chronological pair correctness;
- distance from expected position.

### Process / workflow

Example:

- order steps in a procedure.

Cognitive difficulty:

- medium;
- sequence may represent causality or prerequisite logic.

Feedback:

- prerequisite missing;
- "this step happens after X";
- dependency-based explanation.

Scoring:

- exact order;
- valid dependency order;
- critical step placement.

### Narrative / story ordering

Example:

- reorder scenes in a narrative.

Cognitive difficulty:

- medium to high;
- temporal, causal, and narrative clues combine.

Feedback:

- setup / conflict / resolution;
- cause and consequence;
- local coherence.

Scoring:

- exact order;
- adjacency;
- narrative arc segments.

### Ordered multimodal content

Example:

- order images, audio clips, or video fragments.

Cognitive difficulty:

- variable;
- learner must interpret multimodal clues.

Feedback:

- cue-based hints;
- media transcript clues;
- "this image/audio belongs before X".

Scoring:

- same as other sequence tasks, but with display complexity.

Risk:

- media controls and draggable/reorder interactions may conflict, as already observed with Association drag-drop.

## 3. Natural interaction modes

### Drag-drop reorder

Learner drags items into an ordered list.

Pros:

- intuitive for ordering;
- common UI pattern;
- works for simple sequences.

Cons:

- accessibility requires careful keyboard support;
- mobile behavior can be fragile;
- media content inside reorderable items may conflict with drag gestures.

Fit with BHE:

- likely useful, but should be specialized as `SequenceReorderData` or similar, not folded into current group/category drag-drop.

### Click ordering

Learner clicks items in the intended order.

Pros:

- simpler than drag/drop;
- easier keyboard equivalent;
- avoids complex reorder mechanics.

Cons:

- correcting earlier choices may need undo/reset;
- not as visually direct for long sequences.

Fit with BHE:

- strong candidate for an accessibility-first interaction.

### Keyboard ordering

Learner selects an item and moves it up/down.

Pros:

- accessible pattern;
- precise for list reordering;
- compatible with screen readers if announced well.

Cons:

- more UI controls;
- can feel slower;
- needs careful focus management.

Fit with BHE:

- important if reorder becomes a real DOM renderer.

### Select-next-position

Learner selects a position, then chooses the item for that position.

Pros:

- explicit;
- works without drag/drop;
- suitable for short sequences.

Cons:

- may become tedious;
- less natural for rearranging.

Fit with BHE:

- useful for POCs and accessibility fallback.

### Typing

Learner types an ordered answer, such as numbers or labels.

Pros:

- simple input model;
- no drag/drop needed.

Cons:

- fragile answer parsing;
- less suitable for media;
- may shift cognitive load toward formatting.

Fit with BHE:

- possible for advanced or text-only sequence tasks, but probably not the first interaction.

### Hybrid interactions

Examples:

- click-to-build plus drag-to-adjust;
- reorder list plus "Check";
- select item then move before/after another item.

Pros:

- can balance accessibility and usability.

Cons:

- easy to overbuild too early.

Fit with BHE:

- likely future direction, not first POC.

## 4. Architectural tensions

### Adjacency semantics

Sequence introduces adjacency:

- A before B;
- B after A;
- A near B;
- adjacent pair correctness.

This is not present in the same way in Association or Classification.

Signal: evaluators may need to inspect neighboring items, not only absolute positions.

### Partial correctness

Partial order is already hinted by `allowPartialOrder`.

Possible partial scores:

- exact positions correct;
- adjacent pairs correct;
- ordered subsequences correct;
- distance from expected position.

Signal: a Sequence evaluator may need a richer scoring policy than V0 Association or Classification.

### Local scoring

For sequence, an item can be:

- exactly correct;
- close;
- before/after expected position;
- in a correct local pair;
- in a correct block but wrong global position.

Signal: `details` may need more structure than simple item correct/incorrect.

### Progressive feedback

Sequence tasks may support feedback like:

- "first step is correct";
- "these two should be adjacent";
- "this belongs later";
- "the start/end is wrong".

Signal: feedback mapping could eventually consume sequence-specific details.

### Ordered InteractionData

A likely future `InteractionData` may need:

- ordered items;
- initial shuffled order;
- expected order;
- maybe locked/fixed items;
- maybe sequence slots.

It should not be modeled as generic drop zones too early.

### Multimodal order

`SequenceItem` currently has `media?: string`, not `ContentUnit`.

Future multimodal sequence content may raise similar questions to Association:

- render media in reorderable items;
- preserve text fallback;
- handle audio/video controls.

Signal: multimodality should be handled carefully, after a text-only reorder POC.

## 5. What not to do now

Do not create:

- a renderer;
- an evaluator;
- a registry;
- a generalized reorder engine;
- a common drag-drop/reorder abstraction;
- a shared sequence scoring framework;
- a multimodal sequence rendering system;
- a new helper before seeing an actual interaction shape.

Do not force Sequence into the current drag-drop group/category model.

## 6. Final recommendation

Recommendation: **A. create a simple reorder InteractionData POC next**.

The healthiest next step is console-only and adapter-level:

`SequenceSet -> SequenceReorderData`

Possible minimal shape:

```txt
items: {
  itemId: string;
  label: string;
  expectedPosition: number;
}[]
```

Optional later fields:

- initialPosition;
- media;
- fixed;
- metadata.

Why this next:

- it observes Sequence's data needs before UI;
- it avoids choosing drag/drop too early;
- it keeps evaluator design deferred;
- it can reveal whether exact position or adjacency should be represented;
- it fits the existing BHE method: adapter first, evaluator later, renderer only after the data shape has earned it.

Do not create a renderer yet. Do not create an evaluator yet. Start with the smallest `InteractionData` POC.
