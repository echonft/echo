import { RankedCollectionsHeader } from '@echo/ui/components/home/collection/ranked/ranked-collections-header'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
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
