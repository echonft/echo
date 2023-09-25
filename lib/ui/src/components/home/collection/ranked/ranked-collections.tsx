import { RankedCollectionsContainer } from '@echo/ui/components/home/collection/ranked/layout/ranked-collections-container'
import { RankedCollectionsLayout } from '@echo/ui/components/home/collection/ranked/layout/ranked-collections-layout'
import { CollectionTileDetails } from '@echo/ui/types/model/collection-tile-details'
import { FunctionComponent } from 'react'

interface Props {
  collections: Array<CollectionTileDetails>
}

export const RankedCollections: FunctionComponent<Props> = ({ collections }) => {
  return (
    <RankedCollectionsLayout>
      <RankedCollectionsContainer collections={collections} />
    </RankedCollectionsLayout>
  )
}
