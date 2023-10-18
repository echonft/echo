import { EchoLogoSvg } from '@echo/ui/components/base/svg/echo-logo-svg'
import { HeaderLayout } from '@echo/ui/components/layout/header/header-layout'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { type FunctionComponent } from 'react'

export const HeaderSkeleton: FunctionComponent = () => {
  return (
    <HeaderLayout>
      <PaddedContainer>
        <EchoLogoSvg width={144} />
      </PaddedContainer>
    </HeaderLayout>
  )
}
