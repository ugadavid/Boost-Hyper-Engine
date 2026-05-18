# Sequence reorder data adapter report

## 1. Shape retained for SequenceReorderData

The first `SequenceSet` interaction data POC introduces:

```ts
export interface SequenceReorderItem {
  itemId: string;
  label: string;
  expectedPosition: number;
  initialPosition?: number;
}

export interface SequenceReorderData {
  items: SequenceReorderItem[];
}
```

`initialPosition` is included because it is available without adding shuffle logic: it reflects the order in which items currently appear in the `SequenceSet`.

No `metadata` field was added because `SequenceItem` does not currently expose metadata.

## 2. Why it remains minimal

This POC only observes the data needed to present a sequence as reorderable content.

It keeps:

- stable item ids;
- visible labels;
- expected positions;
- simple initial positions.

It does not decide yet:

- how the learner will reorder items;
- how correctness will be scored;
- whether adjacency matters;
- whether partial order should use exact positions, pairs, or blocks.

## 3. What is intentionally deferred

Deferred on purpose:

- no renderer;
- no evaluator;
- no `UserInput`;
- no registry;
- no generalized reorder engine;
- no shuffle implementation;
- no multimodal sequence rendering;
- no accessibility model;
- no scoring policy.

This keeps the adapter reversible and easy to inspect.

## 4. What this reveals about SequenceSet

`SequenceSet` needs a different interaction shape from Association and Classification.

Association groups entries.

Classification assigns items to categories.

Sequence preserves order and expected position.

The first data shape confirms that Sequence likely needs an ordered `InteractionData`, not generic drop zones.

The presence of `expectedPosition` also suggests future evaluators may need to choose between:

- exact position scoring;
- adjacency scoring;
- distance-based scoring;
- block/subsequence scoring.

## 5. Next recommended step

Recommendation: create a console-only evaluator exploration next, but still without renderer.

The likely next POC should be:

`SequenceReorderUserInput -> evaluateSequenceReorder -> BHEResult`

It should test at least:

- full success;
- fully wrong order;
- partial exact positions;
- adjacent pair correctness as a reported detail, even if not scored yet.

Do not create a DOM renderer before the evaluator questions are clearer.

## Files created / modified

Created:

- `packages/core/types/interaction-data/SequenceReorderData.ts`
- `packages/core/types/interaction-data/index.ts`
- `packages/core/adapters/sequenceToReorderAdapter.ts`
- `packages/core/adapters/index.ts`
- `examples/sequence-reorder-data-example.ts`
- `docs/reports/sequence-reorder-data-adapter-report.md`

Modified:

- `packages/core/types/index.ts`
