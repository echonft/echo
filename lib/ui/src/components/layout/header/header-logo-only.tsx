import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { EchoLogoSvg } from '@echo/ui/components/base/svg/echo-logo-svg'
import { HeaderLayout, type HeaderLayoutProps } from '@echo/ui/components/layout/header/header-layout'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const HeaderLogoOnly: FunctionComponent<HeaderLayoutProps> = ({ absolute }) => {
  return (
    <HeaderLayout absolute={absolute}>
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
