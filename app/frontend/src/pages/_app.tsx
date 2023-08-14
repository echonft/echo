import '../styles/globals.css'
import { Auth } from '@components/auth'
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

const DynamicConnectKitProvider = dynamic(() => import('connectkit').then((mod) => mod.ConnectKitProvider), {
  ssr: false
})

// FIXME add WagmiProvider
function MyApp({ Component, pageProps }: AppProps<PageProps> & { Component: PageWithAuth }) {
  return (
    <SessionProvider session={pageProps.session}>
      {/*<DynamicWagmiProvider>*/}
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
      {/*</DynamicWagmiProvider>*/}
    </SessionProvider>
  )
}

export default MyApp
