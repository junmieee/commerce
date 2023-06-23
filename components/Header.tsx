import {
  IconHeart,
  IconHome,
  IconShoppingCart,
  IconUser,
} from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import styled from '@emotion/styled'

const StyledIcon = styled.div`
  display: inline-block;
  margin-right: 8px;
  cursor: pointer;
  position: relative;

  &:hover::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: rgba(128, 128, 128, 0.2);
    transition: ease-in-out 0.3s;
  }
`

const getUserFromKakao = async () => {
  try {
    const response = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error('Failed to fetch user data from Kakao')
    }
  } catch (error) {
    console.error('Error fetching user data from Kakao:', error)
    throw error
  }
}

export default function Header() {
  const { data: session } = useSession()
  console.log('세션', session)
  const router = useRouter()

  return (
    <div className="mt-12 mb-12">
      <div className="w-full flex h-50 items-center">
        <StyledIcon onClick={() => router.push('/')}>
          <IconHome />
        </StyledIcon>
        <span className="m-auto" />
        <StyledIcon className="mr-4" onClick={() => router.push('/wishlist')}>
          <IconHeart />
        </StyledIcon>
        <StyledIcon className="mr-4" onClick={() => router.push('/cart')}>
          <IconShoppingCart />
        </StyledIcon>
        {session ? (
          <Image
            src={session.user?.image}
            width={30}
            height={30}
            style={{ borderRadius: '50%' }}
            alt="profile"
            onClick={() => router.push('/my')}
          />
        ) : (
          <StyledIcon onClick={() => router.push('/auth/login')}>
            <IconUser />
          </StyledIcon>
        )}
      </div>
    </div>
  )
}
