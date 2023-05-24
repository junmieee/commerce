import { useSession, signIn, signOut } from 'next-auth/react'
import React from 'react'
import Button from './Button'

export default function KakaoLogin() {
  const { data: session } = useSession()
  return <div></div>
}
