import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { prisma } from '@/modules/core'
import { z } from 'zod'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions)

    if (session) {
      const bodySchema = z.object({
        title: z.string()
      })
      const { title } = bodySchema.parse(req.body)

      if (!title.length) {
        res.status(422).json({ error: 'O campo título não pode estar vazio.' })
        return
      }

      const newTask = await prisma?.task.create({
        data: {
          title,
          user: { connect: { email: session.user?.email as string } }
        }
      })

      if (!newTask) {
        res.status(422).json({ error: 'A tarefa não pode ser adicionada.' })
        return
      }

      res.status(201).json({ message: 'Tarefa Adicionada com sucesso!' })
    }

    res.status(401).json({ error: 'Usuário não autenticado.' })
  }

  res.status(400)
}
