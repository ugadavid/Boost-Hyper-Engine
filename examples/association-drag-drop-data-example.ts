import type { AssociationSet } from "../packages/core/types/index.js";
import { associationToDragDropData } from "../packages/renderer/adapters/associationToDragDropAdapter.js";

const multimodalAssociationSet: AssociationSet = {
  kind: "pedagogical-object",
  pedagogicalFamily: "structural",
  pedagogicalType: "association",
  interactionModes: ["drag-drop", "flashcards", "memory"],
  metadata: {
    id: "association-drag-drop-multimodal-units",
    title: "Association Drag-Drop Multimodal Units",
    language: "en",
    createdAt: "2026-05-11T00:00:00.000Z"
  },
  learningGoal: {
    domain: "languages",
    skill: "vocabulary",
    topic: "personality adjectives"
  },
  content: {
    core: {
      entries: [
        {
          id: "kind-text",
          label: "kind",
          unit: {
            id: "unit-kind-text",
            kind: "text",
            text: "kind"
          }
        },
        {
          id: "gentle-text",
          label: "gentle",
          unit: {
            id: "unit-gentle-text",
            kind: "text",
            text: "gentle"
          }
        },
        {
          id: "curious-text",
          label: "curious",
          unit: {
            id: "unit-curious-text",
            kind: "text",
            text: "curious"
          }
        },
        {
          id: "curious-image",
          kind: "image",
          unit: {
            id: "unit-curious-image",
            kind: "image",
            src: "assets/images/curious-student.png",
            alt: "a curious student looking at a notebook"
          }
        },
        {
          id: "patient-audio",
          kind: "audio",
          unit: {
            id: "unit-patient-audio",
            kind: "audio",
            src: "assets/audio/patient.mp3",
            transcript: "patient"
          }
        },
        {
          id: "patient-text",
          label: "patient",
          unit: {
            id: "unit-patient-text",
            kind: "text",
            text: "patient"
          }
        },
        {
          id: "creative-text",
          label: "creative",
          unit: {
            id: "unit-creative-text",
            kind: "text",
            text: "creative"
          }
        },
        {
          id: "creative-image",
          kind: "image",
          unit: {
            id: "unit-creative-image",
            kind: "image",
            src: "assets/images/creative-person.png",
            alt: "a person drawing ideas"
          }
        },
        {
          id: "creative-audio",
          kind: "audio",
          unit: {
            id: "unit-creative-audio",
            kind: "audio",
            src: "assets/audio/creative.mp3",
            transcript: "creative"
          }
        }
      ],
      associations: [
        {
          id: "text-to-text",
          entryIds: ["kind-text", "gentle-text"],
          feedback: "Two text adjectives that can be compared."
        },
        {
          id: "text-to-image",
          entryIds: ["curious-text", "curious-image"],
          feedback: "Match the adjective with its image."
        },
        {
          id: "audio-to-text",
          entryIds: ["patient-audio", "patient-text"],
          feedback: "Match the audio with the written adjective."
        },
        {
          id: "text-image-audio",
          entryIds: ["creative-text", "creative-image", "creative-audio"],
          feedback: "Group the word, image, and audio together."
        }
      ]
    }
  },
  validate() {
    return true;
  }
};

const dragDropData = associationToDragDropData(multimodalAssociationSet);

console.log(JSON.stringify(dragDropData, null, 2));
