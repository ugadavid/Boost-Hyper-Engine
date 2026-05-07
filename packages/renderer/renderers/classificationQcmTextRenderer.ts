import type { RendererDefinition } from "../types/RendererDefinition.js";

export const classificationQcmTextRenderer: RendererDefinition = {
  id: "classification-qcm-text-renderer",
  supportedPedagogicalTypes: ["classification"],
  supportedInteractionModes: ["qcm"],
  render(object, interactionMode) {
    return `Renderer ${this.id} can present "${object.metadata.title ?? object.metadata.id}" as ${interactionMode}.`;
  }
};
