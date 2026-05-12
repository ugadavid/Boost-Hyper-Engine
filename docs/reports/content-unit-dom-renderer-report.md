# ContentUnit DOM renderer report

## Why renderContentUnit exists

`ContentUnit` is the smallest manipulable content unit currently available in BHE. Until now, multimodal units were converted to fallback text before reaching DOM renderers.

`renderContentUnit` adds a small renderer-side primitive that can display a `ContentUnit` directly without changing the pedagogical pipeline.

## Why it lives in renderer, not core

The core defines `ContentUnit` as data.

DOM rendering belongs to `packages/renderer` because it creates browser elements:

- `span`;
- `figure`;
- `img`;
- `audio`;
- `video`.

Keeping this in renderer prevents the core from depending on browser APIs or presentation decisions.

## What it renders

### TextUnit

Renders a `span` with `textContent = unit.text`.

### ImageUnit

Renders a `figure` containing an `img`.

- `src = unit.src`;
- `alt = unit.alt ?? unit.label ?? ""`;
- optional `figcaption` when `label` exists.

### AudioUnit

Renders a wrapper containing an `audio controls` element.

If available, it also displays:

- `transcript`;
- otherwise `label`.

### VideoUnit

Renders a wrapper containing a `video controls` element.

It supports:

- `src`;
- optional `poster`;
- visible `transcript` or `label`.

## Why UserInput and evaluators do not change

`renderContentUnit` changes only presentation.

User actions and correctness remain based on stable ids:

- `entryId`;
- `itemId`;
- `zoneId`;
- `categoryId`.

Evaluators should not compare images, audio, or video. They should evaluate the learner's structured action against the expected model.

## Why it is not yet wired into drag-drop renderers

The function is intentionally not connected to existing pedagogical renderers yet.

Reasons:

- `AssociationDragDropData` still exposes text labels only;
- `ClassificationDragDropData` does not currently carry `ContentUnit`;
- audio/video controls inside draggable items need careful testing;
- layout and accessibility need observation before broad wiring.

This keeps the change local and reversible.

## Limits

- External media can fail to load.
- Image `alt` quality is not enforced.
- Audio/video accessibility needs deeper work, especially transcripts and captions.
- Media sizing in draggable items is not tested.
- Audio/video controls inside draggable elements may create interaction conflicts.
- No renderer currently consumes `renderContentUnit`.

## Next step

The next controlled step should be local to Association drag-drop:

1. Add optional `unit?: ContentUnit` to `AssociationDragDropItem`.
2. Preserve `label` as fallback.
3. Update `associationToDragDropAdapter` to keep the original unit.
4. Update only `associationDragDropDomRenderer` to call `renderContentUnit` when a unit exists.
5. Keep evaluators, `UserInput`, routing, and feedback unchanged.
