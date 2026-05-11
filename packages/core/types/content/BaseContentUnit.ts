export interface BaseContentUnit {
  id: string;
  kind: string;
  label?: string;
  metadata?: Record<string, unknown>;
}
