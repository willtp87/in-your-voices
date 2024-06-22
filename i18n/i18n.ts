import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import englishTranslation from "./locales/english.json";
import frenchTranslation from "./locales/french.json";

i18n.use(initReactI18next).init({
  lng: getLocales().find(() => true)?.languageCode ?? "",
  resources: {
    en: {
      translation: englishTranslation,
    },
    fr: {
      translation: frenchTranslation,
    },
  },
  fallbackLng: ["en"],
});

export default i18n;
