"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    resources: {
      en: {
        common: require("../locales/en/common.json"),
        hero: require("../locales/en/hero.json"), // ✅ add this
      },
      ar: {
        common: require("../locales/ar/common.json"),
        hero: require("../locales/ar/hero.json"), // ✅ add this
      },
    },
  });

export default i18n;
