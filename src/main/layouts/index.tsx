import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

type ChildrenProps = {
  children: React.ReactNode
}

export const Layout = ({ children }: ChildrenProps) => {
  const publicRoutes = ['/login']
  const { pathname } = useRouter()

  if (publicRoutes.find(route => pathname.startsWith(route))) {
    return (
      <>
        <Head>
          <title>Login | iTasks</title>
        </Head>
        <main className="w-full h-screen bg-orange-50 dark:bg-zinc-900 flex items-center justify-center">
          {children}
        </main>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>iTasks</title>
      </Head>
      <header>header</header>
      <main className="container mx-auto">{children}</main>
      <footer>footer</footer>
    </>
  )
}
