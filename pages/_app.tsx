import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import { SessionProvider } from 'next-auth/react'
import Header from 'components/Header'
import { useEffect } from 'react'
import Script from 'next/script'

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

  const kakaoInit = () => {
    // 페이지가 로드되면 실행
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY)
    console.log(window.Kakao.isInitialized())
  }

  return (
    // <GoogleOAuthProvider clientId={CLIENT_ID}>
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <div className="px-36 ">
          <Header />
          <Component {...pageProps} />
          <Script
            src="https://developers.kakao.com/sdk/js/kakao.js"
            onLoad={kakaoInit}
          ></Script>
        </div>
      </QueryClientProvider>
    </SessionProvider>
  )
}
