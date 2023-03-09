import React from 'react'
import { useTranslation } from 'react-i18next'

export function LangSwitch () {
  const { t, i18n } = useTranslation()

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

  function handleChange (e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target
    i18n.changeLanguage(value)
  }

  return (
    <div className="absolute bottom-4 right-2">
      <label className='flex flex-col'>
        {t('selectLang')}:
        <select
          className="dark:bg-zinc-700 bg-orange-300 px-2 rounded-md py-1"
          onChange={handleChange}
          defaultValue={i18n.language}
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
