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
import Carousel from 'nuka-carousel'
import CustomSelect from 'components/CustomSelect'

export default function Products() {
  const router = useRouter()
  const { search } = router.query

  const { data: session } = useSession()
  const [activePage, setPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string>('-1')
  const [selectedFilter, setFilter] = useState<string | null>(FILTERS[0].value)
  const [keyward, setKeyword] = useState('')
  // const [selectedFilter, setSelectedFilter] = useState(FILTERS[0].value);
  // const [selectedFilter, setSelectedFilter] = useState<string | null>(FILTERS[0].value);

  const debouncedKeyword = useDebounce<string>(keyward)

  const adImages = [
    '/path/to/image1.jpg',
    '/path/to/image2.jpg',
    '/path/to/image3.jpg',
  ]

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

  // const handleChangeFilter = (filterValue) => {
  //   setSelectedFilter(filterValue);
  // };

  return (
    <div>
      {/* <div className="flex w-96 relative items-center justify-center">
        <IconSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
        <input
          placeholder="검색어를 입력해 주세요."
          value={keyward}
          onChange={handleChange}
          className="w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border border-gray-700			"
        />
      </div> */}
      {/* 광고 Display*/}
      <Carousel autoplay wrapAround autoplayInterval={3000}>
        {/* <img src="/image1.png" />
        <img src="/image2.png" />
        <img src="/image3.png" />
        <img src="/image4.png" />
        <img src="/image5.png" /> */}
        <div className="h-36 mt-4 bg-sky-200 max-w-screen" />
        <div className="h-36 mt-4 bg-sky-400 max-w-screen" />
        <div className="h-36 mt-4 bg-sky-500 max-w-screen" />
        <div className="h-36 mt-4 bg-sky-600 max-w-screen" />
      </Carousel>

      <div className="mt-[30px] md:px-32 2xl:px-72 ">
        {categories && (
          <div className="mb-4 flex justify-between">
            <SegmentedControl
              radius={16}
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
              styles={{
                control: {
                  // 컨트롤(버튼)에 대한 스타일 적용
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                },
                root: {
                  // 컨트롤들을 감싸는 래퍼에 대한 스타일 적용
                  backgroundColor: '#EDF2F7', // 원하는 색상
                },
              }}
            />
            {/* <Select value={selectedFilter} onChange={setFilter} data={FILTERS} /> */}
            <div className="md:w-24 right-0">
              <CustomSelect
                value={selectedFilter}
                onChange={(value) => setFilter(value)}
                data={FILTERS}
              />

              <div className="flex"></div>
            </div>
          </div>
        )}

        {products && (
          <div className="w-full grid grid-cols-3 gap-5  2xl:grid-cols-4">
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
                  className="rounded mb-2"
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
