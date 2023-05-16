import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'

const prisma = new PrismaClient()

async function getComment(userId: string, orderItemId: number) {
  try {
    const response = await prisma.comment.findUnique({
      where: {
        orderItemId: orderItemId,
      },
    })
    console.log(response)
    if (response?.userId === userId) {
      return response
    }

    return { message: 'userId id not matched' }
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
  const { orderItemId } = req.query
  const session = await getServerSession(req, res, authOptions)
  console.log('session', session)
  if (session == null) {
    res.status(200).json({ items: [], message: 'no Session' })
    return
  }
  if (orderItemId == null) {
    res.status(200).json({ items: [], message: 'no orderItemId' })
    return
  }

  try {
    const wishlist = await getComment(String(session.id), Number(orderItemId))
    res.status(200).json({ items: wishlist, message: 'Success' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Failed` })
  }
}
