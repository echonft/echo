import { RankedCollectionsLayout } from '@echo/ui/components/home/collection/ranked/layout/ranked-collections-layout'
import { RankedCollectionsContainerSkeleton } from '@echo/ui/components/home/collection/ranked/skeleton/ranked-collections-container-skeleton'
import { type FunctionComponent } from 'react'

export const RankedCollectionsSkeleton: FunctionComponent = () => {
  return (
    <RankedCollectionsLayout>
      <RankedCollectionsContainerSkeleton />
    </RankedCollectionsLayout>
  )
}
