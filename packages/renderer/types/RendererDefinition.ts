import type {
  InteractionMode,
  PedagogicalObject,
  PedagogicalType
} from "../../core/types/index.js";

export interface RendererDefinition {
  id: string;
  supportedPedagogicalTypes: PedagogicalType[];
  supportedInteractionModes: InteractionMode[];
  render: (object: PedagogicalObject, interactionMode: InteractionMode) => string;
}
