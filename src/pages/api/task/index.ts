import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { prisma } from '@/modules/core'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const session = await getServerSession(req, res, authOptions)

    if (session) {
      const tasks = await prisma?.task.findMany({
        where: {
          user: { email: session.user?.email }
        }
      })

      if (!tasks?.length) {
        res.status(200).json({ message: 'Nenhuma tarefa encontrada.' })
        return
      }

      res.status(200).json({ data: tasks })
    }

    res.status(401).json({ error: 'Usuário não autenticado.' })
  }

  res.status(400)
}
