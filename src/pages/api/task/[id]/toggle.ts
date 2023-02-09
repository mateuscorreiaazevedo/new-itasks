import { prisma } from '@/modules/core'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '../../auth/[...nextauth]'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const session = await getServerSession(req, res, authOptions)

    if (session) {
      const querySchema = z.object({
        id: z.string()
      })

      const { id } = querySchema.parse(req.query)

      const task = await prisma?.task.findUnique({
        where: {
          id
        }
      })

      if (task?.status) {
        await prisma?.task.update({
          data: {
            status: false
          },
          where: {
            id
          }
        })
      } else {
        await prisma?.task.update({
          data: {
            status: true
          },
          where: {
            id
          }
        })
      }

      res.status(200).json({ message: 'Tarefa autalizada com sucesso!' })
    }

    res.status(401).json({ error: 'Usuário não autenticado.' })
  }
  res.status(400)
}
