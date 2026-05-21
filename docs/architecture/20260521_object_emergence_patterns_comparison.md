# BHE Object Emergence Patterns Comparison

This document maps the emergence patterns observed across the BHE pedagogical objects explored so far. It is not a final taxonomy. It is a checkpoint for seeing which objects have been reworked through the current methodology and which ones still carry older assumptions.

## 1. Current state of exploration

| Set | Family | Cognitive operation | Exploration state | Renderer state | Notes |
| --- | ------ | ------------------- | ----------------- | -------------- | ----- |
| AssociationSet | structural | relate / group | stabilized baseline | renderer V0 | Drag-drop stress test validates grouping, non-binary associations, ContentUnit rendering, evaluator outside renderer, and click-to-move accessibility fallback. |
| ClassificationSet | structural | categorize | stabilized baseline | renderer V0 | QCM and drag-drop both validate item-based correctness. Drag-drop shares surface mechanics with Association but not the same scoring semantics. |
| SequenceSet | structural | order | renderer V0 | renderer V0 | Reorder V0 uses exact-position scoring while observing adjacency in details. Interaction is text-only Move up / Move down, not drag-drop. |
| IdentificationSet | interpretive | identify / detect | stabilized baseline | renderer V0 | Multi-select V0 is stabilized with native checkboxes. `partial` means partial correctness; extra-only is failed. |
| InferenceSet | interpretive | interpret / infer | evaluator V0 | legacy renderer | Justified choice POC validates evaluation-first exploration. Explicit prompt choices were added, but no V0 justified-choice renderer exists yet. |
| GapFillSet | productive | complete / produce missing content | legacy implementation | legacy renderer | Typing adapter, evaluator, feedback, and renderer exist, but they predate the newer object-by-object exploration discipline. Good candidate for re-reading. |
| TransformationSet | productive | transform existing content | legacy implementation | none | Type and examples exist, but no current InteractionData / UserInput / evaluator / renderer baseline has been explored with the newer method. |

## 2. Cognitive operation comparison

Association asks the learner to relate items or group elements that belong together. A drag-drop gesture here means building a relation: placing `audio + image + text` in the same zone is not just moving objects, it is constructing a meaningful group.

Classification asks the learner to categorize. The gesture may again be drag-drop, but the cognitive act is different: each item has an expected category. Correctness is naturally item-based, not group-based.

Sequence asks the learner to order. The central concepts are position, adjacency, proximity, and sometimes temporal or logical progression. A correct answer may preserve useful adjacent pairs even when exact positions are wrong.

Identification asks the learner to identify or detect targets. The V0 operation is selection: the learner recognizes candidates and decides whether they match the expected targets. It can later feed inference, but it is not inference.

Inference asks the learner to interpret. It involves clues, hypotheses, justification, and meaning-making. A V0 justified choice can be evaluated structurally, but the deeper cognitive value sits in the reasoning.

GapFill asks the learner to complete missing content. It is productive: the learner supplies language or content into a contextual frame. The main tension is between exact matching and acceptable variation.

Transformation asks the learner to transform existing content. It is also productive, but unlike GapFill, the source is explicit: the learner operates on a given form and produces a target form.

The recurring principle is:

> same gesture != same pedagogy

Examples:

- Drag-drop in Association means relation / grouping.
- Drag-drop in Classification means category assignment.
- Reorder in Sequence means positional and adjacent structure.
- Checkbox selection in Identification means detecting expected targets, not choosing an interpretation.
- Typing in GapFill means completing context, while typing in Inference can mean formulating an interpretation or justification.

## 3. Emergence pattern comparison

Some objects have emerged as interaction-first. Their cognitive operation immediately suggests a manipulable interaction:

- Association: arrange items into relation groups.
- Classification: place items into categories.
- Sequence: move items into an order.
- Identification: select targets among candidates.

This does not mean evaluation is secondary. It means the first useful architectural pressure comes from the shape of interaction.

Inference has emerged as evaluation-first. Before choosing a renderer, the important question was how to evaluate interpretation without pretending to solve natural language understanding. This led to justified choice, explicit choices, and a cautious scoring model.

GapFill sits between both patterns. It has a natural typing interaction, but its real architectural tension is evaluation: accepted answers, case sensitivity, accent sensitivity, partial correctness, and feedback per blank.

Transformation also sits between both patterns, but likely leans evaluation-first. The interaction can be simple typing or QCM, while the hard question is what counts as a valid transformation, especially with multiple acceptable answers.

## 4. Renderer tendencies

Association tends toward specialized drag-drop because the relation is spatial and group-based. Flashcards remain useful for binary associations, but they do not naturally express trio / quadro associations.

Classification tends toward QCM and specialized drag-drop. QCM tests category recognition directly; drag-drop makes category assignment spatial and visible.

Sequence tends toward reorder interaction. The current V0 deliberately avoids drag-drop and uses Move up / Move down buttons to make accessibility native from the beginning.

Identification tends toward checkbox-style selection in V0. Text highlighting, hotspots, and multimodal selection are deferred because they introduce interaction engines of their own.

Inference tends toward justified choice in V0. It can later move toward evidence selection, short answers, or conversation, but those are not needed to validate the baseline.

GapFill tends toward contextual typing. The renderer consumes a structured sequence of text segments and blanks.

Transformation tends toward productive interactions: typing, flashcards, or QCM depending on whether the learner must produce, recognize, or rehearse a transformation.

The renderer therefore seems to emerge from the cognitive operation, not the reverse. BHE should resist choosing a renderer first and forcing the pedagogy to fit it.

## 5. Architectural signals

Several signals are now stable enough to treat as working rules:

- InteractionData should remain specialized while the cognitive operations are still being discovered.
- UserInput should stay semantic: `placements`, `orderedItemIds`, `selectedTargetIds`, or typed answers express learner action better than generic UI events.
- Evaluators should stay outside renderers.
- BHEResult is the common evaluation output, with specific details per interaction.
- FeedbackData is displayable feedback, not the whole pedagogical feedback system.
- Helpers should be earned only after duplication is observed.
- UI helpers should remain DOM-only when they are about DOM mechanics.
- Accessibility should enter at the birth of an interaction, not after a polished renderer exists.
- Generalized engines and registries are postponed until lookup and orchestration become real problems.

## 6. Legacy sets needing re-exploration

GapFillSet and TransformationSet are the clearest candidates for re-reading with the current methodology.

GapFillSet already has a working adapter / evaluator / renderer path, but it emerged before the recent discipline around cognitive operation, InteractionData, UserInput semantics, and accessibility-first renderer design. The question is not whether it works. The question is whether its current implementation fully matches the real operation: completing missing content inside a context.

TransformationSet is even more open. Its type exists, but its actual BHE baseline has not been tested through the current pipeline. The central question is whether transformation should be treated as a simple typing interaction, a recognition interaction, or a richer productive operation with transformation-specific feedback.

For both:

> Does the current implementation correspond to the true cognitive operation?

That question should be answered before adding renderers or abstractions.

## 7. Emerging BHE methodology

The current working method can be summarized as:

```txt
Observe cognitive operation
        ↓
Small specialized data shape
        ↓
Console evaluator if needed
        ↓
Accessible renderer
        ↓
Earned helper extraction
        ↓
Observe again
```

Another pattern is emerging:

```txt
Structural-ish
→ interaction-first

Interpretive-ish
→ evaluation-first
```

This is not a rigid rule. GapFill and Transformation show that productive objects may need a mixed path: interaction is obvious, but evaluation often carries the real architectural complexity.

## 8. Final recommendation

The healthiest next exploration is a methodological re-reading of GapFillSet before touching TransformationSet.

GapFill already has enough implementation to compare old assumptions against the newer BHE method. It can reveal whether productive objects need their own emergence pattern before TransformationSet is opened properly. The recommended next step is therefore a short GapFillSet re-exploration report focused on cognitive operation, InteractionData, UserInput, evaluator behavior, renderer accessibility, and whether the existing implementation should be kept, adjusted, or simply documented as a valid V0.
