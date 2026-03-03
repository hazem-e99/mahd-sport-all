/**
 * Shared type definitions.
 * Only types that are truly cross-area belong here.
 * Feature/domain types must remain inside admin/ or portal/.
 */

/** Generic paginated API response shape. */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

/** Generic API response envelope. */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}
