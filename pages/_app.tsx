import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import Header from 'components/Header'
import { useEffect } from 'react'
import Script from 'next/script'
import { KAKAO_JS_KEY } from 'constants/kakaoAuth'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { CLIENT_ID } from 'constants/googleAuth'

declare global {
  interface Window {
    Kakao: any
  }
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity },
    },
  })

  return (
    <SessionProvider session={session}>
      {/* <GoogleOAuthProvider clientId={CLIENT_ID}> */}
      <QueryClientProvider client={queryClient}>
        <Header />
        <div className="mb-20 ">
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
      {/* </GoogleOAuthProvider> */}
    </SessionProvider>
  )
}
