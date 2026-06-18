# Pedagogical Intentions Stress Test

## 1. Context

This document belongs to the `experiment/bhe-be` branch.

It stress-tests a provisional vocabulary prompted by a recent observation:

```txt
representation capability
is ahead of
author-facing legibility
```

The hypothesis is that authors may begin with a pedagogical intention:

```txt
I want learners to reflect.
```

before choosing an interaction:

```txt
I need a QCM.
```

The candidate vocabulary is:

- evaluate;
- diagnose;
- practice;
- recall;
- produce;
- explore;
- apply;
- reflect;
- self-position;
- survey;
- understand;
- analyze;
- collaborate / interact;
- empathize / feel.

These terms are not treated as a taxonomy. The purpose of this document is to look for ambiguity, overlap, missing intentions, and category mistakes.

The corpus is deliberately uneven. It includes reflective, grammatical, communicative, strategic, and conventional practice cases. That unevenness is useful because a vocabulary that only fits the richest POCs would give a false impression of stability.

## 2. Classification Attempt

The following table makes a deliberately imperfect classification attempt.

The labels describe what an author might say they are trying to make possible. They do not replace the cognitive operations, interaction shapes, or evaluation policies already present in BHE.

| Brick or segment | Provisional dominant intention | Possible secondary intentions | Where the classification strains |
| ---------------- | ------------------------------ | ----------------------------- | -------------------------------- |
| `Thinking in English - I start` | Reflect | Self-position, survey, diagnose | `Survey` describes how information is collected; `diagnose` may describe what the sequence does with the answer; `self-position` is close to the intended result of reflection. |
| `Thinking in English - I say` | Produce | Apply, practice, self-position | Saying something is production, but the pedagogical value also lies in crossing from silent thought to speech. None of the labels clearly names confidence activation or readiness. |
| `Memorising Vocabulary` strategy questionnaire | Reflect | Self-position, survey, diagnose, explore | The learner reflects, while the author may diagnose habits. The activity also exposes alternative strategies, but `explore` overstates learner freedom if choices are tightly guided. |
| `Memorising Vocabulary` strategy practice | Practice | Recall, apply, reflect | The brick is not only about remembering words. It asks learners to try, compare, and adjust learning strategies. A single dominant label flattens that movement. |
| `Wayfinding` controlled language work | Practice | Recall, understand, apply | Local exercises practise forms, but they are preparation for situated action. Whether `apply` is already dominant depends on how close the task is to real navigation. |
| `Wayfinding` map and peer task | Apply | Produce, collaborate / interact, practice | Successful communication matters more than isolated correctness. `Apply` captures transfer to a situation, while `produce` captures output and `interact` captures the social condition. |
| `Countable / Uncountable - I learn` | Understand | Explore, analyze, practice | Guided discovery organizes noticing, comparison, inference, and classification. `Understand` names the hoped-for result rather than what the learner actually does. |
| `Passive Voice` learner-facing core | Practice | Understand, analyze, produce | Grammar recognition and transformation dominate, but focus and agency are also analyzed. `Practice` is accurate yet pedagogically thin. |
| `Passive Voice` critical-reading extension | Analyze | Apply, reflect, understand | The learner examines framing and agency. `Analyze` is plausible, but it overlaps with existing operations such as identify, compare, infer, and reflect. |
| `Passive Voice` device explanation / guessing game | Apply | Produce, collaborate / interact, practice | The same grammatical form supports functional explanation and communicative play. The social success condition cannot be reduced to `produce`. |
| `Question Forms` content-heavy sequence | Practice | Understand, evaluate, recall | This is the strongest conventional case. The vocabulary adds little unless the author genuinely distinguishes consolidation, checking, and content coverage. |

The classification is possible, but it is not clean.

Several bricks accept multiple labels because the labels answer different questions:

```txt
What does the learner do mentally?
What does the author want to achieve?
How is information collected?
What kind of outcome is expected?
How is the activity socially organized?
```

That is the first major stress fracture.

## 3. Ambiguities

### One brick, several legitimate intentions

`Wayfinding` can reasonably be tagged as:

- practice;
- produce;
- apply;
- collaborate / interact.

These labels are not synonyms. They describe different aspects of the same activity:

- forms are practised;
- directions are produced;
- language is applied to a map;
- success depends on another learner following the directions.

Choosing only one dominant intention loses useful information. Allowing all four risks producing an unprioritized tag cloud.

`Passive Voice` strains the vocabulary even more. Its learner-facing core, critical-reading extension, technical explanation, and guessing game do not share one equally precise intention. The classification depends on whether the unit of analysis is the whole brick, one phase, or one task.

Before any vocabulary can be stable, its scope would need to be clear:

```txt
intention of the whole brick?
intention of a phase?
intention of one interaction?
```

### Learner action versus author purpose

Some terms describe learner activity:

- recall;
- produce;
- reflect;
- analyze.

Others describe the author's use of learner data:

- evaluate;
- diagnose;
- survey.

For example, in `Thinking in English - I start`, the learner reflects and self-reports. The author may use the response diagnostically. Calling the learner's intention `diagnose` would be misleading because the learner is not necessarily diagnosing anything.

### Process versus desired outcome

`Understand` is attractive because authors often say:

```txt
I want learners to understand countable and uncountable nouns.
```

But `understand` is a desired state, not a visible process. The actual learner activity may involve:

- notice;
- compare;
- infer;
- classify;
- explain;
- apply.

As a high-level author prompt, `Understand` is natural. As a precise intention label, it can hide the very pedagogy BHE wants to make visible.

### Intention versus interaction or organization

`Survey` is particularly unstable.

It may mean:

- a questionnaire shape;
- a data-collection function;
- a non-evaluative interaction;
- preparation for adaptation;
- reflective self-report.

It says little by itself about what should change for the learner.

`Collaborate / Interact` has a related problem. Collaboration may be:

- an interaction condition;
- a social organization;
- a skill being learned;
- a route toward another intention.

In the Wayfinding peer task, learners interact in order to apply language and verify communicative reliability. In another activity, collaboration itself could be the learning goal. Combining `Collaborate` and `Interact` obscures this distinction.

### Emotional and affective ambiguity

`Empathize / Feel` is too broad in its current form.

`Feel` could mean:

- experience an emotion;
- notice an emotional response;
- build confidence;
- reduce anxiety;
- respond aesthetically;
- develop empathy.

`Empathize` is more specific than `Feel`, but neither appears strongly enough across the studied corpus to support one combined label. `Thinking in English` does reveal affective preparation, yet its intention is closer to reducing inhibition and supporting speaking readiness than to empathy.

## 4. Missing Intentions

The corpus suggests several intentions not cleanly captured by the candidate list. Their absence does not mean they should be added. It reveals what the proposed vocabulary is currently bad at naming.

### Notice / Become Aware

Several POCs begin by making something perceptible:

- current learning habits;
- passive forms in a song;
- differences between grammatical examples;
- the learner's tendency to translate before speaking.

`Reflect` is sometimes too strong. A learner may first need to notice before reflecting.

This is already covered by the current `CognitiveOperation` value `notice`, which warns against recreating it as a separate intention without a clear reason.

### Discover / Conceptualize

`Countable / Uncountable` is organized around guided rule discovery:

```txt
observe
-> compare
-> infer
-> conceptualize
```

`Explore` is close but suggests openness. `Understand` names the endpoint. Neither clearly captures scaffolded discovery.

Again, this may be better described through a progression of existing cognitive operations than through one intention label.

### Prepare / Activate

`Thinking in English - I start` and `I say` include preparatory functions:

- prepare a learner to speak;
- reduce hesitation;
- activate existing language;
- shift posture before later practice.

These are important in sequencing, but may not belong to the same vocabulary as `Recall` or `Produce`. They describe the role of an activity relative to what follows.

### Consolidate / Reinforce

`Question Forms` and conventional grammar practice reveal a plain but real purpose:

```txt
make existing knowledge more stable
```

`Practice` is the means. `Recall` may be one mechanism. Neither necessarily names consolidation as the intended effect.

This distinction may matter to authors, but the corpus does not yet prove that it needs a separate stable term.

### Communicate / Make Action Possible

Wayfinding reveals more than generic application:

```txt
use language reliably enough
for another person to act
```

`Apply`, `Produce`, and `Interact` each capture part of this. None names communicative effectiveness or action reliability directly.

This remains a strong local signal rather than a demonstrated universal intention.

### Self-adjust / Regulate

`Memorising Vocabulary` does not stop at self-positioning. Its deeper possibility is:

```txt
notice a strategy
compare alternatives
adjust future learning behavior
```

The candidate list includes `Self-Position` but not the subsequent adjustment. The current core already includes the cognitive operation `selfAdjust`, which may be sufficient.

## 5. Redundant Or Overlapping Intentions

### Reflect versus Self-Position

These terms should not be collapsed automatically.

`Reflect` describes a mental process:

```txt
examine an experience, habit, belief, or response
```

`Self-Position` describes a possible outcome or function:

```txt
locate oneself relative to a practice, confidence level, preference, or pathway
```

A learner may reflect without being asked to position themselves. A self-rating may position the learner with very little reflection.

The distinction is real, but the two terms do not occupy the same conceptual level.

### Evaluate versus Diagnose

These terms overlap through evidence collection, but their temporal and pedagogical use differs:

- `Evaluate` asks what has been achieved or how performance compares with criteria.
- `Diagnose` asks what is currently present, absent, fragile, or needed in order to guide what follows.

The distinction survives the corpus. However, both mostly describe the purpose of interpreting a result, not necessarily the learner's cognitive intention.

They may belong closer to evaluation policy than to a general list of learner-facing intentions.

### Produce versus Apply

These should not be merged.

`Produce` means creating an output:

- a sentence;
- an explanation;
- spoken directions.

`Apply` means using knowledge or skill in a situation:

- use direction language on a real map;
- use passive voice to explain a device;
- transfer a strategy to future vocabulary learning.

A learner can produce a decontextualized sentence without meaningfully applying anything. Application may also involve recognition, decision, or action without substantial production.

The overlap is strong, but Wayfinding shows the distinction remains useful.

### Practice versus Recall

Recall can be a form of practice, but practice is broader.

- `Recall` retrieves something without immediate exposure.
- `Practice` repeats or exercises a skill, possibly through recognition, transformation, production, or interaction.

The distinction is robust in Memorization work. Flashcard exposure, typing recall, and strategy practice are not interchangeable.

### Explore versus Analyze

The distinction is weak without additional framing.

- `Explore` suggests open or provisional engagement.
- `Analyze` suggests structured examination of parts, relations, causes, or evidence.

In guided grammar discovery, the activity may feel exploratory to the learner but analytically scaffolded by the author. The terms can coexist, yet their boundaries are easy to manipulate after the fact.

### Survey versus Diagnose versus Self-Position

These three terms can describe the same questionnaire from three viewpoints:

```txt
survey:
  how responses are collected

diagnose:
  how the system or teacher may use them

self-position:
  what the learner may gain from answering
```

This is useful analytically, but damaging to a flat taxonomy. The terms should not be presented as equivalent choices at one level.

## 6. Candidate Robustness

| Candidate | Stress-test result | Main reason |
| --------- | ------------------ | ----------- |
| Practice | Relatively robust | Recurs across grammar, vocabulary, speaking, and situated work. Still broad and often describes a means rather than a final purpose. |
| Recall | Robust | Has a clear retrieval meaning and remains distinct from exposure and generic practice. |
| Produce | Robust but already represented | Clear learner action across speaking, writing, transformation, and explanation. Already exists as a `CognitiveOperation`. |
| Apply | Relatively robust | Wayfinding and functional passive-voice tasks show a meaningful distinction between output and situated use. It overlaps with the existing `transfer` operation. |
| Reflect | Robust but already represented | Repeatedly visible in Thinking in English and Memorising Vocabulary. Already exists as a `CognitiveOperation`. |
| Evaluate | Useful but level-sensitive | Clear as an author/system purpose, not always a learner intention. |
| Diagnose | Useful but level-sensitive | Distinct from evaluation when it informs preparation or adaptation. Primarily describes result use. |
| Analyze | Promising but overlapping | Useful in critical reading and guided examination; may decompose into existing cognitive operations. |
| Self-Position | Promising but unstable | Captures an important outcome of reflective questionnaires, but overlaps with reflection, diagnosis, and learner-state description. |
| Explore | Fragile | Easily becomes a flattering label for tightly controlled discovery or ordinary exposure. |
| Survey | Fragile as an intention | More naturally describes collection format or function than learner change. |
| Understand | Fragile | Natural author language but too outcome-like and underspecified to guide activity design alone. |
| Collaborate / Interact | Fragile as a combined candidate | Mixes social organization, communication, and possibly the learning goal itself. The slash hides a real distinction. |
| Empathize / Feel | Very fragile | Combines a specific relational capacity with an unbounded affective category; weak evidence in the current corpus. |

The most robust terms are not automatically the best new vocabulary for BHE.

Some are robust precisely because the core already names them:

- `produce`;
- `reflect`;
- `transfer` as a close neighbor of `apply`;
- `selfAdjust` as a later movement beyond self-positioning.

This supports reuse before invention.

## 7. Author Usefulness

### How the list could help

The list is useful as a set of prompts.

It can interrupt an interaction-first authoring reflex:

```txt
Do I want to assess achievement?
surface a need?
build fluency?
trigger retrieval?
invite reflection?
move knowledge into action?
```

That is more pedagogically productive than beginning with:

```txt
QCM or drag/drop?
```

The vocabulary also helps reveal that the same interaction can support different purposes.

### How the list could mislead

As a flat menu, it is too abstract and internally inconsistent.

An author could choose several attractive words without clarifying the activity:

```txt
explore + understand + analyze + apply
```

The list does not currently ask:

- Who performs the action: learner, teacher, or system?
- Is the term a mental operation, author purpose, desired state, social organization, or evaluation use?
- At what scope does it apply: brick, phase, or interaction?
- What observable evidence would distinguish it from a neighboring intention?

Without those questions, the vocabulary risks becoming decorative metadata.

### A more useful documentary use

The stress test suggests that authors may benefit more from short intention questions than from a definitive label list:

```txt
What should change for the learner?
What should the learner do mentally?
Why is this interaction used here?
What evidence, if any, matters?
What will happen differently afterward?
```

This is an observation about author usefulness, not an implementation proposal.

## 8. Recommendation

Conclusion:

```txt
The vocabulary appears promising but needs refinement.
```

It does not collapse completely. Several distinctions survive:

- practice versus recall;
- produce versus apply;
- evaluate versus diagnose;
- reflection as distinct from scored assessment.

But the candidate list does not yet form one coherent vocabulary. It mixes:

```txt
author purpose
learner cognitive operation
desired learner state
interaction/data-collection form
social organization
affective experience
```

The strongest conclusion is therefore not that BHE needs all these intentions. It is that pedagogical intention becomes useful only when its level and subject are clear.

The robust candidates are:

- practice;
- recall;
- reflect;
- produce;
- apply, with caution about overlap with `transfer`;
- evaluate and diagnose, when clearly framed as uses of evidence rather than learner operations.

The fragile candidates are:

- survey;
- understand;
- explore;
- self-position;
- collaborate / interact as one combined term;
- empathize / feel as one combined term.

Several of the strongest words are already present or closely represented in `CognitiveOperation`. That reinforces the previous audit:

```txt
BHE may need clearer author-facing articulation
more than it needs a new concept inventory.
```

No candidate should be stabilized from this stress test.

## 9. Inspected Material

This stress test was grounded primarily in:

- `20260618_pedagogical-intention-exploration.md`;
- `20260606_bhe-be-weekly-synthesis.md`;
- `20260605_boost-english-corpus-cartography.md`;
- `20260604_thinking-in-english_i-start_moment-poc.md`;
- `20260604_thinking-in-english_i-say_moment-boundary-poc.md`;
- `20260604_countable-uncountable_i-learn_moment-poc.md`;
- `20260604_question-forms_negative-moment-poc.md`;
- `20260606_memorising-vocabulary_poc.md`;
- `20260606_wayfinding_poc.md`;
- `20260606_passive-voice_poc.md`;
- the current `CognitiveOperation`, `PedagogicalObject`, `InteractionMode`, `BHEResult`, and `FeedbackData` vocabulary reviewed in the recent audits.

No code, TypeScript type, runtime behavior, or stabilized concept was added or changed.

