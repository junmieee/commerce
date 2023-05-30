import { KAKAO_REDIRECT_URI, KAKAO_REST_API_KEY } from 'constants/kakaoAuth'
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './[...nextauth]'

interface TokenResponse {
  token_type: string
  access_token: string
  refresh_token: string
  id_token: string
  expires_in: number
  refresh_token_expires_in: string
  scope: string
}

interface UserInfo {
  id: number
  connected_at: string
  properties: {
    nickname: string
    profile_image?: string // 640x640
    thumbnail_image?: string // 110x110
  }
}

const prisma = new PrismaClient()

async function getTokenFromKakao(authCode: string) {
  const tokenUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${authCode}`
  const response: TokenResponse = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json())
  console.log(response, 'response')
  return response
}

async function getUserFromKakao({ access_token }: TokenResponse) {
  const userInfoUrl = 'https://kapi.kakao.com/v2/user/me'
  const response: UserInfo = await fetch(userInfoUrl, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  }).then((res) => res.json())
  return response
}

async function updateSession(kakaoId: number, newSessionId: string) {
  const session = await prisma.session.update({
    where: {
      userId: kakaoId.toString(),
    },
    data: {
      sessionToken: newSessionId,
    },
  })
  return session
}

async function createSessionAndConnectToUser(
  kakaoId: number,
  newSessionId: string
) {
  const user = await prisma.user.update({
    where: {
      userId = kakaoId.toString(),
    },
    data: {
      session: {
        create: { kakaoId, sessionId: newSessionId },
      },
    },
  })
  return user
}

async function createUser(
  {
    id: kakaoId,
    properties: { nickname, profile_image, thumbnail_image },
  }: UserInfo,
  newSessionId: string
) {
  const user = await prisma.user.create({
    data: {
      name: nickname,
      userId: kakaoId.toString(), // Assuming userId is a string in the User model
      loggedFrom: 'Kakao',
      image: profile_image || null, // Assuming the User model has an `image` field instead of `profileImage`
      sessions: {
        create: {
          sessionToken: newSessionId,
        },
      },
    },
  })
  return user
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const session = await getServerSession(req, res, authOptions)
  const { authCode } = req.body

  const tokenResponse = await getTokenFromKakao(authCode)
  const userInfo = await getUserFromKakao(tokenResponse)
  const {
    id: kakaoId,
    properties: { nickname, profile_image, thumbnail_image },
  } = userInfo

  let user

  try {
    await updateSession(kakaoId, session.id)
  } catch {
    try {
      user = await createSessionAndConnectToUser(kakaoId, session.id)
    } catch {
      user = await createUser(userInfo, session.id)
    }
  }

  req.session.user = { id: session.id }
  await req.session.save()
  return res.json({ ok: true })
}

// import { KAKAO_REDIRECT_URI, KAKAO_REST_API_KEY } from 'constants/kakaoAuth';
// import { NextApiRequest, NextApiResponse } from 'next';

// interface TokenResponse {
//     token_type: string;
//     access_token: string;
//     refresh_token: string;
//     id_token: string;
//     expires_in: number;
//     refresh_token_expires_in: string;
//     scope: string;
// }

// interface UserInfo {
//     id: number;
//     connected_at: string;
//     properties: {
//         nickname: string;
//         profile_image?: string; // 640x640
//         thumbnail_image?: string; // 110x110
//     };
// }

// async function getTokenFromKakao(authCode: string) {
//     const tokenUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${authCode}`;
//     const response: TokenResponse = await fetch(tokenUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//     }).then((res) => res.json());
//     return response;
// }

// async function getUserFromKakao({ access_token }: TokenResponse) {
//     const userInfoUrl = 'https://kapi.kakao.com/v2/user/me';
//     const response: UserInfo = await fetch(userInfoUrl, {
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${access_token}`,
//         },
//     }).then((res) => res.json());
//     return response;
// }

// const handler = async (
//     req: NextApiRequest,
//     res: NextApiResponse<ResponseType>
// ) => {
//     const { authCode } = req.body;

//     const tokenResponse = await getTokenFromKakao(authCode);
//     const userInfo = await getUserFromKakao(tokenResponse);
//     const {
//         id: kakaoId,
//         properties: { nickname, profile_image, thumbnail_image },
//     } = userInfo;

//     let user;
//     const newSessionId = createSession(kakaoId);

//     try {
//         await updateSession(kakaoId, newSessionId);
//     } catch {
//         try {
//             user = await createSessionAndConnectToUser(kakaoId, newSessionId);
//         } catch {
//             user = await createUser(userInfo, newSessionId);
//         }
//     }

//     req.session.user = { id: newSessionId };
//     await req.session.save();
//     return res.json({ ok: true });
// };

// export default withApiSession(withHandler({ methods: ['POST'], handler }));
