import { categories, products } from '@prisma/client'
import React from 'react'
import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { Input, Pagination, SegmentedControl, Select } from '@mantine/core'
import { CATEGORY_MAP, FILTERS, TAKE } from 'constants/products'
import { IconSearch } from '@tabler/icons-react'
import useDebounce from 'hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import Header from 'components/Header'

export default function Products() {
  const router = useRouter()
  const { search } = router.query

  const { data: session } = useSession()
  const [activePage, setPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string>('-1')
  const [selectedFilter, setFilter] = useState<string | null>(FILTERS[0].value)
  const [keyward, setKeyword] = useState('')

  const debouncedKeyword = useDebounce<string>(keyward)

  const { data: categories } = useQuery<
    { items: categories[] },
    unknown,
    categories[]
  >(
    [`/api/get-categories`],
    () => fetch(`/api/get-categories`).then((res) => res.json()),
    { select: (data) => data.items }
  )

  const { data: total } = useQuery(
    [
      `/api/get-products-count?category=${selectedCategory}&contains=${debouncedKeyword}`,
    ],
    () =>
      fetch(
        `/api/get-products-count?category=${selectedCategory}&contains=${debouncedKeyword}`
      )
        .then((res) => res.json())
        .then((data) => Math.ceil(data.items / TAKE))
  )

  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >(
    [
      `/api/get-products?skip=${
        TAKE * (activePage - 1)
      }&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${debouncedKeyword}`,
    ],
    () =>
      fetch(
        `/api/get-products?skip=${
          TAKE * (activePage - 1)
        }&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${debouncedKeyword}`
      ).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  return (
    <div>
      <div className="flex w-96 relative items-center justify-center">
        <IconSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
        <input
          placeholder="검색어를 입력해 주세요."
          value={keyward}
          onChange={handleChange}
          className="w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border border-gray-700			"
        />
      </div>
      {/* 광고 Display*/}
      <div className="h-36 mt-4 bg-sky-500/100" />

      <div className="mt-[30px] mb-36">
        {/* <Header /> */}
        <div className="mb-4"></div>
        <div className="mb-4">
          <Select value={selectedFilter} onChange={setFilter} data={FILTERS} />
        </div>
        {categories && (
          <div className="mb-4">
            <SegmentedControl
              value={selectedCategory}
              onChange={setSelectedCategory}
              data={[
                {
                  label: 'ALL',
                  value: ' -1',
                },
                ...categories.map((category) => ({
                  label: category.name,
                  value: String(category.id),
                })),
              ]}
              color="dark"
            />
          </div>
        )}

        {products && (
          <div className="w-full grid grid-cols-3 gap-5">
            {products.map((item) => (
              <div
                key={item.id}
                style={{ maxWidth: 310 }}
                onClick={() =>
                  router.push({
                    pathname: `/products/${item.id}`,
                    query: { id: item.id },
                  })
                }
              >
                <Image
                  className="rounded"
                  alt={item.name}
                  src={item.image_url ?? ''}
                  width={310}
                  height={390}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPk4eapBwAA8gCkI4u+qAAAAABJRU5ErkJggg==
                "
                />
                <div className="flex">
                  <span>{item.name}</span>
                  <span className="ml-auto">
                    {item.price.toLocaleString('ko-KR')}원
                  </span>
                </div>
                <span className="text-zinc-400">
                  {CATEGORY_MAP[item.category_id - 1]}
                </span>
              </div>
            ))}
          </div>
        )}
        <div className="w-full flex mt-5">
          {total && (
            <Pagination
              className="m-auto"
              value={activePage}
              onChange={setPage}
              total={total}
            />
          )}
        </div>
      </div>
    </div>
  )
}

const SearchInput = styled(Input)`
  input:focus {
    border-color: #4c4c4c;
    box-shadow: 0 0 0 2px rgba(76, 76, 76, 0.3);
  }
`
