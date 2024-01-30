import { RankedCollectionsContainerLayout } from '@echo/ui/pages/collection/list/layout/ranked-collections-container-layout'
import { RankedCollectionRowSkeleton } from '@echo/ui/pages/collection/list/skeleton/ranked-collection-row-skeleton'
import { type FunctionComponent } from 'react'

export const HomepageRankedCollectionsContainerSkeleton: FunctionComponent = () => {
  return (
    <RankedCollectionsContainerLayout>
      <RankedCollectionRowSkeleton rank={6} />
      <RankedCollectionRowSkeleton rank={7} />
      <RankedCollectionRowSkeleton rank={8} />
      <RankedCollectionRowSkeleton rank={9} />
      <RankedCollectionRowSkeleton rank={10} />
    </RankedCollectionsContainerLayout>
  )
}
