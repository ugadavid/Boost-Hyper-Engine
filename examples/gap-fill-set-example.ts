import type { GapFillSet } from "../packages/core/types/index.js";

const englishRestaurantGapFill: GapFillSet = {
  kind: "pedagogical-object",
  type: "gap-fill-set",
  pedagogicalFamily: "productive",
  pedagogicalType: "gap-fill",
  metadata: {
    id: "english-restaurant-gap-fill",
    title: "Restaurant Dialogue Gap Fill",
    language: "en",
    level: "A2",
    tags: ["dialogue", "restaurant", "gap-fill"]
  },
  learningGoal: {
    domain: "English",
    skill: "interaction",
    topic: "ordering food",
    cefr: "A2"
  },
  content: {
    core: {
      context: "Good evening. I would like a ___ and a glass of ___.",
      blanks: [
        {
          id: "blank-food",
          label: "food item",
          start: 34,
          end: 37,
          expected: ["salad", "soup"],
          hint: "Choose something you can order as food.",
          feedback: "A food item such as salad or soup fits here.",
          metadata: {
            category: "food"
          }
        },
        {
          id: "blank-drink",
          label: "drink",
          start: 53,
          end: 56,
          expected: "water",
          hint: "Choose a common drink.",
          feedback: "A glass of water is a natural restaurant phrase.",
          metadata: {
            category: "drink"
          }
        }
      ],
      allowMultipleAnswers: true,
      caseSensitive: false,
      accentSensitive: false
    },
    support: {
      hints: [
        {
          id: "hint-restaurant-context",
          type: "hint",
          value: "Use the restaurant context to infer whether the blank needs food or a drink."
        }
      ]
    }
  },
  interactionModes: ["typing", "qcm", "drag-drop"],
  validate() {
    return this.content.core.blanks.every((blank) =>
      Array.isArray(blank.expected) ? blank.expected.length > 0 : blank.expected.length > 0
    );
  }
};

const expectedBlanks = englishRestaurantGapFill.content.core.blanks.map((blank) => ({
  id: blank.id,
  label: blank.label,
  expected: blank.expected,
  hint: blank.hint,
  feedback: blank.feedback
}));

console.log({
  context: englishRestaurantGapFill.content.core.context,
  expectedBlanks,
  interactionModes: englishRestaurantGapFill.interactionModes
});
