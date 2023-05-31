//

import { NextApiRequest, NextApiResponse } from 'next'

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

async function getTokenFromKakao(authCode: string) {
  const tokenUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&code=${authCode}`
  const response: TokenResponse = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json())
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { authCode } = req.body // 인가 코드

  // 토큰 받아오기
  const tokenResponse = await getTokenFromKakao(authCode)

  // 유저 정보 받아오기
  const userInfo = await getUserFromKakao(tokenResponse)
  const {
    id: kakaoId,
    properties: { nickname, profile_image, thumbnail_image },
  } = userInfo

  try {
    res.status(200).json({ items: userInfo, message: 'Success' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Failed` })
  }
}
