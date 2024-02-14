import { PaddedContainer } from '@echo/ui/components/base/layout/padded-container'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  title: string
}

export const HomeSectionLayout: FunctionComponent<PropsWithChildren<Props>> = ({ title, children }) => {
  return (
    <SectionLayout>
      <PaddedContainer>
        <div className={classes('flex', 'flex-col', 'gap-8', 'w-full', 'h-max')}>
          <h2 className={classes('prose-header-md-semi', 'text-white')}>{title}</h2>
          {children}
        </div>
      </PaddedContainer>
    </SectionLayout>
  )
}
