import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { CLIENT_ID } from 'constants/googleAuth'
import Image from 'next/image'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'

export default function Google() {
  // const router = useRouter()
  // const { code: authCode, error: kakaoServerError } = router.query

  // const loginHandler = useCallback(
  //   async (code: string | string[]) => {
  //     // 백엔드에 전송
  //     const response: ResponseType = await fetch('/api/auth/kakao-login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         authCode: code,
  //       }),
  //     }).then((res) => res.json())

  //     if (response.ok) {
  //       // 성공하면 홈으로 리다이렉트
  //       router.push('/')
  //     } else {
  //       // 실패하면 에러 페이지로 리다이렉트
  //       router.push('/notifications/authentication-failed')
  //     }
  //   },
  //   [router]
  // )

  // useEffect(() => {
  //   if (authCode) {
  //     loginHandler(authCode)

  //     // 인가코드를 제대로 못 받았을 경우에 에러 페이지를 띄운다.
  //   } else if (kakaoServerError) {
  //     router.push('/notifications/authentication-failed')
  //   }
  // }, [loginHandler, authCode, kakaoServerError, router])

  return (
    <>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <div style={{ display: 'flex' }}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              fetch(
                `/api/auth/sign-up?credential=${credentialResponse.credential}`
              )
                .then((res) => res.json())
                .then((data) => console.log(data))
            }}
            onError={() => {
              console.log('Login Failed')
            }}
          />
        </div>
      </GoogleOAuthProvider>
      {/* <div onClick={loginHandler}>
        <Image
          src="/images/kakao_login_medium_narrow.png"
          alt="kakao-login"
          width={20}
          height={20}
        />
        <a>카카오 로그인</a>
      </div> */}
    </>
  )
}
