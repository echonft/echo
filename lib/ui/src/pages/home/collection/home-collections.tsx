import { type Collection } from '@echo/model/types/collection'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { HomeCollectionsLayout } from '@echo/ui/pages/home/collection/layout/home-collections-layout'
import { RankedCollections } from '@echo/ui/pages/home/collection/ranked/ranked-collections'
import { TopCollections } from '@echo/ui/pages/home/collection/top/top-collections'
import { min, slice } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  collections: Collection[]
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
