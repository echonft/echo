import { PaddedContainer } from '@echo/ui/components/base/layout/padded-container'
import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const CollectionsPageLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <PaddedContainer>
    <div className={clsx('flex', 'flex-col', 'gap-12', 'py-16')}>{children}</div>
  </PaddedContainer>
)
