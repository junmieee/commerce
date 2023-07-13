import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { name, email, password } = req.body

  try {
    const user = await prisma.user.upsert({
      where: {
        email: email,
      },
      update: {
        name: name,
        // image: picture,
      },
      create: {
        email: email,
        name: name,
        password: password,
      },
    })

    res.status(201).json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create user' })
  }
}
