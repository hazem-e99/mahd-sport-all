/**
 * Base Axios instance for shared HTTP configuration.
 *
 * This file contains only the neutral base setup (base URL, timeouts, default
 * Accept/Content-Type headers).  Do NOT add area-specific logic (auth tokens,
 * Admin-only headers, etc.) here — those belong in each area's own axiosClient.
 *
 * Admin client: src/admin/axiosClient.tsx
 */
import axios from 'axios';

// TODO: سيتم تحديث هذا عند جاهزية الباك إيند - ENV_CONFIG.API_BASE_URL ستكون فارغة حتى يتم الإعداد
const BASE_URL = import.meta.env.VITE_BASE_URL
  ? `${import.meta.env.VITE_BASE_URL}/api`
  : '';

const axiosBase = axios.create({
  baseURL: BASE_URL,
  timeout: 30_000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default axiosBase;
