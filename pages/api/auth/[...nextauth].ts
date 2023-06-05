import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { CLIENT_ID, CLIENT_SECRET } from 'constants/googleAuth'
import KaKaoProvider from 'next-auth/providers/kakao'
import { KAKAO_CLIENT_ID, KAKAO_CLIENT_SECRET } from 'constants/kakaoAuth'
import { signIn } from 'next-auth/react'
// 전역적으로 PrismaClient 인스턴스 생성
const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    }),
    // KaKaoProvider({
    //   clientId: process.env.KAKAO_CLIENT_ID!,
    //   clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    // }),
  ],
  // pages: {
  //   signIn: '/',
  // },
  session: {
    strategy: 'database',
    maxAge: 1 * 24 * 60 * 60,
  },
  callbacks: {
    session: async ({ session, user }) => {
      session.id = user.id

      return Promise.resolve(session)
    },
    // session: async ({ session, token, user }) => {
    //   if (account.provider === 'kakao') {
    //     // 카카오 로그인 처리 로직 작성
    //     session.id = token.sub as string;
    //     // console.log("token", token);
    //   } else if (
    //     session.id = user.id
    //   )
    //     return Promise.resolve(session)
    // },
  },
}

export default NextAuth(authOptions)
