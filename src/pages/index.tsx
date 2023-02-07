import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { signOut } from 'next-auth/react'
import React from 'react'
import { authOptions } from './api/auth/[...nextauth]'

export default function Home () {
  return (
    <>
      <h1 onClick={() => signOut()}>Hello World</h1>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}
