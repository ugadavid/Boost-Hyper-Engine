/**
 * # Creating a Boost Hyper Engine core module
 *
 * Core modules live under `packages/core/`.
 *
 * ## Steps
 *
 * 1. Choose the right folder:
 *    - `types/` for shared contracts, aliases, and capability interfaces.
 *    - `models/` for concrete or abstract domain models.
 *    - `routing/` for adaptive routing helpers.
 *    - `guide/` for internal documentation notes.
 * 2. Use a clear file name that matches the exported concept.
 * 3. Add concise JSDoc to exported interfaces, types, classes, and functions.
 * 4. Export public contracts through the nearest `index.ts` when they are part
 *    of the stable API.
 * 5. Run `npm run build` and, when needed, `npm run docs`.
 *
 * ## Example
 *
 * ```ts
 * // packages/core/types/CompositionRules.ts
 *
 * export interface CompositionRules {
 *   maxChildren?: number;
 * }
 * ```
 */
export const __coreGuideDoc__ = true;
