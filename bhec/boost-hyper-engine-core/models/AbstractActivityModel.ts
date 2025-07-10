import { ActivityModel } from "../types/ActivityModel";
import { ActivityMetadata } from "../types/ActivityMetadata";


export abstract class AbstractActivityModel<T> implements ActivityModel<T> {
  type: string;
  metadata: ActivityMetadata;
  data: T;

  constructor(type: string, metadata: ActivityMetadata, data: T) {
    this.type = type;
    this.metadata = metadata;
    this.data = data;
  }

  abstract validate(): boolean;

  getTitle(): string {
    return this.metadata.title;
  }

  getTags(): string[] {
    return this.metadata.tags ?? [];
  }
}
