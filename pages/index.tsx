import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import { css } from '@emotion/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // const [products, setProducts] = useState<{ id: string, properties: { id: string }[] }[]>([])
  // useEffect(() => {
  //   fetch('/api/get-item')
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data.items))
  // }, [])

  const [products, setProducts] = useState<
    { id: string; name: string; createdAt: string }[]
  >([])

  useEffect(() => {
    fetch('/api/get-products')
      .then((res) => res.json())
      .then((data) => setProducts(data.items))
  }, [])

  const handleClick = () => {
    if (inputRef.current === null || inputRef.current.value === '') {
      alert('name을 넣어주세요')
      return
    }
    fetch(`/api/add-item?name=${inputRef.current.value}`)
      .then((res) => res.json())
      .then((data) => alert(data.message))
  }
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <input ref={inputRef} type="text" placeholder="name"></input>
      <button
        css={css`
          background-color: blue;
        `}
        onClick={handleClick}
      >
        Add Jacket
      </button>
      <div>
        <p>Product List</p>
        {/* {products?.map((item) => <div key={item.id}>
          {JSON.stringify(item)}
          {item.properties &&
            Object.entries(item.properties).map(([key, value]) => (
              <button
                key={key}
                onClick={() => {
                  fetch(
                    `/api/get-detail?pageId=${item.id}&propertyId=${value.id}`
                  ).then(res => res.json()).then(data => alert(JSON.stringify(data.detail)))
                }}
              >
                {key}</button>
            ))}
          <br />
          <br />
        </div>)} */}

        {products &&
          products.map((item) => (
            <div key={item.id}>
              {item.name}
              <span>{item.createdAt}</span>
            </div>
          ))}
      </div>
    </main>
  )
}
