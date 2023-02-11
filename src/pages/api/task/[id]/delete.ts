import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/modules/core'
import { z } from 'zod'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
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
