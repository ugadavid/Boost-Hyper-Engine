import type { ContextualTypingUserInput, GapFillSet } from "../packages/core/types/index.js";
import { evaluateGapFillTyping } from "../packages/core/evaluators/index.js";
import { gapFillToContextualTypingData } from "../packages/renderer/adapters/gapFillToContextualTypingAdapter.js";

const restaurantGapFill: GapFillSet = {
  kind: "pedagogical-object",
  pedagogicalFamily: "productive",
  pedagogicalType: "gap-fill",
  interactionModes: ["typing"],
  metadata: {
    id: "restaurant-gap-fill-evaluator",
    title: "Restaurant Gap Fill Evaluator",
    language: "en",
    createdAt: "2026-05-11T00:00:00.000Z"
  },
  learningGoal: {
    domain: "languages",
    skill: "vocabulary",
    topic: "restaurant"
  },
  content: {
    core: {
      context: "I would like a ___ and a glass of ___.",
      blanks: [
        {
          id: "blank-food",
          label: "food",
          start: 15,
          end: 18,
          expected: ["salad", "soup"]
        },
        {
          id: "blank-drink",
          label: "drink",
          start: 34,
          end: 37,
          expected: "water"
        }
      ],
      caseSensitive: false,
      accentSensitive: false
    }
  },
  validate() {
    return true;
  }
};

const contextualTypingData = gapFillToContextualTypingData(restaurantGapFill);

const userInput: ContextualTypingUserInput = {
  interactionMode: "typing",
  typedAnswers: [
    {
      blankId: "blank-food",
      value: "salad"
    },
    {
      blankId: "blank-drink",
      value: "juice"
    }
  ],
  timestamp: "2026-05-11T00:00:00.000Z"
};

const result = evaluateGapFillTyping(contextualTypingData, userInput);

console.log(JSON.stringify(result, null, 2));
