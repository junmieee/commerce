import { useSession, signIn, signOut } from 'next-auth/react'
import Button from './Button'

export default function GoogleLogin() {
  // function kakaoLogin() {
  //   window.Kakao.Auth.authorize({
  //     redirectUri: 'http://localhost:3000/auth/callback/kakao',
  //   })
  // }
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
          <Button onClick={() => signIn()}>Google Sign in</Button>
        </div>
      )}
    </div>
  )
}
