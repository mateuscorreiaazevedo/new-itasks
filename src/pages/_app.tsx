import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/modules/core'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'

export default function App ({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}
