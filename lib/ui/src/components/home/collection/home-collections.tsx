import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { HomeCollectionsLayout } from '@echo/ui/components/home/collection/layout/home-collections-layout'
import { RankedCollections } from '@echo/ui/components/home/collection/ranked/ranked-collections'
import { TopCollections } from '@echo/ui/components/home/collection/top/top-collections'
import { CollectionTileDetails } from '@echo/ui/types/model/collection-tile-details'
import { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { min, slice } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  collections: NonEmptyArray<CollectionTileDetails>
}

export const HomeCollections: FunctionComponent<Props> = ({ collections }) => {
  const topCollections = slice(1, min(collections.length, 5), collections)
  const rankedCollections = collections.length < 6 ? [] : slice(5, min(collections.length, 10), collections)

  return (
    <HomeCollectionsLayout>
      <TopCollections collections={topCollections} />
      <HideIfEmpty
        checks={rankedCollections}
        render={(collections) => <RankedCollections collections={collections} />}
      />
    </HomeCollectionsLayout>
  )
}
