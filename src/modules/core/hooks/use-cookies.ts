import { parseCookies, setCookie } from 'nookies'
import React from 'react'

type Response<T> = [
  T,
  (value?: T) => void
]

export function useCookies<T> (key: string, initialValue: T): Response<T> {
  const [state, setState] = React.useState(() => {
    const cookie = parseCookies(null)[key]

    if (cookie) {
      return JSON.parse(cookie)
    } else {
      return initialValue
    }
  })

  const setValue = React.useCallback((value?: T) => {
    setState(value)
    setCookie(null, key, JSON.stringify(value))
  }, [])

  return [state, setValue]
}
