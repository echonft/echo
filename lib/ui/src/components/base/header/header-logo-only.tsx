import { HeaderLayout } from '@echo/ui/components/base/header/header-layout'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { EchoLogoSvg } from '@echo/ui/components/base/svg/echo-logo-svg'
import { type FunctionComponent } from 'react'

export const HeaderLogoOnly: FunctionComponent = () => {
  return (
    <HeaderLayout>
      <InternalLink path={'/'}>
        <EchoLogoSvg width={144} />
      </InternalLink>
    </HeaderLayout>
  )
}
