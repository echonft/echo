import { HomeCollectionsLayout } from '@echo/ui/pages/home/collection/layout/home-collections-layout'
import { RankedCollections } from '@echo/ui/pages/home/collection/ranked/ranked-collections'
import { TopCollections } from '@echo/ui/pages/home/collection/top/top-collections'
import { HomeSectionLayout } from '@echo/ui/pages/home/layout/home-section-layout'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { useTranslations } from 'next-intl'
import { min, slice } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  collections: CollectionWithRank[]
  topCollectionsCount?: number
  rankedCollectionsCount?: number
}

export const HomeCollections: FunctionComponent<Props> = ({
  collections,
  topCollectionsCount = 4,
  rankedCollectionsCount = 5
}) => {
  const t = useTranslations('home.topCollections')
  const topCollections = slice(0, min(collections.length, topCollectionsCount), collections)
  const rankedCollections =
    collections.length <= topCollectionsCount
      ? []
      : slice(topCollectionsCount, min(collections.length, topCollectionsCount + rankedCollectionsCount), collections)

  return (
    <HomeSectionLayout title={t('title')}>
      <HomeCollectionsLayout>
        <TopCollections collections={topCollections} />
        <RankedCollections collections={rankedCollections} />
      </HomeCollectionsLayout>
    </HomeSectionLayout>
  )
}
