/**
 * Shared utilities.
 * Only pure, business-agnostic helpers belong here.
 * Domain-specific utils (admin or portal) must stay in their own area.
 */

/** Returns true if the value is a non-empty string. */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/** Clamps a number between min and max (inclusive). */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
