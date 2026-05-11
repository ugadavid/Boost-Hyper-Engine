import type {
  ClassificationSet,
  ContextualTypingUserInput,
  GapFillSet,
  QcmUserInput
} from "../packages/core/types/index.js";
import {
  evaluateClassificationQcm,
  evaluateGapFillTyping
} from "../packages/core/evaluators/index.js";
import { mapBHEResultToFeedback } from "../packages/core/feedback/index.js";
import { classificationToQcmData } from "../packages/renderer/adapters/classificationToQcmAdapter.js";
import { gapFillToContextualTypingData } from "../packages/renderer/adapters/gapFillToContextualTypingAdapter.js";

const classificationSet: ClassificationSet = {
  kind: "pedagogical-object",
  pedagogicalFamily: "structural",
  pedagogicalType: "classification",
  interactionModes: ["qcm"],
  metadata: {
    id: "feedback-classification-qcm",
    title: "Feedback Classification QCM",
    language: "fr",
    createdAt: "2026-05-11T00:00:00.000Z"
  },
  learningGoal: {
    domain: "languages",
    skill: "grammar",
    topic: "gender"
  },
  content: {
    core: {
      categories: [
        {
          id: "masculine",
          label: "Masculine"
        },
        {
          id: "feminine",
          label: "Feminine"
        }
      ],
      items: [
        {
          id: "la-maison",
          label: "la maison",
          categoryId: "feminine"
        }
      ]
    }
  },
  validate() {
    return true;
  }
};

const gapFillSet: GapFillSet = {
  kind: "pedagogical-object",
  pedagogicalFamily: "productive",
  pedagogicalType: "gap-fill",
  interactionModes: ["typing"],
  metadata: {
    id: "feedback-gap-fill",
    title: "Feedback Gap Fill",
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
          start: 15,
          end: 18,
          expected: ["salad", "soup"]
        },
        {
          id: "blank-drink",
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

const qcmInput: QcmUserInput = {
  interactionMode: "qcm",
  selectedChoiceId: "feminine"
};

const typingInput: ContextualTypingUserInput = {
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
  ]
};

const qcmResult = evaluateClassificationQcm(
  classificationToQcmData(classificationSet),
  qcmInput
);
const gapFillResult = evaluateGapFillTyping(
  gapFillToContextualTypingData(gapFillSet),
  typingInput
);

const qcmFeedback = mapBHEResultToFeedback(qcmResult);
const gapFillFeedback = mapBHEResultToFeedback(gapFillResult);

console.log(JSON.stringify({ qcmFeedback, gapFillFeedback }, null, 2));
