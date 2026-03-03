/**
 * Shared API layer exports.
 * The base Axios instance lives here. Area-specific clients extend it with
 * their own interceptors (authentication, custom headers, etc.).
 */
export { default as axiosBase } from './axiosBase';
