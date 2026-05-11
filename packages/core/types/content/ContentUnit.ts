import type { AudioUnit } from "./AudioUnit.js";
import type { ImageUnit } from "./ImageUnit.js";
import type { TextUnit } from "./TextUnit.js";
import type { VideoUnit } from "./VideoUnit.js";

export type ContentUnit =
  | TextUnit
  | ImageUnit
  | AudioUnit
  | VideoUnit;
