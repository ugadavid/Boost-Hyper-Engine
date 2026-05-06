import type { AssociationSet } from "../packages/core/types/index.js";

const personalityAdjectivesAssociations: AssociationSet = {
  id: "personality-adjectives-associations",
  title: "Personality Adjectives",
  entries: [
    { id: "word-kind", label: "kind", kind: "word" },
    { id: "definition-kind", label: "friendly and helpful", kind: "definition" },
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
      id: "shy-definition",
      entryIds: ["word-shy", "definition-shy"],
      feedback: "Shy describes someone nervous around other people."
    },
    {
      id: "lazy-definition",
      entryIds: ["word-lazy", "definition-lazy"],
      feedback: "Lazy describes someone who does not want to work or move."
    }
  ],
  interactionModes: ["drag-drop", "memory", "flashcards"]
};

const interactionModeExamples = personalityAdjectivesAssociations.interactionModes.map(
  (interactionMode) => ({
    interactionMode,
    associationSetId: personalityAdjectivesAssociations.id
  })
);

console.log({
  associationSet: personalityAdjectivesAssociations.title,
  interactionModeExamples
});
