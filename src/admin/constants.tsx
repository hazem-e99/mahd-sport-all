/**
 * @deprecated src/admin/constants.tsx is a legacy file.
 *
 * - `EnumPermissions` → import from '@admin/constants/permissions'
 * - Base URL         → import from '@admin/constants/environment' (CURRENT_ENV_CONFIG.API_BASE_URL)
 *
 * This file now re-exports both for backward compatibility only.
 * Remove once all direct usages have been migrated.
 */
export { CURRENT_ENV_CONFIG as default } from './constants/environment';
export { EnumPermissions } from './constants/permissions';
