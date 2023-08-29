import '@echo/ui/dist/index.css'
import { Auth } from '@components/auth'
import { DependenciesProvider, MessagesType } from '@echo/ui'
import { wagmiConfig } from '@lib/constants/wagmi-config'
import { apiProvider } from '@lib/dependencies/api-provider'
import { linkProvider } from '@lib/dependencies/link-provider'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { NextIntlProvider } from 'next-intl'
import { RecoilRoot } from 'recoil'
import { WagmiConfig } from 'wagmi'

interface PageProps extends Record<string, unknown> {
  messages: MessagesType
  session: Session
}

const DynamicConnectKitProvider = dynamic(() => import('connectkit').then((mod) => mod.ConnectKitProvider), {
  ssr: false
})

function MyApp({ Component, pageProps }: AppProps<PageProps> & { Component: PageWithAuth }) {
  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        <WagmiConfig config={wagmiConfig}>
          <DynamicConnectKitProvider>
            <NextIntlProvider timeZone={'America/New_York'} messages={pageProps.messages}>
              <DependenciesProvider apiProvider={apiProvider} linkProvider={linkProvider}>
                {Component.authenticationEnabled ? (
                  <Auth>
                    <Component {...pageProps} />
                  </Auth>
                ) : (
                  <Component {...pageProps} />
                )}
              </DependenciesProvider>
            </NextIntlProvider>
          </DynamicConnectKitProvider>
        </WagmiConfig>
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
