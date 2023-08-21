import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getProductsCount(category: number, contains: string) {
  const constainsCondition =
    contains && contains !== ''
      ? {
          name: { contains: contains },
        }
      : undefined

  const where =
    category && category !== -1
      ? { category_id: category, ...constainsCondition }
      : constainsCondition
      ? constainsCondition
      : undefined

  try {
    const response = await prisma.products.count({ where: where })
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
  const { category, contains } = req.query
  try {
    const products = await getProductsCount(Number(category), String(contains))
    res.status(200).json({ items: products, message: 'Success' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Failed` })
  }
}
