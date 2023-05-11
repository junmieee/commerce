import { useSession, signIn, signOut } from 'next-auth/react'
import Button from './button'

export default function GoogleLogin() {
  const { data: session } = useSession()
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {session ? (
        <div>
          Signed in as {session.user?.email} <br />
          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
      ) : (
        <div>
          Not signed in <br />
          <Button onClick={() => signIn()}>Sign in</Button>
        </div>
      )}
    </div>
  )
}
