import { memorizationToTypingRecallData } from "../packages/core/adapters/index.js";
import { evaluateMemorizationTypingRecall } from "../packages/core/evaluators/index.js";
import type {
  MemorizationSet,
  MemorizationTypingRecallUserInput
} from "../packages/core/types/index.js";

const memorizationSet: MemorizationSet = {
  kind: "pedagogical-object",
  type: "memorization-set",
  pedagogicalFamily: "retentive",
  pedagogicalType: "memorization",
  metadata: {
    id: "memorization-active-recall-demo",
    title: "Personality Adjectives Active Recall",
    language: "en",
    level: "A2",
    tags: ["memorization", "active-recall", "vocabulary"]
  },
  learningGoal: {
    domain: "English",
    skill: "lexical recall",
    topic: "personality adjectives",
    cefr: "A2"
  },
  content: {
    core: {
      recallGoal: "Recall common personality adjectives from meaning cues.",
      items: [
        {
          id: "memo-generous",
          cue: "someone who likes giving and helping",
          target: "generous"
        },
        {
          id: "memo-reliable",
          cue: "someone you can trust",
          target: "reliable",
          accepted: ["dependable"]
        },
        {
          id: "memo-curious",
          cue: "someone who wants to learn and know more",
          target: "curious",
          unit: {
            id: "unit-curious-cue",
            kind: "text",
            text: "wants to learn and know more",
            label: "curious cue"
          }
        }
      ]
    }
  },
  interactionModes: ["typing", "flashcards"],
  validate() {
    return this.content.core.items.length > 0;
  }
};

const recallData = memorizationToTypingRecallData(memorizationSet);

const scenarios: { name: string; input: MemorizationTypingRecallUserInput }[] = [
  {
    name: "success all recalled",
    input: {
      kind: "memorization-typing-recall",
      attempts: [
        { itemId: "memo-generous", value: "generous" },
        { itemId: "memo-reliable", value: "reliable" },
        { itemId: "memo-curious", value: "curious" }
      ]
    }
  },
  {
    name: "partial one recalled",
    input: {
      kind: "memorization-typing-recall",
      attempts: [
        { itemId: "memo-generous", value: "generous" },
        { itemId: "memo-reliable", value: "kind" },
        { itemId: "memo-curious", value: "interested" }
      ]
    }
  },
  {
    name: "failed none recalled",
    input: {
      kind: "memorization-typing-recall",
      attempts: [
        { itemId: "memo-generous", value: "selfish" },
        { itemId: "memo-reliable", value: "angry" },
        { itemId: "memo-curious", value: "quiet" }
      ]
    }
  },
  {
    name: "accepted variant recalled",
    input: {
      kind: "memorization-typing-recall",
      attempts: [
        { itemId: "memo-generous", value: "generous" },
        { itemId: "memo-reliable", value: "dependable" },
        { itemId: "memo-curious", value: "curious" }
      ]
    }
  },
  {
    name: "blank answer visible",
    input: {
      kind: "memorization-typing-recall",
      attempts: [
        { itemId: "memo-generous", value: "" },
        { itemId: "memo-reliable", value: " " },
        { itemId: "memo-curious", value: "curious" }
      ]
    }
  }
];

const scenarioResults = scenarios.map((scenario) => {
  const result = evaluateMemorizationTypingRecall(recallData, scenario.input);

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
      recallGoal: recallData.recallGoal,
      recallData,
      scenarioResults
    },
    null,
    2
  )
);
