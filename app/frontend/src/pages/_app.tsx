import 'next-auth/providers/discord'
import '../styles/globals.css'
import { Auth } from '@components/auth'
import { FirebaseUserProvider } from '@components/providers/firebase-user-provider'
import { MessagesType } from '@lib/messages'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { NextIntlProvider } from 'next-intl'

interface PageProps extends Record<string, unknown> {
  messages: MessagesType
  session: Session
}

const DynamicWagmiProvider = dynamic(
  () => import('@components/providers/wagmi-provider').then((mod) => mod.WagmiProvider),
  { ssr: false }
)

const DynamicConnectKitProvider = dynamic(() => import('connectkit').then((mod) => mod.ConnectKitProvider), {
  ssr: false
})

function MyApp({ Component, pageProps }: AppProps<PageProps> & { Component: PageWithAuth }) {
  return (
    <SessionProvider session={pageProps.session}>
      <FirebaseUserProvider>
        <DynamicWagmiProvider>
          <DynamicConnectKitProvider>
            <NextIntlProvider timeZone={'America/New_York'} messages={pageProps.messages}>
              {Component.authenticationEnabled ? (
                <Auth>
                  <Component {...pageProps} />
                </Auth>
              ) : (
                <Component {...pageProps} />
              )}
            </NextIntlProvider>
          </DynamicConnectKitProvider>
        </DynamicWagmiProvider>
      </FirebaseUserProvider>
    </SessionProvider>
  )
}

export default MyApp
