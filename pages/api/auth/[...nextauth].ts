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
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        name: { label: 'name', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      // async authorize(credentials) {

      //   const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/check-credentials`, {
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
      async authorize(credentials: Icredentials, req) {
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

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        )

        if (!user) {
          throw new Error('No user found!')
        }
        if (!isValid) {
          throw new Error('Password incorrect')
        }
        return { name: user.name, email: user.email }

        // const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/check-credentials`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/x-www-form-urlencoded",
        //     accept: "application/json",
        //   },
        //   body: Object.entries(credentials)
        //     .map((e) => e.join("="))
        //     .join("&"),
        // }).then((res) => res.json())
        //   .catch((err) => {
        //     return null;
        //   });

        // if (response) {
        //   return response;
        // } else {
        //   return null;
        // }

        //   const data = await response.json();
        //   if(response.ok && data?.token) {
        //   return data;
        // }
        //     return Promise.reject(new Error(data?.errors));
        // },
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
