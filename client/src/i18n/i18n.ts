import i18n from "i18next";
import { initReactI18next } from "react-i18next";

let resourcesLoaded: any = {
  en: {},
  ru: {},
};

// @ts-ignore
const loadResources = async (page: string, language: string) => {
  try {
    return await import(`./locales/${page}/${page}.${language}.json`);
  } catch (error) {
    console.error(`Failed to load resources for ${page}: ${error}`);
    return {};
  }
};

const takeOrLoad = async (page: string) => {
  let toReturn: any = {};
  if (!resourcesLoaded[i18n.language][page]) {
    const resources = await loadResources(page, i18n.language);
    resourcesLoaded[i18n.language][page] = resources.default;
    toReturn = resources.default;
  } else {
    toReturn = resourcesLoaded[i18n.language][page];
  }
  console.log(toReturn);
  return toReturn;
};

export const addDynamicResources = async (page: string) => {
  console.log(page);
  let resources = await takeOrLoad(page);
  if (page === "signUp" || page === "forgotPassword") {
    resources = { ...resources, ...(await takeOrLoad("emailVerifying")) };
  }
  i18n.addResources(i18n.language, page, resources);
  console.log(resources);
};

i18n.use(initReactI18next).init({
  fallbackLng: "ru",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  resources: resourcesLoaded,
});

export default i18n;
