import styled from '@emotion/styled'
import Image from 'next/image'
import React, { useState } from 'react'
import { useRef } from 'react'

export default function ImageUpload() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState('')
  console.log(inputRef)

  const handleUpload = () => {
    if (inputRef.current && inputRef.current.files) {
      const fd = new FormData()

      fd.append(
        'image',
        inputRef.current.files[0],
        inputRef.current.files[0].name
      )

      fetch(
        'https://api.imgbb.com/1/upload?key=9c03c4adb1e461c43a522dfdab958723&expiration=15552000',
        {
          method: 'POST',
          body: fd,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setImage(data.data.image.url)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  return (
    <div>
      <input type="file" accept="image/*" ref={inputRef} />
      <button onClick={handleUpload}>업로드</button>

      {image !== '' && (
        <AutoSizeImageWrapper>
          <Image src={image} alt="" layout="fill" objectFit="contain" />
        </AutoSizeImageWrapper>
      )}
    </div>
  )
}

const AutoSizeImageWrapper = styled.div`
  width: 500px;
  height: 500px;
  position: relative;
`
