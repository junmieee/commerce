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

  useEffect(() => {
    // Kakao JavaScript SDK 로드
    const script = document.createElement('script')
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js' // Kakao JavaScript SDK 파일의 URL
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      window.Kakao.init(KAKAO_JS_KEY) // 카카오 앱 키 입력
    }
  }, [])

  return (
    <SessionProvider session={session}>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          <div className="px-36 ">
            <Header />
            <Component {...pageProps} />
          </div>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </SessionProvider>
  )
}
