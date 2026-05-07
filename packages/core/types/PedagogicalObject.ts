import type { BHEObject } from "./BHEObject.js";
import type { InteractionMode } from "./InteractionMode.js";
import type { PedagogicalContent } from "./PedagogicalContent.js";
import type { PedagogicalFamily } from "./PedagogicalFamily.js";
import type { PedagogicalType } from "./PedagogicalType.js";

export interface PedagogicalObject<TCore = unknown>
  extends BHEObject<PedagogicalContent<TCore>> {
  kind: "pedagogical-object";
  pedagogicalFamily: PedagogicalFamily;
  pedagogicalType: PedagogicalType;
  learningGoal: {
    domain: string;
    skill: string;
    topic?: string;
    cefr?: string;
  };
  content: PedagogicalContent<TCore>;
  interactionModes: InteractionMode[];
}
