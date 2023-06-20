import { useSession, signIn, signOut } from 'next-auth/react'
import Button from './Button'
import styled from 'styled-components'

const Container = styled.div`
  margin-bottom: 10px;
  height: 60px;
  width: 240px;
`

export function AllLogin() {
  const { data: session } = useSession()

  return (
    <Container>
      {session ? (
        <div>
          Signed in as {session.user?.email} <br />
          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
      ) : (
        <div>
          Not signed in <br />
          <Button onClick={() => signIn()}>Sign in with Google</Button>
        </div>
      )}
    </Container>
  )
}

// import { useSession, signIn, signOut } from 'next-auth/react'
// import Button from './Button'

// export function AllLogin() {
//   const { data: session } = useSession()

//   const handleSignIn = (provider) => {
//     const options = {
//       callbackUrl: 'http://localhost:3000/api/auth/callback/' + provider
//     }

//     signIn(provider, options)
//   }

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column' }}>
//       {session ? (
//         <div>
//           Signed in as {session.user?.email} <br />
//           <Button onClick={() => signOut()}>Sign out</Button>
//         </div>
//       ) : (
//         <div>
//           Not signed in <br />
//           <Button onClick={() => handleSignIn('google')}>Sign in with Google</Button>
//           <Button onClick={() => handleSignIn('kakao')}>Sign in with Kakao</Button>
//         </div>
//       )}
//     </div>
//   )
// }
