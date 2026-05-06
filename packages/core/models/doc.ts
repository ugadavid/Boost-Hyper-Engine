/**
 * # Models
 *
 * The `packages/core/models/` folder contains TypeScript classes that represent
 * BHE domain objects or reusable model foundations.
 *
 * ## Current role
 *
 * Models can contain behavior tied to a specific object family, such as
 * validation helpers for activities.
 *
 * ## Guidelines
 *
 * - Keep one logical model per file.
 * - Prefer clear names such as `AbstractActivityModel` or
 *   `DragDropActivityModel`.
 * - Keep renderer-specific behavior outside of core models.
 * - Add JSDoc when a model becomes part of the public API.
 */
export const __coreModelsDoc__ = true;
