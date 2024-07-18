import { PaddedLayout } from '@echo/ui/components/base/layout/padded-layout'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const NavigationSectionLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className={clsx('w-full', 'pt-12')}>
      <PaddedLayout>{children}</PaddedLayout>
    </div>
  )
}
