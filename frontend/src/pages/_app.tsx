import '../styles/globals.css'
import { AlchemyProvider } from '@components/providers/alchemy-provider'
import { FirebaseProvider } from '@components/providers/firebase-provider'
import { firebaseOptions } from '@echo/firebase'
import { MessagesType } from '@lib/messages'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { NextIntlProvider } from 'next-intl'

interface PageProps extends Record<string, unknown> {
  messages: MessagesType
}

const DynamicWagmiProvider = dynamic(
  () => import('@components/providers/wagmi-provider').then((mod) => mod.WagmiProvider),
  { ssr: false }
)

const DynamicConnectKitProvider = dynamic(() => import('connectkit').then((mod) => mod.ConnectKitProvider), {
  ssr: false
})

function MyApp({ Component, pageProps }: AppProps<PageProps>) {
  return (
    <DynamicWagmiProvider>
      <DynamicConnectKitProvider>
        <FirebaseProvider options={firebaseOptions}>
          <AlchemyProvider>
            <NextIntlProvider timeZone={'America/New_York'} messages={pageProps.messages}>
              <Component {...pageProps} />
            </NextIntlProvider>
          </AlchemyProvider>
        </FirebaseProvider>
      </DynamicConnectKitProvider>
    </DynamicWagmiProvider>
  )
}

export default MyApp
