import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/modules/core'
import { z } from 'zod'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
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
