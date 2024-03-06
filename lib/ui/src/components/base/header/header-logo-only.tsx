import { HeaderLayout } from '@echo/ui/components/base/header/header-layout'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { PaddedContainer } from '@echo/ui/components/base/layout/padded-container'
import { EchoLogoSvg } from '@echo/ui/components/base/svg/echo-logo-svg'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const HeaderLogoOnly: FunctionComponent = () => {
  return (
    <HeaderLayout>
      <PaddedContainer>
        <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center', 'gap-6')}>
          <InternalLink path={'/'}>
            <EchoLogoSvg width={144} />
          </InternalLink>
        </div>
      </PaddedContainer>
    </HeaderLayout>
  )
}
