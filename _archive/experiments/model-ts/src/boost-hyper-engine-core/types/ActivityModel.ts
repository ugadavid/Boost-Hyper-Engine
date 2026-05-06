/**
 * Ceci est un commentaire JSDoc
 */

import { ActivityMetadata } from "./ActivityMetadata";

/** Le nom d'un machin */
export interface ActivityModel<T = any> {
  type: string;
  metadata: ActivityMetadata;
  data: T;
}
