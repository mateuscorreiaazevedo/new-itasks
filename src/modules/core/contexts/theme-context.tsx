import { useCookies } from '..'
import React from 'react'
import { Layout } from '@/main/layouts'

type ContextProps = {
  theme: string
  handleTheme: () => void
  isLight: boolean
}

const Context = React.createContext<ContextProps | null>(null)

type ProviderProps = {
  children: React.ReactNode
}

export const ThemeProvider = ({ children }: ProviderProps) => {
  const [theme, setTheme] = useCookies<string>('theme-itasks', 'light')
  const [isLight, setIsLight] = React.useState(true)

  const handleTheme = () => {
    setTheme(isLight ? 'dark' : 'light')
  }

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      setIsLight(false)
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark')
      setIsLight(true)
    }
  }, [theme, isLight])

  return (
    <Context.Provider value={{ handleTheme, isLight, theme }}>
      <Layout>{children}</Layout>
    </Context.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(Context)

  if (!context) throw new Error('Error on ThemeProvider on theme-context')

  return { ...context }
}
