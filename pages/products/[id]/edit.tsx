import ImageGallery from 'react-image-gallery'
import Carousel from 'nuka-carousel'
import Image from 'next/image'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    original:
      'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/4v.jpg',
    thumbnail:
      'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/4v.jpg',
  },
]

import React from 'react'
import { useState } from 'react'
import Head from 'next/head'
import CustomEditor from 'components/Editor'

const Products = () => {
  const [index, setIndex] = useState(0)
  return (
    <>
      <Carousel withoutControls={true} wrapAround speed={10} slideIndex={index}>
        {images.map((item) => (
          <Image
            key={item.original}
            src={item.original}
            alt="image"
            width={1000}
            height={600}
            layout="responsive"
          />
        ))}
      </Carousel>
      <div style={{ display: 'flex' }}>
        {images.map((item, idx) => (
          <div key={index} onClick={() => setIndex(idx)}>
            <Image src={item.original} alt="iamge" width={100} height={60} />
          </div>
        ))}
      </div>
      <CustomEditor />
    </>
  )
}

export default Products
