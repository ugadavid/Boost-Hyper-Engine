import { ActivityMetadata } from "./ActivityMetadata";

export interface ActivityModel<T = any> {
  type: string;
  metadata: ActivityMetadata;
  data: T;
}
