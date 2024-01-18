'use client'
import { type AuthUser } from '@echo/model/types/auth-user'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { EchoLogoSvg } from '@echo/ui/components/base/svg/echo-logo-svg'
import { DisconnectButton, type DisconnectButtonProps } from '@echo/ui/components/layout/header/disconnect-button'
import { HeaderLayout } from '@echo/ui/components/layout/header/header-layout'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
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
