import { AllLogin } from 'components/GoogleLogin'
import KakaoLogin from 'components/KakaoLogin'
import React from 'react'
import styled from 'styled-components'

const KakaoBtn = styled.div`
  display: flex;
  width: 100px;
  height: 100px;
  background-color: red;
`

export default function Login() {
  function kakaoLogin() {
    window.Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/pages/auth/kakao',
    })
  }
  return (
    <div
      style={{
        display: 'flex',
        height: '70vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AllLogin />

      <KakaoBtn
        style={{ width: '100px' }}
        onClick={kakaoLogin}
        title="kakao login"
      />
    </div>
  )
}

// import { signIn, signOut, useSession } from 'next-auth/react';
// import Button from 'components/Button';

// export default function Login() {
//   const { data: session } = useSession();

//   return (
//     <div
//       style={{
//         display: 'flex',
//         height: '70vh',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       <div style={{ display: 'flex', flexDirection: 'column' }}>
//         {session ? (
//           <div>
//             Signed in as {session.user?.email} <br />
//             <Button onClick={() => signOut()}>Sign out</Button>
//           </div>
//         ) : (
//           <div>
//             Not signed in <br />
//             <Button onClick={() => signIn('google')}>Sign in with Google</Button>
//             <Button onClick={() => signIn('kakao')}>Sign in with Kakao</Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
