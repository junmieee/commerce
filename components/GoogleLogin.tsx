import { useSession, signIn, signOut } from 'next-auth/react'
import Button from './Button'
import styled from 'styled-components'
import Google from '../pages/auth/google'
import Image from 'next/image'
// import GoogleLogin from 'react-google-login';

const Container = styled.div`
  margin-bottom: 10px;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`

// const GButton = styled(Image)`
//   width: 100px;
//   height: 100px;
// `

export function AllLogin() {
  const { data: session } = useSession()

  return (
    <Container>
      <p>회원가입</p>
      {session ? (
        <div>
          Signed in as {session.user?.email} <br />
          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
      ) : (
        <div>
          <Button onClick={() => signIn()}>Sign in with Google</Button>
          {/* <div style={{ width: '300px', height: '200px' }}> */}
          {/* <GButton src="/images/googleBtn.png" alt="Google Button" width={200} height={200} /> */}
          {/* </div> */}
        </div>
      )}
    </Container>
  )
}
