"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  supportedLngs: ["en", "ar"],
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
  resources: {
    en: {
      home: require("../locales/en/home.json"),
      hero: require("../locales/en/hero.json"),
      auth: require("../locales/en/auth.json"),
      checkout: require("../locales/en/checkout.json"),
    },
    ar: {
      home: require("../locales/ar/home.json"),
      hero: require("../locales/ar/hero.json"),
      auth: require("../locales/ar/auth.json"),
      checkout: require("../locales/ar/checkout.json"),
    },
  },
});

export default i18n;
