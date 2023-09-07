'use client'
import { messages } from '@echo/ui'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { NextIntlClientProvider } from 'next-intl'
import { FunctionComponent, PropsWithChildren } from 'react'
import { RecoilRoot } from 'recoil'

dayjs.extend(timezone)

// const DynamicConnectKitProvider = dynamic(() => import('connectkit').then((mod) => mod.ConnectKitProvider), {
//   ssr: false
// })

export interface ProvidersProps {
  session: Session | null | undefined
}

export const Providers: FunctionComponent<PropsWithChildren<ProvidersProps>> = ({ children, session }) => (
  <SessionProvider session={session}>
    <RecoilRoot>
      {/*<WagmiConfig config={wagmiConfig}>*/}
      {/*  <DynamicConnectKitProvider>*/}
      <NextIntlClientProvider timeZone={dayjs.tz.guess()} messages={messages} locale={'en'}>
        {children}
      </NextIntlClientProvider>
      {/*</DynamicConnectKitProvider>*/}
      {/*</WagmiConfig>*/}
    </RecoilRoot>
  </SessionProvider>
)
