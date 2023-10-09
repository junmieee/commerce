import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import Header from 'components/Header'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { GoogleOAuthProvider } from '@react-oauth/google'
import PageLoading from 'components/PageLoading'
import { useEffect, useState } from 'react'
import { Router } from 'next/router'

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

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const showRoute = ['/', '/products/:id', '/comment/edit', '/cart', '/my']
    const start = (url: any) => {
      if (showRoute.find((route) => String(url).includes(route))) {
        setLoading(true)
      }
    }
    const end = (url: any) => {
      if (showRoute.find((route) => String(url).includes(route))) {
        setLoading(false)
      }
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {loading && <PageLoading />}
        <Header />

        <div className="mb-20 mx-10 ">
          <Component {...pageProps} />
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  )
}
