# Authoring Thinking In English

## 1. Starting Point

I want to reproduce a small activity:

> Do you translate in your head?

Possible answers:

- Yes;
- Sometimes;
- No.

After the learner answers, I want to display:

> Many learners report doing this.  
> In the next step, you will compare your habits with other learning strategies.

There is no correct answer, wrong answer, score, or assessment.

My first thought is not a BHE type:

~~~txt
This looks like a three-choice questionnaire.
~~~

My next thought is:

~~~txt
I need something QCM-like,
but I must stop it from behaving like a test.
~~~

As an author discovering the repository, I naturally look at the README, examples folder, QCM and selection examples, and available interaction modes.

The README does not provide an authoring path. The examples become my practical entry point. The obvious example is classification-qcm-evaluator-example.ts:

~~~txt
ClassificationSet
-> QcmData
-> QcmUserInput
-> evaluator
-> success / failed
~~~

This is visually close and pedagogically wrong. My first problem is not representation. It is resisting the most discoverable example.

## 2. Authoring Journey

### Step 1 - I start from the interaction shape

I begin with one question and three selectable answers.

The available interaction modes include qcm and selection. QCM feels natural because the activity looks like a quiz, but its nearby example expects correctness. Selection feels more neutral, so I follow it.

### Step 2 - I find selection through Identification

The closest concrete shape is IdentificationSelectionData:

~~~txt
context
selectionMode
targets
~~~

This fits surprisingly well:

~~~txt
context:
  Do you translate in your head?

selectionMode:
  single

targets:
  yes
  sometimes
  no
~~~

The expected field is optional, so I can omit it.

Structurally, this is almost exactly what I need. Semantically, I hesitate. The learner is not identifying a target; they are reporting a habit.

The name says identification while the activity says self-observation. I can continue, but only by knowingly borrowing a specialized shape.

### Step 3 - I ask what kind of PedagogicalObject this is

PedagogicalObject offers useful fields:

- pedagogical type and family;
- learning goal;
- interaction modes;
- cognitive operations;
- content.

The learning goal feels natural:

~~~txt
domain:
  learning awareness

skill:
  awareness of thinking habits in English

topic:
  mental translation before speaking
~~~

The cognitive operations help even more:

~~~txt
notice
reflect
compare
selfAdjust
~~~

For the first time, the representation describes why the questionnaire exists rather than only how it looks.

The pedagogical type is harder. Association, classification, sequence, transformation, gap-fill, identification, inference, and memorization do not naturally mean reflective self-report.

I choose Identification as the nearest operational carrier because I am borrowing its selection data. I do not feel fully comfortable doing so. The object is representable, but its required label tells a slightly different story.

### Step 4 - I describe the learner action

The closest input is IdentificationSelectionUserInput:

~~~txt
kind:
  identification-selection

selectedTargetIds:
  - sometimes
~~~

The selected ids are exactly what I need. Again, the structure works and the vocabulary does not.

QcmUserInput has a cleaner selectedChoiceId for one answer, but its interactionMode and examples pull strongly toward scored correctness.

### Step 5 - I look for the evaluator

Most complete examples follow:

~~~txt
UserInput
-> Evaluator
-> BHEResult
~~~

I initially assume I need an evaluator. But there is nothing to correct.

The only meaningful questions are:

- did the learner choose one option?
- which option?
- is the reflective step complete?

I therefore do not use the Identification evaluator. It would invent expected, correct, missing, and extra targets that do not exist here.

This feels like stepping off the documented path, even though the architecture permits it.

### Step 6 - I discover BHEResult

BHEResult includes:

~~~txt
success
partial
failed
skipped
completed
~~~

Score and maxScore are optional.

I can therefore produce:

~~~txt
status:
  completed

completion:
  1

details:
  selectedOptionId: sometimes
  selectedLabel: Sometimes
  hasCorrectAnswer: false
  purpose: self-observation

signals:
  reflective-selection
  thinking-habit-awareness

score:
  omitted
~~~

This is the decisive discovery:

~~~txt
Ah.
The engine already knows how to record
meaningful completion without correctness.
~~~

### Step 7 - I consider the learner-facing response

The desired continuation is informational, not corrective.

FeedbackMessage supports an informational severity, so the message itself fits. However, the standard feedback mapper expects success, partial, or failed and is not the natural route for a completed reflective result.

As an author, I can describe the informational message directly or keep it in support content. What I cannot find is a ready-made non-evaluative example showing that path.

The engine appears capable. The authoring trail is incomplete.

## 3. Representation Attempt

This is my final descriptive representation using current concepts only.

### Pedagogical object

~~~txt
PedagogicalObject

kind:
  pedagogical-object

pedagogicalType:
  identification
  # nearest available carrier, semantically imperfect

pedagogicalFamily:
  interpretive

learningGoal:
  domain: learning awareness
  skill: awareness of thinking habits in English
  topic: mental translation before speaking

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

    options:
      - id: yes
        label: Yes
      - id: sometimes
        label: Sometimes
      - id: no
        label: No

    selectionMode:
      single

    expected:
      none

  support:
    explanation:
      Many learners report doing this.
      In the next step, you will compare your habits
      with other learning strategies.
~~~

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
~~~

### User input

~~~txt
IdentificationSelectionUserInput

kind:
  identification-selection

selectedTargetIds:
  - sometimes
~~~

The data is right. The naming is not neutral.

### Result

~~~txt
BHEResult

objectId:
  thinking-in-english-translation-habit

status:
  completed

completion:
  1

details:
  selectedOptionId: sometimes
  selectedLabel: Sometimes
  hasCorrectAnswer: false
  pedagogicalFunction: self-observation

signals:
  - reflective-selection
  - thinking-habit-awareness

score:
  omitted

maxScore:
  omitted
~~~

### Learner-facing continuation

~~~txt
Informational message

severity:
  info

message:
  Many learners report doing this.
  In the next step, you will compare your habits
  with other learning strategies.
~~~

I would not send this completed result through the current corrective feedback mapper.

## 4. Friction Points

### The first discoverable path is evaluative

The activity looks like a QCM, so I naturally find an evaluated QCM example.

The example encourages:

~~~txt
choice
-> correct answer
-> evaluator
-> score
~~~

My activity needs:

~~~txt
choice
-> self-report
-> completed result
-> informational continuation
~~~

This is mainly an examples and documentation problem.

### Pedagogical type

No available pedagogical type describes this activity naturally. Using Identification keeps me within existing structures but tells the wrong cognitive story.

This is a vocabulary tension with a mild model edge.

### InteractionData and UserInput naming

IdentificationSelectionData and IdentificationSelectionUserInput carry the required structure but imply target identification.

This is primarily vocabulary friction.

### No obvious non-evaluative path

The architecture does not require an evaluator, but evaluator-driven flows dominate the examples. I must infer that a completed BHEResult can be produced without scoring.

This is primarily discoverability and documentation.

### Informational feedback

FeedbackMessage can carry the message. The standard mapper cannot naturally turn completed into a neutral reaction.

This is narrowness in a ready-made path, not failure of the representation.

### Friction summary

| Hesitation | Main source |
| ---------- | ----------- |
| QCM or selection? | Examples and interaction vocabulary |
| Which pedagogical type? | Vocabulary, with mild model tension |
| Can Identification selection be neutral? | Specialized naming |
| Must I use an evaluator? | Examples and documentation |
| Can result mean completion? | Discoverable only by inspecting BHEResult |
| How do I show continuation? | Feedback mapper convention and missing example |

## 5. Discovery Moment

The discovery happens when I read BHEResult instead of following an evaluator example.

I see that completed is valid, score is optional, details are object-specific, signals are open, and the result may follow any meaningful process.

Before reading it, I assume:

~~~txt
BHE interaction
-> evaluation
-> success or failure
~~~

After reading it, I understand:

~~~txt
BHE interaction
-> meaningful result
~~~

The second discovery is CognitiveOperation. The activity can declare notice and reflect even though its renderer looks like a quiz.

Both capabilities already exist, but they are not the first things the concrete examples teach me to seek.

## 6. Final Verdict

### Can BHE represent this activity?

~~~txt
Yes, with minor semantic tension.
~~~

BHE can represent:

- the learning goal;
- reflective cognitive operations;
- a selection interaction;
- selected option ids;
- completed participation without score;
- result details and signals;
- an informational message.

Nothing fundamental breaks. The largest compromise is choosing a specialized pedagogical type and selection vocabulary that imply identification.

### Can an author naturally discover how to represent this activity?

~~~txt
Not yet naturally.
~~~

A determined author can discover the path, but the repository encourages:

~~~txt
QCM
-> evaluator
-> correct / incorrect
~~~

The non-evaluative path requires several non-obvious moves:

1. look beyond the QCM example;
2. discover selection through Identification;
3. omit expected targets;
4. refuse the associated evaluator;
5. inspect BHEResult directly;
6. discover completed without score;
7. avoid the default corrective feedback mapper.

The difference is:

~~~txt
representability:
  high

authoring discoverability:
  low to moderate
~~~

## 7. Authoring Verdict

My main difficulty was not expressing the activity's data. It was finding a path whose names and examples did not reinterpret reflection as assessment.

My main discovery was:

~~~txt
BHEResult already supports
meaningful non-scored completion.
~~~

The experience confirms:

~~~txt
The engine can already represent
more than its current examples naturally reveal.
~~~

It also adds a qualification:

~~~txt
discoverability is not only about documentation;
specialized names influence the path an author imagines.
~~~

No new concept is required for this documentary representation. What is missing is not proven to be architecture. It is a clear author-facing trail through the architecture that already exists.

## 8. Material Consulted During Authoring

I used sources an author could reasonably encounter:

- root README;
- examples index and filenames;
- classification QCM evaluator example;
- identification selection evaluator example;
- PedagogicalObject;
- CognitiveOperation and its vocabulary note;
- InteractionMode;
- IdentificationSelectionData;
- UserInput types;
- BHEResult;
- FeedbackData and the known feedback mapping behavior.

No code, TypeScript file, object, or runtime behavior was created or modified.

