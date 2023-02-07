import { Header } from '@/components'
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
        <main className="w-full h-screen flex items-center justify-center">
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
      <Header />
      <main className="container mx-auto">{children}</main>
      <footer>footer</footer>
    </>
  )
}
