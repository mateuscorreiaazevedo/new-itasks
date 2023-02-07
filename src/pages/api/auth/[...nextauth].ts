import { prisma } from '@/modules/core'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import nextAuth, { NextAuthOptions } from 'next-auth'
import Github from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })
  ],
  adapter: PrismaAdapter(prisma!),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login',
    error: '/login',
    signOut: '/login'
  }

}

export default nextAuth(authOptions)
