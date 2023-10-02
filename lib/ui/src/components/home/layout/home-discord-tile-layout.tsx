import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

export const HomeDiscordTileLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <SectionLayout>
      <PaddedContainer>
        <div className={clsx('flex', 'flex-col', 'w-full', 'justify-end')}>{children}</div>
      </PaddedContainer>
    </SectionLayout>
  )
}
