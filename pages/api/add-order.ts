import { NextApiRequest, NextApiResponse } from 'next'
import { Cart, OrderItem, PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'

const prisma = new PrismaClient()

async function addOrder(
  userId: string,
  items: Omit<OrderItem, 'id'>[],
  orderInfo?: { reciever: string; address: string; phoneNumber: string }
) {
  //orderItem들을 만든다.
  //만들어진 orderItemIds를 포함한 Order를 만드ㄴ다.
  try {
    let orderItemIds = []
    for (const item of items) {
      const orderItem = await prisma.orderItem.create({
        data: {
          ...item,
        },
      })
      console.log(`Created id: ${orderItem.id}`)
      orderItemIds.push(orderItem.id)
    }

    const response = await prisma.orders.create({
      data: {
        userId,
        orderItemIds: orderItemIds.join(','),
        ...orderInfo,
        status: 0,
      },
    })
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
  const session = await getServerSession(req, res, authOptions)
  const { items, orderInfo } = JSON.parse(req.body)
  if (session == null) {
    res.status(200).json({ items: [], message: 'no Session' })
    return
  }

  try {
    const wishlist = await addOrder(String(session.id), items, orderInfo)
    res.status(200).json({ items: wishlist, message: 'Success' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Failed` })
  }
}
