import { authOptions } from '../../auth/[...nextauth]'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { prisma } from '@/modules/core'
import { z } from 'zod'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const session = await getServerSession(req, res, authOptions)

    if (session) {
      const querySchema = z.object({
        id: z.string()
      })

      const bodySchema = z.object({
        title: z.string()
      })

      const { title } = bodySchema.parse(req.body)
      const { id } = querySchema.parse(req.query)

      if (!title.length) {
        res.status(304)
      }

      await prisma?.task.update({
        where: {
          id
        },
        data: {
          title
        }
      })

      res.status(200).json({ message: 'Tarefa atualizada com sucesso!' })
    }

    res.status(401).json({ error: 'Usuário não autenticado.' })
  }
  res.status(400)
}
