import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const HomeCollectionsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <SectionLayout>
      <div className={clsx('flex', 'flex-col', 'h-max', 'w-full', 'gap-14')}>{children}</div>
    </SectionLayout>
  )
}
