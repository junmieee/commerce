import {
  KAKAO_CLIENT_SECRET,
  KAKAO_REDIRECT_URI,
  KAKAO_REST_API_KEY,
} from 'constants/kakaoAuth'
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
  kakao_account: {
    profile: {
      nickname: string
      profile_image?: string // 640x640
      thumbnail_image?: string // 110x110
    }
    email: string
    name: string
  }
}

async function getTokenFromKakao(authCode: string) {
  const tokenUrl = `https://kauth.kakao.com/oauth/token`
  const formData = new URLSearchParams()
  formData.append('grant_type', 'authorization_code')
  formData.append('client_id', KAKAO_REST_API_KEY)
  formData.append('redirect_uri', KAKAO_REDIRECT_URI)
  formData.append('code', authCode)
  formData.append('client_secret', KAKAO_CLIENT_SECRET)

  const response: TokenResponse = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    body: formData,
  }).then((res) => res.json())

  console.log(response, 'response')
  return response
}

async function getUserFromKakao(access_token: string) {
  const userInfoUrl = `https://kapi.kakao.com/v2/user/me`
  const response: UserInfo = await fetch(userInfoUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization: `Bearer ${access_token}`,
    },
  }).then((res) => res.json())
  return response
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authCode } = req.body // 인가 코드

  // 토큰 받아오기
  const tokenResponse = await getTokenFromKakao(authCode)

  // 유저 정보 받아오기
  const userInfo = await getUserFromKakao(tokenResponse.access_token)

  console.log(userInfo, 'userInfo')

  // const {
  //   id: kakaoId,
  //   properties: { nickname, profile_image: , thumbnail_image },
  // } = userInfo

  try {
    res.status(200).json({ items: userInfo, message: 'Success' })
    console.log(userInfo, 'userInfo')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Failed` })
  }
}
