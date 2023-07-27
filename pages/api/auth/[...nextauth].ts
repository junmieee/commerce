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
import GithubProvider from 'next-auth/providers/github'

interface Icredentials {
  email?: string
  username?: string
  password?: string
}
// 전역적으로 PrismaClient 인스턴스 생성
const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    CredentialsProvider({
      id: 'credentials',
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com',
        },
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
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }
        console.log('credentials', credentials)

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })
        if (user) {
          console.log('found user', user)
        }

        if (!user) {
          return null
        }

        const isPasswordValid = await verifyPassword(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id + '',
          email: user.email,
          name: user.name,
          randomKey: 'Hey cool',
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'database',

    maxAge: 1 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   const isAllowedToSignIn = true
    //   if (isAllowedToSignIn) {
    //     return true
    //   } else {
    //     // Return false to display a default error message
    //     console.log('error')
    //     return false
    //     // Or you can return a URL to redirect to:
    //     // return '/unauthorized'
    //   }
    // },
    async signIn({ user, account, profile, email, credentials }) {
      if (user) {
        return true
      }
      return false
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url
      else if (url.startsWith('/')) return new URL(url, baseUrl).toString()
      return baseUrl
    },
    jwt: ({ token, user }) => {
      console.log('JWT Callback', { token, user })
      // if (user) {
      //   const u = user as unknown as any
      //   return {
      //     ...token,
      //     id: u.id,
      //     randomKey: u.randomKey,
      //   }
      // }
      if (user) {
        token.id = user.id
      }
      return token
      // console.log('Session Callback', { token, user })
      // token.id = user.id

      // return Promise.resolve(token)
    },
    session: ({ session, user }) => {
      console.log('Session Callback', { session, user })
      session.id = user.id

      return Promise.resolve(session)
    },
  },
}

export default NextAuth(authOptions)
