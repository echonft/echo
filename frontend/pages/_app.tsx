import '../styles/globals.css'
import { firebaseOptions } from '@echo/firebase/config/config'
import { AlchemyProvider } from '@echo/frontend/components/providers/alchemy-provider'
import { FirebaseProvider } from '@echo/frontend/components/providers/firebase-provider'
import { LoggerProvider, PinoWrapper } from '@echo/frontend/components/providers/logger-provider'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { NextIntlProvider } from 'next-intl'
import { useMemo } from 'react'
const DynamicWagmiProvider = dynamic(
  () => import('@echo/frontend/components/providers/wagmi-provider').then((mod) => mod.WagmiProvider),
  { ssr: false }
)

const DynamicConnectKitProvider = dynamic(() => import('connectkit').then((mod) => mod.ConnectKitProvider), {
  ssr: false
})

function MyApp({ Component, pageProps }: AppProps) {
  const pino = useMemo(() => new PinoWrapper(), [])
  return (
    <LoggerProvider value={pino}>
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
    </LoggerProvider>
  )
}

export default MyApp
