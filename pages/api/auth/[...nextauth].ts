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

// import NextAuth, { NextAuthOptions } from 'next-auth';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { PrismaClient } from '@prisma/client';
// import { CLIENT_ID, CLIENT_SECRET } from 'constants/googleAuth';
// import { signIn } from 'next-auth/react';
// import GoogleProvider from 'next-auth/providers/google';
// import { KAKAO_CLIENT_ID, KAKAO_CLIENT_SECRET } from 'constants/kakaoAuth';
// import KaKaoProvider from 'next-auth/providers/kakao';
// import axios from 'axios';

// const prisma = new PrismaClient();

// const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: CLIENT_ID,
//       clientSecret: CLIENT_SECRET,
//     }),
//     KaKaoProvider({
//       clientId: KAKAO_CLIENT_ID,
//       clientSecret: KAKAO_CLIENT_SECRET,
//     }),
//   ],
//   session: {
//     strategy: 'database',
//     maxAge: 1 * 24 * 60 * 60,
//   },
//   callbacks: {
//     session: async ({ session, user }) => {
//       session.id = user.id;
//       return Promise.resolve(session);
//     },
//     signIn: async ({ provider, code, redirectUri }) => {
//       if (provider === 'kakao') {
//         try {
//           const response = await axios.post(
//             'https://kauth.kakao.com/oauth/token',
//             new URLSearchParams({
//               grant_type: 'authorization_code',
//               client_id: KAKAO_CLIENT_ID,
//               client_secret: KAKAO_CLIENT_SECRET,
//               redirect_uri: redirectUri,
//               code,
//             }).toString(),
//             {
//               headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
//               },
//             }
//           );

//           const { access_token } = response.data;
//           const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
//             headers: {
//               Authorization: `Bearer ${access_token}`,
//               'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
//             },
//           });

//           const { id } = userResponse.data;

//           // 사용자 정보를 데이터베이스에 저장
//           await prisma.user.upsert({
//             where: { id: id },
//             update: {},
//             create: {
//               id: id,
//             },
//           });

//           return Promise.resolve(true);
//         } catch (error) {
//           console.error('Kakao login error:', error);
//           return Promise.resolve(false);
//         }
//       }

//       return Promise.resolve(true);
//     },
//   },
// };

// export default NextAuth(authOptions);

// // import NextAuth, { NextAuthOptions } from 'next-auth';
// // import { PrismaAdapter } from '@next-auth/prisma-adapter';
// // import { PrismaClient } from '@prisma/client';
// // import { CLIENT_ID, CLIENT_SECRET } from 'constants/googleAuth';
// // import { signIn } from 'next-auth/react';
// // import GoogleProvider from 'next-auth/providers/google';
// // import { KAKAO_CLIENT_ID, KAKAO_CLIENT_SECRET } from 'constants/kakaoAuth';
// // import KaKaoProvider from 'next-auth/providers/kakao';
// // import axios from 'axios';

// // const prisma = new PrismaClient();

// // const authOptions: NextAuthOptions = {
// //   adapter: PrismaAdapter(prisma),
// //   providers: [
// //     GoogleProvider({
// //       clientId: CLIENT_ID,
// //       clientSecret: CLIENT_SECRET,
// //     }),
// //     KaKaoProvider({
// //       clientId: KAKAO_CLIENT_ID,
// //       clientSecret: KAKAO_CLIENT_SECRET,
// //     }),
// //   ],
// //   session: {
// //     strategy: 'database',
// //     maxAge: 1 * 24 * 60 * 60,
// //   },
// //   callbacks: {
// //     session: async ({ session, user }) => {
// //       session.id = user.id;
// //       return Promise.resolve(session);
// //     },
// //     signIn: async ({ provider, code, redirectUri, ...rest }) => {
// //       if (provider === 'kakao') {
// //         try {
// //           const response = await axios.post(
// //             'https://kauth.kakao.com/oauth/token',
// //             new URLSearchParams({
// //               grant_type: 'authorization_code',
// //               client_id: KAKAO_CLIENT_ID,
// //               client_secret: KAKAO_CLIENT_SECRET,
// //               redirect_uri: redirectUri,
// //               code,
// //             }).toString(),
// //             {
// //               headers: {
// //                 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
// //               },
// //             }
// //           );

// //           const { access_token } = response.data;
// //           const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
// //             headers: {
// //               Authorization: `Bearer ${access_token}`,
// //               'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
// //             },
// //           });

// //           const { id } = userResponse.data;

// //           // 사용자 정보를 데이터베이스에 저장
// //           await prisma.user.upsert({
// //             where: { id: id },
// //             update: {},
// //             create: {
// //               id: id,
// //             },
// //           });

// //           return Promise.resolve(true);
// //         } catch (error) {
// //           console.error('Kakao login error:', error);
// //           return Promise.resolve(false);
// //         }
// //       }

// //       return Promise.resolve(true);
// //     },
// //   },
// // };

// // export default NextAuth(authOptions);
