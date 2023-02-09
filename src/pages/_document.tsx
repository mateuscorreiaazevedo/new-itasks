import { Html, Head, Main, NextScript } from 'next/document'

export default function Document () {
  return (
    <Html lang="pt-br">
      <Head>
      </Head>
      <body className="w-full min-h-screen bg-orange-50 dark:bg-zinc-900 text-zinc-800 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
