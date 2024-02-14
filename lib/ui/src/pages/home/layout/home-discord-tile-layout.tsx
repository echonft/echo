import { PaddedContainer } from '@echo/ui/components/base/layout/padded-container'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const HomeDiscordTileLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <SectionLayout>
      <PaddedContainer>
        <div className={classes('flex', 'flex-col', 'w-full', 'justify-end')}>{children}</div>
      </PaddedContainer>
    </SectionLayout>
  )
}
