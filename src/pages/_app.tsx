import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/modules/core'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import '@/styles/globals.css'

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
