# Selection move helper report

## 1. What was mutualized

A tiny DOM-only helper was added:

`packages/renderer/dom/selectionMove.ts`

It mutualizes only the accessibility fallback mechanics shared by Association and Classification drag-drop:

- selected item state;
- `is-selected` class management;
- `aria-pressed` management;
- clearing selection;
- clearing selection when a selected item is moved by native drag/drop;
- moving a selected item to a destination;
- returning a selected item to the tray;
- optional announcement callback.

The helper exposes:

- `selectItem`;
- `clearSelection`;
- `clearSelectionIfSelected`;
- `moveSelectedItemTo`;
- `returnSelectedItemToTray`.

## 2. What remained specific

The renderers still own all pedagogical and interaction-specific logic.

Association keeps:

- `entryId`;
- `zoneId`;
- `AssociationDragDropUserInput`;
- `placementsFromZones`;
- `evaluateAssociationDragDrop`;
- group-based local feedback;
- missing/extra zone details;
- `renderContentUnit` for multimodal entries.

Classification keeps:

- `itemId`;
- `categoryId`;
- `ClassificationDragDropUserInput`;
- `placementsFromCategoryZones`;
- `evaluateClassificationDragDrop`;
- item-based visual state;
- category summaries;
- missing item handling.

Both renderers still create their own DOM structure, buttons, zones, Check behavior, and feedback display.

## 3. Why the helper stays DOM-only

The helper deliberately knows nothing about:

- `AssociationSet`;
- `ClassificationSet`;
- `InteractionData`;
- `UserInput`;
- evaluators;
- scoring;
- feedback details;
- routing;
- registries.

It only manages DOM element selection and movement.

This keeps the extraction aligned with the BHE principle of earned helpers: mutualize the stable mechanics, not the pedagogical meaning.

## 4. Files modified

Created:

- `packages/renderer/dom/selectionMove.ts`
- `docs/reports/selection-move-helper-report.md`

Modified:

- `packages/renderer/renderers/associationDragDropDomRenderer.ts`
- `packages/renderer/renderers/classificationDragDropDomRenderer.ts`

No core type, evaluator, routing, feedback, or registry file was modified.

## 5. Verification

The intended behavior remains:

- click selects an item;
- Enter / Space selects an item;
- `Move here` moves the selected item;
- `Return here` returns the selected item to the tray;
- announcements still use `aria-live`;
- Check still creates the same final `UserInput`;
- evaluators still produce the same `BHEResult`;
- local feedback remains renderer-specific.

Build and documentation generation were run after the extraction.

## Next note

No new architectural work should start from this report alone.

The next useful action is manual preview testing of:

- Association drag-drop;
- Classification drag-drop;
- selection/move behavior;
- media control behavior inside Association items.
