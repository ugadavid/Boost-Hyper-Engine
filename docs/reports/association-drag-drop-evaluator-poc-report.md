# Association Drag-Drop Evaluator POC Report

## Why This POC Exists

The previous POC created:

```txt
AssociationSet -> AssociationDragDropData
```

This POC adds the return-side evaluation:

```txt
AssociationDragDropUserInput -> evaluateAssociationDragDrop -> BHEResult
```

It remains console-only.

## What It Validates After AssociationDragDropData

`AssociationDragDropData` preserves duo, trio, and larger associations through
`expectedEntryIds`.

The evaluator proves that those expected groups can be compared with learner
placements without needing a DOM renderer.

## How Placements Represent Learner Action

The input shape is:

```txt
placements: { entryId, zoneId }[]
```

This represents the final drag-drop state: each placed entry belongs to one
drop zone.

It is explicit and close to the interaction, while staying renderer-independent.

## Duo / Trio / Quadro Evaluation

Each drop zone represents one expected group.

A group is correct when:

```txt
actualEntryIds exactly match expectedEntryIds
```

This works for:

- duo associations;
- trio associations;
- future quadro or larger groups.

## Scoring V0

The score is by complete zone:

```txt
score = number of fully correct zones
maxScore = number of drop zones
```

This is intentionally simple.

Partial group details are still preserved through:

- `missingEntryIds`;
- `extraEntryIds`;
- `actualEntryIds`;
- `expectedEntryIds`.

## Current Limits

- No DOM renderer exists.
- No real drag-drop accessibility is tested.
- Duplicate entries are not handled deeply.
- Scoring is still simple and zone-based.
- There is no registry.
- There is no orchestration layer.
- Wrong-zone items appear as extra in one zone and missing in the expected zone.

## Scenario Observations

The console example now runs four scenarios:

- `success`: all zones match their expected ids.
- `failed`: no zone is fully correct.
- `partial`: one zone is correct, others are incomplete or mixed.
- `wrong-zone`: an item is placed in the wrong zone.

These scenarios confirm that:

- `status` follows the expected `success` / `partial` / `failed` behavior;
- `score` remains zone-based;
- duo and trio groups are evaluated with the same rule;
- wrong-zone placement appears as `extraEntryIds` in the wrong zone and
  `missingEntryIds` in the expected zone.

The current `groupResults` shape looks sufficient for a future renderer POC
because it can identify which zones are correct, which entries are missing, and
which entries are extra.

Zone-based scoring remains acceptable for this POC because it keeps the rule
easy to inspect before adding more subtle partial scoring.

## Recommended Next Step

The evaluator detail shape is now stable enough to consider a minimal DOM
drag-drop renderer POC.

The renderer should remain very small and should consume the existing
`AssociationDragDropData`, capture placements, then call
`evaluateAssociationDragDrop`.
