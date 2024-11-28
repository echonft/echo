import { CollectionListLayout } from '@echo/ui/components/collection/row/layout/collection-list-layout'
import { CollectionListSkeleton } from '@echo/ui/components/collection/row/skeleton/collection-list-skeleton'
import { RankedCollectionsLayout } from '@echo/ui/pages/home/collection/ranked/layout/ranked-collections-layout'
import { type FunctionComponent } from 'react'

export const RankedCollectionsSkeleton: FunctionComponent = () => {
  return (
    <RankedCollectionsLayout>
      <CollectionListLayout>
        <CollectionListSkeleton />
      </CollectionListLayout>
    </RankedCollectionsLayout>
  )
}
