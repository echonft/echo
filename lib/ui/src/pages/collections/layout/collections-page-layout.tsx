import { PaddedContainer } from '@echo/ui/components/base/layout/padded-container'
import { classes } from '@echo/ui/helpers/classes'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const CollectionsPageLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <PaddedContainer>
    <div className={classes('flex', 'flex-col', 'gap-12', 'py-16', 'w-full', 'h-max')}>{children}</div>
  </PaddedContainer>
)
