import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import {
  CLIENT_ID,
  CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_SECRET,
} from 'constants/googleAuth'
import KaKaoProvider from 'next-auth/providers/kakao'
import { KAKAO_CLIENT_ID, KAKAO_CLIENT_SECRET } from 'constants/kakaoAuth'
import { signIn } from 'next-auth/react'
import CredentialsProvider from 'next-auth/providers/credentials'
import { verifyPassword } from 'hooks/auth'
import GithubProvider from 'next-auth/providers/github'
import Providers from 'next-auth/providers'

interface Icredentials {
  email?: string
  username?: string
  password?: string
}
// 전역적으로 PrismaClient 인스턴스 생성
const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: CLIENT_ID as string,
      clientSecret: CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: GITHUB_CLIENT_ID as string,
      clientSecret: GITHUB_SECRET as string,
    }),
    KaKaoProvider({
      clientId: KAKAO_CLIENT_ID,
      clientSecret: KAKAO_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  // session: {
  //   strategy: 'database',
  //   maxAge: 1 * 24 * 60 * 60,
  //   updateAge: 24 * 60 * 60,
  // },
  session: {
    strategy: 'database',
    maxAge: 1 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  callbacks: {
    session: async ({ session, user }) => {
      session.id = user.id
      return Promise.resolve(session)
    },
    // jwt: ({ token, user }) => {
    //   if (user) {
    //     const u = user as unknown as any;
    //     return {
    //       ...token,
    //       id: u.id,
    //       randomKey: u.randomKey,
    //     };
    //   }
    //   return token;
    // },
  },
}

// const handler = NextAuth(authOptions)

export default NextAuth(authOptions)

// export { handler as GET, handler as POST }
