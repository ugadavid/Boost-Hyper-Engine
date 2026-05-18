# Inference V0 interaction strategies comparison

## Scope

This report compares realistic V0 interaction strategies for `InferenceSet`.

No implementation is proposed here.

The central question:

> What is the smallest useful interaction that preserves the interpretive nature of inference without requiring LLMs, complex NLP, or an agent runtime?

## 1. QCM inference

### Example

Question:

> What does the speaker probably want?

Choices:

- help;
- money;
- food;
- directions.

### Pedagogical interest

QCM inference can train recognition of plausible conclusions.

It is useful when the goal is:

- choosing the most plausible inference;
- distinguishing close distractors;
- checking comprehension of context.

It can be especially helpful for early learners or first exposure to inference tasks.

### Evaluability

Very high.

Evaluation can be simple:

- selected choice id;
- expected choice id;
- correct / incorrect;
- optional distractor-specific feedback.

### Feedback possible

Feedback can explain:

- why the correct inference is supported;
- why a distractor is unsupported;
- which evidence points to the answer.

This can already be meaningful without NLP.

### Weakness

QCM reduces inference to recognition.

Learners can guess. They do not have to formulate an inference or justify it.

It may underuse `acceptedInferences` and `acceptedJustifications`.

### BHE coherence

Strong for V0 if the goal is evaluation clarity.

But QCM alone may flatten the interpretive richness of `InferenceSet`.

## 2. Evidence selection

### Example

Learner selects clues supporting an inference.

For instance:

- unknown word;
- transparent word;
- context clue;
- suffix;
- image detail.

### Alignment with InferenceEvidence

Very strong.

`InferenceSet` already has:

- `InferenceEvidence`;
- `evidenceIds`;
- evidence labels;
- evidence kinds;
- source offsets.

Evidence selection directly uses this structure.

### Visibility of reasoning

Evidence selection makes reasoning visible.

Instead of only asking "what is your answer?", it asks:

> What are you using to support your answer?

This fits inference pedagogy well.

### Evaluability

Moderate to high.

Evaluation can compare:

- selected evidence ids;
- expected evidence ids;
- missing evidence;
- extra evidence.

It can produce structured `BHEResult.details`.

### Pedagogical limits

Selecting evidence is not the same as producing an inference.

A learner may select correct clues but fail to formulate the conclusion.

Evidence selection is therefore better as a companion interaction than a complete inference activity.

## 3. Short answer with accepted answers

### Example

Question:

> What does this word probably mean?

Learner types:

> unknown

### Productivity

High.

The learner must formulate an answer rather than recognize one.

This better reflects inference as hypothesis production.

### Matching fragility

The problem is evaluation.

Short answers may contain:

- synonyms;
- paraphrases;
- spelling variation;
- partial answers;
- different languages;
- unnecessary explanation.

Strict matching is brittle.

### Accepted answers

Current `InferencePrompt` supports:

- `expectedInference`;
- `acceptedInferences`.

This makes a V0 possible without NLP:

- normalize case;
- trim whitespace;
- compare against accepted strings.

### Paraphrases

Paraphrase tolerance is limited in V0.

BHE should not pretend simple string matching understands language.

### Reasonable V0 tolerance

A reasonable V0 could support:

- lowercase normalization;
- trimming;
- maybe accent-insensitive matching later;
- accepted answer list;
- no semantic matching.

This is honest and useful, but limited.

## 4. Justified choice

### Shape

Learner:

1. selects an inference;
2. provides a short justification.

### Balance

This is a strong compromise.

The inference choice remains structured and evaluable.

The justification captures reasoning without requiring full automatic qualitative scoring.

### Evaluation possible

V0 evaluation could check:

- selected inference is correct;
- justification is present;
- selected evidence ids match expected evidence, if evidence selection is included later.

It should not deeply grade the justification yet.

### Pedagogical potential

High.

It encourages learners to connect answer and evidence.

It can support feedback like:

- "Your inference is correct, but justify it with clues.";
- "Good choice; now explain which word helped you.";
- "Your justification is present but not automatically evaluated yet."

### Complexity

Moderate.

More complex than QCM or evidence selection alone, but still manageable without LLMs if V0 only checks presence and structure.

## 5. Comparative synthesis

| Strategy | V0 simplicity | Pedagogical richness | Evaluability | BHEResult compatibility | Accessibility | BHE coherence |
| --- | --- | --- | --- | --- | --- | --- |
| QCM inference | High | Medium | High | High | High | Good, but reductive |
| Evidence selection | Medium | High for reasoning | Medium/high | High | Medium/high | Strong fit with `InferenceEvidence` |
| Short answer | Medium | High | Medium/low | Medium | High | Good but brittle |
| Justified choice | Medium | High | Medium | High | High | Strong compromise |

### Main observation

Inference probably needs two layers:

1. an inference answer;
2. evidence or justification supporting it.

But V0 should not try to evaluate rich natural-language justification.

### BHEResult compatibility

Useful future `details` could include:

- selected inference id;
- expected inference id;
- selected evidence ids;
- expected evidence ids;
- inference accepted;
- justification present;
- justification evaluated: false;
- confidence value, later.

This allows feedback and routing to consume structured signals without pretending to understand full natural language.

## 6. What should not happen yet

Do not add:

- LLM integration;
- conversational agent runtime;
- complex NLP;
- semantic similarity scoring;
- automatic qualitative scoring;
- renderer;
- generalized inference engine;
- registry;
- agent feedback.

Do not make BHE pretend that string matching is real interpretation.

Do not make an agent mandatory for `InferenceSet`.

## 7. Recommendation for V0

Recommendation: **E. minimal combination: justified choice with optional evidence selection later**.

More precisely, the first healthy V0 should be:

1. structured inference choice;
2. short justification field;
3. evaluator checks selected inference;
4. evaluator checks justification presence only;
5. evidence selection remains the next extension.

Why not QCM alone?

- too reductive for inference.

Why not short answer first?

- string matching is brittle and could distort the architecture.

Why not evidence selection alone?

- evidence is reasoning support, not the inference itself.

Why justified choice?

- it balances structure and interpretation;
- it is evaluable without NLP;
- it preserves the reasoning dimension;
- it aligns with `requireJustification`;
- it produces useful `BHEResult.details`;
- it keeps the door open to evidence selection and agent support later.

Next safe step:

Create a console-only interaction data / input POC for:

`InferenceChoiceData + InferenceJustifiedChoiceUserInput -> BHEResult`

No renderer yet.
