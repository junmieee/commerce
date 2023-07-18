import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getCategories() {
  try {
    const response = await prisma.categories.findMany({})
    // console.log('categor',response)
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
  try {
    const products = await getCategories()
    res.status(200).json({ items: products, message: 'Success' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `Failed` })
  }
}
