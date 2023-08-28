import { useSession, signIn, signOut } from 'next-auth/react'
import styled from '@emotion/styled'

const Button = styled.button`
  padding: 16px;
  border-radius: 8px;
  background-color: black;
  color: rgb(255, 255, 255);
`
export function GoogleLogin() {
  const { data: session } = useSession()

  return (
    <div className="mb-4 mt-6 h-300 w-300 flex justify-center items-center">
      {session ? (
        <div>
          Signed in as {session.user?.email} <br />
          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
      ) : (
        <div>
          <button
            className="flex bg-white text-gray-500 border border-gray-300 rounded-md px-2 py-3 text-sm font-medium transition duration-300 ease-in-out hover:bg-gray-100"
            onClick={() => signIn('google')}
            //   onClick={(credentialResponse) => {
            //     fetch(`/api/auth/get-token?credential=${credentialResponse.credential}`)

            //     // console.log('credentialResponse', credentialResponse.credential)
            // }}
          >
            <img
              src="/images/google.svg"
              alt="Google Logo"
              className="mr-2 border-none"
              style={{ width: '20px', height: '20px' }}
            />
            <p className="font-sans">구글로 로그인하기</p>
          </button>
        </div>
      )}
    </div>
  )
}
