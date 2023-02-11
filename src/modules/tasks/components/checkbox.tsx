import * as Checkbox from '@radix-ui/react-checkbox'
import { BsCheckLg } from 'react-icons/bs'
import { taskService } from '..'
import React from 'react'
import { useNotification } from '@/modules/core'
import { Task } from '@prisma/client'

type Props = {
  task: Task
  refreshTasks: () => Promise<void>

}

export const CheckboxUI = ({ task, refreshTasks }: Props) => {
  const { setNotification } = useNotification()

  async function toggle (id: string) {
    try {
      const response = await taskService.toggle({ id })
      setNotification(response!, 'success')
      refreshTasks()
    } catch (error) {
      setNotification((error as any).message)
    }
  }

  return (
    <Checkbox.Root
      className="group flex items-center justify-center focus:outline-none disabled:cursor-not-allowed"
      onCheckedChange={() => toggle(task!.id)}
      checked={task?.status}
    >
      <div className="h-8 w-8 rounded-md flex items-center justify-center border-2 transition-all border-orange-400 bg-orange-300 dark:border-zinc-600 dark:bg-zinc-700 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-400 group-focus-within:outline-orange-400 group-focus:ring-orange-300">
        <Checkbox.Indicator>
          <BsCheckLg />
        </Checkbox.Indicator>
      </div>
    </Checkbox.Root>
  )
}
