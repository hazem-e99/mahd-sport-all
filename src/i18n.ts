import i18n from "i18next";
import i18nBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
    .use(i18nBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        lng: localStorage.getItem("language") || "en",
        interpolation: {
            escapeValue: false,
        },
        ns: ["admin", "portal"],
        defaultNS: "admin",
        backend: {
            loadPath: `/locales/{{ns}}/{{lng}}.json`,
        },
        detection: {
            order: ["localStorage", "navigator"],
            lookupLocalStorage: "language",
            caches: ["localStorage"],
        },
    });

export default i18n;
