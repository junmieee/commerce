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

export default function Login({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="mb-12 xl:px-96 md:px-56 p-12">
      <div className="mb-8">
        <AllLogin />
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
