import { BsThreeDotsVertical } from 'react-icons/bs'
import * as Popover from '@radix-ui/react-popover'
import { useNotification } from '@/modules/core'
import { FaTrash } from 'react-icons/fa'
import { PopoverUi } from '@/components/ui'
import { CheckboxUI } from './checkbox'
import { taskService } from '..'
import { ModalEditTask } from './modal'

type Props = {
  task: TaskResponse
  refreshTasks: () => Promise<void>
}

export function TaskItem ({ task, refreshTasks }: Props) {
  const { setNotification } = useNotification()

  async function deleteTask (id: string) {
    try {
      const response = await taskService.delete({ id })
      setNotification(response!, 'info')
      refreshTasks()
    } catch (error) {
      setNotification((error as any).message)
    }
  }

  return (
    <div className="flex items-center justify-between bg-orange-300 dark:bg-zinc-800 py-2 px-4 rounded-xl shadow-md">
      <label className="flex items-center justify-center gap-2 text-lg">
        <CheckboxUI task={task} refreshTasks={refreshTasks} /> {task.title}
      </label>
      <Popover.Root>
        <Popover.Trigger>
          <BsThreeDotsVertical />
        </Popover.Trigger>
        <PopoverUi>
          <div className="flex flex-col items-center justify-start">
            <button
              onClick={() => deleteTask(task.id)}
              className="flex gap-2 items-center hover:bg-orange-200 dark:hover:bg-zinc-600 py-2 px-4 rounded-lg"
            >
              <FaTrash /> Deletar
            </button>
            <ModalEditTask id={task.id} refreshTasks={refreshTasks} />
          </div>
        </PopoverUi>
      </Popover.Root>
    </div>
  )
}
