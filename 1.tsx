// npm install i18next react-i18next

import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next'; // Мы также импортируем сам i18next

import App from './App'; // Предполагается, что у вас есть компонент App

// Инициализация i18next
i18n.init({
  interpolation: { escapeValue: false }, // Необходимо для интерполяции переменных в строках перевода
  lng: 'en', // Устанавливаем язык по умолчанию (в данном случае, английский)
  resources: {
    en: {
      translation: {
        // Здесь мы будем хранить переводы для английского языка
        // Например: "hello": "Hello, World!"
      }
    },
    ru: {
      translation: {
        // Здесь мы будем хранить переводы для русского языка
        // Например: "hello": "Привет, мир!"
      }
    }
  }
});

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>,
  document.getElementById('root')
);



// ru.json
{
    "apples": "{{count}} яблоко",
    "apples_plural_1": "{{count}} яблоко",
    "apples_plural_2": "{{count}} яблока",
    "apples_plural_5": "{{count}} яблок"
  }

  {
    "apples": "{{count}} apple",
    "apples_plural": "{{count}} apples"
  }


  import React from 'react';
import { useTranslation } from 'react-i18next';

const AppleCounter = ({ count }) => {
  const { t } = useTranslation();

  return (
    <div>
      <p>{t(count === 1 ? 'apples' : 'apples_plural', { count })}</p>
    </div>
  );
};

export default AppleCounter;



// common.json
{
    "greeting": "Hello!",
    "goodbye": "Goodbye!"
  }

  // header.json
{
    "title": "Welcome to Our App",
    "subtitle": "This is the header"
  }
  
  // footer.json
{
    "copyright": "© 2024 Your Company",
    "privacy_policy": "Privacy Policy"
  }
  

// useTranslations.js
import { useTranslation } from 'react-i18next';

const useTranslations = (chunkName) => {
  const { i18n: { language } } = useTranslation();

  const loadTranslations = async () => {
    let translationsModule;
    switch (chunkName) {
      case 'common':
        translationsModule = await import(`./locales/${language}/common.json`);
        break;
      case 'header':
        translationsModule = await import(`./locales/${language}/header.json`);
        break;
      case 'footer':
        translationsModule = await import(`./locales/${language}/footer.json`);
        break;
      default:
        throw new Error(`Unknown chunk name: ${chunkName}`);
    }
    return translationsModule.default;
  };

  return loadTranslations;
};

export default useTranslations;

// Header.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import useTranslations from './useTranslations';

const Header = () => {
  const loadTranslations = useTranslations('header');
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
    </div>
  );
};

export default Header;
