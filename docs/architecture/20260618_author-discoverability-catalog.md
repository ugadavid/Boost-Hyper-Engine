# BHE Author Discoverability Catalog

## 1. Purpose

BHE often knows how to represent an activity before an author knows where to look.

This catalog makes existing possibilities more visible.

It does not define new interaction modes, pedagogical objects, or architecture. It connects current BHE interaction shapes with:

- their obvious uses;
- less obvious but plausible uses;
- evidence from existing BHE implementations;
- observations from the Boost'English corpus;
- important limits.

The guiding principle is:

~~~txt
interaction shape
!=
pedagogical function
~~~

An interaction gains its pedagogical meaning from the surrounding content, cognitive operations, input semantics, evaluation policy, result, feedback, and position in a learning path.

## 2. Quick Orientation

| Interaction shape | What the learner visibly does | Current demonstrated BHE uses | Less obvious authoring possibilities | Evidence level |
| ----------------- | ----------------------------- | ----------------------------- | ------------------------------------ | -------------- |
| Selection | Selects one or more options | Identification of expected targets | Reflection, survey, self-positioning, preference or opinion gathering | Structurally plausible; non-evaluative path documented but not implemented end to end |
| QCM | Selects one choice from presented answers | Classification checking, justified inference choice | Reflection, diagnosis, polling, prediction before instruction | Evaluative paths implemented; non-evaluative use strongly evidenced by BHE-BE |
| Typing | Enters free or constrained text | Gap-fill, transformation, memorization recall, inference response | Reflection, explanation, opinion, prediction, self-observation | Strongly demonstrated across several specialized pipelines |
| Drag & Drop | Moves items into zones or groups | Association, classification | Comparison, hypothesis placement, exploratory grouping, staged noticing | Demonstrated for association/classification; broader uses remain observational |
| Reorder | Changes item order | Sequence reconstruction | Process reasoning, narrative organization, sentence reconstruction, prioritization | Demonstrated for Sequence; intrinsically order-centered |
| Flashcards | Views or reveals paired/cued content | Association review, memorization exposure/review | Prediction before reveal, self-check, comparison, confidence marking | Adapter/rendering evidence exists; richer response semantics are not implemented |
| Memory | Performs a memory-oriented interaction | Declared as an InteractionMode | Recognition games, pair recall, delayed retrieval | Too little concrete BHE implementation to make strong claims |

Two cautions should guide the catalog:

1. A possible use is not automatically a supported end-to-end path.
2. Reusing a visible shape does not mean reusing a specialized evaluator.

## 3. Selection

### Short Description

The learner selects one or more options.

The structure itself can be simple:

~~~txt
prompt or context
+
candidate options
+
selected option ids
~~~

### Obvious Uses

- identify correct targets;
- select all applicable answers;
- knowledge checking;
- evidence selection;
- feature recognition.

### Less Obvious Uses

- reflective self-report;
- survey;
- self-positioning;
- preference gathering;
- opinion expression;
- learner habit reporting;
- diagnostic data collection without grading;
- choosing a strategy to explore next.

### Evidence

Current BHE provides:

- the neutral interaction mode selection;
- IdentificationSelectionData;
- IdentificationSelectionUserInput;
- an Identification evaluator and checkbox-style renderer.

BHE-BE provides strong non-evaluative evidence:

- Thinking in English uses questionnaire-like choices to surface speaking and translation habits;
- Memorising Vocabulary uses a no-score questionnaire to make learning strategies visible.

The documentary authoring POC showed that the same structural selection can record a completed reflective response without score.

### Notes

The structure is more neutral than its current concrete naming.

IdentificationSelectionData supports optional expected flags, which means options can structurally exist without correctness. However, the current type and evaluator ecosystem still suggests target identification.

For a reflective activity, do not assume that the Identification evaluator should be reused.

### Author Surprise

~~~txt
A selection can record
what describes the learner,
not what the learner got right.
~~~

## 4. QCM

### Short Description

The learner chooses one answer from a compact set of alternatives.

QCM is a presentation convention around choice. It does not, by itself, guarantee that one choice is correct.

### Obvious Uses

- assessment;
- knowledge checking;
- classification question;
- comprehension check;
- recognition of a correct answer.

### Less Obvious Uses

- reflective questionnaire;
- prediction before explanation;
- diagnostic starting point;
- opinion poll;
- confidence check;
- misconception surfacing;
- learner positioning;
- strategy-awareness prompt.

### Evidence

Current BHE demonstrates evaluative QCM through:

- ClassificationSet to QcmData;
- QcmUserInput;
- evaluateClassificationQcm;
- classificationQcmDomRenderer.

Inference also uses choice in a richer way:

- choose an inference;
- optionally justify it;
- evaluate choice and justification separately.

BHE-BE broadens the pedagogical evidence:

- Thinking in English looks quiz-like but supports reflection and readiness;
- Memorising Vocabulary explicitly uses a questionnaire with no correct answer;
- Question Forms shows the conventional corrective use;
- Wayfinding uses quizzes as local preparation for later situated action.

### Notes

Current QCM implementations are correctness-oriented. The less obvious uses are pedagogically evidenced, but not yet represented by a neutral end-to-end QCM path.

An author should separate:

~~~txt
choice presentation
from
evaluation policy
~~~

### Author Surprise

~~~txt
A QCM may open reflection
instead of closing judgment.
~~~

## 5. Typing

### Short Description

The learner enters text.

Typing is only a gesture. Its cognitive meaning depends strongly on the data and task.

### Obvious Uses

- fill a blank;
- produce a sentence;
- recall a target;
- transform a source;
- write a short answer.

### Less Obvious Uses

- explain reasoning;
- justify a choice;
- reflect on a habit;
- express an opinion;
- predict before seeing an answer;
- compare before and after understanding;
- formulate a personal example;
- describe confidence or difficulty.

### Evidence

Typing is the most technically diverse implemented shape in BHE:

- GapFillSet to ContextualTypingData: complete contextual absence;
- TransformationSet to TransformationInteractionData: transform an explicit source;
- MemorizationSet to MemorizationTypingRecallData: retrieve a target from a cue;
- Inference interaction: type an interpretation or justification.

These paths intentionally keep separate InteractionData, UserInput, evaluators, and renderers because:

~~~txt
typing gesture
!=
typing cognition
~~~

BHE-BE adds:

- reflective journal-like responses in Thinking in English;
- contextual writing in Memorising Vocabulary;
- written directions in Wayfinding;
- technical explanation and critical response in Passive Voice.

### Notes

Typing is highly versatile, but this is not an argument for one generic typing evaluator.

Exact matching is suitable for some recall, transformation, and gap-fill tasks. Reflection, explanation, and opinion require different result semantics and may require no corrective evaluation at all.

### Author Surprise

~~~txt
The text field is not the pedagogy.

What the learner is producing,
from what source,
and for what purpose
changes everything.
~~~

## 6. Drag & Drop

### Short Description

The learner moves items into destinations, groups, or positions.

The visible gesture is spatial. The pedagogical operation may be relational, categorical, sequential, or exploratory.

### Obvious Uses

- matching;
- association;
- classification;
- placing items into categories;
- grouping related elements.

### Less Obvious Uses

- compare competing hypotheses;
- organize evidence provisionally;
- explore possible groupings before validation;
- place examples under emerging rules;
- reconstruct a dialogue;
- test a conceptual distinction;
- move an item between interpretations;
- use multimodal cues during relational work.

### Evidence

Current BHE deliberately keeps two specialized drag/drop paths:

Association:

- groups entries through expectedEntryIds;
- supports duo, trio, and larger groups;
- scores complete zones;
- can render ContentUnit text, image, audio, or video.

Classification:

- places each item in an expected category;
- scores by item;
- uses category-specific feedback.

BHE-BE includes:

- Countable / Uncountable grouping words or images before conceptualization;
- prefix and adjective classification;
- Wayfinding dialogue completion and map-related manipulation;
- multiple grammar bricks using matching and categorization.

### Notes

Drag/drop is more versatile than matching, but not semantically neutral in current implementations.

Association drag/drop and Classification drag/drop share a gesture while preserving different data and scoring. This is a useful warning:

~~~txt
same movement
!=
same cognitive operation
~~~

Exploratory or hypothesis-based drag/drop may have no immediate correct answer. That possibility is plausible but not yet demonstrated end to end.

Accessibility also matters. Current specialized renderers use accessible click-to-move alternatives because mouse dragging cannot be the only path.

### Author Surprise

~~~txt
Moving an item can be a way
to think provisionally,
not only to submit a match.
~~~

## 7. Reorder

### Short Description

The learner changes the relative order of items.

Unlike general drag/drop, Reorder makes sequence itself the central semantic dimension.

### Obvious Uses

- put events in chronological order;
- reconstruct a procedure;
- order sentence fragments;
- sequence narrative events;
- arrange workflow steps.

### Less Obvious Uses

- reveal causal assumptions;
- compare alternative process models;
- organize an argument;
- reconstruct conversational turns;
- reason about local adjacency;
- prioritize options when rank is pedagogically meaningful.

### Evidence

Current BHE provides:

- SequenceSet;
- SequenceReorderData;
- SequenceReorderUserInput;
- evaluateSequenceReorder;
- an accessible text-only renderer with Move up and Move down.

The evaluator scores exact positions while observing adjacency in result details. This already shows that order can be examined at more than one level.

### Notes

Reorder is the most specialized mature interaction shape in this catalog.

Its versatility exists inside order-related cognition. If order is not meaningful, Reorder is probably the wrong choice.

Prioritization should only use Reorder when relative ranking itself matters. It should not be used merely to make a static list feel interactive.

### Author Surprise

~~~txt
A sequence can preserve meaningful local relations
even when no item is in its exact position.
~~~

## 8. Flashcards

### Short Description

Flashcards present a cue and reveal or expose a corresponding target.

They are naturally compact and often binary:

~~~txt
front
back
~~~

### Obvious Uses

- vocabulary review;
- memorization;
- cue-to-answer exposure;
- association review;
- recognition practice.

### Less Obvious Uses

- prediction before reveal;
- active recall before checking;
- compare an initial answer with a model;
- reveal an explanation after a question;
- self-check confidence;
- contrast examples and counterexamples;
- prompt oral production before viewing the back.

### Evidence

Current BHE uses FlashcardsData through:

- AssociationSet to flashcards;
- MemorizationSet to flashcards;
- DOM and HTML flashcard renderers.

The Association adapter uses textual fallback for multimodal ContentUnit content. Memorization later gained a separate typing-recall path because reveal alone does not prove active retrieval.

### Notes

Flashcards are useful for exposure and cue/target relations, but their current front/back string contract is intentionally simple.

Do not confuse:

- seeing;
- recognizing;
- attempting recall;
- successfully recalling;
- self-evaluating confidence.

Those may share a card surface while requiring different input and result paths.

### Author Surprise

~~~txt
The pedagogical difference may happen
before the learner turns the card:
did they attempt retrieval,
or only wait for the reveal?
~~~

## 9. Memory

### Short Description

Memory is declared as an InteractionMode, but the current repository does not expose a comparably mature specialized data, evaluator, or renderer path for it.

### Obvious Possible Uses

- memory pair game;
- recognition through repeated exposure;
- cue-target matching;
- delayed retrieval;
- location memory.

### Less Obvious Possible Uses

- collaborative recall;
- strategy comparison;
- confidence-based self-check;
- noticing which associations support retention.

### Evidence

The strongest related BHE work currently lives elsewhere:

- MemorizationSet;
- FlashcardsData;
- MemorizationTypingRecallData;
- deterministic recall evaluator.

These validate memorization as a cognitive object, not a mature generic memory-game interaction.

### Notes

This catalog should not pretend that declared availability equals demonstrated capability.

Memory is currently the most under-evidenced interaction mode, not necessarily the most specialized one.

An author should inspect the actual Memorization and Flashcards/Typing Recall paths rather than assume a complete memory-game engine exists.

### Author Surprise

~~~txt
Memory exists in the vocabulary,
but its concrete authoring path
is less mature than the name suggests.
~~~

## 10. Uses That Recur Across Shapes

Several pedagogical uses repeatedly emerge across more than one interaction shape.

### Practice

Practice can use:

- QCM for recognition;
- typing for production;
- drag/drop for grouping;
- reorder for sequencing;
- flashcards for repeated cue exposure.

Practice is not an interaction shape. It describes repeated engagement toward greater stability or fluency.

### Reflection

Reflection can use:

- selection for self-report;
- QCM-like questions for positioning;
- typing for explanation or journaling;
- flashcards for self-check before reveal.

Reflection does not require a free-text box, and it does not require a score.

### Diagnosis

Diagnosis can use:

- QCM for initial checking;
- selection for habits or preferences;
- typing for open evidence;
- drag/drop for visible conceptual grouping.

Diagnosis describes how evidence is used. It should not automatically turn every response into success or failure.

### Production

Production can use:

- typing;
- speaking prompts outside the currently stabilized InteractionMode list;
- transformation;
- ordering fragments into a complete form;
- flashcards as oral prompts before reveal.

### Recall

Recall can use:

- typing from a cue;
- flashcards with retrieval before reveal;
- selection for recognition;
- memory-style matching.

Recognition and recall are not identical even when both concern retained content.

### Exploration And Noticing

Exploration can use:

- drag/drop for provisional grouping;
- QCM for prediction;
- selection for evidence choice;
- reorder for testing sequence hypotheses;
- typing for initial explanations.

These uses are easy to overclaim. They become genuinely exploratory only when the surrounding evaluation and feedback allow revision rather than immediately enforcing one answer.

## 11. Answers To The Main Questions

### Which interaction shapes appear more versatile than expected?

Typing is the most versatile shape already demonstrated by implemented BHE pipelines.

It supports four clearly distinct cognitive paths:

- contextual completion;
- deliberate transformation;
- memorization recall;
- inference or justification.

Selection is the most pedagogically surprising. Its structure can support identification, reflection, survey, preference gathering, and self-positioning. However, its non-evaluative authoring path is less mature and less discoverable.

QCM is also more versatile than its current evaluator-centered examples suggest.

### Which interaction shapes appear more specialized than expected?

Reorder is the most specialized mature shape.

It can serve many domains, but all meaningful uses depend on order, position, adjacency, or priority.

Flashcards are also structurally constrained by cue/reveal or front/back semantics, even though many pedagogical routines can happen around that structure.

Memory is not classified as specialized because the evidence is insufficient. It is underdeveloped rather than proven narrow.

### Which pedagogical uses repeatedly emerge across shapes?

The strongest recurring uses are:

- practice;
- reflection;
- diagnosis;
- production;
- recall;
- noticing/exploration;
- application to a meaningful context.

This recurrence reinforces:

~~~txt
pedagogical use
should not be inferred
from interaction shape alone
~~~

### What would surprise a new author most?

The strongest surprise is:

~~~txt
A response can complete an interaction
without being evaluated as correct or incorrect.
~~~

A QCM-like or selection interface can support reflection. BHEResult can record completed participation without score. Informational feedback can continue the learning path instead of correcting the learner.

The second surprise is that typing is not one pedagogical family. Its meaning changes radically between gap-fill, transformation, recall, inference, and reflection.

## 12. Practical Reading Guide For Authors

When choosing an interaction shape, begin with these questions:

1. What should the learner do mentally?
2. What response do I need to capture?
3. Does correctness exist here?
4. If correctness exists, what exactly counts as evidence?
5. Is the result scored, diagnostic, reflective, or simply completed?
6. What should happen after the response?
7. Does this interaction need to be accessible without its most obvious gesture?

Then choose a shape.

Do not begin by assuming:

~~~txt
QCM = assessment
typing = generic production
drag/drop = matching
flashcards = recall
selection = identification
~~~

A better authoring sequence is:

~~~txt
pedagogical use
-> cognitive operation
-> response semantics
-> interaction shape
-> evaluation policy
-> result and continuation
~~~

This sequence is guidance for reading the current engine, not a new BHE architecture.

## 13. Catalog Boundaries

This catalog documents hidden possibilities. It does not claim that all possibilities are implemented.

In particular:

- non-evaluative Selection and QCM uses are strongly evidenced but lack a neutral end-to-end example;
- exploratory drag/drop is plausible but not implemented as a generic path;
- reflective typing would need semantics different from deterministic text matching;
- confidence marking and self-evaluation around flashcards remain deferred;
- Memory lacks a mature concrete path;
- speaking and recording appear in BHE-BE but are not current InteractionMode values.

The catalog should help an author ask better questions without promising unsupported runtime behavior.

## 14. Sources Consulted

This catalog was grounded in:

- current InteractionMode values;
- current renderer, adapter, InteractionData, UserInput, and evaluator paths;
- the first Thinking in English authoring stress test;
- the Boost'English corpus cartography;
- weekly BHE-BE synthesis;
- Thinking in English observations;
- Memorising Vocabulary POC;
- Wayfinding POC;
- Passive Voice POC;
- existing Association, Classification, Sequence, GapFill, Transformation, Inference, Identification, and Memorization reports and examples.

No code, TypeScript file, core concept, or runtime behavior was changed.

