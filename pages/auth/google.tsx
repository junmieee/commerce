import React from 'react'
import { GoogleLogin } from '@react-oauth/google'

export default function Google() {
  return (
    <div style={{ display: 'flex' }}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          fetch(`/api/auth/sign-up?credential=${credentialResponse.credential}`)
            .then((res) => res.json())
            .then((data) => console.log(data))
        }}
        onError={() => {
          console.log('Login Failed')
        }}
      />
    </div>
  )
}
