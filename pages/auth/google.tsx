import React, { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { CLIENT_ID } from 'constants/googleAuth'
import { useGoogleLogin } from '@react-oauth/google'

export default function Google() {
  const [userInfo, setUserInfo] = useState(null)

  const googleSocialLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      const accessToken = credentialResponse.access_token
      fetch(`/api/auth/sign-up?credential=${accessToken}`)
        .then((res) => res.json())
        .then((data) => {
          console.log('data', data)
        })
    },
    onError: () => {
      console.log('Login Failed')
    },
  })

  return (
    <>
      <div style={{ display: 'flex' }}>
        <button onClick={() => googleSocialLogin()}>
          {' '}
          Sign in with Google 🚀{' '}
        </button>
      </div>
    </>
  )
}
