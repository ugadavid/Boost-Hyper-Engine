import { evaluateAdaptiveRouting } from "../packages/core/routing/index.js";
import type {
  AssociationSet,
  BHEResult,
  HasAdaptiveRouting
} from "../packages/core/types/index.js";

const personalityAdjectivesSet: AssociationSet & HasAdaptiveRouting = {
  kind: "pedagogical-object",
  type: "association-set",
  pedagogicalFamily: "structural",
  pedagogicalType: "association",
  metadata: {
    id: "personality-adjectives",
    title: "Personality Adjectives",
    language: "en",
    level: "A2",
    tags: ["boost-english", "beci", "personality", "adjectives"]
  },
  learningGoal: {
    domain: "English",
    skill: "vocabulary",
    topic: "personality adjectives",
    cefr: "A2"
  },
  content: {
    core: {
      entries: [
        { id: "word-kind", label: "kind", kind: "word" },
        { id: "definition-kind", label: "friendly and helpful", kind: "definition" },
        { id: "word-confident", label: "confident", kind: "word" },
        { id: "definition-confident", label: "sure about your abilities", kind: "definition" },
        { id: "word-shy", label: "shy", kind: "word" },
        { id: "definition-shy", label: "nervous around other people", kind: "definition" },
        { id: "word-lazy", label: "lazy", kind: "word" },
        { id: "definition-lazy", label: "not wanting to work or move", kind: "definition" }
      ],
      associations: [
        {
          id: "kind-definition",
          entryIds: ["word-kind", "definition-kind"],
          feedback: "Kind describes someone friendly and helpful."
        },
        {
          id: "confident-definition",
          entryIds: ["word-confident", "definition-confident"],
          feedback: "Confident describes someone sure about their abilities."
        },
        {
          id: "shy-definition",
          entryIds: ["word-shy", "definition-shy"],
          feedback: "Shy describes someone nervous around other people."
        },
        {
          id: "lazy-definition",
          entryIds: ["word-lazy", "definition-lazy"],
          feedback: "Lazy describes someone who does not want to work or move."
        }
      ]
    },
    support: {
      hints: [
        {
          id: "hint-context",
          type: "hint",
          value: "Match each adjective with the best personality description."
        }
      ],
      examples: [
        {
          id: "example-kind",
          type: "example",
          value: "A kind person helps others."
        }
      ]
    }
  },
  interactionModes: ["drag-drop", "memory", "flashcards"],
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
  objectId: personalityAdjectivesSet.metadata.id,
  status: "completed",
  score: 11,
  maxScore: 16
};

const nextTargetObjectId = evaluateAdaptiveRouting(
  simulatedResult,
  personalityAdjectivesSet.adaptiveRouting
);

console.log({
  pedagogicalObject: personalityAdjectivesSet.metadata.title,
  sameContentAvailableAs: personalityAdjectivesSet.interactionModes,
  score: simulatedResult.score,
  maxScore: simulatedResult.maxScore,
  nextTargetObjectId
});
