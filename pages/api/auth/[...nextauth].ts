import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { CLIENT_ID, CLIENT_SECRET } from 'constants/googleAuth'
import KaKaoProvider from 'next-auth/providers/kakao'
import { KAKAO_CLIENT_ID, KAKAO_CLIENT_SECRET } from 'constants/kakaoAuth'
import { signIn } from 'next-auth/react'
import CredentialsProvider from 'next-auth/providers/credentials'
import { verifyPassword } from 'hooks/auth'

// 전역적으로 PrismaClient 인스턴스 생성
const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',

      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        email: { label: 'Password', type: 'email' },

        password: { label: 'Password', type: 'password' },
        // },
        // async authorize(credentials) {

        //   const res = await fetch("/api/auth/all-sign-up", {
        //     method: 'POST',
        //     body: JSON.stringify(credentials),
        //     headers: { "Content-Type": "application/json" }
        //   })
        //   const user = await res.json()

        //   // If no error and we have user data, return it
        //   if (res.ok && user) {
        //     return user
        //   }
        //   // Return null if user data could not be retrieved
        //   return null

        // }
        async authorize(credentials, req) {
          const user = await prisma.user.findUnique({
            where: {
              email: String(credentials.email),
            },
            select: {
              name: true,
              email: true,
              password: true,
            },
          })

          if (!user) {
            throw new Error('No user found!')
          }

          const isValid = await verifyPassword(
            credentials.password,
            user.password
          )

          if (!isValid) {
            throw new Error('Could not log you in!')
          }
          return { name: user.name, email: user.email }
        },
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'database',
    maxAge: 1 * 24 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.email = user.email
      }

      return token
    },
    session: async ({ session, user }) => {
      session.id = user.id

      return Promise.resolve(session)
    },
  },
}

export default NextAuth(authOptions)
