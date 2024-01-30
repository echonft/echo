import { RankedCollectionsContainerLayout } from '@echo/ui/pages/collection/list/layout/ranked-collections-container-layout'
import { RankedCollectionsLayout } from '@echo/ui/pages/collection/list/layout/ranked-collections-layout'
import { RankedCollectionsButtonContainer } from '@echo/ui/pages/home/collection/ranked/layout/ranked-collections-button-container'
import { HomepageRankedCollectionsContainerSkeleton } from '@echo/ui/pages/home/collection/ranked/skeleton/homepage-ranked-collections-container-skeleton'
import { RankedCollectionsButtonSkeleton } from '@echo/ui/pages/home/collection/ranked/skeleton/ranked-collections-button-skeleton'
import { type FunctionComponent } from 'react'

export const HomepageRankedCollectionsSkeleton: FunctionComponent = () => {
  return (
    <RankedCollectionsLayout>
      <RankedCollectionsContainerLayout>
        <HomepageRankedCollectionsContainerSkeleton />
        <RankedCollectionsButtonContainer>
          <RankedCollectionsButtonSkeleton />
        </RankedCollectionsButtonContainer>
      </RankedCollectionsContainerLayout>
    </RankedCollectionsLayout>
  )
}
