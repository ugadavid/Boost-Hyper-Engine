import { registerRenderer, findRenderer } from "../packages/renderer/registry/rendererRegistry.js";
import { associationFlashcardsHtmlRenderer } from "../packages/renderer/renderers/associationFlashcardsHtmlRenderer.js";
import type { AssociationSet } from "../packages/core/types/index.js";

registerRenderer(associationFlashcardsHtmlRenderer);

const personalityAdjectivesAssociations: AssociationSet = {
  kind: "pedagogical-object",
  type: "association-set",
  pedagogicalFamily: "structural",
  pedagogicalType: "association",
  metadata: {
    id: "personality-adjectives-flashcards",
    title: "Personality Adjectives Flashcards",
    language: "en",
    level: "A2",
    tags: ["vocabulary", "personality", "flashcards"]
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
        { id: "word-shy", label: "shy", kind: "word" },
        { id: "definition-shy", label: "nervous around other people", kind: "definition" },
        { id: "word-confident", label: "confident", kind: "word" },
        { id: "definition-confident", label: "sure about your abilities", kind: "definition" }
      ],
      associations: [
        {
          id: "kind-definition",
          entryIds: ["word-kind", "definition-kind"],
          feedback: "Kind describes someone friendly and helpful."
        },
        {
          id: "shy-definition",
          entryIds: ["word-shy", "definition-shy"],
          feedback: "Shy describes someone nervous around other people."
        },
        {
          id: "confident-definition",
          entryIds: ["word-confident", "definition-confident"],
          feedback: "Confident describes someone sure about their abilities."
        }
      ]
    }
  },
  interactionModes: ["drag-drop", "memory", "flashcards"],
  validate() {
    return true;
  }
};

const renderer = findRenderer(personalityAdjectivesAssociations, "flashcards");
const html = renderer?.render(personalityAdjectivesAssociations, "flashcards") ?? "";

console.log(html);
