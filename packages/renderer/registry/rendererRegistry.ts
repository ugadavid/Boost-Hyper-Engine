import type { InteractionMode, PedagogicalObject } from "../../core/types/index.js";
import type { RendererDefinition } from "../types/RendererDefinition.js";

const renderers: RendererDefinition[] = [];

export function registerRenderer(renderer: RendererDefinition): void {
  renderers.push(renderer);
}

export function findRenderer(
  object: PedagogicalObject,
  interactionMode: InteractionMode
): RendererDefinition | undefined {
  return renderers.find(
    (renderer) =>
      renderer.supportedPedagogicalTypes.includes(object.pedagogicalType) &&
      renderer.supportedInteractionModes.includes(interactionMode)
  );
}
