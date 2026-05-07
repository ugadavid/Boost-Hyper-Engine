# BHE Architecture Progress Report

## Current State

BHE now has a first stable architectural vocabulary:

- `BHEObject` as the generic object foundation.
- `PedagogicalObject` as the pedagogical specialization.
- `PedagogicalContent` for `core`, `support`, and `variants`.
- `PedagogicalType` for the pedagogical operation.
- `PedagogicalFamily` for broad classification.
- `InteractionMode` for possible learner interactions.
- `RendererDefinition` for matching objects and modes to renderers.

## Main Design Rule

A pedagogical object is not an interaction mode, and an interaction mode is not
a renderer.

```txt
PedagogicalObject + InteractionMode -> RendererDefinition -> rendered output
```

This is the central BHE separation.

## Pedagogical Families

`structural`
: association, classification, sequence.

`productive`
: transformation, gap-fill.

`interpretive`
: identification, inference.

The grouping is light but useful: it helps describe the learning operation
without locking the object into one renderer.

## Implemented Sets

- `AssociationSet`
- `ClassificationSet`
- `SequenceSet`
- `TransformationSet`
- `GapFillSet`
- `IdentificationSet`
- `InferenceSet`

All follow the same convention:

```txt
XSet / XSetCore / XSet extends PedagogicalObject<XSetCore>
```

## Renderer Registry POC

The current renderer registry proves the selection mechanism only.

Implemented pieces:

- `RendererDefinition`
- `registerRenderer(renderer)`
- `findRenderer(object, interactionMode)`
- text renderer for `association + drag-drop`
- text renderer for `classification + qcm`

This is not a UI system yet.

## Public Documentation

TypeDoc documents the core public type surface and the renderer registry POC.

Expected output:

```txt
docs/api
```

## Points Of Vigilance

- Avoid turning `metadata` into hidden structure.
- Avoid confusing `BHEObject.type`, `kind`, and `pedagogicalType`.
- Keep renderers out of pedagogical types.
- Keep examples small and concrete.
- Do not create shared abstractions before repeated pressure is clear.

## Possible Next Steps

- Add simple tests for routing and renderer selection.
- Add documentation for naming conventions.
- Add one more text renderer POC for another `PedagogicalType`.
- Decide whether `AssociationPair` should become `AssociationLink`.
- Decide later whether `BHEObject<TData>` should expose `data`, or whether
  pedagogical objects should rely only on `content`.
