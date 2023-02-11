import { prisma } from '@/modules/core'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  const user = await prisma?.user.findUnique({
    where: {
      email: session?.user?.email as string
    }
  })

  if (!user) {
    res.status(404).json({ error: 'Usuário não encontrado.' })
    return
  }

  const allTasksAtUser = await prisma?.task.findMany({
    where: {
      user: {
        email: session?.user?.email
      }
    }
  })

  if (allTasksAtUser) {
    await prisma?.task.deleteMany({
      where: {
        user: {
          email: session?.user?.email
        }
      }
    })
  }

  await prisma?.user.delete({
    where: {
      email: session?.user?.email as string
    }
  })

  res.json({ message: 'Usuário excluído com sucesso.' })
}
