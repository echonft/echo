import { PaddedLayout } from '@echo/ui/components/base/layout/padded-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const HomeDiscordTileLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <SectionLayout>
      <PaddedLayout>
        <div className={clsx('flex', 'flex-col', 'w-full', 'justify-end')}>{children}</div>
      </PaddedLayout>
    </SectionLayout>
  )
}
