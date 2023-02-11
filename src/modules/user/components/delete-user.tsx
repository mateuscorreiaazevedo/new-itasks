import { ButtonUi, Modal } from '@/components/ui'
import * as Dialog from '@radix-ui/react-dialog'
import { useNotification } from '@/modules/core'
import { signOut } from 'next-auth/react'
import { FaTrash } from 'react-icons/fa'
import { BsX } from 'react-icons/bs'
import { userService } from '..'

export const DeleteUser = () => {
  const { setNotification } = useNotification()

  async function handleDelete () {
    try {
      const response = await userService.deleteUser()
      console.log(response)
      signOut()
    } catch (e) {
      setNotification((e as any).message)
    }
  }

  return (
    <Dialog.Root>
        <Dialog.Trigger>
          <ButtonUi>
            <FaTrash /> Deletar usuário
          </ButtonUi>
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
  )
}
