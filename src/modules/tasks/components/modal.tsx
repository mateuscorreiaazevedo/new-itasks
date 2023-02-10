import { ButtonUi, Modal } from '@/components/ui'
import { useNotification } from '@/modules/core'
import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import { BsCheck2, BsX } from 'react-icons/bs'
import { FaPen } from 'react-icons/fa'
import { taskService } from '..'
import { CheckboxUI } from './checkbox'

type Props = {
  id: string
  refreshTasks: () => Promise<void>
}

export function ModalEditTask ({ id, refreshTasks }: Props) {
  const [task, setTask] = useState<TaskResponse>()
  const [loading, setLoading] = useState(false)
  const { setNotification } = useNotification()
  const [title, setTitle] = useState('')

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const response = await taskService.getById({ id })
        setTask(response)
      } catch (error) {
        setNotification((error as any).message)
      } finally {
        setLoading(false)
      }
    })()
  }, [refreshTasks])

  async function handleEditTask () {
    try {
      const response = await taskService.edit({ id, title })
      setNotification(response!, 'success')
      refreshTasks()
    } catch (error) {
      setNotification((error as any).message)
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex gap-2 items-center hover:bg-orange-200 dark:hover:bg-zinc-600 py-2 px-4 rounded-lg">
        <FaPen /> Editar
      </Dialog.Trigger>
      <Modal>
        <div className=" relative p-10 w-96 h-80 rounded bg-orange-300 dark:bg-zinc-800">
          <Dialog.Close className="absolute right-0 top-0 text-4xl">
            <BsX />
          </Dialog.Close>
          {loading
            ? (
            <div className="h-full w-full flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border-4 border-transparent border-t-zinc-900 dark:border-t-white animate-spin" />
            </div>
              )
            : (
            <div className="flex flex-col h-72 pb-2 items-center justify-between">
              <h2 className='text-3xl'>
                Editar tarefa.
              </h2>
              <div className="flex w-fit h-fit rounded-lg px-4 bg-orange-400 justify-between dark:bg-zinc-700 shadow-md">
                <CheckboxUI task={task!} refreshTasks={refreshTasks} />
                <input
                  defaultValue={task?.title ?? ''}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full py-2 px-4 bg-transparent font-semibold outline-none"
                />
              </div>
              <div className="flex flex-col gap-3">
                <ButtonUi onClick={handleEditTask}>
                  <BsCheck2 className='text-4xl' /> Editar
                </ButtonUi>
                <Dialog.Close>
                  <ButtonUi>
                    <BsX className='text-4xl'/> Fechar
                  </ButtonUi>
                </Dialog.Close>
              </div>
            </div>
              )}
        </div>
      </Modal>
    </Dialog.Root>
  )
}
