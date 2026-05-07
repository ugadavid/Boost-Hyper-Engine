import type { BHEContentBlock } from "./BHEContentBlock.js";

export interface PedagogicalContent<TCore = unknown> {
  core: TCore;
  support?: {
    hints?: BHEContentBlock[];
    explanations?: BHEContentBlock[];
    examples?: BHEContentBlock[];
    feedbacks?: BHEContentBlock[];
    resources?: BHEContentBlock[];
  };
  variants?: PedagogicalVariant<TCore>[];
}

export interface PedagogicalVariant<TCore = unknown> {
  id: string;
  label: string;
  description?: string;
  core: TCore;
}
