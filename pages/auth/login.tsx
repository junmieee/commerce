import { AllLogin } from 'components/GoogleLogin'
import KakaoLogin from 'components/KakaoLogin'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
`

const KakaoBtnContainer = styled.div`
  width: 100px;
  height: 100px;
  margin-top: 20px;
  cursor: pointer;
`
const KakaoBtn = styled.img``

export default function Login() {
  function kakaoLogin() {
    window.Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/auth/kakao',
    })
  }

  return (
    <Container>
      <AllLogin />

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
