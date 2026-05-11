import type {
  AdaptiveRouting,
  ContextualTypingUserInput,
  GapFillSet
} from "../packages/core/types/index.js";
import { evaluateGapFillTyping } from "../packages/core/evaluators/index.js";
import { mapBHEResultToFeedback } from "../packages/core/feedback/index.js";
import { evaluateAdaptiveRouting } from "../packages/core/routing/index.js";
import { gapFillToContextualTypingData } from "../packages/renderer/adapters/gapFillToContextualTypingAdapter.js";

const beciPersonalityGapFill: GapFillSet = {
  kind: "pedagogical-object",
  pedagogicalFamily: "productive",
  pedagogicalType: "gap-fill",
  interactionModes: ["typing"],
  metadata: {
    id: "beci-personality-gap-fill",
    title: "Beci Personality Adjectives Gap Fill",
    language: "en",
    level: "A2",
    tags: ["boost-english", "beci", "personality", "adaptive-pathway"]
  },
  learningGoal: {
    domain: "English",
    skill: "vocabulary",
    topic: "personality adjectives",
    cefr: "A2"
  },
  content: {
    core: {
      context: "A ___ person helps others. A ___ person believes in their abilities. A ___ person feels nervous around people.",
      blanks: [
        {
          id: "blank-kind",
          label: "adjective 1",
          start: 2,
          end: 5,
          expected: "kind",
          hint: "This person helps others."
        },
        {
          id: "blank-confident",
          label: "adjective 2",
          start: 29,
          end: 32,
          expected: "confident",
          hint: "This person believes in their abilities."
        },
        {
          id: "blank-shy",
          label: "adjective 3",
          start: 71,
          end: 74,
          expected: "shy",
          hint: "This person feels nervous around people."
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

const adaptiveRouting: AdaptiveRouting = {
  routes: [
    {
      id: "beci-remediation-route",
      label: "No correct answer",
      targetObjectId: "beci-personality-option-1-remediation",
      conditions: [
        {
          field: "score",
          operator: "equals",
          value: 0
        }
      ]
    },
    {
      id: "beci-practice-route",
      label: "Partial result",
      targetObjectId: "beci-personality-option-2-practice",
      conditions: [
        {
          field: "status",
          operator: "equals",
          value: "partial"
        }
      ]
    },
    {
      id: "beci-advanced-route",
      label: "All answers correct",
      targetObjectId: "beci-personality-option-3-advanced",
      conditions: [
        {
          field: "status",
          operator: "equals",
          value: "success"
        }
      ]
    }
  ],
  fallbackObjectId: "beci-personality-option-1-remediation"
};

const interactionData = gapFillToContextualTypingData(beciPersonalityGapFill);

const simulatedUserInputs: Array<{
  id: string;
  label: string;
  input: ContextualTypingUserInput;
}> = [
  {
    id: "failed-simulation",
    label: "No correct answer",
    input: {
      interactionMode: "typing",
      timestamp: "2026-05-11T00:00:00.000Z",
      typedAnswers: [
        {
          blankId: "blank-kind",
          value: "angry"
        },
        {
          blankId: "blank-confident",
          value: "quiet"
        },
        {
          blankId: "blank-shy",
          value: "lazy"
        }
      ]
    }
  },
  {
    id: "partial-simulation",
    label: "Partial result",
    input: {
      interactionMode: "typing",
      timestamp: "2026-05-11T00:00:00.000Z",
      typedAnswers: [
        {
          blankId: "blank-kind",
          value: "kind"
        },
        {
          blankId: "blank-confident",
          value: "sure"
        },
        {
          blankId: "blank-shy",
          value: "shy"
        }
      ]
    }
  },
  {
    id: "success-simulation",
    label: "All answers correct",
    input: {
      interactionMode: "typing",
      timestamp: "2026-05-11T00:00:00.000Z",
      typedAnswers: [
        {
          blankId: "blank-kind",
          value: "kind"
        },
        {
          blankId: "blank-confident",
          value: "confident"
        },
        {
          blankId: "blank-shy",
          value: "shy"
        }
      ]
    }
  }
];

const simulations = simulatedUserInputs.map((simulation) => {
  const result = evaluateGapFillTyping(interactionData, simulation.input);
  const feedback = mapBHEResultToFeedback(result);
  const targetObjectId = evaluateAdaptiveRouting(result, adaptiveRouting);

  return {
    id: simulation.id,
    label: simulation.label,
    userInput: simulation.input,
    result,
    feedback,
    targetObjectId
  };
});

console.log(JSON.stringify({
  pedagogicalObject: {
    id: beciPersonalityGapFill.metadata.id,
    title: beciPersonalityGapFill.metadata.title,
    pedagogicalType: beciPersonalityGapFill.pedagogicalType,
    interactionModes: beciPersonalityGapFill.interactionModes
  },
  interactionData,
  adaptiveRouting,
  simulations
}, null, 2));
