import type { NextApiRequest, NextApiResponse } from 'next'
import { hashPassword } from '../../../hooks/auth'
import { omit } from 'lodash'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    await handlePOST(res, req)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

const Password = (password: string) => {
  return hashPassword(password).toString()
}

// POST /api/user
async function handlePOST(res, req) {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
    select: {
      id: true,
      name: true,
      email: true,
      // image: true,
      password: true,
    },
  })
  if (user && user.password == Password(req.body.password)) {
    console.log('password correct')
    // logger.debug("password correct");
    res.json(user)
  } else {
    // logger.debug("incorrect credentials");
    console.log('incorrect credentials')

    res.status(400).end('Invalid credentials')
  }
}
