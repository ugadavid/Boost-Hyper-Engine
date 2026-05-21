# Learning Experience Layer Signal

This note captures an emerging signal without changing the architecture.

## Starting Point

The BHE manifesto states:

> Tout peut contenir tout.

So far, this principle has often been read through composition: objects can contain other objects, activities can be nested, and pedagogical structures can be assembled flexibly.

A new reading is emerging:

> "Tout peut contenir tout" may not only concern UI or object composition. It may also concern pedagogical composition.

## Exercise Is Not Learning Experience

The current sets mostly model cognitive operations:

- associate;
- classify;
- order;
- identify;
- infer;
- complete;
- transform.

These are essential, but they are not the full learning experience.

An exercise can ask the learner to perform an operation. A learning experience may also need to guide the learner before, during, and after that operation.

## Possible Missing Layer

There may be a missing layer of guidance or composition around the sets.

This layer could include:

- introduction;
- objectives;
- explanations;
- examples;
- hints;
- summaries;
- reflection;
- consolidation.

This does not mean BHE needs a new type immediately.

It is not yet clear whether this should become:

- a new Set;
- a `LearningExperience` layer;
- a composition rule;
- a pathway concept;
- metadata around existing objects;
- or something else.

## Boost'English Signal

This signal comes partly from the Boost'English experience.

The problem was not only the existence of exercises. It was also the feeling of having many exercises without enough framing, progression, explanation, or reflective consolidation.

In other words:

```txt
many exercises
!=
well-guided learning experience
```

This matters for BHE because the engine should not only make activities possible. It should eventually help shape meaningful pedagogical journeys.

## No Immediate Decision

No architectural decision is made here.

Do not create a new type from this note yet.

Do not refactor the current sets around it yet.

Do not decide whether this belongs to `BHEObject`, `PedagogicalObject`, routing, composition, or another future layer.

For now, this is only a signal to preserve:

> BHE may need to distinguish cognitive operation objects from learning experience composition.

This signal should remain available for future architecture work.
