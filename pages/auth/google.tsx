import { GoogleLogin } from '@react-oauth/google'

export default function Google() {
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          fetch(
            `/api/auth/get-token?credential=${credentialResponse.credential}`
          )

          // console.log('credentialResponse', credentialResponse.credential)
        }}
      />
    </div>
  )
}
