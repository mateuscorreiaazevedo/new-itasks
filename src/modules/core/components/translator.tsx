import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  label: string
}

export function _t (label: string) {
  const { t } = useTranslation()

  return t(label)
}

export function Translator ({ label }: Props) {
  return <>{_t(label)}</>
}
