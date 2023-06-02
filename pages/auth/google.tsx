import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { CLIENT_ID } from 'constants/googleAuth'
import Image from 'next/image'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'

export default function Google() {
  return (
    <>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <div style={{ display: 'flex' }}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              fetch(
                `/api/auth/sign-up?credential=${credentialResponse.credential}`
              )
                .then((res) => res.json())
                .then((data) => console.log(data))
            }}
            onError={() => {
              console.log('Login Failed')
            }}
          />
        </div>
      </GoogleOAuthProvider>
    </>
  )
}
