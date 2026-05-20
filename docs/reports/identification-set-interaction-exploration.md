# IdentificationSet interaction exploration

## Scope

This report explores what `IdentificationSet` naturally asks the learner to do before any implementation.

No renderer, evaluator, hotspot engine, registry, generalized selection engine, NLP, or multimodal-specific engine is proposed here.

## 1. Pedagogical nature of IdentificationSet

To identify is to notice, recognize, and select a target within a context.

The learner is not primarily creating, explaining, ordering, or grouping. The learner is asked to detect something that is present.

Identification can involve:

- spotting;
- recognizing;
- discriminating;
- selecting;
- pointing;
- detecting;
- marking.

The current `IdentificationSet` type already reflects this:

- `context`;
- `targets`;
- optional `start` / `end` offsets;
- target `type`;
- `expected`;
- target feedback;
- `selectionMode`;
- `allowPartialMatch`.

### Difference from AssociationSet

Association asks:

> Which elements belong together?

Identification asks:

> Which element is the target?

The target may later be used for association, but the core operation is detection.

### Difference from ClassificationSet

Classification asks:

> Which category does this item belong to?

Identification asks:

> Which item or region should be selected?

Classification starts from known items and assigns them to categories. Identification starts from a context and asks the learner to find relevant items.

### Difference from SequenceSet

Sequence asks:

> What comes before or after?

Identification asks:

> What is present here?

There is no necessary order, though targets may appear in textual order.

### Difference from InferenceSet

Inference asks:

> What can be concluded from clues?

Identification asks:

> Which clues or elements are there?

This boundary is important. Identifying an index is not the same as interpreting it. However, Identification may feed Inference: first select clues, then infer from them.

## 2. Plausible pedagogical cases

### Identify a word

Example:

- find all transparent Italian words in a sentence.

Cognitive operation:

- lexical recognition;
- spotting known/transparent forms.

Feedback:

- correct word selected;
- expected word missed;
- selected word is not relevant.

Difficulty:

- low to medium;
- depends on transparency and distractors.

### Identify a grammatical structure

Example:

- identify all past tense verbs;
- identify relative clauses;
- identify noun-adjective agreements.

Cognitive operation:

- pattern recognition;
- grammatical discrimination.

Feedback:

- target structure recognized;
- near miss;
- explanation of the marker.

Difficulty:

- medium to high;
- requires explicit grammatical awareness.

### Identify a false friend

Example:

- detect words that look familiar but have a different meaning.

Cognitive operation:

- lexical discrimination;
- inhibition of misleading similarity.

Feedback:

- why the word is deceptive;
- correct meaning;
- contrast with expected cognate.

Difficulty:

- medium;
- high if distractors are subtle.

### Identify an emotion

Example:

- identify the phrase or image detail that shows anger, fear, hesitation, irony.

Cognitive operation:

- pragmatic and affective recognition;
- clue selection.

Feedback:

- selected clue supports the emotion;
- selected clue is too weak;
- another clue is stronger.

Difficulty:

- medium to high;
- close to inference if interpretation is required.

### Identify an image

Example:

- select the image matching a word or description.

Cognitive operation:

- visual recognition;
- semantic matching.

Feedback:

- correct image;
- distractor explanation.

Difficulty:

- low to medium;
- depends on visual ambiguity.

### Identify an element in an image (hotspot)

Example:

- click the object mentioned in an audio instruction;
- select the region showing a gesture.

Cognitive operation:

- visual search;
- spatial targeting.

Feedback:

- selected region correct;
- close but not exact;
- missed target.

Difficulty:

- variable;
- requires coordinates or regions.

### Identify a sound

Example:

- identify a phoneme;
- identify a word heard in audio;
- identify intonation pattern.

Cognitive operation:

- auditory discrimination;
- recognition under time/phonetic pressure.

Feedback:

- correct sound or segment;
- replay hint;
- contrastive explanation.

Difficulty:

- medium to high.

### Identify several correct elements

Example:

- select all transparent words;
- select all context clues;
- select all suffixes.

Cognitive operation:

- multi-target detection;
- avoiding false positives and false negatives.

Feedback:

- correct selections;
- missing targets;
- extra selections.

Difficulty:

- medium;
- scoring and feedback become more nuanced.

### Identify a clue in a text

Example:

- select the word that helps infer a meaning.

Cognitive operation:

- evidence recognition;
- bridge toward inference.

Feedback:

- this clue supports the inference;
- this selected element is present but not useful;
- expected clue missed.

Difficulty:

- medium to high;
- boundary with `InferenceSet` becomes visible.

## 3. Natural interaction modes

### Single click selection

Learner clicks one target.

Pros:

- simple;
- accessible if implemented with buttons/radio-like controls;
- easy to evaluate;
- good first POC for single-target activities.

Cons:

- does not cover multi-target identification;
- may be too narrow for the current example, which uses `selectionMode: "multiple"`.

### Multi-select

Learner selects several targets.

Pros:

- matches many identification activities;
- supports partial correctness;
- works well for words, clues, suffixes.

Cons:

- scoring needs missing/extra details;
- UI must clearly show selected/unselected state;
- keyboard behavior must be explicit.

### Hotspot / image region

Learner selects a region in an image.

Pros:

- powerful for visual identification;
- supports image-based learning.

Cons:

- requires coordinate model;
- accessibility is hard;
- responsive image scaling is non-trivial;
- not appropriate as V0.

### Text highlighting

Learner highlights words or spans in text.

Pros:

- natural for textual identification;
- fits `start` / `end` offsets;
- good for intercomprehension and grammar.

Cons:

- browser selection APIs can be tricky;
- partial selections raise hard evaluation questions;
- keyboard/screen reader support needs careful design.

### Checkbox style

Learner sees target candidates as selectable items.

Pros:

- accessible;
- easy to evaluate;
- supports single and multiple selection;
- avoids complex text selection for V0.

Cons:

- less immersive than highlighting in context;
- context/target relation may be less visually direct.

### Confidence selection

Learner indicates confidence with a selected target.

Pros:

- useful for metacognition;
- can help feedback and routing later.

Cons:

- adds complexity;
- not needed for V0.

### Audio-supported identification

Learner listens and selects what they heard or recognized.

Pros:

- useful for phonology and listening;
- supports multimodal identification.

Cons:

- requires audio controls;
- timing/segment handling;
- accessibility and replay behavior.

### Comparison

| Mode | Accessibility | Multimodality | Simplicity | BHE coherence |
| --- | --- | --- | --- | --- |
| Single click | High | Medium | High | Good for V0 if single target |
| Multi-select | High | Medium | High/medium | Strong fit with current type |
| Hotspot | Low/medium | High | Low | Future work |
| Text highlighting | Medium | Text-focused | Medium/low | Strong but not first |
| Checkbox style | High | Medium | High | Best V0 candidate |
| Confidence | Medium | Any | Medium | Later |
| Audio-supported | Medium | High | Low/medium | Later |

## 4. Architectural tensions

### Single vs multiple correct answers

The model already allows:

```ts
selectionMode?: "single" | "multiple"
```

This affects:

- input shape;
- scoring;
- feedback;
- UI state.

V0 must decide whether to start with single or multiple.

### Partial correctness

Multi-select naturally raises:

- correct selected targets;
- expected targets missed;
- extra selected targets;
- partially correct result.

This resembles Association missing/extra details more than Classification item scoring.

### Local feedback

Identification feedback may be target-level:

- correct target;
- wrong target;
- missed expected target;
- target-specific explanation.

It should probably live in `BHEResult.details`, not in renderer logic.

### Hotspot coordinates

Image or region identification requires:

- coordinates;
- shapes;
- responsive scaling;
- accessible alternatives.

The current `IdentificationTarget` has text offsets, but not image coordinates. This should wait.

### Multimodal content

Identification can apply to:

- text;
- image;
- audio;
- video.

But the model currently uses `context: string` and text offsets. Multimodal identification may need a future `ContentUnit`-based context or target references.

Do not solve this now.

### Boundary with InferenceSet

Identification can be a prerequisite to inference.

Example:

1. identify clues in text;
2. infer meaning from those clues.

But the operations differ:

- Identification selects evidence;
- Inference interprets evidence.

BHE should preserve this distinction.

### Immediate vs deferred feedback

Identification could offer immediate feedback after each selection, but V0 should likely defer evaluation until Check.

Reason:

- keeps evaluator outside renderer;
- aligns with current BHE full loop;
- supports partial correctness.

## 5. What not to do now

Do not create:

- renderer;
- evaluator;
- hotspot engine;
- registry;
- generalized selection engine;
- NLP;
- multimodal engine specific to Identification;
- image coordinate model;
- audio segment model.

Do not turn Identification into Inference.

Do not make text highlighting the first implementation unless checkbox-style candidates prove insufficient.

## 6. Final recommendation

Recommendation: **B. multi-select POC**.

Reason:

- the current example already uses `selectionMode: "multiple"`;
- many real identification tasks require selecting several correct targets;
- multi-select exposes partial correctness early;
- it can be implemented first as console-only InteractionData/UserInput/Evaluator;
- it avoids the complexity of text highlighting or hotspots;
- it preserves the distinction between identifying clues and interpreting them.

The healthiest next step:

`IdentificationSelectionData -> IdentificationSelectionUserInput -> BHEResult`

V0 shape should probably use candidate targets as selectable items, not direct text highlighting yet.

Expected `details` should likely include:

- selectedTargetIds;
- expectedTargetIds;
- correctTargetIds;
- missingTargetIds;
- extraTargetIds.

Do not create a renderer before the evaluator shape is understood.
