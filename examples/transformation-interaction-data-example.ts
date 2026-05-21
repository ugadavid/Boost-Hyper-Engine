import { transformationToInteractionData } from "../packages/core/adapters/index.js";
import type { TransformationSet } from "../packages/core/types/index.js";

const transformationSet: TransformationSet = {
  kind: "pedagogical-object",
  type: "transformation-set",
  pedagogicalFamily: "productive",
  pedagogicalType: "transformation",
  metadata: {
    id: "transformation-interaction-data-demo",
    title: "Transformation Interaction Data Demo",
    language: "en",
    level: "A2",
    tags: ["transformation", "productive", "grammar"]
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
          instruction: "Transform the sentence into the simple past.",
          hint: "Look at the verb.",
          feedback: "The verb 'walk' becomes 'walked' in the simple past."
        },
        {
          id: "gender-number-french-adjective",
          source: "un étudiant sérieux",
          expected: "des étudiantes sérieuses",
          transformationType: "gender-number",
          instruction: "Transform the phrase into feminine plural.",
          hint: "Both the noun and the adjective must agree.",
          feedback: "The noun and adjective both change in feminine plural."
        },
        {
          id: "register-informal-to-formal",
          source: "Can you send me the file?",
          expected: "Could you please send me the file?",
          accepted: ["Would you please send me the file?"],
          transformationType: "register",
          instruction: "Reformulate the sentence in a more polite register.",
          hint: "Add polite modal wording.",
          feedback: "The formal version softens the request."
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

const transformationInteractionData =
  transformationToInteractionData(transformationSet);

console.log(
  JSON.stringify(
    {
      transformationSet: transformationSet.metadata.title,
      interactionData: transformationInteractionData
    },
    null,
    2
  )
);
