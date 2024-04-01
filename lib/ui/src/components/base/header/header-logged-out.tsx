'use client'
import { HeaderLayout } from '@echo/ui/components/base/header/header-layout'
import { HeaderLoginButton } from '@echo/ui/components/base/header/header-login-button'
import { HeaderSearch } from '@echo/ui/components/base/header/header-search'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { EchoLogoSvg } from '@echo/ui/components/base/svg/echo-logo-svg'
import { type FunctionComponent } from 'react'

export const HeaderLoggedOut: FunctionComponent = () => {
  return (
    <HeaderLayout>
      <InternalLink path={'/'}>
        <EchoLogoSvg width={144} />
      </InternalLink>
      <HeaderSearch />
      <HeaderLoginButton />
    </HeaderLayout>
  )
}
