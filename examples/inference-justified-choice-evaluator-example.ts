import { inferenceToChoiceData } from "../packages/core/adapters/index.js";
import { evaluateInferenceJustifiedChoice } from "../packages/core/evaluators/index.js";
import type {
  InferenceJustifiedChoiceUserInput,
  InferenceSet
} from "../packages/core/types/index.js";

const inferenceSet: InferenceSet = {
  kind: "pedagogical-object",
  type: "inference-set",
  pedagogicalFamily: "interpretive",
  pedagogicalType: "inference",
  metadata: {
    id: "inference-justified-choice-demo",
    title: "Infer Meaning From Context",
    language: "en",
    level: "A2",
    tags: ["inference", "context", "justification"]
  },
  learningGoal: {
    domain: "Intercomprehension",
    skill: "lexical inference",
    topic: "context clues",
    cefr: "A2"
  },
  content: {
    core: {
      context:
        "Although the word was unfamiliar, the learner understood it thanks to the surrounding context.",
      prompts: [
        {
          id: "infer-unfamiliar",
          question: "What does the word 'unfamiliar' probably mean?",
          expectedInference: "not known",
          acceptedInferences: ["unknown", "not familiar"],
          choices: [
            {
              id: "infer-unfamiliar-choice-unknown",
              label: "not known",
              isExpected: true,
              feedback: "This choice is supported by the contrast with understanding from context."
            },
            {
              id: "infer-unfamiliar-choice-expensive",
              label: "very expensive",
              isExpected: false,
              feedback: "Nothing in the sentence suggests price or cost."
            },
            {
              id: "infer-unfamiliar-choice-fast",
              label: "very fast",
              isExpected: false,
              feedback: "The sentence is about knowing and understanding, not speed."
            }
          ],
          acceptedJustifications: [
            "The sentence contrasts an unfamiliar word with understanding it from context."
          ],
          hint: "Look at the contrast between unfamiliar and understood.",
          feedback: "Unfamiliar can be inferred as not known or not familiar."
        }
      ],
      requireJustification: true,
      allowMultipleInferences: true
    }
  },
  interactionModes: ["qcm"],
  validate() {
    return this.content.core.prompts.length > 0;
  }
};

const [baseChoiceData] = inferenceToChoiceData(inferenceSet);

if (!baseChoiceData) {
  throw new Error("The inference set did not produce any choice data.");
}

const choiceData = baseChoiceData;

const expectedChoiceId = choiceData.choices.find((choice) => choice.isExpected)?.choiceId;
const wrongChoiceId = "infer-unfamiliar-choice-expensive";

if (!expectedChoiceId) {
  throw new Error("The choice data does not contain an expected choice.");
}

const scenarios: { name: string; input: InferenceJustifiedChoiceUserInput }[] = [
  {
    name: "success good choice with justification",
    input: {
      kind: "inference-justified-choice",
      selectedChoiceId: expectedChoiceId,
      justification: "The text says the learner understood it from the surrounding context."
    }
  },
  {
    name: "partial good choice without justification",
    input: {
      kind: "inference-justified-choice",
      selectedChoiceId: expectedChoiceId
    }
  },
  {
    name: "partial wrong choice with justification",
    input: {
      kind: "inference-justified-choice",
      selectedChoiceId: wrongChoiceId,
      justification: "I can point to context, but the selected meaning is wrong."
    }
  },
  {
    name: "failed wrong choice without justification",
    input: {
      kind: "inference-justified-choice",
      selectedChoiceId: wrongChoiceId
    }
  }
];

const scenarioResults = scenarios.map((scenario) => {
  const result = evaluateInferenceJustifiedChoice(choiceData, scenario.input);

  return {
    scenario: scenario.name,
    status: result.status,
    score: result.score,
    maxScore: result.maxScore,
    details: result.details
  };
});

console.log(
  JSON.stringify(
    {
      promptId: choiceData.promptId,
      question: choiceData.question,
      choices: choiceData.choices,
      scenarioResults
    },
    null,
    2
  )
);
