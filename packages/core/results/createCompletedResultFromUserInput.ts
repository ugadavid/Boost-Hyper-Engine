import type { BHEResult, UserInput } from "../types/index.js";

export interface CompletedUserInputResultDetails<
  TUserInput extends UserInput = UserInput
> {
  input: TUserInput;
}

export interface CreateCompletedResultFromUserInputOptions<
  TUserInput extends UserInput,
  TDetails extends Record<string, unknown> = Record<string, never>
> {
  objectId: string;
  input: TUserInput;
  details?: TDetails;
  completion?: number;
  durationMs?: number;
  signals?: string[];
}

export function createCompletedResultFromUserInput<
  TUserInput extends UserInput,
  TDetails extends Record<string, unknown> = Record<string, never>
>(
  options: CreateCompletedResultFromUserInputOptions<TUserInput, TDetails>
): BHEResult<CompletedUserInputResultDetails<TUserInput> & TDetails> {
  const result: BHEResult<CompletedUserInputResultDetails<TUserInput> & TDetails> = {
    objectId: options.objectId,
    status: "completed",
    completion: options.completion ?? 1,
    details: {
      ...options.details,
      input: options.input
    } as CompletedUserInputResultDetails<TUserInput> & TDetails
  };

  if (options.durationMs !== undefined) {
    result.durationMs = options.durationMs;
  }

  if (options.signals !== undefined) {
    result.signals = options.signals;
  }

  return result;
}
