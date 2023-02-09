import { signOut, useSession } from 'next-auth/react'
import { useTheme } from '@/modules/core'
import { Modal, PopoverUi } from './ui'
import Link from 'next/link'
import React from 'react'

import { BsDoorOpen, BsMoon, BsSun, BsX } from 'react-icons/bs'
import * as Popover from '@radix-ui/react-popover'
import * as Dialog from '@radix-ui/react-dialog'
import { FaTrash, FaUser } from 'react-icons/fa'
import { userService } from '@/modules/user'
import Head from 'next/head'

export const Header = () => {
  const { handleTheme, isLight } = useTheme()
  const { data: session } = useSession()

  async function handleDelete () {
    try {
      const response = await userService.deleteUser()
      console.log(response)
      signOut()
    } catch (e) {
      console.log((e as any).message)
    }
  }

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
              <Dialog.Root>
                <Dialog.Trigger className="flex cursor-pointer hover:bg-orange-200 dark:hover:bg-zinc-600 py-1 px-2 rounded-lg gap-2 items-center justify-start">
                  <FaTrash /> Deletar usuário
                </Dialog.Trigger>
                <Modal>
                  <div className="relative p-4 sm:w-[480px]">
                    <Dialog.Close className="absolute -right-3 -top-3">
                      <BsX className="text-4xl hover:animate-pulse" />
                    </Dialog.Close>
                    <h2 className="text-3xl text-center">Tem certeza que deseja excluir sua conta?</h2>
                    <div className="mt-4 flex justify-between items-center">
                      <button
                        className="flex sm:text-3xl items-center justify-center text-white font-semibold rounded-lg gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 transition-all shadow"
                        onClick={handleDelete}
                      >
                        <FaTrash /> Sim
                      </button>
                      <Dialog.Close className="flex sm:text-3xl items-center justify-center text-white font-semibold rounded-lg gap-2 px-4 py-2 bg-zinc-500 hover:bg-zinc-600 transition-all shadow">
                        <BsX className="text-4xl hover:animate-pulse" /> Fechar
                      </Dialog.Close>
                    </div>
                  </div>
                </Modal>
              </Dialog.Root>
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
