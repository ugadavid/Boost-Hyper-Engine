# ContentUnit Implementation Report

## What Was Added

New content unit types were created in:

```txt
packages/core/types/content/
```

The new files define:

- `BaseContentUnit`
- `TextUnit`
- `ImageUnit`
- `AudioUnit`
- `VideoUnit`
- `ContentUnit`
- content type exports

The public core type index now exports these content unit types.

## What Was Modified

`AssociationSet` was updated locally:

- `AssociationEntry.label` is now optional;
- `AssociationEntry.unit?: ContentUnit` was added;
- `AssociationEntry.kind?: string` remains;
- `AssociationEntry.metadata?: Record<string, unknown>` remains available;
- `AssociationPair.entryIds` remains unchanged.

The association flashcards adapter was updated:

```txt
AssociationSet -> FlashcardsData
```

It now reads `entry.unit` when available and converts it to a textual fallback.
If no unit exists, it keeps using `label` as before.

## Why ContentUnit Was Added

`AssociationEntry.label: string` made associations text-first.

`ContentUnit` introduces a first controlled place for learner-manipulable
multimodal content:

- text;
- image;
- audio;
- video.

This allows BHE to represent associations such as:

```txt
text <-> image
audio <-> text
text + image + audio
```

without turning renderers into multimedia systems yet.

## Why Label Remains

`label` remains as transitional compatibility.

Existing examples and adapters can continue to work with text labels while new
entries progressively add structured units.

This keeps the change reversible and avoids forcing a full migration.

## Why Only AssociationSet Changed

`AssociationSet` is the clearest current pressure point.

Association entries are directly manipulated by learners and naturally need to
support multimodal content.

Other pedagogical sets may need `ContentUnit` later, but there is not enough
evidence yet to modify them safely.

## Why Renderers Are Not Multimedia Yet

The current renderer output remains text-based.

The adapter converts units to fallback strings such as:

```txt
[image: a curious student]
[audio: patient]
```

This proves the data model can carry multimodal units without prematurely
building image, audio, or video renderers.

## Current Limits

- `FlashcardsData.front` and `FlashcardsData.back` are still strings.
- Associations with more than two entries are still ignored by the flashcards
  adapter.
- There is no `CompositeUnit`.
- There is no multimedia DOM rendering.
- Only `AssociationSet` uses `ContentUnit`.
- Evaluation and user input are not affected yet.

## Possible Next Steps

- Decide whether `FlashcardsData` should later support structured content.
- Add a text fallback helper shared by future adapters only if duplication
  appears.
- Explore how `ContentUnit` affects drag-drop interaction data.
- Keep `UserInput -> Evaluator -> BHEResult` separate from renderer behavior.
- Avoid adding composite units until a concrete example requires them.
