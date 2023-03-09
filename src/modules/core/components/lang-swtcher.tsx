import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocalStorage } from '..'

export function LangSwitch () {
  const { t, i18n } = useTranslation()
  const [language, setLanguage] = useLocalStorage('language', i18n.language)

  const langOptions = [
    {
      label: t('portuguese'),
      value: 'pt_br'
    },
    {
      label: t('english'),
      value: 'en'
    }
  ]

  React.useEffect(() => {
    i18n.changeLanguage(language)
  })

  function handleChange (e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target
    i18n.changeLanguage(value)
    setLanguage(value)
  }

  return (
    <div className="absolute bottom-4 right-6">
      <label className="flex flex-col">
        {t('selectLang')}:
        <select
          className="dark:bg-zinc-700 bg-orange-300 px-2 rounded-md py-1"
          onChange={handleChange}
          value={language}
        >
          {langOptions.map(lang => (
            <option value={lang.value} key={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
