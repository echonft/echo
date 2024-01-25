import { HeaderLayout } from '@echo/ui/components/base/header/header-layout'
import { PaddedContainer } from '@echo/ui/components/base/layout/padded-container'
import { EchoLogoSvg } from '@echo/ui/components/base/svg/echo-logo-svg'
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
