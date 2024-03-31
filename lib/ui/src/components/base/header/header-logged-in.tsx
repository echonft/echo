'use client'
import type { AuthUser } from '@echo/model/types/auth-user'
import { HeaderLayout } from '@echo/ui/components/base/header/header-layout'
import { HeaderProfileButton } from '@echo/ui/components/base/header/header-profile-button'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { EchoLogoSvg } from '@echo/ui/components/base/svg/echo-logo-svg'
import { type FunctionComponent, type MouseEventHandler } from 'react'

export interface HeaderLoggedInProps {
  user: AuthUser
  onWalletButtonClick?: MouseEventHandler
}
export const HeaderLoggedIn: FunctionComponent<HeaderLoggedInProps> = (props) => {
  return (
    <HeaderLayout>
      <InternalLink path={'/'}>
        <EchoLogoSvg width={144} />
      </InternalLink>
      <HeaderProfileButton {...props} />
    </HeaderLayout>
  )
}
