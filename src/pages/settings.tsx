import { authOptions } from './api/auth/[...nextauth]'
import { getServerSession, Session } from 'next-auth'
import { GetServerSideProps } from 'next'
import React from 'react'
import { DeleteUser } from '@/modules/user'

interface Props {
  session: Session | null
}

export default function Settings ({ session }: Props) {
  if (session) {
    return (
      <section className="flex gap-4 md:flex-row flex-col-reverse h-[78vh]">
        <div className="gap-2 flex w-full">
          <img src={session.user?.image as string} alt={session.user?.name as string} className="w-96 h-fit rounded-lg" />
          <div className="flex gap-2 text-2xl flex-col w-full items-center">
            <h2 className="w-full font-bold bg-orange-400 rounded-lg px-4 py-1.5 dark:bg-zinc-700">{session.user?.name}</h2>
            <h3 className="w-full font-semibold bg-orange-400 rounded-lg px-4 py-1.5 dark:bg-zinc-700 text-xl">
              {session.user?.email}
            </h3>
            <DeleteUser />
          </div>
        </div>
      </section>
    )
  }
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

  return { props: { session } }
}
