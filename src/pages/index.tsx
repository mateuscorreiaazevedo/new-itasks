import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from './api/auth/[...nextauth]'

type Props = {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export default function Home ({ user }: Props) {
  return (
    <>
      <h1>Hello {user.name}</h1>
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
      user: session.user
    }
  }
}
