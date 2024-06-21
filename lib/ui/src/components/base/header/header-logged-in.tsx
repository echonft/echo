'use client'
import type { User } from '@echo/auth/types/user'
import { HeaderLayout } from '@echo/ui/components/base/header/header-layout'
import { HeaderProfileButton } from '@echo/ui/components/base/header/header-profile-button'
import { HeaderSearch } from '@echo/ui/components/base/header/header-search'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { EchoLogoSvg } from '@echo/ui/components/base/svg/echo-logo-svg'
import { type FunctionComponent, type MouseEventHandler } from 'react'

export interface HeaderLoggedInProps {
  user: User
  onWalletButtonClick?: MouseEventHandler
}

export const HeaderLoggedIn: FunctionComponent<HeaderLoggedInProps> = (props) => {
  return (
    <HeaderLayout>
      <InternalLink path={'/'}>
        <EchoLogoSvg width={144} />
      </InternalLink>
      <HeaderSearch />
      <HeaderProfileButton {...props} />
    </HeaderLayout>
  )
}
