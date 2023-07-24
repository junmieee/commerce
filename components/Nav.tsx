import React from 'react'
import { useRouter } from 'next/router'
import styled, { css } from 'styled-components'
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineUser,
} from 'react-icons/ai'
import { signOut, useSession } from 'next-auth/react'

// interface User {
//   name: string;
//   email: string;
//   image: string;
// }

interface NavProps {
  isActive: boolean
  showNav: () => void
  isLoggedin: string[]
  goToCart: () => void
}

interface NavWrapperProps {
  isActive: boolean
}

const Overlay = styled.div<{ isActive: boolean }>`
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const NavWrapper = styled.div<NavWrapperProps>`
  position: fixed;
  top: 0;
  right: ${({ isActive }) => (isActive ? '0' : '-400px')};
  width: 400px;
  height: 100%;
  padding: 30px 0;
  background: #fff;
  box-shadow: 3px 7px 20px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  transition: 0.2s;
  z-index: 100;
`

const NavSection = styled.section`
  margin-bottom: 30px;
  padding: 0 30px;

  &:last-child {
    margin-bottom: 0;
  }
`

const MenuTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MenuName = styled.h3`
  font-size: 24px;
  font-weight: 600;
`

const IconMenu = styled.ul`
  display: flex;
`

interface IconMenuItemProps {
  cart?: boolean
  close?: boolean
}

const MenuList = styled.div`
  padding-bottom: 30px;
  border-bottom: 1px solid #e0e0e0;
`

const CategoryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -30px;
`

const CategoryItem = styled.li`
  width: calc(25% - 30px);
  margin: 0 20px;
  text-align: center;
  border-radius: 20px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  padding: 10px;
  transition: 0.2s ease-in-out;

  &:hover {
    background: rgba(89, 98, 117, 0.2);

    /* svg {
      color: #95979e;
    } */
  }

  svg {
    width: 30px;
    height: 30px;
    display: block;
    margin: 0 auto;
  }
`

const StyledMenuName = styled.p`
  padding: 10px 0;
  font-weight: 700;
  cursor: pointer;
`

const Nav: React.FC<NavProps> = ({
  isActive,
  showNav,
  isLoggedin,
  goToCart,
}) => {
  const session = useSession()
  console.log('session', session)

  const user = session?.data?.user
  const router = useRouter()

  interface MenuItem {
    name: string
    url: string
    icon: JSX.Element
  }

  const Menu: MenuItem[] = [
    { name: '장바구니', url: '/cart', icon: <AiOutlineShoppingCart /> },
    { name: '찜', url: '/wishlist', icon: <AiOutlineHeart /> },
    {
      name: '내 정보',
      url: '/auth/login',
      icon: user ? (
        <img
          src={user.image}
          width={30}
          height={30}
          style={{ borderRadius: '50%', cursor: 'pointer' }}
          alt="profile"
          onClick={() => router.push('/my')}
        />
      ) : (
        <AiOutlineUser />
      ),
    },
  ]
  const onItemClick = (url: string) => {
    router.push(url)
    showNav()
  }
  const handleNavigate = (info: string) => {
    if (info === '로그아웃') {
      signOut().then(() => {
        router.push('/')
      })
    } else if (info === '마이페이지') {
      router.push('/my')
    } else if (info === '로그인') {
      router.push('/signin')
    } else if (info === '회원가입') {
      router.push('/signin')
    }
  }

  return (
    <>
      <Overlay isActive={isActive} onClick={showNav} />
      <NavWrapper isActive={isActive}>
        <NavSection>
          <MenuTop>
            <MenuName>메뉴</MenuName>
          </MenuTop>
        </NavSection>
        <NavSection>
          {/* <MenuName>쇼핑하기</MenuName> */}
          <CategoryList>
            {Menu.map((menu, index) => (
              <CategoryItem
                key={menu.name}
                onClick={() => onItemClick(menu.url)}
              >
                {menu.icon}
              </CategoryItem>
            ))}
          </CategoryList>
        </NavSection>
        <NavSection>
          <StyledMenuName>이용가이드</StyledMenuName>
          <StyledMenuName>공지사항</StyledMenuName>
          <StyledMenuName>고객센터</StyledMenuName>
        </NavSection>
        <NavSection>
          {isLoggedin.map((info, index) => (
            <StyledMenuName key={index} onClick={() => handleNavigate(info)}>
              {info}
            </StyledMenuName>
          ))}
        </NavSection>
      </NavWrapper>
    </>
  )
}

export default Nav
