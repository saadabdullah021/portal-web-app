"use client";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/i18n";

export default function I18nProvider({ children, locale }) {
  // Ensure the language is correct *before* children render
  if (i18n.resolvedLanguage !== locale) {
    i18n.changeLanguage(locale);
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
