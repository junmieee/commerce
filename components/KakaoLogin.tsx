import { useSession, signIn, signOut } from 'next-auth/react'
import Button from './Button'

export function KakaoLogin() {
  const { data: session } = useSession()

  return (
    <div className="mb-4 h-300 w-300 flex justify-center items-center">
      {session ? (
        <div>
          Signed in as {session.user?.email} <br />
          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
      ) : (
        <div className="">
          <button onClick={() => signIn('kakao', { callbackUrl: '/' })}>
            <img
              src="/images/kakao_login_medium_narrow.png"
              alt="Google Logo"
            />
            {/* <p className="font-sans">카카오 로그인하기</p> */}
          </button>
        </div>
      )}
    </div>
  )
}
