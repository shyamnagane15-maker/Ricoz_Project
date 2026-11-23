import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import hi from './locales/hi.json'

let saved = 'en'
try { saved = localStorage.getItem('udaan-lang') === 'hi' ? 'hi' : 'en' } catch { /* storage blocked */ }

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, hi: { translation: hi } },
  lng: saved,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

document.documentElement.lang = i18n.language
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
  try { localStorage.setItem('udaan-lang', lng) } catch { /* ignore */ }
})

export default i18n