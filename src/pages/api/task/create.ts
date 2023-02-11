import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { prisma } from '@/modules/core'
import { z } from 'zod'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  const bodySchema = z.object({ title: z.string() })
  const { title } = bodySchema.parse(req.body)

  if (!title.length) {
    res.status(422).json({ error: 'O campo título não pode estar vazio.' })
    return
  }

  await prisma?.task.create({
    data: {
      title,
      user: { connect: { email: session?.user?.email as string } }
    }
  })

  res.status(201).json({ message: 'Tarefa Adicionada com sucesso!' })
  res.end()
}
