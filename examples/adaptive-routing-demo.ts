import { evaluateAdaptiveRouting } from "../packages/core/routing/index.js";
import type { BHEObject, BHEResult, HasAdaptiveRouting } from "../packages/core/types/index.js";

const personalityAdjectivesQuiz: BHEObject & HasAdaptiveRouting = {
  type: "quiz",
  metadata: {
    id: "personality-adjectives-quiz",
    title: "Personality Adjectives Quiz",
    language: "en",
    level: "A2",
    tags: ["vocabulary", "personality", "adjectives"]
  },
  adaptiveRouting: {
    routes: [
      {
        id: "option-1-route",
        label: "0-4 points",
        targetObjectId: "personality-adjectives-option-1",
        conditions: [
          { field: "score", operator: "greaterThanOrEquals", value: 0 },
          { field: "score", operator: "lessThanOrEquals", value: 4 }
        ],
        conditionMode: "all"
      },
      {
        id: "option-2-route",
        label: "5-8 points",
        targetObjectId: "personality-adjectives-option-2",
        conditions: [
          { field: "score", operator: "greaterThanOrEquals", value: 5 },
          { field: "score", operator: "lessThanOrEquals", value: 8 }
        ],
        conditionMode: "all"
      },
      {
        id: "option-3-route",
        label: "9-12 points",
        targetObjectId: "personality-adjectives-option-3",
        conditions: [
          { field: "score", operator: "greaterThanOrEquals", value: 9 },
          { field: "score", operator: "lessThanOrEquals", value: 12 }
        ],
        conditionMode: "all"
      },
      {
        id: "option-4-route",
        label: "13-16 points",
        targetObjectId: "personality-adjectives-option-4",
        conditions: [
          { field: "score", operator: "greaterThanOrEquals", value: 13 },
          { field: "score", operator: "lessThanOrEquals", value: 16 }
        ],
        conditionMode: "all"
      }
    ]
  },
  validate() {
    return true;
  }
};

const simulatedResult: BHEResult = {
  objectId: personalityAdjectivesQuiz.metadata.id,
  status: "completed",
  score: 11,
  maxScore: 16
};

const nextTargetObjectId = evaluateAdaptiveRouting(
  simulatedResult,
  personalityAdjectivesQuiz.adaptiveRouting
);

console.log({
  sourceObjectId: personalityAdjectivesQuiz.metadata.id,
  score: simulatedResult.score,
  maxScore: simulatedResult.maxScore,
  nextTargetObjectId
});
