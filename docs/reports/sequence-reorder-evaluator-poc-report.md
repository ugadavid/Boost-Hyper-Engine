# Sequence reorder evaluator POC report

## 1. Scoring strategy retained

The first `SequenceReorder` evaluator scores only exact positions.

For each expected position:

- compare the expected item id with the actual item id at the same position;
- score `1` if they match;
- score `0` if they do not match or if the position is missing.

The final result is:

- `score = number of exact positions`;
- `maxScore = number of expected items`;
- `completion = score / maxScore`;
- `status = success` when all positions are correct;
- `status = partial` when at least one but not all positions are correct;
- `status = failed` when no exact position is correct.

This keeps the POC readable and avoids choosing a rich sequence scoring model too early.

## 2. Why adjacency is observed but not scored

Sequence tasks often contain meaningful local order:

- A immediately before B;
- dialogue reply after question;
- process step after prerequisite.

The evaluator therefore reports `adjacentPairResults`, but does not include them in the score yet.

This is deliberate. Adjacency may become important, but scoring it too early would commit BHE to a specific interpretation of partial order.

For now, adjacency is a signal in `details`, not a scoring rule.

## 3. What the scenarios reveal

The console example tests four scenarios:

1. `success`
   - all items are in exact expected position;
   - status is `success`.

2. `failed`
   - no item is in exact expected position;
   - status is `failed`.

3. `partial exact positions`
   - some exact positions are correct;
   - status is `partial`.

4. `adjacency-interesting`
   - no item is in the expected position;
   - at least one expected adjacent pair still appears in the actual order.

The fourth scenario is the important one architecturally: it shows why sequence evaluation may eventually need more than exact-position scoring.

## 4. What remains deferred

Still deferred:

- renderer;
- registry;
- generalized reorder engine;
- feedback DOM integration;
- adaptive routing integration;
- multimodal sequence rendering;
- keyboard/accessibility model;
- adjacency scoring policy;
- distance-based scoring;
- block/subsequence scoring;
- duplicate/missing/extra item strategy beyond the current simple POC.

## 5. Next recommended step

Recommendation: create a short comparative report before implementing a renderer.

The next report should compare:

- exact position scoring;
- adjacency scoring;
- distance-based scoring;
- block/subsequence scoring.

Only after that should BHE choose the first renderer shape, probably a text-only reorder POC with an accessibility-first movement model.

## Files created / modified

Created:

- `packages/core/evaluators/evaluateSequenceReorder.ts`
- `examples/sequence-reorder-evaluator-example.ts`
- `docs/reports/sequence-reorder-evaluator-poc-report.md`

Modified:

- `packages/core/types/input/UserInput.ts`
- `packages/core/types/input/index.ts`
- `packages/core/types/index.ts`
- `packages/core/evaluators/index.ts`
