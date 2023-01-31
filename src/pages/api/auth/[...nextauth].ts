import nextAuth, { NextAuthOptions } from 'next-auth'
// import Credentials from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    // Credentials({
    //   name: 'credentials',
    //   credentials: {},
    //   authorize: async (credentials) => {
    //     try {
    //     } catch (error) {
    //       throw new Error((error as any).message)
    //     }
    //   }
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  // pages: {
  // signIn: '/login'
  // error: '/login'
  // }

}

export default nextAuth(authOptions)
