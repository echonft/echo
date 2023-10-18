'use client'
import { type AuthUser } from '@echo/model/types/auth-user'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { EchoLogoSvg } from '@echo/ui/components/base/svg/echo-logo-svg'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { ShowIfNil } from '@echo/ui/components/base/utils/show-if-nil'
import { ConnectButton } from '@echo/ui/components/layout/header/connect-button'
import { DisconnectButton } from '@echo/ui/components/layout/header/disconnect-button'
import { HeaderLayout, type HeaderLayoutProps } from '@echo/ui/components/layout/header/header-layout'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { messages } from '@echo/ui/messages/en'
import { clsx } from 'clsx'
import { NextIntlClientProvider } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props extends HeaderLayoutProps {
  user: AuthUser | undefined
}

export const Header: FunctionComponent<Props> = ({ user, absolute }) => {
  return (
    <NextIntlClientProvider messages={messages} locale={'en'}>
      <HeaderLayout absolute={absolute}>
        <PaddedContainer>
          <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center', 'gap-6')}>
            <InternalLink path={'/'}>
              <EchoLogoSvg width={144} />
            </InternalLink>
            <HideIfNil checks={user} render={(user) => <DisconnectButton user={user} />} />
            <ShowIfNil checks={user}>
              <ConnectButton />
            </ShowIfNil>
          </div>
        </PaddedContainer>
      </HeaderLayout>
    </NextIntlClientProvider>
  )
}
