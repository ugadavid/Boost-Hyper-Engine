# Reflect Investigation

Date: 2026-06-23

Status: documentary investigation

Scope: no implementation, no package change, no new `RepresentationPath`, no new core concept.

## Context

The previous Compare investigation showed that:

```txt
Compare
```

is not a single path.

It is an author intention that needs clarification:

```txt
What are learners comparing?
```

This investigation applies the same method to:

```txt
Reflect
```

The working hypothesis is:

```txt
Reflect may not be a single path either.
```

It may need a clarification question such as:

```txt
What are learners reflecting on?
```

The goal is not to decide what Reflect should become. The goal is to observe what Reflect is already doing across BHE and the Boost'English corpus.

## Documents pertinents

### Thinking in English — I Start — Moment POC

Reference:

```txt
docs/architecture/20260604_thinking-in-english_i-start_moment-poc.md
```

Summary:

This document analyzes a quiz-like questionnaire that is not primarily assessment. Learners answer prompts about thinking in English, translating mentally, speaking anxiety, and practice strategies.

Role of reflection:

Reflection is about:

- habits;
- anxiety;
- translation reflexes;
- practice strategies;
- self-positioning before later oral practice.

The document's strongest signal is:

```txt
quiz-like interaction
!=
quiz-like pedagogy
```

Reflect here means:

```txt
become aware of my current relationship to English.
```

### Thinking in English — I Say — Moment Boundary POC

Reference:

```txt
docs/architecture/20260604_thinking-in-english_i-say_moment-boundary-poc.md
```

Summary:

This document follows the later movement from reflection into oral activation. It compares Thinking in English I Start and I Say, and highlights a transition from internal posture to speaking action.

Role of reflection:

Reflection is no longer only self-description. It prepares action:

```txt
reflection
↓
oral readiness
↓
speaking attempt
```

Reflect here supports confidence and activation.

### Memorising Vocabulary POC

Reference:

```txt
docs/architecture/20260606_memorising-vocabulary_poc.md
```

Summary:

The brick looks like vocabulary learning, but the central object is a learning method. Learners reflect on current vocabulary-learning habits, discover a strategy, try it, compare strategies, and decide what may work for them.

Role of reflection:

Reflection is about:

- current learning habits;
- learning strategies;
- what worked or did not work;
- personal usefulness;
- future learning choices.

The key signal is:

```txt
strategy is the content
```

Reflect here means:

```txt
make my own learning method visible and adjustable.
```

### Way-finding POC

Reference:

```txt
docs/architecture/20260606_wayfinding_poc.md
```

Summary:

Way-finding is primarily about situated communication: can another person use the learner's directions to reach a place? It also includes an initial branching/check phase and teacher-facing activities that test action reliability.

Role of reflection:

Reflection is not dominant, but appears around:

- starting-point diagnosis;
- whether a learner needs more support;
- whether produced directions worked for another person;
- possible review of communication effectiveness.

Reflect here is closer to:

```txt
reflect on performance in a situated action.
```

### Passive Voice POC

Reference:

```txt
docs/architecture/20260606_passive-voice_poc.md
```

Summary:

Passive Voice is mainly a grammar recognition/transformation brick. But the teacher-facing sections open richer uses: focus awareness, discourse awareness, manipulation of agency, functional explanation, and communicative play.

Role of reflection:

Reflection appears around:

- why passive voice changes focus;
- how passive voice can hide or shift responsibility;
- whether a passive description is understandable;
- how grammar affects interpretation.

Reflect here is not self-positioning. It is closer to:

```txt
reflect on meaning, focus, agency, and discourse effect.
```

### Countable / Uncountable — I Learn — Moment POC

Reference:

```txt
docs/architecture/20260604_countable-uncountable_i-learn_moment-poc.md
```

Summary:

This brick is a guided path toward grammatical understanding:

```txt
observe
↓
compare
↓
reason
↓
infer
↓
conceptualize
```

Role of reflection:

Reflection is not the main operation. The learner is mainly noticing, comparing, inferring, and conceptualizing.

However, there is a reflective edge around:

- revising initial understanding;
- becoming aware of a distinction;
- stabilizing a rule after exploration.

Reflect here overlaps with conceptual awareness, but should not be forced into a reflective path if `Explore Before The Rule` and `InferenceSet` explain the phenomenon better.

### Boost'English Corpus Cartography

Reference:

```txt
docs/architecture/20260605_boost-english-corpus-cartography.md
```

Summary:

The cartography identifies Thinking in English as reflective/metacognitive, Memorising Vocabulary as strategy-oriented, Wayfinding as situated communication, and Countable / Uncountable as guided discovery.

Role of reflection:

The corpus shows that reflection appears in several places, but not always with the same target:

- self-awareness;
- strategy awareness;
- confidence;
- action reliability;
- conceptual understanding;
- sharing or journaling.

### BHE-BE Weekly Synthesis

Reference:

```txt
docs/architecture/20260606_bhe-be-weekly-synthesis.md
```

Summary:

The synthesis states that reflective questionnaires in Thinking in English and Memorising Vocabulary have no right answer and support awareness/learner positioning. It also says that some evaluations are not assessments.

Role of reflection:

Reflection is tied to:

```txt
non-scored completion
```

and:

```txt
interaction shape != pedagogical function
```

This supports the recent completed-path work.

### Non-Evaluative Interaction Representation POC

Reference:

```txt
docs/architecture/20260617_non-evaluative-interaction-representation-poc.md
```

Summary:

This POC represents a Memorising Vocabulary strategy-awareness question using existing BHE concepts. The learner selects how they usually learn vocabulary, with no correct answer.

Role of reflection:

Reflection is explicitly:

```txt
strategy awareness
self-observation
learner positioning
```

The POC maps this to:

```txt
selection-shaped InteractionData
↓
selected ids as UserInput
↓
BHEResult.completed
```

### Non-Evaluative Interaction Stress Test

Reference:

```txt
docs/architecture/20260617_non-evaluative-interaction-stress-test.md
```

Summary:

This stress test checks whether non-evaluative reflective activity breaks the existing core. It concludes that the core can represent the activity, but the vocabulary and return path need care.

Role of reflection:

Reflection is meaningful participation rather than correctness.

It requires:

```txt
completion without scoring
```

### Selection UserInput Audit

Reference:

```txt
docs/architecture/20260617_selection-userinput-audit.md
```

Summary:

The audit compares selection inputs and notes that `IdentificationSelectionUserInput` can carry selected ids but is semantically tied to expected target identification.

Role of reflection:

Reflective selection is structurally possible but semantically awkward.

The key issue is:

```txt
selection of self-descriptive options
```

is not the same as:

```txt
selection of expected targets
```

### RepresentationPath implementation

References:

```txt
packages/authoring/src/RepresentationPaths.ts
docs/architecture/20260618_representation-path-implementation-report.md
```

Summary:

The authoring package defines experimental paths such as:

```txt
Reflect Through Selection
Reflect Through Typing
```

Role of reflection:

Reflection is already split by interaction shape:

```txt
selection
```

or:

```txt
typing
```

Both expect:

```txt
non-evaluative
↓
BHEResult.completed
```

But the paths do not yet clarify what the learner is reflecting on.

### Author Discovery Playground and Compare Clarification

References:

```txt
packages/authoring/src/AuthorDiscoveryPlayground.ts
docs/architecture/20260622_compare-clarification-path-report.md
docs/architecture/20260622_compare-clarification-real-bricks-validation.md
```

Summary:

The Compare clarification introduced:

```txt
What are learners comparing?
```

and routed `Strategies / Habits` toward reflective authoring paths.

Role of reflection:

The Compare path already contains one reflective branch:

```txt
Strategies / Habits
↓
Reflect Through Selection / Typing
```

This suggests Reflect may also need its own clarification step.

### Completed-path work

References:

```txt
docs/architecture/20260623_completed-path-investigation.md
docs/architecture/20260623_completed-path-spike-report.md
docs/architecture/20260623_reflective-selection-ui-investigation.md
```

Summary:

These documents validate the path:

```txt
UserInput
↓
BHEResult.completed
↓
FeedbackData.completed
```

and isolate the remaining issue around neutral reflective selection UI.

Role of reflection:

Reflection can now reach completed-result semantics, but the learner-facing UI contract remains under investigation.

### Cognitive Operations Vocabulary

Reference:

```txt
docs/architecture/cognitive-operations-vocabulary.md
```

Summary:

`reflect` already exists as a `CognitiveOperation`. The document stresses that cognitive operations are mental actions, not renderer types.

Role of reflection:

This means Reflect is already available as a descriptive operation. The problem is not naming it in the core, but routing it authorially.

### InferenceSet Interaction Exploration

Reference:

```txt
docs/reports/inference-set-interaction-exploration.md
```

Summary:

Inference involves clues, hypotheses, uncertainty, justification, interpretation, and confidence.

Role of reflection:

Some reflection on hypotheses is better explained as inference:

```txt
What do I think this means?
Why?
How confident am I?
```

Reflect can overlap with inference, especially when learners reflect on possible explanations.

### Contract Investigation

Reference:

```txt
docs/architecture/20260623_contract-investigation.md
```

Summary:

This investigation identifies recurring pedagogical contracts such as Corrective, Reflective, Diagnostic, Exploratory, Practice, Assessment, and Self-check.

Role of reflection:

Reflective contract is a useful lens, but not yet a core concept. It helps explain why the same selection or typing mechanics can mean self-positioning rather than correction.

## Types de réflexion observés

### Reflect on habits

Observed in:

- Thinking in English;
- Memorising Vocabulary;
- Diagnose Through Selection;
- non-evaluative selection examples.

Question form:

```txt
What do I usually do?
```

Examples:

- Do I translate before speaking?
- How do I usually learn vocabulary?
- Do I revise, connect, repeat, or ignore words?

Dominant contract:

```txt
reflective / diagnostic
```

### Reflect on strategies

Observed in:

- Memorising Vocabulary;
- Thinking in English;
- strategy comparison in Compare Clarification.

Question form:

```txt
Which strategy do I use, try, prefer, or want to adopt?
```

Examples:

- Which vocabulary-learning method works for me?
- Which speaking preparation strategy helps?
- Should I use flashcards, associations, word webs, repetition?

Dominant contract:

```txt
reflective / self-adjusting
```

### Reflect on confidence or affect

Observed in:

- Thinking in English;
- Memorising Vocabulary;
- speaking readiness;
- overwhelm around vocabulary.

Question form:

```txt
How do I feel about doing this?
```

Examples:

- What worries me when speaking English?
- Do I feel blocked by translation?
- Does vocabulary learning feel overwhelming?

Dominant contract:

```txt
reflective / affective preparation
```

### Reflect on understanding

Observed in:

- Countable / Uncountable;
- Passive Voice;
- guided discovery;
- Explore Before The Rule.

Question form:

```txt
What do I understand now?
What distinction is becoming clear?
```

Examples:

- What makes a noun countable?
- What changed in the passive form?
- What rule am I beginning to see?

Dominant contract:

```txt
exploratory / conceptual
```

This often routes better through `Explore Before The Rule`, `InferenceSet`, or `ClassificationSet` than through a simple Reflect path.

### Reflect on choices

Observed in:

- InferenceSet justified choice;
- Passive Voice discourse choices;
- strategy selection;
- Compare Clarification.

Question form:

```txt
Why did I choose this?
What does this choice reveal?
```

Examples:

- Why is this inference plausible?
- Why use passive voice here?
- Why choose this strategy?

Dominant contract:

```txt
reflective / inferential / explanatory
```

### Reflect on hypotheses

Observed in:

- Explore Before The Rule;
- InferenceSet;
- Countable / Uncountable;
- grammar discovery.

Question form:

```txt
What might be true?
Why do I think so?
```

Examples:

- What rule do I think explains these examples?
- Which interpretation is most plausible?
- What evidence supports my guess?

Dominant contract:

```txt
exploratory / inferential
```

This is not always best modeled as Reflect. It often belongs to `InferenceSet` or an orchestration path.

### Reflect on experience

Observed in:

- Wayfinding;
- Thinking in English I Say;
- Memorising Vocabulary after trying a strategy;
- teacher-facing share/discuss steps.

Question form:

```txt
What happened when I tried this?
What did I learn from the experience?
```

Examples:

- Did my directions work for another learner?
- Did the vocabulary strategy help?
- What happened when I tried speaking?

Dominant contract:

```txt
reflective / action-review
```

### Reflect on progress

Observed in:

- Thinking in English progression;
- Memorising Vocabulary before/after strategy work;
- possible self-check and review cycles.

Question form:

```txt
What changed for me?
What can I do now that I could not do before?
```

Examples:

- Am I more ready to speak?
- Do I have more strategy options?
- Did my understanding improve?

Dominant contract:

```txt
reflective / metacognitive
```

### Reflect on action reliability

Observed in:

- Wayfinding;
- Passive Voice guessing game or technical explanation extensions.

Question form:

```txt
Did my language work for someone else?
```

Examples:

- Could a classmate follow my directions?
- Could others infer the object from my passive description?
- Was my explanation understandable?

Dominant contract:

```txt
reflective / situated / functional
```

This overlaps with `Apply Through Situated Task`.

## Mapping BHE possible

These mappings are documentary readings, not new `RepresentationPath` definitions.

| Reflection family | Possible BHE structures | Existing paths | Apparent status |
| --- | --- | --- | --- |
| Habits | `IdentificationSelectionData`, `IdentificationSelectionUserInput`, `BHEResult.completed` | `Reflect Through Selection`, `Diagnose Through Selection` | Strong authoring path; UI still under investigation |
| Strategies | selection or typing carriers, `BHEResult.completed`, possible Memorization context | `Reflect Through Selection`, `Reflect Through Typing` | Representable; vocabulary/rendering remains imperfect |
| Confidence / affect | selection, typing, completion result, signals/details | Reflective paths; Thinking in English analysis | Representable as non-evaluative completion; no dedicated authoring clarification |
| Understanding | `InferenceSet`, `ClassificationSet`, `Explore Before The Rule`, `BHEResult.completed/partial` | AuthorOrchestrationPath for Explore Before The Rule | Partially represented; often orchestration, not single Reflect path |
| Choices | `InferenceSet`, justified choice, typing explanation, reflective completion | Inference explorations; Reflect Through Typing | Conceptually covered; qualitative evaluation remains hard |
| Hypotheses | `InferenceSet`, `AuthorOrchestrationPath`, possible selection/typing | Explore Before The Rule, InferenceSet | Plausible; authoring route still less visible |
| Experience | typing reflection, selection self-report, situated task result details | Reflect Through Typing, Apply Through Situated Task | Partially represented; runtime/UI not stabilized |
| Progress | `BHEResult.details`, signals, before/after self-report, future sequence data | No single path | Mostly documentary/authoring gap |
| Action reliability | `Apply Through Situated Task`, result details, peer/social validation | Wayfinding analysis | Conceptually present; evaluator/runtime gap |

## Ce qui existe déjà

### `reflect` exists as a cognitive operation

`CognitiveOperation` already includes:

```txt
reflect
```

So the core can already name the mental operation.

### Reflective authoring paths exist

The authoring package already contains:

```txt
Reflect Through Selection
Reflect Through Typing
```

These express:

```txt
non-evaluative
↓
BHEResult.completed
```

### Completed-result path now exists

The completed-path work validated:

```txt
UserInput
↓
BHEResult.completed
↓
FeedbackData.completed
```

This is a major support for reflective uses.

### Boost'English validates reflection as real

Reflection is not an invented authoring category. It appears strongly in:

- Thinking in English;
- Memorising Vocabulary;
- some Wayfinding review/action phases;
- Passive Voice critical/focus extensions;
- Countable / Uncountable conceptual awareness.

### Reflection can be selection or typing

The documents repeatedly show that reflection is not tied to one interaction:

- selection for self-positioning;
- typing for explanation;
- questionnaire for awareness;
- discussion/share for experience;
- inference justification for hypothesis reflection.

## Ce qui manque

### Authoring clarification

The biggest missing piece is the author question.

Today an author can say:

```txt
I want learners to reflect.
```

But BHE likely needs to ask:

```txt
What are learners reflecting on?
```

Without that clarification, the author may not know whether to use:

- Reflect Through Selection;
- Reflect Through Typing;
- Diagnose Through Selection;
- Explore Before The Rule;
- InferenceSet;
- Apply Through Situated Task;
- Memorization strategy work.

### Renderer / UI

Reflective selection UI remains under investigation.

The result path is viable, but the existing `IdentificationSelection` renderer is corrective. Reflective UI needs a neutral learner-facing contract.

Reflective typing has a parallel issue: `ContextualTypingUserInput` is structurally usable, but no neutral open-text reflection interaction is clearly identified.

### Runtime

The runtime question is smaller than before, but still present:

```txt
who chooses non-corrective completion rather than evaluator?
```

The spike proves it can be done. It does not yet define how a general runtime should choose it.

### Documentation

Reflection is spread across many documents:

- Moment POCs;
- corpus cartography;
- authoring catalog;
- RepresentationPath;
- non-evaluative interaction;
- completed-path;
- contract investigation.

There is not yet a simple author-facing map:

```txt
If Reflect, ask what the reflection is about.
```

### Evaluation

Some reflective cases do not need evaluation.

Others overlap with inference, action reliability, or explanation quality.

The danger is treating all reflection as:

```txt
completed only
```

when some reflective tasks may produce:

```txt
partial
```

or require qualitative feedback.

### Boundaries with nearby intentions

Reflect overlaps with:

- Compare;
- Diagnose;
- Explore;
- Infer;
- Apply;
- Self-check.

This is not a flaw, but it means Reflect is not self-routing.

## Nature du phénomène

### A. Reflect est un PedagogicalUse unique

This is not the strongest reading.

BHE already has `Reflect Through Selection` and `Reflect Through Typing`, but those are interaction-specific paths, not the full meaning of Reflect.

The corpus shows too many reflective targets:

- habits;
- strategies;
- confidence;
- understanding;
- experience;
- hypotheses;
- action reliability.

Verdict:

```txt
unlikely
```

### B. Reflect est une famille de PedagogicalUses

This is partly true.

Existing authoring already distinguishes:

```txt
Reflect Through Selection
Reflect Through Typing
```

Future authoring might also distinguish:

```txt
Reflect on Strategy
Reflect on Experience
Reflect on Confidence
Reflect on Understanding
```

But that may be too early. The current evidence first calls for clarification, not immediate multiplication of PedagogicalUses.

Verdict:

```txt
plausible later
```

### C. Reflect est une intention auteur nécessitant clarification

This is the most credible reading.

Like Compare, Reflect is meaningful but incomplete.

It does not answer:

- what the learner reflects on;
- whether the response is selected or typed;
- whether the result is completed, diagnostic, inferential, or functional;
- whether feedback is informational, corrective, qualitative, or action-oriented.

Verdict:

```txt
most credible
```

### D. Reflect révèle une lacune du modèle

Not as a core concept.

BHE already has:

- `CognitiveOperation.reflect`;
- non-evaluative completion;
- `BHEResult.completed`;
- `FeedbackData.completed`;
- authoring RepresentationPaths;
- structural carriers.

The gaps are mostly:

- authoring clarification;
- neutral UI;
- documentation;
- runtime/result-policy selection;
- boundaries with inference and situated application.

Verdict:

```txt
not a core model gap
```

## Conclusion

Question:

```txt
Does Reflect need a clarification question?
```

Answer:

```txt
Yes.
```

The best current candidate is:

```txt
What are learners reflecting on?
```

This question works because it separates several observed families:

- habits;
- strategies;
- confidence / affect;
- understanding;
- choices;
- hypotheses;
- experience;
- progress;
- action reliability.

It also helps decide whether the next route should be:

- `Reflect Through Selection`;
- `Reflect Through Typing`;
- `Diagnose Through Selection`;
- `Explore Before The Rule`;
- `InferenceSet`;
- `Apply Through Situated Task`;
- `MemorizationSet` / strategy work;
- or another existing BHE structure.

The strongest conclusion is:

```txt
C. Reflect is an author intention
   requiring clarification.
```

## Suggested clarification shape

Without implementing anything, the emerging authoring question could be:

```txt
Reflect
↓
What are learners reflecting on?
```

Possible first options:

```txt
Habits
Strategies
Confidence / feelings
Understanding
Choices
Hypotheses
Experience
Progress
Action reliability
```

These options should remain provisional.

The key is not the exact list yet. The key is that Reflect, like Compare, is not self-routing.

## Current best reading

Reflect is already doing several things across the project:

```txt
surface a habit
name a strategy
prepare action
review experience
notice understanding
explain a choice
test a hypothesis
track progress
judge whether language worked
```

BHE can already represent many of these fragments.

The missing piece is not:

```txt
a ReflectSet
```

or:

```txt
a new core concept
```

The missing piece is an authoring clarification layer that helps decide:

```txt
what kind of reflection this is
```

and therefore:

```txt
which existing BHE path should carry it.
```
