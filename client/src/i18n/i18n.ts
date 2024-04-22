import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import signInEn from "./locales/signIn/signIn.en.json";
import signInRu from "./locales/signIn/signIn.ru.json";

const resources = {
  en: {
    signIn: signInEn,
  },
  ru: {
    signIn: signInRu,
  }
};
// @ts-ignore
i18n
// @ts-ignore
  .use(initReactI18next)
  // @ts-ignore
  .init({
    // @ts-ignore
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false
    },
    wait: true,
    resources: resources
  });

export default i18n;