'use client'
import { type AuthUser } from '@echo/model/types/auth-user'
import { DisconnectButton, type DisconnectButtonProps } from '@echo/ui/components/base/header/disconnect-button'
import { HeaderLayout } from '@echo/ui/components/base/header/header-layout'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { PaddedContainer } from '@echo/ui/components/base/layout/padded-container'
import { EchoLogoSvg } from '@echo/ui/components/base/svg/echo-logo-svg'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props extends DisconnectButtonProps {
  user: AuthUser
}

export const HeaderLoggedIn: FunctionComponent<Props> = (props) => {
  return (
    <HeaderLayout>
      <PaddedContainer>
        <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center', 'gap-6')}>
          <InternalLink path={'/'}>
            <EchoLogoSvg width={144} />
          </InternalLink>
          <DisconnectButton {...props} />
        </div>
      </PaddedContainer>
    </HeaderLayout>
  )
}
