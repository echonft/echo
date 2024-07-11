import { PaddedLayout } from '@echo/ui/components/base/layout/padded-layout'
import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const CollectionsPageLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <PaddedLayout>
    <div className={clsx('flex', 'flex-col', 'gap-12', 'py-16', 'w-full', 'h-max')}>{children}</div>
  </PaddedLayout>
)
