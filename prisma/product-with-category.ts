import { PrismaClient, Prisma } from '@prisma/client'
import { m } from 'framer-motion'
import { Patrick_Hand_SC } from 'next/font/google'

const getRandom = (max: number, min: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const prisma = new PrismaClient()

const sneakers = [
  {
    name: 'sneakers 1',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'sneakers 2',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'sneakers 3',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'sneakers 4',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'sneakers 5',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'sneakers 6',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'sneakers 7',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'sneakers 8',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'sneakers 9',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'sneakers 10',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
]

const tShirt = [
  {
    name: 'T-Shirt 1',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'T-Shirt 2',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'T-Shirt 3',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'T-Shirt 4',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'T-Shirt 5',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'T-Shirt 6',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'T-Shirt 7',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'T-Shirt 8',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'T-Shirt 9',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'T-Shirt 10',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
]

const pants = [
  {
    name: 'Pants 1',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Pants 2',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Pants 3',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Pants 4',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Pants 5',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Pants 6',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Pants 7',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Pants 8',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Pants 9',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Pants 10',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
]

const cap = [
  {
    name: 'Cap 1',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Cap 2',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Cap 3',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Cap 4',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Cap 5',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Cap 6',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Cap 7',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Cap 8',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Cap 9',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Cap 10',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
]

const hoodie = [
  {
    name: 'Hoodie 1',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Hoodie 2',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Hoodie 3',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Hoodie 4',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Hoodie 5',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Hoodie 6',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Hoodie 7',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Hoodie 8',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Hoodie 9',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
  {
    name: 'Hoodie 10',
    contents:
      '{"blocks":[{"key":"eee6o","text": "본 제품은 오가닉 소재입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0561/7470/6753/products/science-beakers-blue-light_480x.jpg?v=1654828801',
    price: getRandom(300000, 100000),
  },
]

const productData: Prisma.productsCreateInput[] = [
  ...sneakers,
  ...tShirt,
  ...pants,
  ...cap,
  ...hoodie,
]

async function main() {
  await prisma.products.deleteMany({})

  for (const p of productData) {
    const product = await prisma.products.create({
      data: p,
    })
    console.log(`Created id: ${product.id} `)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
