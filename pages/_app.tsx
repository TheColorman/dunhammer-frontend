import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { ExtendedSession } from '../lib/types'

function MyApp({
  Component,
  pageProps: { session, ...pageProps}
}: AppProps) {
  const extSession = session as ExtendedSession
  if (session && extSession.expired) {
    console.log('Session expired')
  }

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  ) 
}

export default MyApp
