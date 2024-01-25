import { PaddedContainer } from '@echo/ui/components/base/layout/padded-container'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { RankedCollectionsHeader } from '@echo/ui/pages/home/collection/ranked/ranked-collections-header'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const RankedCollectionsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <SectionLayout>
      <PaddedContainer>
        <RankedCollectionsHeader />
        {children}
      </PaddedContainer>
    </SectionLayout>
  )
}
