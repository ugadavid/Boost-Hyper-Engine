import { identificationToSelectionData } from "../packages/core/adapters/index.js";
import { evaluateIdentificationSelection } from "../packages/core/evaluators/index.js";
import type {
  IdentificationSelectionUserInput,
  IdentificationSet
} from "../packages/core/types/index.js";

const italianTransparentWords: IdentificationSet = {
  kind: "pedagogical-object",
  type: "identification-set",
  pedagogicalFamily: "interpretive",
  pedagogicalType: "identification",
  metadata: {
    id: "identification-selection-demo",
    title: "Transparent Words in Italian",
    language: "it",
    level: "A2",
    tags: ["intercomprehension", "italian", "transparent-words"]
  },
  learningGoal: {
    domain: "Intercomprehension",
    skill: "lexical identification",
    topic: "transparent words",
    cefr: "A2"
  },
  content: {
    core: {
      context:
        "La comunicazione internazionale richiede attenzione alla pronuncia e alla formazione delle parole.",
      targets: [
        {
          id: "target-comunicazione",
          label: "comunicazione",
          type: "transparent-word",
          expected: true,
          feedback: "comunicazione is close to communication."
        },
        {
          id: "target-internazionale",
          label: "internazionale",
          type: "transparent-word",
          expected: true,
          feedback: "internazionale is highly transparent."
        },
        {
          id: "target-pronuncia",
          label: "pronuncia",
          type: "transparent-word",
          expected: true,
          feedback: "pronuncia connects to pronunciation."
        },
        {
          id: "target-alla",
          label: "alla",
          type: "function-word",
          expected: false,
          feedback: "alla is not the intended transparent lexical target here."
        }
      ],
      selectionMode: "multiple",
      allowPartialMatch: true
    }
  },
  interactionModes: ["qcm", "typing", "drag-drop"],
  validate() {
    return this.content.core.targets.length > 0;
  }
};

const selectionData = identificationToSelectionData(italianTransparentWords);

const scenarios: { name: string; input: IdentificationSelectionUserInput }[] = [
  {
    name: "success all expected no extra",
    input: {
      kind: "identification-selection",
      selectedTargetIds: [
        "target-comunicazione",
        "target-internazionale",
        "target-pronuncia"
      ]
    }
  },
  {
    name: "partial some expected",
    input: {
      kind: "identification-selection",
      selectedTargetIds: ["target-comunicazione"]
    }
  },
  {
    name: "partial with extra",
    input: {
      kind: "identification-selection",
      selectedTargetIds: [
        "target-comunicazione",
        "target-internazionale",
        "target-pronuncia",
        "target-alla"
      ]
    }
  },
  {
    name: "extra-only",
    input: {
      kind: "identification-selection",
      selectedTargetIds: ["target-alla"]
    }
  },
  {
    name: "failed no expected",
    input: {
      kind: "identification-selection",
      selectedTargetIds: []
    }
  }
];

const scenarioResults = scenarios.map((scenario) => {
  const result = evaluateIdentificationSelection(selectionData, scenario.input);

  return {
    scenario: scenario.name,
    status: result.status,
    score: result.score,
    maxScore: result.maxScore,
    details: result.details
  };
});

console.log(
  JSON.stringify(
    {
      context: selectionData.context,
      selectionMode: selectionData.selectionMode,
      targets: selectionData.targets,
      scenarioResults
    },
    null,
    2
  )
);
