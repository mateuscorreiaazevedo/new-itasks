import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from '@/modules/core'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import '@/main/config/i18n'

export default function App ({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </ThemeProvider>
    </SessionProvider>
  )
}
