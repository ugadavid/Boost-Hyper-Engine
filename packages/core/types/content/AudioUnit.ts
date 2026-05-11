import type { BaseContentUnit } from "./BaseContentUnit.js";

export interface AudioUnit extends BaseContentUnit {
  kind: "audio";
  src: string;
  transcript?: string;
}
