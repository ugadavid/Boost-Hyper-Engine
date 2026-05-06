import type { BHEMetadata } from "./BHEMetadata.js";

/**
 * Generic BHE object.
 * Represents any pedagogical entity in the Boost Hyper Engine.
 *
 * Generic Boost Hyper Engine object.
 *
 * Activities, containers, modules, resources, and future pedagogical objects
 * can all be represented as BHE objects.
 */
export interface BHEObject<
  TData = unknown,
  TMetadata extends BHEMetadata = BHEMetadata
> {
  /**
   * Object kind, for example "activity", "container", "resource", or a
   * specialized type such as "drag-drop".
   *
   * Optional for now to keep compatibility with the current ActivityModel
   * implementation, which does not expose a public type yet.
   */
  type?: string;

  /**
   * Object metadata.
   */
  metadata: TMetadata;

  /**
   * Optional child BHE objects.
   * Composition is native to BHE: any object can potentially contain other
   * objects, while remaining free to define no children at all.
   */
  children?: BHEObject[];

  /**
   * Optional accessor for object-specific payloads.
   * Current activity models keep their data protected, so this remains optional
   * until the core exposes payloads publicly.
   */
  getData?(): TData;

  /**
   * Checks whether the object is internally valid.
   */
  validate(): boolean;
}
