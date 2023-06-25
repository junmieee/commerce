import { AllLogin } from 'components/GoogleLogin'
import KakaoLogin from 'components/KakaoLogin'
import React from 'react'
import styled from 'styled-components'
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import { getProviders, signIn, useSession } from 'next-auth/react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]'
import { googleLogout } from '@react-oauth/google'

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

export default function Login({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session, status } = useSession()

  return (
    <Container>
      <AllLoginContainer>
        {/* <Google /> */}
        {/* <AllLogin /> */}
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: '/' } }
  }

  const providers = await getProviders()
  console.log('providers', providers)

  return {
    props: { providers: providers ?? [] },
  }
}
