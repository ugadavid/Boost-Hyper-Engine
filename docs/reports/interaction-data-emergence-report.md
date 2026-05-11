# InteractionData Emergence Report

This report reflects on the current adapter proof-of-concepts and DOM renderer
experiments. It does not propose a final architecture. Its purpose is to name an
emerging pattern.

## 1. Main Observation

Two adapter POCs now exist:

```txt
AssociationSet -> FlashcardsData -> FlashcardsRenderer
ClassificationSet -> QcmData -> QcmRenderer
```

In both cases, the renderer became simpler once it stopped reading the full
pedagogical object directly. The adapter now handles the transformation from a
pedagogical structure into an interaction-ready shape.

This suggests that the following separation is emerging naturally:

```txt
PedagogicalObject -> InteractionData -> Renderer
```

Some early renderers were doing two jobs at once:

- interpreting pedagogical structure;
- rendering an interaction.

For example, the flashcards renderer originally resolved association entries
and binary links itself. The QCM renderer originally mapped classification items
and categories directly. Those are not purely rendering concerns. They are
pedagogical-to-interaction mappings.

## 2. Responsibility Split

### PedagogicalObject

A `PedagogicalObject` describes the learning material and its intention.

It answers questions such as:

- What kind of pedagogical object is this?
- What is the learning goal?
- What is the core content?
- Which interaction modes are allowed?
- What support material or variants exist?

It should remain independent from a specific UI representation.

### InteractionData

`InteractionData` would be the interaction-ready form derived from one or more
pedagogical objects.

It answers questions such as:

- What cards should a flashcards renderer display?
- What questions and choices should a QCM renderer display?
- What prompts, blanks, inputs, or evidence should a typing renderer expose?

It sits between pedagogy and rendering.

### Renderer

A renderer should focus on presentation and interaction behavior.

It answers questions such as:

- What DOM nodes are created?
- What events are listened to?
- How does feedback appear?
- How is local state represented?
- How is the interaction made usable and accessible?

The renderer should ideally not need to understand every detail of the original
pedagogical type.

## 3. Nature Of InteractionData

The current POCs suggest that `FlashcardsData` and `QcmData` are not merely
technical helper types. They are interactional forms.

Examples:

- `FlashcardsData` is made of front/back cards.
- `QcmData` is made of questions, choices, and correct choice ids.
- A future `TypingData` could be made of prompts, expected answers, and input
  constraints.
- A future contextual typing shape could be made of text segments and blanks.
- A future inference typing shape could be made of context, evidence, prompts,
  answer fields, and justification fields.

These shapes are independent from the original pedagogical source. An
`AssociationSet` can become flashcards, but another pedagogical object might
also become flashcards later. A `ClassificationSet` can become QCM, but other
objects could also produce QCM questions.

That means interaction data may eventually become a shared contract for
renderers.

### Third Adapter Signal: ContextualTypingData

The third adapter POC adds an important variation:

```txt
GapFillSet -> ContextualTypingData -> GapFillTypingRenderer
```

Unlike `FlashcardsData` and `QcmData`, `ContextualTypingData` is not mainly a
list of independent items. It is an ordered sequence:

```txt
text segment -> typing blank -> text segment -> typing blank -> text segment
```

This matters because it shows that `InteractionData` can represent a structured
interaction flow, not only a collection of cards or questions.

The gap-fill renderer no longer cuts the context into text and blanks itself.
That mapping now belongs to the adapter. The renderer receives a sequence that
is already interaction-ready, then focuses on DOM inputs, the Check button, and
local feedback.

This strengthens the emerging model:

```txt
PedagogicalObject -> InteractionData -> Renderer
```

The pedagogical object still owns the context and blanks. The interaction data
owns the ordered typing sequence. The renderer owns the browser interaction.

## 4. What This Changes

The adapter direction changes the role of renderers.

Renderers become simpler because they receive data already shaped for the
interaction. They no longer need to know how to resolve every pedagogical
structure.

Renderers become more reusable because a flashcards renderer could render any
valid `FlashcardsData`, regardless of whether it came from an `AssociationSet`,
a `TransformationSet`, or another object.

The cognitive layer and the interaction layer become clearer:

```txt
Pedagogical logic -> interaction mapping -> UI behavior
```

It also opens the possibility of multiple renderers for the same
`InteractionData`:

- DOM flashcards renderer;
- HTML string flashcards renderer;
- future React/Vue/native flashcards renderer;
- accessible text-only flashcards renderer.

The important shift is this: renderers may not need to render pedagogical
objects directly. They may render interaction forms derived from those objects.

## 5. What Remains Unknown

Several questions are still unresolved.

- Should there be a formal `InteractionData` hierarchy?
- Should `FlashcardsData`, `QcmData`, and future typing shapes share a common
  base type?
- Should adapters have a generic interface?
- Should adapters be discoverable through a registry?
- Should adapters live in `packages/renderer`, `packages/core`, or a future
  package?
- Should validation live in adapters, renderers, core evaluators, or separate
  evaluation modules?
- How should scoring and analytics consume interaction data?
- How should adaptive routing use results produced by interaction renderers?
- Can one adapter produce several interaction data variants from the same
  pedagogical object?

These questions are important, but the current evidence is still too small to
answer them definitively.

## 6. Risks

The main risk is abstraction prématurée: turning a promising pattern into a
framework before enough cases exist.

Other risks:

- explosion of interaction data types;
- duplicated adapter logic;
- tight coupling between one adapter and one renderer;
- confusion between pedagogical structure and interaction structure;
- moving validation too early into the wrong layer;
- creating a registry before the selection rules are understood;
- hiding useful renderer-specific knowledge behind generic interfaces.

The current POCs should therefore remain exploratory. The pattern is strong, but
not mature enough to freeze.

## 7. Philosophical Reflection

BHE may not ultimately render pedagogical objects directly.

Instead, BHE may transform pedagogical objects into forms of interaction, then
render those forms.

That would fit the central idea of BHE: preserve the pedagogical intention while
allowing the learner experience to take different shapes.

In that view:

```txt
AssociationSet
ClassificationSet
GapFillSet
InferenceSet
```

are not UI objects. They are pedagogical objects.

And:

```txt
FlashcardsData
QcmData
TypingData
ContextualTypingData
InferenceTypingData
```

would not be pedagogical objects. They would be interactional expressions of
pedagogical objects.

This distinction could become central to BHE:

```txt
What is taught != how it is interacted with != how it is rendered
```

For now, the best next step is not to design the final system. It is to keep
observing whether the same separation appears in the next renderer and adapter
experiments.
