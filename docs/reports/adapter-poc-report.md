# Adapter POC Report

## What Changed

A first adapter proof of concept was added:

```txt
AssociationSet -> FlashcardsData
```

The adapter lives in:

```txt
packages/renderer/adapters/associationToFlashcardsAdapter.ts
```

It defines:

- `FlashcardData`
- `FlashcardsData`
- `associationToFlashcardsData(object)`

The DOM flashcards renderer now consumes `FlashcardsData` instead of resolving
association entries directly.

## What Becomes Clearer

The separation is cleaner:

```txt
AssociationSet -> adapter -> FlashcardsData -> DOM renderer
```

The adapter handles pedagogical-to-interaction mapping:

- reads `entries`;
- reads `associations`;
- resolves binary links;
- ignores invalid associations;
- outputs simple `front/back` cards.

The renderer now focuses more on DOM behavior:

- creating buttons;
- toggling front/back;
- managing `aria-expanded`;
- applying local classes and hidden states.

## What Remains Unclear

This POC does not decide:

- whether every renderer should have an adapter;
- whether adapters belong in `packages/renderer` long term;
- whether adapter output should be shared across DOM, HTML string, and future UI renderers;
- how invalid associations should be reported to users;
- whether feedback should be included in `FlashcardData`.

## What The POC Suggests

The adapter direction looks promising for interaction-centered renderers.

It confirms that some renderer code is really mapping logic, not rendering
logic. Moving that mapping into an adapter can make renderers simpler without
changing pedagogical types.

## What It Does Not Confirm Yet

It does not justify a generic adapter architecture yet.

Only one pair has been adapted:

```txt
AssociationSet + flashcards
```

More evidence is needed before creating shared adapter interfaces, factories,
registries, or lifecycle rules.

## Second Adapter POC: ClassificationSet -> QcmData

A second targeted adapter was added:

```txt
ClassificationSet -> QcmData
```

It lives in:

```txt
packages/renderer/adapters/classificationToQcmAdapter.ts
```

It defines:

- `QcmChoiceData`
- `QcmQuestionData`
- `QcmData`
- `classificationToQcmData(object)`

The adapter:

- reads classification categories;
- reads classification items;
- produces one QCM question per valid item;
- uses categories as choices;
- uses `categoryId` as `correctChoiceId`;
- ignores items whose `categoryId` does not match an existing category.

## Comparison With AssociationSet -> FlashcardsData

Both adapters confirm the same separation:

```txt
PedagogicalObject -> interaction data -> DOM renderer
```

The association adapter resolves relations into front/back cards.

The classification adapter resolves category membership into QCM questions and
choices.

The pattern is similar, but the output shape is interaction-specific. This
supports the adapter direction without yet justifying a generic adapter
registry.

## Third Adapter POC: GapFillSet -> ContextualTypingData

A third targeted adapter was added:

```txt
GapFillSet -> ContextualTypingData
```

It lives in:

```txt
packages/renderer/adapters/gapFillToContextualTypingAdapter.ts
```

It defines:

- `TextSegmentData`
- `TypingBlankData`
- `ContextualTypingData`
- `gapFillToContextualTypingData(object)`

The adapter:

- reads the gap-fill context;
- reads blanks;
- uses `start` / `end` offsets to split the context;
- produces an ordered sequence of text segments and typing blanks;
- ignores blanks whose offsets cannot be safely applied;
- keeps `expected`, `hint`, and `feedback`;
- keeps `caseSensitive` and `accentSensitive`.

## Comparison With Earlier Adapter POCs

The first two adapters produce item lists:

```txt
AssociationSet -> FlashcardsData.cards
ClassificationSet -> QcmData.questions
```

The gap-fill adapter is different because it preserves context order:

```txt
GapFillSet -> ContextualTypingData.segments
```

This is a stronger signal for the adapter layer. The renderer no longer needs
to understand how blanks are positioned inside a text. It only receives an
interaction sequence: text, input, text, input, text.

Compared with flashcards and QCM, contextual typing shows that
`InteractionData` is not only a flattened list of exercises. It can also be a
structured interaction flow derived from pedagogical content.
