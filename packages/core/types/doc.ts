/**
 * # Types
 *
 * The `packages/core/types/` folder contains shared BHE contracts, aliases,
 * result shapes, and capability interfaces.
 *
 * ## Current examples
 *
 * - `BHEObject` defines the generic object foundation.
 * - `BHEResult` defines the standard result shape.
 * - `AdaptiveRouting` defines declarative routing rules.
 * - `HasAdaptiveRouting` marks objects that carry adaptive routing.
 *
 * ## Guidelines
 *
 * - Keep shared contracts small and composable.
 * - Prefer capability interfaces over adding every feature directly to
 *   `BHEObject`.
 * - Export stable public types from `types/index.ts`.
 * - Keep experimental ideas out of the stable index until they are validated.
 */
export const __coreTypesDoc__ = true;
