export type FeedbackSeverity =
  | "success"
  | "info"
  | "warning"
  | "error";

export interface FeedbackMessage {
  id: string;
  severity: FeedbackSeverity;
  title?: string;
  message: string;
  targetId?: string;
  metadata?: Record<string, unknown>;
}

export interface FeedbackData {
  status: "success" | "partial" | "failed";
  summary: FeedbackMessage;
  messages?: FeedbackMessage[];
  metadata?: Record<string, unknown>;
}
