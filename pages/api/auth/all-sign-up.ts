import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../../../hooks/auth'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { name, email, password } = req.body
  console.log('req.body', req.body)

  if (
    !name ||
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: '비밀번호는 최 7자 이상으로 설정해주세요.',
      error: true,
    })
    return
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      email: true,
      name: true,
    },
  })

  if (existingUser) {
    res.status(422).json({ message: 'User Email already exists!', error: true })
    return
  }

  const hashedPassword = await hashPassword(password)

  const result = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  })

  if (result) {
    res.status(201).json({ message: 'Created user!', error: false })
  } else {
    res.status(422).json({ message: 'Prisma error occured', error: true })
  }
}
