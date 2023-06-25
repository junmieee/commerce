import { KAKAO_CLIENT_ID } from 'constants/kakaoAuth'
import { getSession } from 'next-auth/react'

export default async function callback(req, res) {
  try {
    const { code } = req.query

    // 인가 코드를 사용하여 액세스 토큰을 받아옴
    const result = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: KAKAO_CLIENT_ID,
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/kakao`,
        code,
      }),
    })
    const data = await result.json()
    const { access_token } = data

    // 액세스 토큰을 사용하여 사용자 정보 요청
    const userResult = await fetch('https://kapi.kakao.com/v2/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    const userData = await userResult.json()
    const { id, properties } = userData

    // 세션에 사용자 정보 저장
    const session = await getSession({ req })
    session.user = {
      id: id.toString(),
      name: properties.nickname,
      image: properties.profile_image,
      provider: 'kakao',
    }
    await session.save()

    res.writeHead(302, { Location: '/' }) // 로그인 성공 시 리다이렉트할 URL
    res.end()
  } catch (error) {
    console.error(error)
    res.status(500).end('Error')
  }
}
