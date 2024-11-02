import { HeaderLayout } from '@echo/ui/components/base/header/header-layout'
import { EchoLogoSvg } from '@echo/ui/components/base/svg/echo-logo-svg'
import type { FunctionComponent } from 'react'

export const HeaderSkeleton: FunctionComponent = () => {
  return (
    <HeaderLayout>
      <EchoLogoSvg width={144} />
    </HeaderLayout>
  )
}
