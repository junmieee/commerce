import { GoogleLogin } from 'components/GoogleLogin'
import { KakaoLogin } from 'components/KakaoLogin'
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
import { GithubLogin } from 'components/GithubLogin'

const Title = styled.h2`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 16px;
  color: #353b48;
`

export default function Login({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="mb-12 xl:px-96 md:px-56 p-12">
      {/* <div className="mb-8">
        <AllLogin />
      </div> */}
      <Title>로그인</Title>
      <div className="reletive">
        <div className="absolute left-52 right-52 border-t border-gray-300" />
        <div className="relative -top-3 text-center">
          <span className="bg-white px-2 text-sm text-gray-500">
            sign in with
          </span>
        </div>
      </div>

      <GoogleLogin />
      <GithubLogin />
    </div>
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
