import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from './auth/[...nextauth]'

export default async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  console.log('Get API', session)
  return NextResponse.json({ authenticated: !!session })
}
