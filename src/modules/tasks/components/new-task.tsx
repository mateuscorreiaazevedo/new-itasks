import { ButtonUi } from '@/components/ui'
import { FaPlus } from 'react-icons/fa'
import { useState } from 'react'
import { taskService } from '..'
import { useNotification } from '@/modules/core'

type Props = {
  refreshTasks: () => Promise<void>
}

export function NewTask ({ refreshTasks }: Props) {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const { setNotification } = useNotification()

  async function handleNewTask () {
    setLoading(true)
    try {
      const response = await taskService.create({ title })
      refreshTasks()
      setNotification(response!, 'success')
    } catch (e) {
      setNotification((e as any).message)
    } finally {
      setLoading(false)
      setTitle('')
    }
  }

  return (
    <div className="flex items-center gap-4 justify-between my-4">
      <input
        className="w-full py-1.5 bg-orange-400 dark:bg-zinc-700 rounded-lg outline-none shadow-md px-4 text-xl focus:bg-orange-300 transition-all dark:focus:bg-zinc-600 placeholder:italic placeholder:text-orange-200 dark:placeholder:text-zinc-500"
        onChange={e => setTitle(e.target.value)}
        placeholder='Adicionar Tarefa.'
        value={title}
      />
      {!loading
        ? (
        <ButtonUi onClick={handleNewTask}>
          <FaPlus /> Adicionar
        </ButtonUi>
          )
        : (
        <ButtonUi>
          <div
            className='h-6 w-6 border-transparent animate-spin border-2 rounded-full border-t-zinc-900 dark:border-t-white'
          />
        </ButtonUi>
          )}
    </div>
  )
}
