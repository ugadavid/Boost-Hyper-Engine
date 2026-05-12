# ContentUnit DOM rendering exploration

## Question

How can BHE progressively render `ContentUnit` in DOM renderers without breaking the current architecture?

The current architecture separates:

`PedagogicalObject -> Adapter -> InteractionData -> Renderer -> UserInput -> Evaluator -> BHEResult`

`ContentUnit` belongs to the pedagogical model. DOM renderers currently receive mostly text-oriented `InteractionData`, so multimodal rendering must be introduced carefully.

## Current ContentUnit shape

Current units are:

- `TextUnit`;
- `ImageUnit`;
- `AudioUnit`;
- `VideoUnit`.

They represent manipulable content, not support content. This remains distinct from `BHEContentBlock`, which is used for hints, examples, explanations, feedback, and resources.

## Text

`TextUnit` is the simplest case:

- fallback text and true DOM rendering are almost identical;
- `unit.text` can be rendered as `textContent`;
- accessibility is straightforward.

This should be the baseline behavior.

## Image

`ImageUnit` introduces the first real difference between fallback text and DOM rendering:

- fallback text: `[image: alt]` or `[image: src]`;
- true DOM: `<img src="..." alt="...">`.

Risks:

- missing `alt`;
- broken image loading;
- sizing and layout in draggable items;
- deciding whether images are decorative or meaningful;
- maintaining a readable text fallback.

For BHE, images in `ContentUnit` are likely meaningful, so `alt` should become strongly encouraged before real rendering is widespread.

## Audio

`AudioUnit` can fallback to:

- `[audio: transcript]`;
- `[audio: src]`.

True DOM rendering could use:

- `<audio controls src="...">`;
- transcript as visible text or accessible label.

Risks:

- browser controls differ;
- media loading;
- autoplay restrictions;
- keyboard focus inside audio controls;
- multiple audio controls in draggable items;
- whether dragging a control is ergonomically acceptable.

Audio should probably render with both a control and a transcript/fallback label.

## Video

`VideoUnit` can fallback to:

- `[video: transcript]`;
- `[video: src]`.

True DOM rendering could use:

- `<video controls src="..." poster="...">`;
- transcript as visible or collapsible supporting text.

Risks:

- large layout footprint;
- media loading;
- controls inside draggable elements;
- mobile behavior;
- captions/transcripts;
- poster/thumbnail handling.

Video should not be the first implementation target.

## Fallback text vs true DOM rendering

Fallback text is currently useful because:

- renderers remain simple;
- `InteractionData` stays text-based;
- evaluators and `UserInput` stay id-based;
- console examples remain readable.

True DOM rendering is needed because:

- BHE must eventually support multimodal pedagogical content;
- text fallback is not pedagogically equivalent to image/audio/video;
- drag-drop with image/audio content is a real use case.

The transition should not remove fallback text. A strong design is likely:

- keep `label` as display fallback;
- optionally carry a `ContentUnit`;
- render the unit when available;
- use the label when DOM rendering is unavailable or unsupported.

## Where to place renderContentUnit

A future `renderContentUnit(unit)` should probably live in the renderer package, not core.

Possible location:

`packages/renderer/content/renderContentUnit.ts`

Reason:

- it creates DOM;
- it depends on browser APIs;
- it belongs to presentation, not pedagogical core;
- core should keep `ContentUnit` as data only.

The function should be small and explicit:

```ts
renderContentUnit(unit: ContentUnit): HTMLElement
```

It should not know about:

- `AssociationSet`;
- `ClassificationSet`;
- scoring;
- evaluators;
- routing.

It should only convert a `ContentUnit` into a safe DOM representation.

## Impact on AssociationDragDropData

`AssociationDragDropData` currently contains:

- `entryId`;
- `label`;
- optional `kind`;
- optional `metadata`.

This means the adapter has already flattened `ContentUnit` into text.

To support true DOM rendering, there are two possible paths:

### Option 1: keep text-only InteractionData

Pros:

- no type change;
- no renderer change beyond styling;
- evaluators stay untouched.

Cons:

- no real multimodal rendering;
- ContentUnit remains hidden after adaptation.

### Option 2: add optional unit to item display data later

Example:

```ts
unit?: ContentUnit
```

Pros:

- renderers can display real media;
- fallback label remains;
- adapter preserves source display data.

Cons:

- `InteractionData` becomes aware of `ContentUnit`;
- renderers must handle media concerns;
- TypeDoc and examples need updates.

This should be a controlled future change, probably only for `AssociationDragDropData` first.

## Impact on ClassificationDragDropData

`ClassificationDragDropData` currently comes from `ClassificationItem`, which only has `label` and optional `kind`.

Unlike `AssociationSet`, Classification does not yet carry `ContentUnit`.

So adding `renderContentUnit` does not immediately affect Classification unless Classification items later gain a `unit?: ContentUnit` or a more general display model.

This is another reason to start with Association rather than all drag-drop renderers.

## Why UserInput and evaluators should not change

`ContentUnit` affects what the learner sees and manipulates.

It should not change the basic evaluation identity model:

- association placements use `entryId`;
- classification placements use `itemId`;
- evaluators compare ids and expected structures;
- `BHEResult` remains based on correctness, score, completion, and details.

Changing evaluators to compare media objects would be a design mistake. Media rendering belongs to the presentation path, while correctness should remain tied to stable identifiers and expected relationships.

## Risks

### Media loading

Images, audio, and video can fail to load. Renderers need fallback labels and possibly error states.

### Accessibility

Images need meaningful `alt`. Audio/video need transcript strategy. Controls must remain keyboard usable.

### Layout

Media can distort draggable item dimensions. Drag-drop zones need stable sizing.

### Controls inside draggable items

Audio/video controls inside draggable buttons may create interaction conflicts. A draggable wrapper with internal controls may need a more careful DOM structure than a simple button.

### Premature multimodal abstraction

Creating a universal display model for all InteractionData too early could repeat the drag-drop abstraction risk. The first implementation should be local and reversible.

## Recommendation

Recommendation: **create a small `renderContentUnit(unit)` now, but do not wire it broadly yet**.

The safest first micro-step is:

1. Create `packages/renderer/content/renderContentUnit.ts`.
2. Support only direct DOM rendering for `text`, `image`, `audio`, and `video`.
3. Keep the function independent from all pedagogical objects.
4. Do not modify evaluators or `UserInput`.
5. Do not modify Classification.
6. In a later step, add `unit?: ContentUnit` only to `AssociationDragDropItem`, while keeping `label` as fallback.
7. Then update only `associationToDragDropAdapter` and `associationDragDropDomRenderer`.

This creates the rendering primitive without forcing an architecture-wide change.

If an even smaller step is desired, BHE can wait and first document stronger `alt` / transcript expectations. But given that `ContentUnit` already exists and Association already carries units, a tiny renderer-side `renderContentUnit` is justified.
