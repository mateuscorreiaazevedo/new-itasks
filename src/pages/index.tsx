import { useNotification } from '@/modules/core'
import { authOptions } from './api/auth/[...nextauth]'
import { NewTask, TaskItem, taskService } from '@/modules/tasks'
import { FaInfoCircle } from 'react-icons/fa'
import { getServerSession } from 'next-auth'
import { GetServerSideProps } from 'next'
import { Task } from '@prisma/client'
import React from 'react'

type Props = {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  data: {
    data: Task[]
    error?: string
    message?: string
  }
}

export default function Home ({ data }: Props) {
  const [tasks, setTasks] = React.useState<Task[] | undefined>(data.data)
  const { setNotification } = useNotification()

  const refreshTasks = async () => {
    try {
      const response = await taskService.getAll()
      setTasks(response?.data)
    } catch (error) {
      setNotification((error as any).message)
    }
  }

  return (
    <div>
      <NewTask refreshTasks={refreshTasks} />
      <div className="flex flex-col gap-3">
        {tasks?.length
          ? (
              tasks?.map(task => (
            <div key={task.id}>
              <TaskItem task={task} refreshTasks={refreshTasks} />
            </div>
              ))
            )
          : (
          <div className="w-full h-20 bg-blue-400 flex gap-4 items-center justify-center md:text-4xl sm:text-2xl text-xl sm:rounded-xl shadow-md text-white">
            <FaInfoCircle />
            <h2 className="font-semibold">Nenhuma tarefa encontrada</h2>
          </div>
            )}
      </div>
    </div>
  )
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
  } else {
    const data = await taskService.getAll()

    return {
      props: {
        user: session.user,
        data
      }
    }
  }
}
