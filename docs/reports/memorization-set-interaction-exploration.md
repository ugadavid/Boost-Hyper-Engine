# MemorizationSet Interaction Exploration

This report explores `MemorizationSet` as a potential new cognitive primitive in BHE, without implementing it yet.

The goal is not to decide too quickly that BHE needs a new Set. The goal is to observe whether memorization represents a distinct cognitive operation that is not fully covered by the existing objects.

## 1. Why MemorizationSet Appears Now

`MemorizationSet` appears after reflection on `LearningSequence` and learning-experience composition.

The recent architecture work has focused on cognitive operations:

- associate;
- classify;
- order;
- identify;
- infer;
- complete;
- transform.

But some learning moments are simpler and more direct:

```txt
this content must be learned
```

They may not need strong pedagogical orchestration at first. A learner may need to see, repeat, recall, and consolidate items before using them in richer activities.

This signal also comes from the tension between real cognition and strong pedagogical framing. Not every useful learning moment is a complex guided experience. Sometimes the cognitive act is blunt:

```txt
remember this
```

The provisional nickname `StupidMemorizationSet` is funny, but the signal is serious. The humor points to a real architectural question:

> Is BHE missing a deliberately simple primitive for content that must be retained and retrieved?

The word "stupid" should not mean low value. It may mean "low orchestration, high cognitive directness".

## 2. Central Cognition

A learner using a memorization object may mentally:

- encode new content;
- repeat it;
- recall it;
- consolidate it;
- recognize it;
- self-evaluate whether it is known.

The central operation is not only exposure. Memorization becomes pedagogically meaningful when the learner must retrieve, recognize, or judge retention.

Possible internal cycle:

```txt
exposure
-> rehearsal
-> recall
-> checking
-> consolidation
```

This suggests that `MemorizationSet` should not be reduced to a static content list. It should represent content intended for retention and retrieval.

## 3. Difference With Existing Sets

### AssociationSet

`AssociationSet` builds relations between entries.

Memorization may use associations as support, for example word -> translation or image -> word, but the cognitive goal is different. Association asks "what belongs with what?" Memorization asks "can I retain and retrieve this?"

### IdentificationSet

`IdentificationSet` asks the learner to detect or select targets.

Memorization may include recognition, but recognition is only one mode of retrieval. Memorization also involves recall, repetition, and self-assessment over time.

### TransformationSet

`TransformationSet` asks the learner to change an explicit source into a target.

Memorization may help prepare transformations, but it does not require applying an operation. Remembering irregular forms is not the same as transforming a form.

### GapFillSet

`GapFillSet` asks the learner to complete missing content inside a context.

Memorization can use typing recall, but the context is not necessarily a blank sentence. The cognitive goal is retrieval, not contextual completion.

### ClassificationSet

`ClassificationSet` asks the learner to categorize.

Memorization may include category labels or grouped content, but the main goal is not assigning each item to a category. It is retention and retrieval of content.

### Core Difference

`MemorizationSet` can use modes that look similar to existing sets:

- flashcards can look like association;
- typing recall can look like gap-fill;
- recognition can look like identification;
- grouped review can look like classification.

But its central cognition is different:

```txt
retain / retrieve
```

rather than:

```txt
relate / identify / transform / complete / categorize
```

## 4. Possible InteractionModes

### Flashcards

Flashcards are the most obvious first interaction. They support exposure, recall, and self-checking.

They are simple, accessible, and compatible with existing BHE renderer work. The risk is treating memorization as only front/back cards.

### Typing Recall

The learner sees a prompt and types the recalled answer.

This is stronger than flashcards because it requires production. It also needs deterministic evaluation, accepted variants, and possibly normalization.

### Memory Game

A memory game could support repetition and recognition through playful pairing.

It may be useful, but it introduces game mechanics and should not be the first architectural baseline.

### Self-Evaluation

The learner marks an item as known, unsure, or not known.

This is important because memorization often depends on learner judgment. It also avoids pretending that every memory act can be externally evaluated.

### Spaced Repetition

Spaced repetition is a major future possibility.

However, `MemorizationSet` should not be confused with a full spaced repetition scheduler. Scheduling, intervals, ease factors, history, and review queues are runtime concerns beyond the first primitive.

### Association Support

Memorization can be supported by associations:

- word -> translation;
- sound -> spelling;
- image -> label;
- concept -> example.

But if the core goal is memorization, Association should be support, not necessarily the primary object.

## 5. Possible V0

### Option A — MemorizationSet -> FlashcardsData

Advantages:

- simplest controlled greffe;
- directly tests recall / reveal / self-check;
- can reuse the existing idea of flashcards without treating Memorization as Association;
- no evaluator required at first;
- good for content to learn.

Limits:

- may be too passive if no recall or self-evaluation is captured;
- risks reducing memorization to front/back cards;
- does not yet model spaced repetition.

### Option B — MemorizationSet -> TypingRecallData

Advantages:

- active recall;
- deterministic evaluator possible;
- clearer evidence of retrieval.

Limits:

- more evaluator complexity;
- accepted variants and normalization appear immediately;
- could look too much like GapFill or Transformation unless carefully modeled.

### Option C — MemorizationSet -> SelfEvaluationData

Advantages:

- honest about memory work;
- supports "known / unsure / unknown";
- prepares spaced repetition later.

Limits:

- self-report is subjective;
- no correctness check;
- may need runtime tracking sooner than desired.

### Option D — Do Not Code Yet

Advantages:

- avoids premature abstraction;
- allows the LearningSequence question to mature;
- keeps focus on whether memorization is a primitive or a layer.

Limits:

- the signal may remain vague;
- no concrete pressure test.

## 6. Relation With LearningSequence

`MemorizationSet` could fit naturally inside a future `LearningSequence`.

It could be preceded by a guided moment:

```txt
GuidedMoment
-> MemorizationSet
```

For example, an explanation introduces a grammar pattern, then memorization focuses on key forms.

It could be followed by recall:

```txt
MemorizationSet
-> TypingRecall
```

It could combine with Identification:

```txt
MemorizationSet
-> IdentificationSet
```

The learner first learns target forms, then identifies them in context.

It could combine with Association:

```txt
MemorizationSet
-> AssociationSet
```

The learner first reviews items, then builds relations among them.

It could also be used alone in a low-orchestration sequence:

```txt
MemorizationSet
```

This may be useful for a simple Boost'English-style case where the immediate need is to learn a list of forms before doing richer activities.

## 7. Risks

### Too Vague

`MemorizationSet` could become a container for anything that should be learned. That would make it architecturally weak.

### Content Exposure vs Active Memorization

Showing content is not the same as memorization. The object should imply retrieval, recognition, repetition, or self-evaluation.

### Course List Recreated

There is a risk of recreating a simple list of course content with a new name.

### Over-Abstraction

Memorization could become a broad layer that absorbs flashcards, recall, review, spaced repetition, and analytics too early.

### Confusion With Spaced Repetition

`MemorizationSet` should not be a full spaced repetition system. Spaced repetition may consume memorization data later, but it should not define the first primitive.

## 8. Final Recommendation

Recommendation: **B, but as a two-step path**.

The next healthy step is:

```txt
MemorizationSet type-only
-> adapter console-only toward FlashcardsData
```

In the requested options, this corresponds most closely to:

> B. create MemorizationSet + adapter console-only toward FlashcardsData

But the implementation should remain very small:

- no evaluator yet;
- no renderer yet;
- no spaced repetition;
- no memory game;
- no registry;
- no LearningSequence implementation.

Why Flashcards first?

Because flashcards test the memorization signal without immediately forcing scoring, accepted variants, or scheduling. They can show whether Memorization has a distinct shape from Association while staying simple enough for a controlled greffe.

The key caution:

> MemorizationSet should model retention/retrieval intent, not just a list of content.
