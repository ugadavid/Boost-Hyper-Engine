import type {
  AdaptiveRouting,
  ContextualTypingUserInput,
  GapFillSet,
  PedagogicalObject
} from "../packages/core/types/index.js";
import { evaluateGapFillTyping } from "../packages/core/evaluators/index.js";
import { evaluateAdaptiveRouting } from "../packages/core/routing/index.js";
import { gapFillToContextualTypingData } from "../packages/renderer/adapters/gapFillToContextualTypingAdapter.js";

const initialStep: GapFillSet = {
  kind: "pedagogical-object",
  pedagogicalFamily: "productive",
  pedagogicalType: "gap-fill",
  interactionModes: ["typing"],
  metadata: {
    id: "beci-personality-gap-fill",
    title: "Beci Personality Adjectives Gap Fill",
    language: "en",
    level: "A2"
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
          start: 2,
          end: 5,
          expected: "kind"
        },
        {
          id: "blank-confident",
          start: 29,
          end: 32,
          expected: "confident"
        },
        {
          id: "blank-shy",
          start: 71,
          end: 74,
          expected: "shy"
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

const nextSteps: PedagogicalObject[] = [
  {
    kind: "pedagogical-object",
    pedagogicalFamily: "productive",
    pedagogicalType: "gap-fill",
    interactionModes: ["typing"],
    metadata: {
      id: "beci-personality-option-1-remediation",
      title: "Remediation: review personality adjectives"
    },
    learningGoal: {
      domain: "English",
      skill: "vocabulary",
      topic: "personality adjectives remediation"
    },
    content: {
      core: {
        note: "Return to guided review and hints."
      }
    },
    validate() {
      return true;
    }
  },
  {
    kind: "pedagogical-object",
    pedagogicalFamily: "productive",
    pedagogicalType: "gap-fill",
    interactionModes: ["typing"],
    metadata: {
      id: "beci-personality-option-2-practice",
      title: "Practice: complete another personality activity"
    },
    learningGoal: {
      domain: "English",
      skill: "vocabulary",
      topic: "personality adjectives practice"
    },
    content: {
      core: {
        note: "Offer another practice activity with similar items."
      }
    },
    validate() {
      return true;
    }
  },
  {
    kind: "pedagogical-object",
    pedagogicalFamily: "productive",
    pedagogicalType: "gap-fill",
    interactionModes: ["typing"],
    metadata: {
      id: "beci-personality-option-3-advanced",
      title: "Advanced: use adjectives in context"
    },
    learningGoal: {
      domain: "English",
      skill: "production",
      topic: "personality adjectives in context"
    },
    content: {
      core: {
        note: "Move to a more open production task."
      }
    },
    validate() {
      return true;
    }
  }
];

const adaptiveRouting: AdaptiveRouting = {
  routes: [
    {
      id: "beci-remediation-route",
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

const missingTargetRouting: AdaptiveRouting = {
  routes: [
    {
      id: "beci-missing-target-route",
      targetObjectId: "beci-personality-option-4-missing",
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

const interactionData = gapFillToContextualTypingData(initialStep);

const simulatedInputs: Array<{
  id: string;
  input: ContextualTypingUserInput;
  routing?: AdaptiveRouting;
}> = [
  {
    id: "failed",
    input: {
      interactionMode: "typing",
      typedAnswers: [
        { blankId: "blank-kind", value: "angry" },
        { blankId: "blank-confident", value: "quiet" },
        { blankId: "blank-shy", value: "lazy" }
      ]
    }
  },
  {
    id: "partial",
    input: {
      interactionMode: "typing",
      typedAnswers: [
        { blankId: "blank-kind", value: "kind" },
        { blankId: "blank-confident", value: "sure" },
        { blankId: "blank-shy", value: "shy" }
      ]
    }
  },
  {
    id: "success",
    input: {
      interactionMode: "typing",
      typedAnswers: [
        { blankId: "blank-kind", value: "kind" },
        { blankId: "blank-confident", value: "confident" },
        { blankId: "blank-shy", value: "shy" }
      ]
    }
  },
  {
    id: "missing-target",
    routing: missingTargetRouting,
    input: {
      interactionMode: "typing",
      typedAnswers: [
        { blankId: "blank-kind", value: "kind" },
        { blankId: "blank-confident", value: "confident" },
        { blankId: "blank-shy", value: "shy" }
      ]
    }
  }
];

function findNextStep(targetObjectId: string | undefined): PedagogicalObject | undefined {
  if (!targetObjectId) return undefined;
  return nextSteps.find((step) => step.metadata.id === targetObjectId);
}

const launchedSteps = simulatedInputs.map((simulation) => {
  const result = evaluateGapFillTyping(interactionData, simulation.input);
  const targetObjectId = evaluateAdaptiveRouting(
    result,
    simulation.routing ?? adaptiveRouting
  );
  const nextStep = findNextStep(targetObjectId);

  return {
    simulation: simulation.id,
    status: result.status,
    targetObjectId,
    message: nextStep ? undefined : `Missing target: ${targetObjectId}`,
    selectedNextStepTitle: nextStep?.metadata.title,
    selectedNextStepType: nextStep?.pedagogicalType,
    selectedNextStepFamily: nextStep?.pedagogicalFamily
  };
});

console.log(JSON.stringify(launchedSteps, null, 2));
