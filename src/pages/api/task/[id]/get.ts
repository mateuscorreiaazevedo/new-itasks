import { authOptions } from '../../auth/[...nextauth]'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { prisma } from '@/modules/core'
import { z } from 'zod'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
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

      res.status(200).json({ data: task })
    }

    res.status(401).json({ error: 'Usuário não autenticado.' })
  }
  res.status(400)
}
