import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getProduct(id: number) {
  try {
    const response = await prisma.products.findUnique({
      where: {
        id: id,
      },
    })
    console.log(response)
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
  const { id } = req.query
  // console.log('req', req)

  if (id == null) {
    res.status(400).json({ message: `No id` })
    return
  }
  try {
    const products = await getProduct(Number(id))
    res.status(200).json({ items: products, message: 'Success' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Failed` })
  }
}
