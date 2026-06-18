# Catalog Application - Thinking In English

## 1. Activity

The activity is:

> Do you translate in your head?

Possible answers:

- Yes;
- Sometimes;
- No.

After the learner responds:

> Many learners report doing this.  
> In the next step, you will compare your habits with other learning strategies.

There is:

- no correct answer;
- no wrong answer;
- no score;
- no corrective evaluation.

The activity is mainly reflective. It asks the learner to notice and report a mental habit before later comparison or practice.

This document tests whether the experimental authoring catalog makes the representation path easier to discover.

## 2. Catalogue Lookup

### Primary match

The strongest match is:

~~~txt
reflect-through-selection
~~~

Its author question is:

> Do you want learners to notice or describe something about themselves?

That question matches this activity directly.

The entry also says:

- use selectable statements;
- support reflection or self-observation;
- do not treat the response as correct or incorrect;
- consider selection or QCM;
- use notice, reflect, and compare;
- mark the use as non-evaluative.

It even cites the same Thinking in English case.

The lookup therefore requires almost no interpretation.

### Why this entry fits

| Catalog field | Match with the activity |
| ------------- | ----------------------- |
| label | The learner reflects through a selected response. |
| authorQuestion | The learner describes a personal thinking habit. |
| description | The response is self-observation without correctness. |
| pedagogicalIntentions | Reflect and self-position are directly relevant; survey describes the collection form. |
| suggestedInteractionShapes | Selection is a natural fit; QCM is visually possible but more evaluatively colored in current examples. |
| cognitiveOperations | Notice and reflect are central; compare prepares the next step. |
| nonEvaluative | Exactly matches the absence of score and correction. |
| examples | Thinking in English is explicitly named. |
| notes | Warns that nearby QCM and Identification conventions may look corrective even when the structure is neutral. |

### Secondary match

A second entry is relevant:

~~~txt
diagnose-through-selection
~~~

It could apply if the response is later used to adapt support or choose a pathway.

However, the activity as stated does not require diagnosis. It primarily makes a habit visible to the learner.

Therefore:

~~~txt
primary:
  reflect-through-selection

secondary only if downstream adaptation exists:
  diagnose-through-selection
~~~

This distinction prevents the catalog from turning every self-report into diagnosis.

## 3. Natural Representation Path

With the catalog, the path begins differently from the earlier authoring stress test.

Without the catalog, the visible question first suggested:

~~~txt
QCM
-> evaluator
-> correct / incorrect
~~~

With the catalog, the author can begin from use:

~~~txt
Activity:
  notice a personal thinking habit
->
Pedagogical Use:
  reflect-through-selection
->
Suggested Interaction Shape:
  selection
->
Cognitive Operations:
  notice + reflect + compare
->
Evaluation Policy:
  non-evaluative
->
UserInput:
  selected option id
->
BHEResult:
  completed, no score
->
Continuation:
  informational message and next-step bridge
~~~

The catalog improves the ordering of decisions.

It makes the author ask:

~~~txt
What is this choice for?
~~~

before:

~~~txt
Which choice component should I use?
~~~

### Mapping to existing BHE concepts

| Catalog guidance | Existing BHE concept |
| ---------------- | -------------------- |
| Reflect through selection | Pedagogical use remains authoring guidance, outside the core |
| Notice, reflect, compare | CognitiveOperation |
| Selection | InteractionMode |
| Question plus options | Closest current InteractionData is IdentificationSelectionData |
| Selected response | Closest current UserInput is IdentificationSelectionUserInput |
| Non-evaluative | Do not use the Identification evaluator |
| Meaningful completion | BHEResult with status completed and no score |
| Informational continuation | Pedagogical support content or direct informational FeedbackMessage |

The path is clearer at the level of purpose and policy.

The final mapping into concrete specialized types remains less obvious.

## 4. Representation Attempt

This is a plausible descriptive representation using the catalog and current BHE concepts only.

### Authoring catalog decision

~~~txt
PedagogicalUse:
  id: reflect-through-selection

Why:
  learner notices and reports a personal habit

Suggested shape:
  selection

Cognitive operations:
  notice
  reflect
  compare

Evaluation:
  non-evaluative
~~~

### Pedagogical object

~~~txt
PedagogicalObject

metadata:
  id: thinking-in-english-mental-translation
  title: Do you translate in your head?

pedagogicalType:
  identification
  # nearest current carrier, still semantically imperfect

pedagogicalFamily:
  interpretive

learningGoal:
  domain: learning awareness
  skill: awareness of internal translation habits
  topic: thinking before speaking in English

cognitiveOperations:
  - notice
  - reflect
  - compare

interactionModes:
  - selection

content:
  core:
    question:
      Do you translate in your head?

    selectionMode:
      single

    options:
      - id: yes
        label: Yes
      - id: sometimes
        label: Sometimes
      - id: no
        label: No

    expected:
      none

  support:
    explanation:
      Many learners report doing this.
      In the next step, you will compare your habits
      with other learning strategies.
~~~

The catalog makes the cognitive operations and non-evaluative policy easy to choose.

It does not resolve the pedagogicalType tension. Identification remains the nearest current carrier rather than an exact semantic match.

### Interaction data

~~~txt
IdentificationSelectionData

context:
  Do you translate in your head?

selectionMode:
  single

targets:
  - targetId: yes
    label: Yes
  - targetId: sometimes
    label: Sometimes
  - targetId: no
    label: No

expected flags:
  omitted
~~~

The catalog's note helps here:

~~~txt
the selection structure is neutral
even when nearby Identification conventions are corrective
~~~

### User input

If the learner chooses Sometimes:

~~~txt
IdentificationSelectionUserInput

kind:
  identification-selection

selectedTargetIds:
  - sometimes
~~~

This records the right action.

The vocabulary remains specialized and slightly misleading.

### Result

No Identification evaluator is called.

A meaningful result can be produced directly:

~~~txt
BHEResult

objectId:
  thinking-in-english-mental-translation

status:
  completed

completion:
  1

score:
  omitted

maxScore:
  omitted

details:
  selectedOptionId: sometimes
  selectedLabel: Sometimes
  hasCorrectAnswer: false
  pedagogicalUseId: reflect-through-selection
  purpose: self-observation

signals:
  - reflective-selection
  - mental-translation-awareness
~~~

The catalog does not define this result. It makes the need for a completed, non-scored result easier to infer.

### Continuation

~~~txt
Informational continuation

severity:
  info

message:
  Many learners report doing this.
  In the next step, you will compare your habits
  with other learning strategies.
~~~

The continuation should not be generated by the existing corrective result-to-feedback mapper.

It may be represented as support content or as a directly constructed informational message.

## 5. Discoverability Evaluation

### What becomes easier

The catalog removes the largest early ambiguity.

The author no longer has to infer that a quiz-like activity may be reflective. The entry states it explicitly.

It also makes four decisions visible at once:

1. the pedagogical use is reflection/self-observation;
2. selection is a plausible shape;
3. notice, reflect, and compare are relevant cognitive operations;
4. the interaction is non-evaluative.

This prevents several wrong turns:

- choosing a QCM only because the surface looks quiz-like;
- inventing a correct answer;
- applying the Identification evaluator;
- producing success or failed;
- adding a score because most examples have one.

The catalog therefore improves the beginning of the author journey substantially.

### What remains difficult

The author still has to cross a gap between catalog language and concrete engine types.

The catalog says:

~~~txt
selection
non-evaluative
~~~

The current engine exposes the closest implementation through:

~~~txt
IdentificationSelectionData
IdentificationSelectionUserInput
~~~

The catalog does not tell the author:

- which concrete type is the nearest current carrier;
- that expected may be omitted;
- that the Identification evaluator should not be used;
- that completed is the appropriate BHEResult status;
- that score and maxScore may be omitted;
- that the default feedback mapper is unsuitable;
- where the informational continuation should live;
- which pedagogicalType to choose.

The catalog helps answer:

~~~txt
What kind of pedagogical use and interaction is this?
~~~

It does not yet fully answer:

~~~txt
How do I express that use with today's concrete BHE contracts?
~~~

### Comparison with the first authoring stress test

Before the catalog:

~~~txt
activity
-> QCM guess
-> evaluative example
-> resistance
-> manual inspection
-> discovery of completed result
~~~

With the catalog:

~~~txt
activity
-> reflect-through-selection
-> selection + non-evaluative
-> specialized type mapping tension
-> completed result
~~~

The author reaches the right conceptual path earlier.

The remaining friction is narrower and more technical.

## 6. Missing Information

The catalog would make this case more obvious if an entry could communicate the following documentary information.

### Current implementation maturity

The author needs to distinguish:

- supported end to end;
- structurally representable with an existing specialized carrier;
- documented possibility only;
- not yet implemented.

For this use, the honest status is:

~~~txt
structurally representable
but no neutral end-to-end selection path
~~~

### Closest current BHE path

A small implementation hint could identify:

~~~txt
closest data:
  IdentificationSelectionData without expected flags

closest input:
  IdentificationSelectionUserInput

do not reuse:
  evaluateIdentificationSelection
~~~

This would improve discoverability without claiming that Identification is semantically ideal.

### Result policy

The entry currently says nonEvaluative, but that does not tell the author what follows.

Useful missing guidance includes:

~~~txt
result:
  completed

score:
  none

details:
  preserve selected ids

feedback:
  informational, not corrective
~~~

### Evaluation boundary

NonEvaluative is helpful but still broad.

The author needs to know whether the interaction should:

- skip the evaluator entirely;
- use a completion/result producer;
- record data for later diagnosis;
- trigger routing;
- show a continuation only.

The current activity uses completion plus informational continuation.

### Relationship to nearby catalog entries

Reflect through selection and Diagnose through selection both match parts of Thinking in English.

The catalog does not yet express:

- primary versus secondary use;
- when diagnosis becomes relevant;
- whether the response is for the learner, teacher, system, or later routing.

### PedagogicalObject fit

The catalog begins from pedagogical use and interaction shape, but the author still has to choose a pedagogicalType.

No current catalog field indicates that the closest carrier may be semantically imperfect.

This is one of the few frictions the catalog cannot solve merely by naming an interaction shape.

## 7. Recommendation

Verdict:

~~~txt
partially helps
~~~

The catalog clearly helps at the most important early moment.

It makes visible that:

~~~txt
selection
can support reflection
without evaluation
~~~

This changes the author's initial route and prevents the strongest misconception.

However, it stops before the concrete representation path is complete.

The author still has to discover:

- the specialized current carrier;
- the evaluator boundary;
- completed BHEResult without score;
- informational continuation;
- the unresolved pedagogicalType vocabulary.

The practical result is:

~~~txt
before catalog:
  correct destination discovered late

with catalog:
  correct direction discovered immediately
  destination mapping still requires expertise
~~~

The catalog has therefore demonstrated practical value.

Its current value is orientation, not execution.

No change to the catalog follows from this document. The missing information is recorded as evidence for later observation, not as an immediate package update.

## 8. Final Findings

### Catalog entry selected

~~~txt
reflect-through-selection
~~~

Secondary only if the response informs adaptation:

~~~txt
diagnose-through-selection
~~~

### Natural path

~~~txt
Activity
-> Reflect through Selection
-> Selection
-> Notice + Reflect + Compare
-> Non-evaluative UserInput
-> Completed BHEResult
-> Informational Continuation
~~~

### Main benefit

The catalog prevents the author from equating quiz-like selection with assessment.

### Main remaining friction

The bridge from neutral authoring vocabulary to specialized concrete BHE types is still undocumented.

### Overall verdict

~~~txt
The catalog partially helps:
it solves conceptual orientation,
not concrete engine mapping.
~~~

No core, authoring package, runtime, renderer, evaluator, or TypeScript file was modified.

