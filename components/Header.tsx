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
import { useSession, signIn } from 'next-auth/react'
import { MEMBER, NON_MEMBER, TAKE } from '../constants/products'
import { IconSearch } from '@tabler/icons-react'
import { Input } from '@mantine/core'
import useDebounce from 'hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { products } from '@prisma/client'

const SearchBtn = styled.button`
  display: flex;
  width: 3rem;
  height: 2rem;
  background-color: purple;
  left: 2px;
  margin-right: 3rem;
  border-radius: 10px;
  color: white;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`

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
  const [keyward, setKeyword] = useState('')

  // const debouncedKeyword = useDebounce<string>(keyward)
  const [selectedCategory, setSelectedCategory] = useState<string>('-1')
  const debouncedKeyword = useDebounce<string>(keyward)

  const router = useRouter()

  // const { data: products } = useQuery<
  //   { items: products[] },
  //   unknown,
  //   products[]
  // >(
  //   [
  //     `/api/get-products?skip=${TAKE * (activePage - 1)
  //     }&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${searchKeyword}`,
  //   ],
  //   () =>
  //     fetch(
  //       `/api/get-products?skip=${TAKE * (activePage - 1)
  //       }&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${searchKeyword}`
  //     ).then((res) => res.json()),
  //   {
  //     select: (data) => data.items,
  //   }
  // )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handleSearch = () => {
    router.push({
      pathname: '/products',
      query: { search: keyward },
    })
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  // JWT를 이용한 세션 정보 가져오기
  const session = useSession()
  console.log('session', session)

  const user = session?.data?.user
  // console.log('user', user)
  const isLoggedin = user ? MEMBER : NON_MEMBER

  const showNav = () => {
    setIsActive(!isActive)
  }

  const goToCart = () => {
    router.push('/cart')
  }

  return (
    <div className="mt-12 mb-12 px-56  sm:px-12 xl:mx-80">
      <div className="w-full flex h-50 items-center">
        <StyledIcon onClick={() => router.push('/')}>
          <IconHome />
        </StyledIcon>

        {/* <span className="" /> */}

        <Input
          className="relative m-auto mr-6 w-1/2  focus:border-purple-100	 "
          icon={
            <IconSearch
              style={{ position: 'absolute', right: '4px', left: '8px' }}
            />
          }
          placeholder="검색어를 입력해주세요."
          value={keyward}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <SearchBtn onClick={handleSearch}>
          <IconSearch />
        </SearchBtn>

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
            className="mr-2"
          />
        ) : (
          <StyledIcon className="mr-4" onClick={() => signIn()}>
            <IconUser />
          </StyledIcon>
        )}
        <StyledIcon onClick={showNav}>
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
