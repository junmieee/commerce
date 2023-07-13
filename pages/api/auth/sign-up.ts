import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import jwtDecode from 'jwt-decode'
import fetch from 'node-fetch'
// import { getToken } from 'next-auth/jwt'

const prisma = new PrismaClient()

async function signUp(credential: string) {
  const decoded: { name: string; email: string; picture: string } =
    jwtDecode(credential)

  try {
    const response = await prisma.user.upsert({
      where: {
        email: decoded.email,
      },
      update: {
        name: decoded.name,
        image: decoded.picture,
      },
      create: {
        email: decoded.email,
        name: decoded.name,
        image: decoded.picture,
      },
    })

    console.log('response', response)

    // 반환할 데이터를 products로 수정
    return response
  } catch (error) {
    console.error(error)
  }
}

type Data = {
  items?: any
  message: string
}

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const { credential } = req.query
//   const accessToken = String(credential)

//   try {
//     const userInfoResponse = await fetch(
//       `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
//     )
//     const userInfo = await userInfoResponse.json()
//     const products = await signUp(userInfo)
//     console.log('products', products)

//     res.status(200).json({ items: products, message: 'Success' })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Failed' })
//   }
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { credential } = req.query
  // const accessToken = String(credential)

  try {
    // const userInfoResponse = await fetch(
    //   `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
    // )
    // const userInfo = await userInfoResponse.json()
    // const products = await signUp(String(userInfo))
    // console.log('products', products)
    const products = await signUp(String(credential))

    res.status(200).json({ items: products, message: 'Success' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed' })
  }
}
