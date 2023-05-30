import GoogleLogin from 'components/GoogleLogin'
import KakaoLogin from 'components/KakaoLogin'
import React from 'react'

export default function Login() {
  function kakaoLogin() {
    window.Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/api/auth/callback/kakao',
    })
  }
  return (
    <div
      style={{
        display: 'flex',
        height: '70vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <GoogleLogin />
      <KakaoLogin title="카카오 로그인" onClickBtn={kakaoLogin} />
    </div>
  )
}
