import { initReactI18next } from 'react-i18next'
import translations from '@/main/locales'
import i18n from 'i18next'

i18n.use(initReactI18next).init({
  fallbackLng: 'pt_br',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false
  },
  resources: translations
})
export default i18n
