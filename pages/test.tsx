import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div>
      <h1>Hello, this is the Home page!</h1>
      <p>session</p>
    </div>
  )
}
