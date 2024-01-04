'use client'
import { type AuthUser } from '@echo/model/types/auth-user'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { EchoLogoSvg } from '@echo/ui/components/base/svg/echo-logo-svg'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { ShowIfNil } from '@echo/ui/components/base/utils/show-if-nil'
import { ConnectButtonWrapper } from '@echo/ui/components/layout/header/connect-button-wrapper'
import { DisconnectButton } from '@echo/ui/components/layout/header/disconnect-button'
import { HeaderLayout, type HeaderLayoutProps } from '@echo/ui/components/layout/header/header-layout'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export interface HeaderProps extends HeaderLayoutProps {
  user?: AuthUser
  logoOnly?: boolean
}

export const Header: FunctionComponent<HeaderProps> = ({ user, absolute, logoOnly }) => {
  return (
    <HeaderLayout absolute={absolute}>
      <PaddedContainer>
        <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center', 'gap-6')}>
          <InternalLink path={'/'}>
            <EchoLogoSvg width={144} />
          </InternalLink>
          <HideIf condition={logoOnly === true}>
            <HideIfNil checks={user} render={(user) => <DisconnectButton user={user} />} />
            <ShowIfNil checks={user}>
              <ConnectButtonWrapper />
            </ShowIfNil>
          </HideIf>
        </div>
      </PaddedContainer>
    </HeaderLayout>
  )
}
