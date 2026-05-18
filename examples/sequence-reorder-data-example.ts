import { sequenceToReorderData } from "../packages/core/adapters/index.js";
import type { SequenceSet } from "../packages/core/types/index.js";

const morningRoutineSequence: SequenceSet = {
  kind: "pedagogical-object",
  type: "sequence-set",
  pedagogicalFamily: "structural",
  pedagogicalType: "sequence",
  metadata: {
    id: "morning-routine-sequence",
    title: "Morning Routine Sequence",
    language: "en",
    level: "A1",
    tags: ["routine", "sequence", "daily-life"]
  },
  learningGoal: {
    domain: "English",
    skill: "chronology",
    topic: "daily routine",
    cefr: "A1"
  },
  content: {
    core: {
      items: [
        {
          id: "step-wake-up",
          label: "I wake up.",
          position: 1
        },
        {
          id: "step-brush-teeth",
          label: "I brush my teeth.",
          position: 2
        },
        {
          id: "step-eat-breakfast",
          label: "I eat breakfast.",
          position: 3
        },
        {
          id: "step-go-to-school",
          label: "I go to school.",
          position: 4
        }
      ],
      allowPartialOrder: true,
      shuffle: false
    }
  },
  interactionModes: ["drag-drop", "qcm", "typing"],
  validate() {
    const positions = this.content.core.items.map((item) => item.position);
    return new Set(positions).size === positions.length;
  }
};

const reorderData = sequenceToReorderData(morningRoutineSequence);

console.log(
  JSON.stringify(
    {
      sequenceSet: morningRoutineSequence.metadata.title,
      reorderData
    },
    null,
    2
  )
);
