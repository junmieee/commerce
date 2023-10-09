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
import Carousel from 'nuka-carousel'
import CustomSelect from 'components/CustomSelect'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'

export default function Products() {
  // const [sessionData, setSessionData] = useState(session);

  // useEffect(() => {
  //   const fetchSession = async () => {
  //     const session = await getServerSession(authOptions);
  //     setSessionData(session);
  //   };
  //   fetchSession();
  // }, []);

  const router = useRouter()
  const { search } = router.query

  const { data: session } = useSession()
  const [activePage, setPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string>('-1')
  const [selectedFilter, setFilter] = useState<string | null>(FILTERS[0].value)
  const [selectedFilterLabel, setFilterLabel] = useState<string | null>(
    FILTERS[0].label
  )

  const [keyward, setKeyword] = useState('')
  // const [selectedFilter, setSelectedFilter] = useState(FILTERS[0].value);
  const paginationStyles = {
    item: {
      fontSize: '1rem',
      padding: '0.5rem 1rem',
      margin: '0.25rem',
      borderRadius: '0.25rem',
      cursor: 'pointer',
      background: '#EDF2F7',
      color: '#4A5568',
      transition: 'background 0.2s ease-in-out',
    },
    activeItem: {
      background: '#4299E1',
      color: '#FFF',
    },
    disabledItem: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  }
  // const [selectedFilter, setSelectedFilter] = useState<string | null>(FILTERS[0].value);

  const debouncedKeyword = useDebounce<string>(keyward)

  const adImages = [
    '/images/toa-heftiba-4nXTgoxr6xs-unsplash.jpg',
    '/images/henri-meilhac-KoT2gBk9rzE-unsplash.jpg',
    '/images/people-ga1c24c2f0_1920.jpg',
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
    <div className="mx-2 xl:mx-auto">
      <div className="flex justify-center xl:px-44 ">
        <Carousel
          autoplay
          wrapAround
          autoplayInterval={3000}
          renderCenterLeftControls={({ previousSlide }) => (
            <button
              className="absolute top-1/2 left-0 transform -translate-y-1/2 p-4 bg-customPrimary text-white rounded-full"
              onClick={previousSlide}
            >
              <IconChevronLeft />
            </button>
          )}
          renderCenterRightControls={({ nextSlide }) => (
            <button
              className="absolute top-1/2 right-0 transform -translate-y-1/2 p-4 bg-customSecondary text-white rounded-full"
              onClick={nextSlide}
            >
              <IconChevronRight />
            </button>
          )}
        >
          {adImages.map((url, i) => (
            <div key={i} className="h-96 xl:h-[500px]">
              <Image
                src={url}
                width={2000}
                height={300}
                alt={`Ad Image ${i}`}
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="mt-[30px] md:px-10 2xl:px-72 xl:mx-36 ">
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
                  // 컨트롤들을 감싸는 래퍼에 대한 스타일 적용\// 원하는 색상
                },
              }}
            />
            <div className="md:w-24 right-0">
              <CustomSelect
                value={selectedFilter}
                onChange={(value, label) => {
                  setFilter(value)
                  setFilterLabel(label)
                }}
                label={selectedFilterLabel}
                data={FILTERS}
              />

              <div className="flex"></div>
            </div>
          </div>
        )}

        {products && (
          <div className="w-full grid grid-cols-3 gap-5 2xl:grid-cols-4 ">
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
                  className="rounded mb-2 cursor-pointer"
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
              styles={paginationStyles}
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
