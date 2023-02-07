import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { signIn } from 'next-auth/react'
import React from 'react'
import { authOptions } from './api/auth/[...nextauth]'

export default function Login () {
  return (
    <div className='w-80 h-fit rounded-xl shadow-md bg-orange-200'>
      <div className='flex items-center justify-center'>
        <h1 className="text-4xl font-semibold my-4">Bem-vindo!</h1>
      </div>
      <div className='flex flex-col justify-center items-center my-2'>
        <button
          onClick={() => signIn('github')}
        >
          Entrar com Github
        </button>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return { props: {} }
}
