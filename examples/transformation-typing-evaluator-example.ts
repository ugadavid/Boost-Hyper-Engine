import { transformationToInteractionData } from "../packages/core/adapters/index.js";
import { evaluateTransformationTyping } from "../packages/core/evaluators/index.js";
import type {
  TransformationInteractionData,
  TransformationSet,
  TransformationTypingUserInput
} from "../packages/core/types/index.js";

const transformationSet: TransformationSet = {
  kind: "pedagogical-object",
  type: "transformation-set",
  pedagogicalFamily: "productive",
  pedagogicalType: "transformation",
  metadata: {
    id: "transformation-typing-evaluator-demo",
    title: "Transformation Typing Evaluator Demo",
    language: "en",
    level: "A2",
    tags: ["transformation", "typing", "evaluation"]
  },
  learningGoal: {
    domain: "English",
    skill: "form transformation",
    topic: "grammar and register",
    cefr: "A2"
  },
  content: {
    core: {
      items: [
        {
          id: "tense-simple-present-to-past",
          source: "I walk to school.",
          expected: "I walked to school.",
          transformationType: "tense",
          instruction: "Transform the sentence into the simple past."
        },
        {
          id: "gender-number-french-adjective",
          source: "un étudiant sérieux",
          expected: "des étudiantes sérieuses",
          transformationType: "gender-number",
          instruction: "Transform the phrase into feminine plural."
        },
        {
          id: "register-informal-to-formal",
          source: "Can you send me the file?",
          expected: "Could you please send me the file?",
          accepted: ["Would you please send me the file?"],
          transformationType: "register",
          instruction: "Reformulate the sentence in a more polite register."
        }
      ],
      allowMultipleAnswers: true,
      caseSensitive: false,
      accentSensitive: true
    }
  },
  interactionModes: ["typing", "qcm", "flashcards"],
  validate() {
    return this.content.core.items.length > 0;
  }
};

const baseInteractionData = transformationToInteractionData(transformationSet);

const scenarios: {
  name: string;
  data: TransformationInteractionData;
  input: TransformationTypingUserInput;
}[] = [
  {
    name: "success all transformations correct",
    data: baseInteractionData,
    input: {
      kind: "transformation-typing",
      attempts: [
        {
          itemId: "tense-simple-present-to-past",
          value: "I walked to school."
        },
        {
          itemId: "gender-number-french-adjective",
          value: "des étudiantes sérieuses"
        },
        {
          itemId: "register-informal-to-formal",
          value: "Could you please send me the file?"
        }
      ]
    }
  },
  {
    name: "partial some transformations correct",
    data: baseInteractionData,
    input: {
      kind: "transformation-typing",
      attempts: [
        {
          itemId: "tense-simple-present-to-past",
          value: "I walked to school."
        },
        {
          itemId: "gender-number-french-adjective",
          value: "un étudiant sérieux"
        },
        {
          itemId: "register-informal-to-formal",
          value: "Send the file."
        }
      ]
    }
  },
  {
    name: "failed no transformations correct",
    data: baseInteractionData,
    input: {
      kind: "transformation-typing",
      attempts: [
        {
          itemId: "tense-simple-present-to-past",
          value: "I walk to school."
        },
        {
          itemId: "gender-number-french-adjective",
          value: "un étudiant sérieux"
        },
        {
          itemId: "register-informal-to-formal",
          value: "File now."
        }
      ]
    }
  },
  {
    name: "accepted variant from model consumed",
    data: baseInteractionData,
    input: {
      kind: "transformation-typing",
      attempts: [
        {
          itemId: "tense-simple-present-to-past",
          value: "I walked to school."
        },
        {
          itemId: "gender-number-french-adjective",
          value: "des étudiantes sérieuses"
        },
        {
          itemId: "register-informal-to-formal",
          value: "Would you please send me the file?"
        }
      ]
    }
  }
];

const scenarioResults = scenarios.map((scenario) => {
  const result = evaluateTransformationTyping(scenario.data, scenario.input);

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
      interactionData: baseInteractionData,
      scenarioResults
    },
    null,
    2
  )
);
