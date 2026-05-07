import type { InferenceSet } from "../packages/core/types/index.js";

const spanishIntercomprehensionInference: InferenceSet = {
  kind: "pedagogical-object",
  type: "inference-set",
  pedagogicalFamily: "interpretive",
  pedagogicalType: "inference",
  metadata: {
    id: "spanish-intercomprehension-inference",
    title: "Inferir el sentido por contexto",
    language: "es",
    level: "A2",
    tags: ["intercomprehension", "spanish", "inference", "context"]
  },
  learningGoal: {
    domain: "Intercomprehension",
    skill: "lexical inference",
    topic: "inferring meaning from context",
    cefr: "A2"
  },
  content: {
    core: {
      context:
        "Aunque la palabra desconocida parecia dificil, el estudiante pudo comprenderla gracias al contexto y a las palabras transparentes.",
      evidence: [
        {
          id: "evidence-desconocida",
          label: "desconocida",
          sourceRef: "context",
          start: 19,
          end: 31,
          kind: "unknown-word",
          metadata: {
            clue: "des- prefix and context of difficulty"
          }
        },
        {
          id: "evidence-comprenderla",
          label: "comprenderla",
          sourceRef: "context",
          start: 72,
          end: 84,
          kind: "transparent-word",
          metadata: {
            relatedTo: ["comprendre", "comprehend"]
          }
        },
        {
          id: "evidence-contexto",
          label: "contexto",
          sourceRef: "context",
          start: 96,
          end: 104,
          kind: "transparent-word",
          metadata: {
            relatedTo: ["contexte", "context"]
          }
        }
      ],
      prompts: [
        {
          id: "infer-desconocida",
          question: "What can you infer about the word 'desconocida'?",
          expectedInference: "It probably means unknown or unfamiliar.",
          acceptedInferences: [
            "unknown",
            "unfamiliar",
            "not known",
            "a word the student did not know"
          ],
          acceptedJustifications: [
            "The text says the word was difficult but the student understood it thanks to context.",
            "The prefix des- can suggest negation, and conocida is related to known."
          ],
          evidenceIds: ["evidence-desconocida", "evidence-comprenderla", "evidence-contexto"],
          hint: "Use the words around it: dificil, comprenderla, contexto.",
          feedback:
            "desconocida can be inferred as unknown or unfamiliar from the sentence context.",
          metadata: {
            inferenceType: "lexical"
          }
        }
      ],
      allowMultipleInferences: true,
      requireJustification: true,
      confidenceScale: true
    },
    support: {
      hints: [
        {
          id: "hint-context-clues",
          type: "hint",
          value: "Look at transparent words and the relation between difficulty and understanding."
        }
      ]
    }
  },
  interactionModes: ["qcm", "typing", "flashcards"],
  validate() {
    const evidenceIds = new Set(
      this.content.core.evidence?.map((evidence) => evidence.id) ?? []
    );

    return this.content.core.prompts.every(
      (prompt) =>
        prompt.evidenceIds === undefined ||
        prompt.evidenceIds.every((evidenceId) => evidenceIds.has(evidenceId))
    );
  }
};

const prompts = spanishIntercomprehensionInference.content.core.prompts.map((prompt) => ({
  question: prompt.question,
  expectedInference: prompt.expectedInference,
  acceptedJustifications: prompt.acceptedJustifications,
  evidenceIds: prompt.evidenceIds,
  hint: prompt.hint,
  feedback: prompt.feedback
}));

console.log({
  context: spanishIntercomprehensionInference.content.core.context,
  evidence: spanishIntercomprehensionInference.content.core.evidence,
  prompts,
  interactionModes: spanishIntercomprehensionInference.interactionModes
});
