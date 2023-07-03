import {
  IconHeart,
  IconHome,
  IconShoppingCart,
  IconUser,
} from '@tabler/icons-react'
import { AiOutlineMenu } from 'react-icons/ai'
import Nav from './Nav'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useSession } from 'next-auth/react'
import { MEMBER, NON_MEMBER } from '../constants/products'

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

export default function Header() {
  const [isActive, setIsActive] = useState(false)
  const { data, status } = useSession()
  const isLoggedin = data ? MEMBER : NON_MEMBER

  const router = useRouter()

  const showNav = () => {
    setIsActive(!isActive)
  }

  const goToCart = () => {
    router.push('/cart')
  }

  // JWT를 이용한 세션 정보 가져오기
  const session = useSession()
  console.log('session', session)
  const user = session?.data?.user

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

        {user ? (
          <img
            src={user?.image}
            width={30}
            height={30}
            style={{ borderRadius: '50%', cursor: 'pointer' }}
            alt="profile"
            onClick={() => router.push('/my')}
          />
        ) : (
          <StyledIcon onClick={() => router.push('/auth/login')}>
            <IconUser />
          </StyledIcon>
        )}
        <StyledIcon className="mr-4" onClick={showNav}>
          <AiOutlineMenu size={25} />
        </StyledIcon>
        <Nav
          isActive={isActive}
          showNav={showNav}
          isLoggedin={isLoggedin}
          goToCart={goToCart}
        />
      </div>
    </div>
  )
}
