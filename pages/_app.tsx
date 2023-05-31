// import '@/styles/globals.css'
// import type { AppProps } from 'next/app'
// import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

// import { SessionProvider } from 'next-auth/react'
// import Header from 'components/Header'
// import { useEffect } from 'react'
// import Script from 'next/script'
// import { KAKAO_JS_KEY } from 'constants/kakaoAuth'

// declare global {
//   interface Window {
//     Kakao: any
//   }
// }

// export default function App({
//   Component,
//   pageProps: { session, ...pageProps },
// }: AppProps) {

//   // useEffect(() => {
//   //   // Kakao JavaScript SDK 로드
//   //   const script = document.createElement('script');
//   //   script.src = '/developers.kakao.com/sdk/js/kakao.js'; // Kakao JavaScript SDK 파일의 경로
//   //   script.async = true;
//   //   document.body.appendChild(script);

//   //   script.onload = () => {
//   //     window.Kakao.init(process.env.KAKAO_JS_KEY); // 카카오 앱 키 입력
//   //   };
//   // }, []);

//   // useEffect(() => {
//   //   window.Kakao.init(process.env.KAKAO_JS_KEY)
//   //   console.log(window.Kakao.isInitialized())
//   // }, []);

//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: { staleTime: Infinity },
//     },
//   })

//   const kakaoInit = () => {
//     // 페이지가 로드되면 실행
//     window.Kakao.init(KAKAO_JS_KEY)
//     console.log(window.Kakao.isInitialized())
//   }

//   return (
//     // <GoogleOAuthProvider clientId={CLIENT_ID}>
//     <SessionProvider session={session}>
//       <QueryClientProvider client={queryClient}>
//         <div className="px-36 ">
//           <Header />
//           <Component {...pageProps} />
//           <Script
//             onLoad={kakaoInit}
//             src="https://t1.kakaocdn.net/kakao_js_sdk/2.2.0/kakao.min.js" integrity="sha384-x+WG2i7pOR+oWb6O5GV5f1KN2Ko6N7PTGPS7UlasYWNxZMKQA63Cj/B2lbUmUfuC"
//           ></Script>
//           {/* <Script
//             src="https://developers.kakao.com/sdk/js/kakao.js"
//             onLoad={kakaoInit}
//           ></Script> */}
//         </div>
//       </QueryClientProvider>
//     </SessionProvider>
//   )
// }

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import Header from 'components/Header'
import { useEffect } from 'react'
import Script from 'next/script'
import { KAKAO_JS_KEY } from 'constants/kakaoAuth'

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
      <QueryClientProvider client={queryClient}>
        <div className="px-36 ">
          <Header />
          <Component {...pageProps} />
          {/* 카카오 JavaScript SDK 로드된 후에는 다른 스크립트를 로드할 필요가 없습니다 */}
        </div>
      </QueryClientProvider>
    </SessionProvider>
  )
}
