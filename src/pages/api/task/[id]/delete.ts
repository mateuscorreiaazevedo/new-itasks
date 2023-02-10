import { authOptions } from '../../auth/[...nextauth]'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { prisma } from '@/modules/core'
import { z } from 'zod'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions)

    if (session) {
      const querySchema = z.object({
        id: z.string()
      })

      const { id } = querySchema.parse(req.query)

      await prisma?.task.delete({
        where: {
          id
        }
      })

      res.status(200).json({ message: 'Tarefa deletada.' })
    }

    res.status(401).json({ error: 'Usuário não autenticado.' })
  }
  res.status(400)
}
