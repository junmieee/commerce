import { AllLogin } from 'components/GoogleLogin'
import KakaoLogin from 'components/KakaoLogin'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`

const AllLoginContainer = styled.div`
  margin-bottom: 10px;
`

const KakaoBtnContainer = styled.div`
  margin-top: 10px;
  cursor: pointer;
  border-radius: 12px;
`

const KakaoBtn = styled.img`
  height: 60px;
  width: 240px;
`

export default function Login() {
  function kakaoLogin() {
    window.Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/auth/kakao',
    })
  }

  return (
    <Container>
      <AllLoginContainer>
        <AllLogin />
      </AllLoginContainer>

      <KakaoBtnContainer>
        <KakaoBtn
          src="/images/kakao_login_medium_narrow.png"
          onClick={kakaoLogin}
          title="kakao login"
        />
      </KakaoBtnContainer>
    </Container>
  )
}
