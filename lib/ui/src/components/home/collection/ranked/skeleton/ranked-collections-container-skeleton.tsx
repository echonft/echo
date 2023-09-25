import { RankedCollectionsButtonContainer } from '@echo/ui/components/home/collection/ranked/layout/ranked-collections-button-container'
import { RankedCollectionsContainerLayout } from '@echo/ui/components/home/collection/ranked/layout/ranked-collections-container-layout'
import { RankedCollectionRowSkeleton } from '@echo/ui/components/home/collection/ranked/skeleton/ranked-collection-row-skeleton'
import { RankedCollectionsButtonSkeleton } from '@echo/ui/components/home/collection/ranked/skeleton/ranked-collections-button-skeleton'
import { FunctionComponent } from 'react'

export const RankedCollectionsContainerSkeleton: FunctionComponent = () => {
  return (
    <RankedCollectionsContainerLayout>
      <RankedCollectionRowSkeleton rank={6} />
      <RankedCollectionRowSkeleton rank={7} />
      <RankedCollectionRowSkeleton rank={8} />
      <RankedCollectionRowSkeleton rank={9} />
      <RankedCollectionRowSkeleton rank={10} />
      <RankedCollectionsButtonContainer>
        <RankedCollectionsButtonSkeleton />
      </RankedCollectionsButtonContainer>
    </RankedCollectionsContainerLayout>
  )
}
