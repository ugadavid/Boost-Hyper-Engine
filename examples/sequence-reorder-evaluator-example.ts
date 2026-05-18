import { sequenceToReorderData } from "../packages/core/adapters/index.js";
import { evaluateSequenceReorder } from "../packages/core/evaluators/index.js";
import type { SequenceSet, SequenceReorderUserInput } from "../packages/core/types/index.js";

const dialogueSequence: SequenceSet = {
  kind: "pedagogical-object",
  type: "sequence-set",
  pedagogicalFamily: "structural",
  pedagogicalType: "sequence",
  metadata: {
    id: "sequence-reorder-evaluator-demo",
    title: "Restaurant Dialogue Sequence",
    language: "en",
    level: "A2",
    tags: ["dialogue", "sequence", "restaurant"]
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
          id: "greeting",
          label: "Good evening. Do you have a reservation?",
          position: 1
        },
        {
          id: "reservation",
          label: "Yes, a table for two under Martin.",
          position: 2
        },
        {
          id: "order",
          label: "I would like the vegetable soup, please.",
          position: 3
        },
        {
          id: "drink",
          label: "Of course. Anything to drink?",
          position: 4
        }
      ],
      allowPartialOrder: true,
      shuffle: true
    }
  },
  interactionModes: ["drag-drop", "qcm", "typing"],
  validate() {
    const positions = this.content.core.items.map((item) => item.position);
    return new Set(positions).size === positions.length;
  }
};

const reorderData = sequenceToReorderData(dialogueSequence);

const scenarios: { name: string; orderedItemIds: string[] }[] = [
  {
    name: "success",
    orderedItemIds: ["greeting", "reservation", "order", "drink"]
  },
  {
    name: "failed",
    orderedItemIds: ["drink", "order", "reservation", "greeting"]
  },
  {
    name: "partial exact positions",
    orderedItemIds: ["greeting", "order", "reservation", "drink"]
  },
  {
    name: "adjacency-interesting",
    orderedItemIds: ["drink", "greeting", "reservation", "order"]
  }
];

const scenarioResults = scenarios.map((scenario) => {
  const input: SequenceReorderUserInput = {
    kind: "sequence-reorder",
    timestamp: new Date().toISOString(),
    orderedItemIds: scenario.orderedItemIds
  };
  const result = evaluateSequenceReorder(reorderData, input);

  return {
    scenario: scenario.name,
    status: result.status,
    score: result.score,
    maxScore: result.maxScore,
    expectedOrder: result.details?.expectedOrder,
    actualOrder: result.details?.actualOrder,
    exactPositionResults: result.details?.exactPositionResults,
    adjacentPairResults: result.details?.adjacentPairResults
  };
});

console.log(
  JSON.stringify(
    {
      sequenceSet: dialogueSequence.metadata.title,
      scenarioResults
    },
    null,
    2
  )
);
