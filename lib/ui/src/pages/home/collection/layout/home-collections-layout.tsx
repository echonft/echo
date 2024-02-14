import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const HomeCollectionsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <SectionLayout>
      <div className={classes('flex', 'flex-col', 'h-max', 'w-full', 'gap-14')}>{children}</div>
    </SectionLayout>
  )
}
