import { products } from '@prisma/client'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { useCallback } from 'react'
import { TAKE } from 'constants/products'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

export default function Products() {
  const [skip, setSkip] = useState(0)
  const [products, setProducts] = useState<products[]>([])
  const router = useRouter()
  const { search } = router.query
  console.log('search', search)

  useEffect(() => {
    fetch(`/api/get-products?skip=${0}&take=${TAKE}&contains=${search}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.items))
  }, [])

  const getProducts = useCallback(() => {
    const next = skip + TAKE
    fetch(`/api/get-products?skip=${0}&take=${TAKE}&contains=${search}`)
      .then((res) => res.json())
      .then((data) => {
        const list = products.concat(data.items)
        setProducts(list)
      })
    setSkip(next)
  }, [skip, products, search])

  return (
    <div className="px-36 mt-36 mb-36 mx-auto	">
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
          <button
            className="w-full rounded-full mt-20 bg-zinc-200 p-4"
            onClick={getProducts}
          >
            더보기
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center h-60">
          <p className="font-medium text-lg	">찾으시는 제품이 없습니다.</p>
        </div>
      )}
    </div>
  )
}
