# Identification V0 emergence

## Purpose

This note documents the architectural emergence of `IdentificationSet` up to its V0 baseline.

It should be used as a reference before opening text highlighting, hotspot, multimodal, or generalized selection work.

## 1. Cognitive nature of IdentificationSet

`IdentificationSet` asks the learner to detect relevant targets in a context.

Its core cognitive operation includes:

- spotting;
- recognizing;
- selecting;
- discriminating;
- detecting relevant elements among distractors.

### Compared with AssociationSet

`AssociationSet` asks the learner to group related elements.

`IdentificationSet` asks the learner to find or select target elements.

Association is about relation-building. Identification is about target detection.

### Compared with ClassificationSet

`ClassificationSet` asks the learner to assign items to categories.

`IdentificationSet` asks the learner to decide which elements in a context are relevant targets.

Classification starts from known items. Identification starts from a context.

### Compared with SequenceSet

`SequenceSet` asks the learner to order elements.

`IdentificationSet` asks the learner to select elements.

Order may exist in the context, especially text order, but ordering is not the core operation.

### Compared with InferenceSet

`InferenceSet` asks the learner to interpret clues and produce a conclusion.

`IdentificationSet` asks the learner to identify clues or targets.

Central distinction:

> identify != interpret

Identification can feed Inference without becoming Inference.

Example:

1. identify context clues;
2. infer a meaning from those clues.

BHE should preserve this boundary.

## 2. Interaction exploration

Several interaction forms were considered.

### Single select

Single select is simple and accessible, but it is too narrow for many identification tasks.

It fits cases where only one target is expected.

### Multi-select

Multi-select was retained for V0.

Reasons:

- the existing `IdentificationSet` example already uses `selectionMode: "multiple"`;
- many identification activities require several correct targets;
- it exposes partial correctness early;
- it can remain console-only first, then become checkbox-based in the renderer;
- it avoids hotspot and text-highlighting complexity.

### Hotspot

Hotspot identification was deferred.

Reason:

- coordinates;
- responsive image scaling;
- screen reader alternatives;
- mobile behavior;
- region semantics.

This is a later multimodal chantier.

### Text highlighting

Text highlighting was deferred.

Reason:

- browser selection complexity;
- partial spans;
- offset validation;
- keyboard and screen reader behavior;
- possible confusion between selecting text and selecting modeled targets.

### Multimodality

Multimodal Identification was deferred.

The current V0 keeps a textual context and candidate targets. Future versions may need `ContentUnit`-based contexts, image/audio/video targets, or hotspot-like structures.

## 3. V0 pipeline emergence

The V0 pipeline is:

```txt
IdentificationSet
-> identificationToSelectionAdapter
-> IdentificationSelectionData
-> IdentificationSelectionUserInput
-> evaluateIdentificationSelection
-> BHEResult
-> identificationSelectionDomRenderer
```

The flow separates responsibilities:

- `IdentificationSet` carries pedagogical intent and targets;
- `identificationToSelectionAdapter` exposes selectable candidates;
- `IdentificationSelectionData` is the interaction data;
- `IdentificationSelectionUserInput` captures selected target ids;
- `evaluateIdentificationSelection` computes result details;
- `BHEResult` carries status, score, and target-level details;
- `identificationSelectionDomRenderer` displays and captures interaction.

## 4. Scoring / status arbitration

The V0 rule is:

- `success`: all expected targets selected and no extras;
- `partial`: at least one expected target selected, but the result is imperfect;
- `failed`: no expected target selected, even if extras are present.

`extraTargetIds` are reported in `BHEResult.details`, but do not subtract points in V0.

Important principle:

> partial = partial correctness

Therefore:

> extra-only = failed

This makes future AdaptiveRouting cleaner:

- `success` means full correct identification;
- `partial` means some correct identification exists;
- `failed` means no expected target was identified.

Extra selections remain available as signals for feedback or future routing.

## 5. Renderer V0

The V0 renderer is checkbox-style.

It uses:

- plain textual context;
- `fieldset`;
- `legend`;
- real native checkboxes;
- explicit labels;
- Check button;
- global feedback via `mountFeedbackFromResult`;
- local classes from evaluator details.

Local classes:

- `is-correct` for correctly selected expected targets;
- `is-incorrect` for selected extras;
- `is-missing` for expected targets not selected.

The renderer does not re-evaluate.

It reads `BHEResult.details` and displays them.

This keeps the existing BHE rule intact:

> renderer captures interaction, evaluator judges, feedback displays.

## 6. Deferred work

Still deferred:

- text highlighting;
- hotspot selection;
- multimodal Identification;
- score penalties for extras;
- immediate feedback;
- generalized selection engine;
- image coordinates;
- audio segment selection;
- source offset rendering;
- registry work.

These should only be opened when a concrete pedagogical need demands them.

## 7. What this reveals about BHE

Identification confirms a recurring BHE pattern:

> a seemingly simple interaction often hides a specific cognitive operation.

Selecting a checkbox can mean many things:

- identifying a transparent word;
- selecting evidence;
- choosing a category;
- choosing an inference;
- marking a distractor.

The gesture is not enough to define the pedagogy.

Emerging principle:

> same gesture != same pedagogy

For BHE, the healthy path remains:

- understand the cognitive operation;
- create specialized `InteractionData`;
- keep `UserInput` semantic;
- evaluate outside the renderer;
- extract helpers only when the repetition is concrete and non-pedagogical.
