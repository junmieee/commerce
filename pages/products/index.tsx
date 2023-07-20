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

  // const { data: product } = useQuery<
  //   { items: products[] },
  //   unknown,
  //   products[]
  // >(
  //   [
  //     `/api/get-products?skip=${0
  //     }&take=${TAKE}&contains=${search}`,
  //   ],
  //   () =>
  //     fetch(
  //       `/api/get-products?skip=${0}&take=${TAKE}&contains=${search}`
  //     ).then((res) => res.json()),
  //   {
  //     select: (data) => data.items,
  //   }
  // )

  const getProducts = useCallback(() => {
    const next = skip + TAKE
    fetch(`/api/get-products?skip=${0}&take=${TAKE}&contains=${search}`)
      .then((res) => res.json())
      .then((data) => {
        const list = products.concat(data.items)
        setProducts(list)
      })
    setSkip(next)
  }, [skip, products])

  console.log('products', products)

  return (
    <div className="px-36 mt-36 mb-36 ">
      {products && (
        <div className="grid grid-cols-3 gap-5">
          {products.map((item) => (
            <div key={item.id}>
              <Image
                className="rounded"
                alt={item.name}
                src={item.image_url ?? ''}
                width={300}
                height={200}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=="
              />
              <div className="flex">
                <span>{item.name}</span>
                <span className="ml-auto">
                  {item.price.toLocaleString('ko-KR')}원
                </span>
              </div>
              <span className="text-zinc-400">
                {item.category_id === 0 && '의류'}
              </span>
            </div>
          ))}
        </div>
      )}
      <button
        className="w-full rounded-full mt-20 bg-zinc-200 p-4"
        onClick={getProducts}
      >
        더보기
      </button>
    </div>
  )
}
