# InferenceSet interaction exploration

## Scope

This report explores what `InferenceSet` naturally asks learners to do, before adding new code.

`InferenceSet` already exists as an interpretive pedagogical object, and there is an early typing DOM renderer. This report does not propose modifying it yet.

## 1. Pedagogical nature of InferenceSet

To infer is to produce a hypothesis from available clues.

Inference is not simply:

- classifying an item;
- associating entries;
- putting elements in order.

It requires the learner to interpret evidence and bridge a gap between what is explicitly given and what can reasonably be concluded.

### Compared with ClassificationSet

Classification asks:

> Which category does this item belong to?

Inference asks:

> What can be concluded from these clues?

The answer may be less closed, more linguistic, and more dependent on explanation.

### Compared with AssociationSet

Association asks:

> Which things belong together?

Inference asks:

> What meaning or relation can be hypothesized from these things?

Evidence may support an inference, but it is not the inference itself.

### Compared with SequenceSet

Sequence asks:

> What is the correct order?

Inference asks:

> What unstated meaning, rule, intention, or relation can be derived?

Order may sometimes be evidence, but the operation is interpretive rather than structural.

### Core cognitive components

Inference involves:

- clues;
- evidence;
- hypotheses;
- uncertainty;
- justification;
- interpretation;
- possible alternative answers;
- confidence.

The current `InferenceSet` type already reflects this through:

- `context`;
- `evidence`;
- `prompts`;
- `expectedInference`;
- `acceptedInferences`;
- `acceptedJustifications`;
- `evidenceIds`;
- `requireJustification`;
- `confidenceScale`.

## 2. Possible pedagogical cases

### Infer the meaning of an unknown word

Example:

- Learner sees an unknown Spanish word in context.
- They infer a French/English meaning using transparent words, affixes, or sentence logic.

Cognitive operation:

- lexical hypothesis;
- use of context clues;
- intercomprehension strategy.

Feedback:

- plausible / implausible inference;
- evidence used well or not;
- hint toward transparent words or morphology.

### Infer an intention

Example:

- Learner reads a dialogue and infers what a speaker wants.

Cognitive operation:

- pragmatic interpretation;
- reading between the lines;
- social context.

Feedback:

- supported by dialogue clues;
- missing contextual evidence;
- alternative plausible intentions.

### Infer a grammar rule

Example:

- Learner observes examples and infers a pluralization or agreement rule.

Cognitive operation:

- pattern detection;
- abstraction;
- formulation of a rule.

Feedback:

- rule captures the pattern;
- overgeneralization;
- missing exception or condition.

### Infer a cause/consequence relation

Example:

- Learner identifies why something happened or what follows from an event.

Cognitive operation:

- causal reasoning;
- relation between explicit facts.

Feedback:

- correct cause;
- unsupported cause;
- consequence confused with cause.

### Infer implicit information in a text

Example:

- Learner infers character emotion, setting, or unstated fact.

Cognitive operation:

- discourse interpretation;
- integration of clues;
- uncertainty management.

Feedback:

- inference is plausible;
- evidence is weak/strong;
- multiple valid readings may exist.

### Infer from multimodal clues

Example:

- Learner infers meaning from image + audio + text.

Cognitive operation:

- multimodal interpretation;
- cross-modal evidence integration.

Feedback:

- which media clue supports the inference;
- whether the learner over-relied on one clue.

This is attractive for BHE, but should not be the first implementation target.

## 3. Natural interaction modes

### QCM

Learner chooses the best inference from options.

Pros:

- easy to evaluate;
- useful for early POCs;
- clear feedback.

Cons:

- weakens productive inference;
- learners can guess;
- justification may be lost unless paired with evidence selection.

### Justified choice

Learner selects an inference and explains why.

Pros:

- balances evaluability and reasoning;
- captures justification;
- supports evidence-based feedback.

Cons:

- justification evaluation becomes harder;
- may require rubric or human/agent support.

### Evidence selection

Learner selects clues that support an inference.

Pros:

- aligns well with `InferenceEvidence`;
- makes reasoning visible;
- easier to evaluate than free text.

Cons:

- evidence selection is not the inference itself;
- may need target highlighting or annotation UI.

### Short answer

Learner writes a short inferred answer.

Pros:

- productive;
- close to real reasoning;
- fits current typing prototype.

Cons:

- brittle string matching;
- synonyms and paraphrases are hard;
- scoring can become unfair if too strict.

### Free explanation

Learner explains the inference in natural language.

Pros:

- pedagogically rich;
- captures reasoning;
- useful for advanced learners.

Cons:

- hard to evaluate automatically;
- feedback likely qualitative;
- may require human review or an agent.

### Guided dialogue

Learner is guided through prompts:

- What do you notice?
- Which word helps?
- What do you think it means?
- Why?

Pros:

- excellent for inference training;
- supports scaffolding;
- reveals reasoning process.

Cons:

- interaction is no longer a simple activity renderer;
- state and feedback become conversational.

### Conversational agent activity

Learner discusses the inference with an agent.

Pros:

- strong fit for interpretation;
- agent can ask for evidence and challenge weak reasoning;
- supports multiple valid answers.

Cons:

- requires LLM integration;
- evaluation consistency becomes difficult;
- needs safety, logging, and pedagogical constraints.

This is promising but should remain future work.

## 4. Architectural tensions

### Evaluation difficulty

Inference is not naturally binary.

Possible outputs:

- correct;
- partially plausible;
- unsupported;
- too vague;
- correct but poorly justified;
- wrong inference from good evidence;
- plausible alternative.

This challenges the current simple evaluator pattern.

### Natural language

`expectedInference` and `acceptedInferences` can support simple matching, but inference often involves paraphrase.

A strict evaluator may reject valid answers.

A loose evaluator may accept weak answers.

### Justification

`requireJustification` is central.

But justification evaluation is different from answer evaluation:

- Is a justification present?
- Is it relevant?
- Does it cite evidence?
- Does it support the inference?

This suggests future `BHEResult.details` should separate inference quality from justification quality.

### Qualitative feedback

Inference feedback may need to say:

- "Your answer is plausible, but your evidence is weak.";
- "Good clue, but the inference is too broad.";
- "This is a valid alternative reading.";

This is richer than the current generic feedback mapper.

### Possible role of an agent

An agent may be useful for:

- guided questioning;
- paraphrase tolerance;
- justification critique;
- confidence calibration;
- strategy coaching.

But this should not be integrated now. BHE first needs a clear non-agent interaction shape.

### Limits of a classic evaluator

A classic evaluator can handle:

- QCM;
- selected evidence;
- exact accepted answers;
- presence of justification.

It struggles with:

- open explanation;
- nuance;
- multiple plausible interpretations;
- rich language feedback.

This means `InferenceSet` may eventually need evaluator tiers, not a single universal evaluator.

## 5. What not to do now

Do not create:

- a renderer;
- a new evaluator;
- LLM integration;
- a registry;
- automatic complex scoring;
- generic interpretive scoring;
- conversational runtime;
- generalized inference engine.

Do not treat inference as just another typing activity.

Do not overfit the current typing renderer into the architecture yet.

## 6. Final recommendation

Recommendation: **B. continue conceptual exploration before implementing a new InteractionData**.

Reason:

- `InferenceSet` is cognitively more complex than Association, Classification, or Sequence;
- evaluation is the central tension, not rendering;
- the existing typing renderer already shows a brittle local evaluation pattern;
- justification and evidence selection need clearer modeling before a new POC;
- agent-based interaction is promising but premature.

The next healthy step should be a focused report comparing possible V0 inference interaction shapes:

1. QCM inference;
2. evidence selection;
3. short answer with accepted answers;
4. justified choice.

Only after that should BHE choose one small console-only `InteractionData` / `UserInput` POC.
