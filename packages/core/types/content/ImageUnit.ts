import type { BaseContentUnit } from "./BaseContentUnit.js";

export interface ImageUnit extends BaseContentUnit {
  kind: "image";
  src: string;
  alt?: string;
}
