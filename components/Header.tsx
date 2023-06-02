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
  margin-right: 4px;
  cursor: pointer;

  &:hover {
    svg {
      fill: #ecf0f1;
    }
  }

  &:focus {
    svg {
      fill: #000;
    }
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
