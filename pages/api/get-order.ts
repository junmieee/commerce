import { NextApiRequest, NextApiResponse } from 'next'
import { OrderItem, PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'

const prisma = new PrismaClient()

async function getCart(userId: string) {
  try {
    //orders테이블에서 나의 주문들을 조회한다.
    //orders 안에 있는 orderItemId로 orderItem을 꺼고 products 테이블에서 이미지 등의 정보를 조합한다.

    const orders = await prisma.orders.findMany({
      where: {
        userId: userId,
      },
    })
    console.log(orders)

    let response = []

    for (const order of orders) {
      let orderItems: OrderItem[] = []
      for (const id of order.orderItemIds
        .split(',')
        .map((item) => Number(item))) {
        const res: OrderItem[] =
          await prisma.$queryRaw`SELECT i.id, quantity, amount, i.price, name, image_url, productId FROM OrderItem as i JOIN products as p ON i.productId=p.id WHERE i.id=${id}`
        orderItems.push.apply(orderItems, res)
      }
      response.push({ ...order, orderItems })
    }

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
  console.log('session', session)
  if (session == null) {
    res.status(200).json({ items: [], message: 'no Session' })
    return
  }

  try {
    const cart = await getCart(String(session.id))
    res.status(200).json({ items: cart, message: 'Success' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Failed` })
  }
}
