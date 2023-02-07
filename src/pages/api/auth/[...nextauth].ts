import { prisma } from '@/modules/core'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import nextAuth, { NextAuthOptions } from 'next-auth'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Discord from 'next-auth/providers/discord'

export const authOptions: NextAuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    }),
    Discord({
      clientId: process.env.DISCORD_ID!,
      clientSecret: process.env.DISCORD_SECRET!
    }),
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
