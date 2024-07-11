import { PaddedLayout } from '@echo/ui/components/base/layout/padded-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  title: string
}

export const HomeSectionLayout: FunctionComponent<PropsWithChildren<Props>> = ({ title, children }) => {
  return (
    <SectionLayout>
      <PaddedLayout>
        <div className={clsx('flex', 'flex-col', 'gap-8', 'w-full', 'h-max')}>
          <h2 className={clsx('prose-header-md-semi', 'text-white')}>{title}</h2>
          {children}
        </div>
      </PaddedLayout>
    </SectionLayout>
  )
}
