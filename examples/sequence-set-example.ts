import type { SequenceSet } from "../packages/core/types/index.js";

const restaurantDialogueSequence: SequenceSet = {
  kind: "pedagogical-object",
  type: "sequence-set",
  pedagogicalFamily: "structural",
  pedagogicalType: "sequence",
  metadata: {
    id: "restaurant-dialogue-sequence",
    title: "Ordering Food in a Restaurant",
    language: "en",
    level: "A2",
    tags: ["dialogue", "restaurant", "ordering"]
  },
  learningGoal: {
    domain: "English",
    skill: "interaction",
    topic: "restaurant dialogue",
    cefr: "A2"
  },
  content: {
    core: {
      items: [
        {
          id: "step-greeting",
          label: "Good evening. Do you have a reservation?",
          position: 1,
          feedback: "The waiter usually opens the conversation."
        },
        {
          id: "step-reservation",
          label: "Yes, a table for two under Martin.",
          position: 2,
          feedback: "The customer answers with the reservation details."
        },
        {
          id: "step-order",
          label: "I would like the vegetable soup, please.",
          position: 3,
          feedback: "The customer orders after being seated."
        },
        {
          id: "step-confirmation",
          label: "Of course. Anything to drink?",
          position: 4,
          feedback: "The waiter confirms and asks a follow-up question."
        }
      ],
      allowPartialOrder: true,
      shuffle: true
    },
    support: {
      hints: [
        {
          id: "hint-dialogue-flow",
          type: "hint",
          value: "Look for who speaks first and how each reply depends on the previous line."
        }
      ]
    }
  },
  interactionModes: ["drag-drop", "qcm", "typing"],
  validate() {
    const positions = this.content.core.items.map((item) => item.position);
    return new Set(positions).size === positions.length;
  }
};

const interactionModeExamples = restaurantDialogueSequence.interactionModes.map(
  (interactionMode) => ({
    interactionMode,
    sequenceSetId: restaurantDialogueSequence.metadata.id
  })
);

console.log({
  sequenceSet: restaurantDialogueSequence.metadata.title,
  valid: restaurantDialogueSequence.validate(),
  interactionModeExamples
});
