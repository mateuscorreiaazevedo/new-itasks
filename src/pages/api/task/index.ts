import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { prisma } from '@/modules/core'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  const tasks = await prisma?.task.findMany({
    where: {
      user: { email: session?.user?.email }
    }
  })

  if (!tasks?.length) {
    res.status(200).json({ message: 'Nenhuma tarefa encontrada.' })
    return
  }

  res.status(200).json({ data: tasks })
}
