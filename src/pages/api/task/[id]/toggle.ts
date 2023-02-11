import { prisma } from '@/modules/core'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  const querySchema = z.object({ id: z.string() })

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

  res.status(200).json({ message: 'Tarefa atualizada com sucesso!' })
}
