import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'

const prisma = new PrismaClient()

async function getComments(productId: number) {
  try {
    const orderItems = await prisma.orderItem.findMany({
      where: {
        productId,
      },
    })
    console.log('orderItems', orderItems)

    const response = []
    // 찾은 orderItemId를 기반으로 Comment를 조회한다.
    for (const orderItem of orderItems) {
      const res = await prisma.comment.findUnique({
        where: {
          orderItemId: orderItem.id,
        },
      })
      if (res) {
        response.push({ ...orderItem, ...res })
      }
    }
    console.log('comment:', response)
    return response
  } catch (error) {
    console.error(error)
  }
}

type Data = {
  items?: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { productId } = req.query
  if (productId == null) {
    res.status(200).json({ items: [], message: 'no productId' })
    return
  }

  try {
    const wishlist = await getComments(Number(productId))
    res.status(200).json({ items: wishlist, message: 'Success' })
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: 'Failed' })
  }
}
