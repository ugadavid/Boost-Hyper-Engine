export interface BHEContentBlock {
  id: string;
  type: "text" | "image" | "audio" | "video" | "rule" | "example" | "feedback" | "hint";
  value: unknown;
}
