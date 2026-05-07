import type { IdentificationSet } from "../packages/core/types/index.js";

const italianTransparentWords: IdentificationSet = {
  kind: "pedagogical-object",
  type: "identification-set",
  pedagogicalFamily: "interpretive",
  pedagogicalType: "identification",
  metadata: {
    id: "italian-transparent-words",
    title: "Transparent Words in Italian",
    language: "it",
    level: "A2",
    tags: ["intercomprehension", "italian", "transparent-words", "suffixes"]
  },
  learningGoal: {
    domain: "Intercomprehension",
    skill: "lexical identification",
    topic: "transparent words and suffixes",
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
          start: 3,
          end: 16,
          type: "transparent-word",
          expected: true,
          feedback: "comunicazione is close to French communication and English communication.",
          metadata: {
            suffix: "-zione"
          }
        },
        {
          id: "target-internazionale",
          label: "internazionale",
          start: 17,
          end: 31,
          type: "transparent-word",
          expected: true,
          feedback: "internazionale is highly transparent across Romance languages and English.",
          metadata: {
            suffix: "-ale"
          }
        },
        {
          id: "target-pronuncia",
          label: "pronuncia",
          start: 59,
          end: 68,
          type: "transparent-word",
          expected: true,
          feedback: "pronuncia helps connect pronunciation / prononciation / pronuncia.",
          metadata: {
            lexicalFamily: "pronunciation"
          }
        },
        {
          id: "target-formazione",
          label: "formazione",
          start: 78,
          end: 88,
          type: "suffix",
          expected: true,
          feedback: "The suffix -zione often corresponds to -tion in French and English.",
          metadata: {
            suffix: "-zione"
          }
        }
      ],
      selectionMode: "multiple",
      allowPartialMatch: true
    },
    support: {
      hints: [
        {
          id: "hint-zione",
          type: "hint",
          value: "Look for Italian words ending in -zione: they often map to -tion."
        }
      ]
    }
  },
  interactionModes: ["qcm", "typing", "drag-drop"],
  validate() {
    const contextLength = this.content.core.context.length;
    return this.content.core.targets.every(
      (target) =>
        target.start === undefined ||
        target.end === undefined ||
        (target.start >= 0 && target.end <= contextLength && target.start < target.end)
    );
  }
};

const expectedTargets = italianTransparentWords.content.core.targets
  .filter((target) => target.expected)
  .map((target) => ({
    label: target.label,
    type: target.type,
    start: target.start,
    end: target.end
  }));

console.log({
  context: italianTransparentWords.content.core.context,
  expectedTargets,
  interactionModes: italianTransparentWords.interactionModes
});
