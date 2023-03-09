import { authOptions } from './api/auth/[...nextauth]'
import { ButtonUi } from '@/components/ui'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { signIn } from 'next-auth/react'
import { LangSwitch, useTheme } from '@/modules/core'
import React from 'react'

import { FcGoogle } from 'react-icons/fc'
import { BsMoon, BsSun } from 'react-icons/bs'
import { FaDiscord, FaGithub } from 'react-icons/fa'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function Login () {
  const { handleTheme, isLight } = useTheme()
  const { t } = useTranslation()

  return (
    <div className="lg:w-80 w-full lg:h-fit h-screen lg:rounded-xl flex flex-col items-center justify-center gap-4 shadow-md bg-orange-200 dark:bg-zinc-800">
      <LangSwitch />
      <div className="flex items-center justify-center">
        <h1 className="text-4xl font-semibold my-4 text-center">{t('welcome')}</h1>
      </div>
      <div className="flex flex-col justify-center items-center my-2 gap-2">
        <ButtonUi onClick={() => signIn('github')}>
          <FaGithub className="text-3xl" /> {t('github')}
        </ButtonUi>
        <ButtonUi onClick={() => signIn('google')}>
          <FcGoogle className="text-3xl" /> {t('google')}
        </ButtonUi>
        <ButtonUi onClick={() => signIn('discord')}>
          <FaDiscord className="text-3xl fill-violet-800 dark:fill-violet-500" />
          {t('discord')}
        </ButtonUi>
      </div>
      <div className="my-4 flex items-center justify-center">
        <ButtonUi onClick={handleTheme}>
          {isLight ? <BsSun /> : <BsMoon />}
          {t('theme')}
        </ButtonUi>
      </div>
      <footer className="flex text-lg flex-col items-center justify-center mb-5">
        <h3>iTasks &copy; 2023</h3>
        <p>
          Powered by{' '}
          <Link
            className="font-semibold hover:tracking-wider transition-all"
            href="https://mateusdev.com.br"
            target="_blank"
          >
            Mateus Azevedo
          </Link>
        </p>
      </footer>
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
