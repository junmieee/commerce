import React, { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { CLIENT_ID } from 'constants/googleAuth'
import { useGoogleLogin } from '@react-oauth/google'

export default function Google() {
  const googleSocialLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      const accessToken = credentialResponse.access_token
      fetch(`/api/auth/sign-up?accessToken=${accessToken}`)
        .then((res) => res.json())
        .then((data) => console.log(data))
    },
    onError: () => {
      console.log('Login Failed')
    },
  })

  return (
    <>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        {/* <GoogleOAuthProvider clientId={CLIENT_ID}>
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

          /> */}
        <div style={{ display: 'flex' }}>
          <button onClick={() => googleSocialLogin()}>
            {' '}
            Sign in with Google 🚀{' '}
          </button>
        </div>
        {/* <div style={{ display: 'flex' }}>
          <GoogleLogin
            onSuccess={googleSocialLogin}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div> */}
      </GoogleOAuthProvider>

      {/* </div>
      </GoogleOAuthProvider> */}
    </>
  )
}
