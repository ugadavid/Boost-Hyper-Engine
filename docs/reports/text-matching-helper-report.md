# Text Matching Helper Report

## Files Created

Created:

- `packages/core/utils/textMatching.ts`;
- `packages/core/utils/index.ts`;
- `examples/text-matching-helper-example.ts`.

## What The Helper Does

The helper provides two pure utility functions:

```ts
normalizeText(value, options)
matchesAcceptedAnswer(actual, expected, options)
```

It supports:

- trim by default;
- case-insensitive matching by default;
- expected string;
- expected string array / accepted variants.

It is deliberately small and deterministic.

## What The Helper Does Not Know

The helper does not import or know about:

- `BHEResult`;
- `UserInput`;
- `InteractionData`;
- evaluators;
- renderers;
- pedagogical objects;
- feedback;
- routing.

It is a low-level text utility, not a pedagogical abstraction.

## Examples Tested

The example demonstrates:

- trim: `"  generous  "` becomes `"generous"`;
- case-insensitive match: `"GENEROUS"` matches `"generous"`;
- expected string match;
- expected string array / accepted variants;
- non-match;
- accents are not removed.

The accent limitation is intentional:

```txt
serieuses != sérieuses
```

## Intentional Limits

No accent-insensitive matching was added.

No fuzzy matching was added.

No NLP was added.

No evaluator was changed.

No renderer was changed.

No typing abstraction was created.

## Recommendation

Do not immediately wire this helper into all evaluators.

The healthiest next step is to observe whether GapFill, Transformation, and Memorization continue to use equivalent deterministic matching rules. If the duplication remains stable, the helper can be adopted gradually in a separate, low-risk cleanup pass.
