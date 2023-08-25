import { useSession, signIn, signOut } from 'next-auth/react'
import Button from './Button'
import { useSearchParams, useRouter } from 'next/navigation'

export function GithubLogin() {
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/my'

  return (
    <div className="mb-4 h-300 w-300 flex justify-center items-center">
      {session ? (
        <div>
          Signed in as {session.user?.email} <br />
          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
      ) : (
        <div>
          <button
            className="flex bg-white text-gray-500 border border-gray-300 rounded-md px-2 py-3 text-sm font-medium transition duration-300 ease-in-out hover:bg-gray-100"
            onClick={() => signIn('github')}
          >
            <img
              src="/images/github.svg"
              alt="Google Logo"
              className="mr-2 border-none"
              style={{ width: '20px', height: '20px' }}
            />
            <p className="font-sans">깃허브 로그인하기</p>
          </button>
        </div>
      )}
    </div>
  )
}
