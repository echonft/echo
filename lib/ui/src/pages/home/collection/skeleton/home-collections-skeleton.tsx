import { HomeCollectionsLayout } from '@echo/ui/pages/home/collection/layout/home-collections-layout'
import { HomepageRankedCollectionsSkeleton } from '@echo/ui/pages/home/collection/ranked/skeleton/homepage-ranked-collections-skeleton'
import { TopCollectionsSkeleton } from '@echo/ui/pages/home/collection/top/skeleton/top-collections-skeleton'
import { type FunctionComponent } from 'react'

export const HomeCollectionsSkeleton: FunctionComponent = () => {
  return (
    <HomeCollectionsLayout>
      <TopCollectionsSkeleton />
      <HomepageRankedCollectionsSkeleton />
    </HomeCollectionsLayout>
  )
}
