import { useSession, signIn, signOut } from 'next-auth/react'
import React from 'react'
import Image from 'next/image'
import Button from './Button'

interface KakaoLoginProps {
  title: string
  onClickBtn: () => void
}

export default function KakaoLogin({ title, onClickBtn }: KakaoLoginProps) {
  return (
    <div style={{ width: '100px', height: 'auto' }}>
      <Image
        src="/image/kakao_login_medium_narrow.png"
        alt={title}
        width={100}
        height={50}
      />
      <Button onClick={onClickBtn}>{title}</Button>
    </div>
  )
}
