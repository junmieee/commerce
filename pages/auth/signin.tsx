import { GoogleLogin } from 'components/GoogleLogin'
import KakaoLogin from 'components/Login'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import { getProviders, signIn, useSession } from 'next-auth/react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]'
import AllLogin from 'components/Login'
// import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { useRouter } from 'next/router'

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
  return (
    <Container>
      <AllLoginContainer>
        <AllLogin />
        {/* <Google /> */}
        <GoogleLogin />
      </AllLoginContainer>
    </Container>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session) {
    return { redirect: { destination: '/' } }
  }

  const providers = await getProviders()
  console.log('providers', providers)

  return {
    props: { providers: providers ?? [] },
  }
}
