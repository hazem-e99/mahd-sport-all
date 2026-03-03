// TODO: استبدل هذه القيم بروابط المشروع الصحيحة

export const PRODUCTION_URLS = {
  // رابط الواجهة الأمامية في بيئة الإنتاج
  BASE_URL: "",
  // عنوان الـ API في بيئة الإنتاج
  API_BASE_URL: "",
} as const;

export const DEVELOPMENT_URLS = {
  // رابط الواجهة الأمامية في بيئة التطوير
  BASE_URL: "http://localhost:3000/",
  // عنوان الـ API في بيئة التطوير
  API_BASE_URL: "",
} as const;
