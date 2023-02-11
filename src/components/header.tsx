import { signOut, useSession } from 'next-auth/react'
import { useTheme } from '@/modules/core'
import { PopoverUi } from './ui'
import Link from 'next/link'
import React from 'react'

import { BsDoorOpen, BsFillGearFill, BsMoon, BsSun } from 'react-icons/bs'
import * as Popover from '@radix-ui/react-popover'
import { FaUser } from 'react-icons/fa'
import Head from 'next/head'

export const Header = () => {
  const { handleTheme, isLight } = useTheme()
  const { data: session } = useSession()

  return (
    <header className="w-full flex items-center justify-center sticky top-0">
      <Head>{session?.user?.name ? <title>{session.user.name} | iTasks</title> : <title>iTasks</title>}</Head>
      <nav className="container mx-auto sm:my-4 bg-orange-200/70 dark:bg-zinc-800/70 backdrop-blur-sm z-50 p-4 flex items-center justify-between sm:rounded-xl lg:shadow-md shadow">
        <h1 className="text-4xl ">
          <Link href="/">iTasks</Link>
        </h1>

        <Popover.Root>
          <Popover.Trigger>
            {session?.user?.image && (
              <img
                src={session?.user?.image as string}
                alt={session?.user?.name as string}
                className="h-12 rounded-full shadow-md"
              />
            )}
          </Popover.Trigger>
          <PopoverUi>
            <ul className="flex flex-col gap-3">
              <li className="flex gap-2 items-center py-1 px-2 justify-start">
                <FaUser /> Olá <span className="font-bold">{session?.user?.name}</span>
              </li>
              <li
                className="flex cursor-pointer hover:bg-orange-200 dark:hover:bg-zinc-600 py-1 px-2 rounded-lg gap-2 items-center justify-start"
                onClick={handleTheme}
              >
                {isLight ? <BsSun /> : <BsMoon />} Alterar tema
              </li>
              <Link href="/settings">
                <li className="flex cursor-pointer hover:bg-orange-200 dark:hover:bg-zinc-600 py-1 px-2 rounded-lg gap-2 items-center justify-start">
                  <BsFillGearFill /> Configurações
                </li>
              </Link>
              <li
                className="flex cursor-pointer hover:bg-orange-200 dark:hover:bg-zinc-600 py-1 px-2 rounded-lg gap-2 items-center justify-start"
                onClick={() => signOut()}
              >
                <BsDoorOpen /> Sair
              </li>
            </ul>
          </PopoverUi>
        </Popover.Root>
      </nav>
    </header>
  )
}
