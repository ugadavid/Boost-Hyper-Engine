import type { BaseContentUnit } from "./BaseContentUnit.js";

export interface TextUnit extends BaseContentUnit {
  kind: "text";
  text: string;
}
