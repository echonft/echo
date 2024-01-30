import { RankedCollectionsContainerLayout } from '@echo/ui/pages/collection/list/layout/ranked-collections-container-layout'
import { RankedCollectionRowSkeleton } from '@echo/ui/pages/collection/list/skeleton/ranked-collection-row-skeleton'
import { type FunctionComponent } from 'react'

export const CollectionsContainerSkeleton: FunctionComponent = () => {
  return (
    <RankedCollectionsContainerLayout>
      <RankedCollectionRowSkeleton rank={1} />
      <RankedCollectionRowSkeleton rank={2} />
      <RankedCollectionRowSkeleton rank={3} />
      <RankedCollectionRowSkeleton rank={4} />
      <RankedCollectionRowSkeleton rank={5} />
    </RankedCollectionsContainerLayout>
  )
}
