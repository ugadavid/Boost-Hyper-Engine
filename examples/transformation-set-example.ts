import type { TransformationSet } from "../packages/core/types/index.js";

const personalityAdjectivesFeminine: TransformationSet = {
  kind: "pedagogical-object",
  type: "transformation-set",
  pedagogicalFamily: "productive",
  pedagogicalType: "transformation",
  metadata: {
    id: "personality-adjectives-feminine",
    title: "Adjectifs de personnalite au feminin",
    language: "fr",
    level: "A1",
    tags: ["grammar", "adjectives", "gender", "personality"]
  },
  learningGoal: {
    domain: "French",
    skill: "grammar",
    topic: "feminine adjective forms",
    cefr: "A1"
  },
  content: {
    core: {
      items: [
        {
          id: "sportif-sportive",
          source: "sportif",
          expected: "sportive",
          instruction: "Transforme l'adjectif au feminin.",
          transformationType: "feminine",
          hint: "Les adjectifs en -if deviennent souvent -ive.",
          feedback: "sportif -> sportive"
        },
        {
          id: "curieux-curieuse",
          source: "curieux",
          expected: "curieuse",
          instruction: "Transforme l'adjectif au feminin.",
          transformationType: "feminine",
          hint: "Les adjectifs en -eux deviennent souvent -euse.",
          feedback: "curieux -> curieuse"
        },
        {
          id: "gentil-gentille",
          source: "gentil",
          expected: "gentille",
          instruction: "Transforme l'adjectif au feminin.",
          transformationType: "feminine",
          hint: "Observe le doublement de la consonne finale.",
          feedback: "gentil -> gentille"
        }
      ],
      allowMultipleAnswers: false,
      caseSensitive: false,
      accentSensitive: true
    },
    support: {
      hints: [
        {
          id: "hint-feminine-patterns",
          type: "hint",
          value: "Cherche le modele de transformation a la fin de l'adjectif."
        }
      ],
      examples: [
        {
          id: "example-actif",
          type: "example",
          value: "actif -> active"
        }
      ]
    }
  },
  interactionModes: ["typing", "qcm", "flashcards"],
  validate() {
    return this.content.core.items.every(
      (item) => item.source.length > 0 && item.expected.length > 0
    );
  }
};

const interactionModeExamples = personalityAdjectivesFeminine.interactionModes.map(
  (interactionMode) => ({
    interactionMode,
    transformationSetId: personalityAdjectivesFeminine.metadata.id
  })
);

console.log({
  transformationSet: personalityAdjectivesFeminine.metadata.title,
  valid: personalityAdjectivesFeminine.validate(),
  interactionModeExamples
});
