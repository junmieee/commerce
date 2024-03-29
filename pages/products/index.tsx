import { products } from '@prisma/client'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { useCallback } from 'react'
import { TAKE } from 'constants/products'
import { useRouter } from 'next/router'
import PageLoading from 'components/PageLoading'

export default function Products() {
  const [skip, setSkip] = useState(0)
  const [products, setProducts] = useState<products[]>([])
  const [allProductsLoaded, setAllProductsLoaded] = useState(false)
  const [loading, setLoading] = useState(false) // 로딩 상태 추가
  const router = useRouter()
  const { search } = router.query

  useEffect(() => {
    setAllProductsLoaded(false)
    setSkip(0)
    setProducts([]) // 검색어 변경 시 기존 데이터 초기화
    setLoading(true) // 로딩 시작

    fetch(`/api/get-products?skip=${0}&take=${TAKE}&contains=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.items)
        setLoading(false)
      })
  }, [search])

  const getProducts = useCallback(() => {
    setLoading(true)

    fetch(
      `/api/get-products?skip=${skip + TAKE}&take=${TAKE}&contains=${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.items.length === 0) {
          setAllProductsLoaded(true)
        } else {
          setProducts((prevProducts) => [...prevProducts, ...data.items])
          setSkip(skip + TAKE)
        }
        setLoading(false)
      })
  }, [skip, search])

  return (
    <div className="px-36 mt-36 mb-36 mx-auto	">
      {loading && <PageLoading />}

      {products && products.length > 0 ? (
        <div>
          <div className="grid lg:grid-cols-4 gap-5 md:grid-cols-3">
            {products.map((item) => (
              <div
                key={item.id}
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
                  width={300}
                  height={200}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=="
                />
                <div className="flex flex-col">
                  <span>{item.name}</span>
                  <span>{item.price.toLocaleString('ko-KR')}원</span>
                </div>
                <span className="text-zinc-400">
                  {item.category_id === 0 && '의류'}
                </span>
              </div>
            ))}
          </div>
          {!allProductsLoaded && (
            <button
              className="w-full rounded-full mt-20 bg-zinc-200 p-4"
              onClick={getProducts}
            >
              더보기
            </button>
          )}
        </div>
      ) : (
        !loading && (
          <div className="flex justify-center items-center h-60">
            <p className="font-medium text-lg	">찾으시는 제품이 없습니다.</p>
          </div>
        )
      )}
    </div>
  )
}
