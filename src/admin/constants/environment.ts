
export const ENVIRONMENT = {
  DEVELOPMENT: "development",
  STAGING: "staging",
  PRODUCTION: "production",
} as const;

// البيئة الحالية
export const CURRENT_ENV = import.meta.env.VITE_NODE_ENV || import.meta.env.MODE || ENVIRONMENT.DEVELOPMENT;

// إعدادات البيئة
// TODO: استبدل القيم الفارغة بعنوان السيرفر لما يكون الباك إيند جاهز
const BASE_URL = import.meta.env.VITE_BASE_URL || '';

export const ENV_CONFIG = {
  // عنوان السيرفر الأساسي
  BASE_URL,
  // عنوان الـ API - يضاف /api تلقائياً على الـ BASE_URL
  API_BASE_URL: BASE_URL ? `${BASE_URL}/api` : '',
  // عنوان الـ SignalR Hub للإشعارات الفورية
  SIGNALR_HUB_URL: import.meta.env.VITE_SIGNALR_HUB_URL || '',
} as const;

// للتوافق العكسي
const CURRENT_ENV_CONFIG_internal = ENV_CONFIG;
export const CURRENT_ENV_CONFIG = CURRENT_ENV_CONFIG_internal;

export const FEATURE_FLAGS = {
  ENABLE_DEBUG_MODE: CURRENT_ENV === ENVIRONMENT.DEVELOPMENT,
  ENABLE_ERROR_REPORTING: CURRENT_ENV === ENVIRONMENT.PRODUCTION,
} as const;

