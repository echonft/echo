import { RankedCollectionsContainer } from '@echo/ui/components/home/collection/ranked/layout/ranked-collections-container'
import { RankedCollectionsLayout } from '@echo/ui/components/home/collection/ranked/layout/ranked-collections-layout'
import { CollectionTileDetails } from '@echo/ui/types/collection-tile-details'
import { FunctionComponent } from 'react'

interface Props {
  collections: CollectionTileDetails[]
  firstRank: number
}

export const RankedCollections: FunctionComponent<Props> = ({ collections, firstRank }) => {
  return (
    <RankedCollectionsLayout>
      <RankedCollectionsContainer collections={collections} firstRank={firstRank} />
    </RankedCollectionsLayout>
  )
}
