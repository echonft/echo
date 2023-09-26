import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { HomeCollectionsLayout } from '@echo/ui/components/home/collection/layout/home-collections-layout'
import { RankedCollections } from '@echo/ui/components/home/collection/ranked/ranked-collections'
import { TopCollections } from '@echo/ui/components/home/collection/top/top-collections'
import { CollectionTileDetails } from '@echo/ui/types/model/collection-tile-details'
import { min, slice } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  collections: Array<CollectionTileDetails>
  topCollectionsCount?: number
  rankedCollectionsCount?: number
}

export const HomeCollections: FunctionComponent<Props> = ({
  collections,
  topCollectionsCount = 4,
  rankedCollectionsCount = 5
}) => {
  const topCollections = slice(0, min(collections.length, topCollectionsCount), collections)
  const rankedCollections =
    collections.length <= topCollectionsCount
      ? []
      : slice(topCollectionsCount, min(collections.length, topCollectionsCount + rankedCollectionsCount), collections)
  // + 2 because the first rank is always in the Hero section of the home page
  const firstRank = topCollectionsCount + 2

  return (
    <HomeCollectionsLayout>
      <TopCollections collections={topCollections} />
      <HideIfEmpty
        checks={rankedCollections}
        render={(collections) => <RankedCollections collections={collections} firstRank={firstRank} />}
      />
    </HomeCollectionsLayout>
  )
}
