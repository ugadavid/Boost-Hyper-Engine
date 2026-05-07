# BHE Pedagogical Object Taxonomy

## Core distinction

BHE currently separates three ideas:

- **Pedagogical object**: the abstract learning object and its pedagogical content.
- **Interaction mode**: the way learners can interact with that content.
- **Renderer**: the implementation that presents one pedagogical object through one interaction mode.

In short:

```txt
PedagogicalObject + InteractionMode -> RendererDefinition -> rendered output
```

This means the same content can later be rendered as drag-drop, QCM, typing,
flashcards, or other interaction forms without changing the pedagogical core.

## PedagogicalObject

`PedagogicalObject<TCore>` is the current specialization of `BHEObject` for
pedagogical content.

It carries:

- `kind: "pedagogical-object"`
- `pedagogicalFamily`
- `pedagogicalType`
- `learningGoal`
- `content`
- `interactionModes`

## PedagogicalType

Current pedagogical types:

- `association`
- `classification`
- `sequence`
- `transformation`
- `gap-fill`
- `identification`
- `inference`

Each type represents a pedagogical operation, not a renderer.

## PedagogicalFamily

Current families:

- `structural`: organize, relate, classify, sequence.
- `productive`: produce or transform an answer.
- `interpretive`: identify, infer, interpret.

Current mapping:

- `AssociationSet` -> `structural`
- `ClassificationSet` -> `structural`
- `SequenceSet` -> `structural`
- `TransformationSet` -> `productive`
- `GapFillSet` -> `productive`
- `IdentificationSet` -> `interpretive`
- `InferenceSet` -> `interpretive`

## PedagogicalContent

`PedagogicalContent<TCore>` separates:

- `core`: the stable abstract content.
- `support`: hints, explanations, examples, feedbacks, resources.
- `variants`: alternate versions of the same core shape.

This keeps the pedagogical content independent from its interaction mode.

## Current Sets

`AssociationSet`
: relates entries through associations.

`ClassificationSet`
: classifies items into categories.

`SequenceSet`
: orders items by expected position.

`TransformationSet`
: transforms a source form into an expected form.

`GapFillSet`
: fills blanks in a context.

`IdentificationSet`
: identifies targets inside a context.

`InferenceSet`
: formulates or justifies inferences from a context and evidence.

## Renderer Registry POC

The renderer registry is a proof of concept in `packages/renderer`.

It uses `RendererDefinition`:

- `id`
- `supportedPedagogicalTypes`
- `supportedInteractionModes`
- `render(object, interactionMode)`

The registry can:

- register renderers;
- find a renderer for one `PedagogicalObject` and one `InteractionMode`.

The current renderers are text-only:

- `associationDragDropTextRenderer`
- `classificationQcmTextRenderer`

No DOM, CSS, or real graphical rendering is involved yet.

## Watch Points

- `BHEObject` still has transitional `type?` and `getData?()`.
- `PedagogicalObject` uses explicit `content`, while `BHEObject<TData>` still suggests a generic data payload.
- `type`, `kind`, and `pedagogicalType` must stay semantically distinct.
- `expected` has different meanings across sets.
- `metadata` should not become a catch-all for important pedagogical structure.

## Possible Next Steps

- Add tests around renderer selection.
- Document naming conventions for `kind`, `type`, and `pedagogicalType`.
- Decide later whether common item fields deserve a shared base type.
- Add a first non-DOM renderer for another set.
- Keep real UI renderers separate from core pedagogical types.
