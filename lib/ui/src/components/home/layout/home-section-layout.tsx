import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  title: string
}

export const HomeSectionLayout: FunctionComponent<PropsWithChildren<Props>> = ({ title, children }) => {
  return (
    <SectionLayout>
      <PaddedContainer>
        <div className={clsx('flex', 'flex-col', 'gap-8', 'w-full', 'h-max')}>
          <h2 className={clsx('prose-header-md-semi', 'text-white')}>{title}</h2>
          {children}
        </div>
      </PaddedContainer>
    </SectionLayout>
  )
}
