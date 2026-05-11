# BHE Complete Pipeline And ContentUnit

This document formalizes the current emerging architecture before introducing a
`ContentUnit` type.

It does not define a final architecture. It names the current direction and the
smallest controlled next step.

## 1. Forward Pipeline

The current forward pipeline is:

```txt
PedagogicalObject -> Adapter -> InteractionData -> Renderer
```

### PedagogicalObject

A `PedagogicalObject` carries the pedagogical intention and the central learning
content.

It defines:

- the pedagogical type;
- the pedagogical family;
- the learning goal;
- the core content;
- the possible interaction modes.

It should not be tied to one specific UI representation.

### Adapter

An adapter translates a pedagogical object into an interaction-ready shape.

Examples:

```txt
AssociationSet -> FlashcardsData
ClassificationSet -> QcmData
GapFillSet -> ContextualTypingData
```

The adapter handles the mapping between pedagogical structure and interaction
structure.

### InteractionData

`InteractionData` is the data shape consumed by a renderer.

It can be:

- a list of flashcards;
- a list of QCM questions;
- a contextual sequence of text segments and blanks;
- later, other interactional forms.

It is not the original pedagogical object. It is an interactional expression of
that object.

### Renderer

A renderer displays the interaction and captures learner action.

It should focus on:

- DOM or HTML output;
- local interaction behavior;
- input capture;
- basic display feedback;
- accessibility and usability details.

It should not carry all business logic. Mapping and evaluation should
progressively move out of renderers when the patterns become clear.

## 2. Return Pipeline

The expected return pipeline is:

```txt
UserInput -> Evaluator -> BHEResult -> Feedback / AdaptiveRouting
```

### UserInput

`UserInput` represents the raw or structured learner action.

Examples could include:

- selected choice id;
- typed answer;
- matched pair ids;
- ordered item ids;
- inference text and justification.

### Evaluator

An evaluator compares `UserInput` with the pedagogical object or expected
interaction data.

Its role is to decide what the learner action means, without making the renderer
responsible for scoring.

### BHEResult

`BHEResult` carries the evaluation outcome.

It can include:

- status;
- score;
- max score;
- completion;
- duration;
- signals;
- object-specific details;
- errors or partial results through `details`.

It should remain generic enough to support many pedagogical situations.

### Feedback / AdaptiveRouting

Feedback and adaptive routing consume `BHEResult`.

Feedback can decide what message or support to show.

Adaptive routing can decide which object should be activated next:

```txt
BHEResult -> AdaptiveRouting -> targetObjectId
```

This keeps routing based on result signals, not only on scores.

## 3. Position Of ContentUnit

`ContentUnit` would be the smallest manipulable content unit in BHE.

It would live inside the core content of a `PedagogicalObject`, not inside a
renderer.

Conceptually:

```txt
PedagogicalObject
  -> content.core
    -> ContentUnit
```

For example, an `AssociationSet` entry could eventually contain one or more
content units instead of only a text label.

### ContentUnit

`ContentUnit` would represent an element manipulated by the learner.

It could be:

- text;
- image;
- audio;
- video;
- later, possibly a simple grouped unit.

It belongs to the central pedagogical content or to a unit inside the core.

### BHEContentBlock

`BHEContentBlock` already exists, but it has a different role.

It represents support material such as:

- hint;
- feedback;
- explanation;
- example;
- resource.

It accompanies learning, but it is not necessarily the item directly manipulated
by the learner.

The distinction is important:

```txt
ContentUnit = manipulable learning material
BHEContentBlock = pedagogical support material
```

## 4. AssociationSet Case

The current `AssociationSet` model uses:

```txt
AssociationEntry.label: string
AssociationEntry.kind?: string
```

This makes association entries effectively text-first.

The optional `kind` field suggests that entries might represent words,
definitions, images, or audio, but it does not structure multimodal content.

Current limitation:

```txt
text <-> text
```

is naturally supported, but:

```txt
text <-> image
audio <-> text
text + image + audio <-> text
```

would require ad hoc interpretation.

The progressive target is:

- keep `label` temporarily for compatibility;
- add `ContentUnit` later;
- allow association entries to carry structured multimodal content;
- adapt only the association adapter first;
- keep other sets unchanged until a real need appears.

## 5. Points Of Attention

- Do not refactor every `InteractionData` shape too early.
- Do not confuse `ContentUnit` and `BHEContentBlock`.
- Do not turn the renderers into complete multimedia renderers immediately.
- Keep evaluation separated from renderers.
- Keep `BHEResult` generic.
- Avoid premature abstractions such as `CompositeUnit` until a concrete case
  requires them.
- Preserve compatibility while the old text-first examples still matter.
- Let the adapter layer absorb the first compatibility work.

## 6. Next Controlled Step

The next controlled step should be small:

1. Create `ContentUnit` in `packages/core/types/content`.
2. Add it progressively to `AssociationEntry`.
3. Keep `label` as a transitional compatibility field.
4. Adapt only `associationToFlashcardsAdapter`.
5. Provide a textual fallback for `ContentUnit`.
6. Do not modify the other sets yet.
7. Do not modify renderers unless the adapter output requires it.

This keeps the change local:

```txt
AssociationSet -> associationToFlashcardsAdapter -> FlashcardsData
```

The goal is not to make BHE fully multimodal immediately. The goal is to create
the first stable place where multimodal content can exist without breaking the
current pipeline.
