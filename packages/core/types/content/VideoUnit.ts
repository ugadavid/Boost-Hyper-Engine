import type { BaseContentUnit } from "./BaseContentUnit.js";

export interface VideoUnit extends BaseContentUnit {
  kind: "video";
  src: string;
  transcript?: string;
  poster?: string;
}
