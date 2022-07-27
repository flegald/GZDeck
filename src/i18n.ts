import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enFile from '../public/locales/en/translation.json'

const resources = {
  en: {
    common: enFile
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    defaultNS: 'common',
    lng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });


export default i18n;
