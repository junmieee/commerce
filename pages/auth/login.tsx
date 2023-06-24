import { AllLogin } from 'components/GoogleLogin'
import KakaoLogin from 'components/KakaoLogin'
import React from 'react'
import styled from 'styled-components'
import Google from './google'

const Container = styled.div`
  margin-bottom: 10px;
  height: 100;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const AllLoginContainer = styled.div`
  margin-bottom: 10px;
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

      {/* <KakaoBtnContainer>
        <KakaoBtn
          src="/images/kakao_login_medium_narrow.png"
          onClick={kakaoLogin}
          title="kakao login"
        />
      </KakaoBtnContainer> */}
    </Container>
  )
}
