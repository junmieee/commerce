import { useSession, signIn, signOut } from 'next-auth/react'
import Button from './Button'

interface KakaoLoginType {
  title: string
  onClickBtn: () => void
}

export default function KakaoLogin({ title, onClickBtn }: KakaoLoginType) {
  const { data: session } = useSession()
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {session ? (
        <div>
          Signed in as {session.user?.email} <br />
          <Button
            onClick={() => {
              signOut({
                redirect: true,
                callbackUrl: `http://localhost:3000/api/auth/serverlogout?userId=${session.id}`,
              })
            }}
          >
            Sign out
          </Button>
        </div>
      ) : (
        <div>
          <Button onClick={() => signIn('kakao', { callbackUrl: '/user' })}>
            KaKo Sign in
          </Button>
        </div>
      )}
    </div>
  )
}
