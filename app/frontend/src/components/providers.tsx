'use client'
import { DependenciesProvider, messages } from '@echo/ui'
import { apiProvider } from '@lib/dependencies/api-provider'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { NextIntlClientProvider } from 'next-intl'
import { FunctionComponent, PropsWithChildren } from 'react'
import { RecoilRoot } from 'recoil'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)

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
        <DependenciesProvider apiProvider={apiProvider}>{children}</DependenciesProvider>
      </NextIntlClientProvider>
      {/*</DynamicConnectKitProvider>*/}
      {/*</WagmiConfig>*/}
    </RecoilRoot>
  </SessionProvider>
)
