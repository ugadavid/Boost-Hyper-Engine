# ContentUnit Impact Analysis

This report analyzes the impact of the minimal `ContentUnit` graft on
`AssociationSet`, the flashcards adapter, and existing flashcards renderers.

No architecture change is proposed as final here.

## 1. Tension With FlashcardsData

`ContentUnit` introduces structured multimodal content:

- text;
- image;
- audio;
- video.

`FlashcardsData` is still text-only:

```ts
front: string;
back: string;
```

So yes, there is a real tension. `AssociationSet` can now carry richer entries
than `FlashcardsData` can express.

The current adapter resolves this through a textual fallback:

```txt
[image: alt]
[audio: transcript]
[video: transcript]
```

This is acceptable for the current POC because no flashcards renderer is
multimodal yet.

## 2. Should The Tension Be Resolved Now?

Not yet.

The tension is visible, but not painful enough to justify a new multimodal
`InteractionData` shape immediately.

Resolving it now would likely force premature decisions:

- whether `FlashcardData.front/back` should become `ContentUnit`;
- whether they should accept arrays of units;
- whether renderers should support images/audio/video;
- whether fallback text belongs in adapters or renderers;
- whether all interaction data should become multimodal.

The safer path is to keep the textual fallback until a concrete DOM multimedia
renderer is needed.

## 3. Associations With More Than Two Entries

Associations with more than two entries are not a model problem.

`AssociationPair.entryIds: string[]` already allows them.

They are mostly an adapter and interaction-mode issue.

The current flashcards adapter ignores non-binary associations because
flashcards are naturally shaped as:

```txt
front -> back
```

The model can represent trio/quadro associations. The current flashcards
interaction cannot express them well without changing its meaning.

## 4. Is Flashcards Naturally Binary?

Yes, mostly.

A flashcard can technically contain several elements on one side, but the
interaction pattern is fundamentally based on a reveal:

```txt
prompt -> answer
front -> back
cue -> response
```

That makes it a good fit for binary associations.

For trio or quadro associations, forcing everything into a flashcard may flatten
the pedagogical intention.

## 5. Better Interaction Modes For Trio/Quadro Associations

More suitable interaction modes could include:

- drag-drop: place several related units in a shared zone;
- memory: match several related cards over time;
- classification: group units by relation or category;
- future grouping mode: assemble a set of related units;
- future association-board mode: connect multiple nodes visually.

Among existing modes, `drag-drop` is probably the best candidate for
multi-entry associations.

## 6. Should We Create Multimodal InteractionData Now?

No.

The current evidence is not strong enough.

`ContentUnit` proves that pedagogical content can become multimodal. It does not
yet prove the right shape for multimodal interaction data.

Creating a multimodal `FlashcardsData` now would risk mixing three concerns:

- content representation;
- interaction representation;
- media rendering.

Those should stay separate until a concrete renderer requires them.

## 7. Textual Fallback For Now

The textual fallback is the right temporary strategy.

It keeps:

- examples readable in console;
- current renderers working;
- TypeScript compatibility;
- the adapter layer responsible for translation;
- renderers free from media handling.

It also makes the current limitation explicit instead of hiding it.

## 8. Risks Of Generalizing Too Fast

The main risks are:

- turning `FlashcardsData` into a generic multimedia object too early;
- forcing all renderers to understand `ContentUnit`;
- duplicating media fallback logic across renderers;
- inventing `CompositeUnit` before there is a real need;
- confusing pedagogical content with interaction data;
- making trio/quadro associations look like a flashcard problem when they are
  probably an interaction-mode problem;
- coupling the first `ContentUnit` design too tightly to flashcards.

## Conclusion

`ContentUnit` creates a useful and expected pressure point.

The pressure should not be resolved immediately. It should be observed through
one more concrete interaction, preferably an association-oriented drag-drop or
grouping POC.

Recommended next stance:

```txt
Keep ContentUnit in AssociationSet.
Keep FlashcardsData text-only.
Keep textual fallback in the adapter.
Do not create multimodal InteractionData yet.
Explore multi-entry associations through a better interaction mode later.
```
