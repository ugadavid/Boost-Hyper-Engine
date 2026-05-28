export interface MemorizationTypingRecallItem {
  itemId: string;
  cueLabel: string;
  expectedTarget: string;
  acceptedTargets?: string[];
  hint?: string;
}

export interface MemorizationTypingRecallData {
  recallGoal: string;
  items: MemorizationTypingRecallItem[];
}
