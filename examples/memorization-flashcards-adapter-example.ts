import { memorizationToFlashcardsData } from "../packages/renderer/adapters/memorizationToFlashcardsAdapter.js";
import type { MemorizationSet } from "../packages/core/types/index.js";

const memorizationSet: MemorizationSet = {
  kind: "pedagogical-object",
  type: "memorization-set",
  pedagogicalFamily: "retentive",
  pedagogicalType: "memorization",
  metadata: {
    id: "memorization-personality-adjectives",
    title: "Personality Adjectives To Remember",
    language: "en",
    level: "A2",
    tags: ["memorization", "recall", "vocabulary"]
  },
  learningGoal: {
    domain: "English",
    skill: "lexical retention",
    topic: "personality adjectives",
    cefr: "A2"
  },
  content: {
    core: {
      recallGoal: "Retain and recall common personality adjectives from cues.",
      items: [
        {
          id: "memo-generous",
          cue: "someone who likes giving and helping",
          target: "generous",
          hint: "Starts with g."
        },
        {
          id: "memo-reliable",
          cue: "someone you can trust",
          target: "reliable",
          hint: "This person does what they promise."
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
  interactionModes: ["flashcards"],
  validate() {
    return this.content.core.items.length > 0;
  }
};

const flashcardsData = memorizationToFlashcardsData(memorizationSet);

console.log(
  JSON.stringify(
    {
      memorizationSet: memorizationSet.metadata.title,
      recallGoal: memorizationSet.content.core.recallGoal,
      flashcardsData
    },
    null,
    2
  )
);
