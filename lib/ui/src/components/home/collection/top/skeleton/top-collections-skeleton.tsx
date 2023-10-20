import { CollectionTileSkeleton } from '@echo/ui/components/collection/tile/skeleton/collection-tile-skeleton'
import { TopCollectionsLayout } from '@echo/ui/components/home/collection/top/layout/top-collections-layout'
import { HomeSectionLayout } from '@echo/ui/components/home/layout/home-section-layout'
import { SizeMD } from '@echo/ui/constants/size'
import { getTranslator } from '@echo/ui/messages/get-translator'
import { type FunctionComponent } from 'react'

export const TopCollectionsSkeleton: FunctionComponent = () => {
  const t = getTranslator()
  return (
    <HomeSectionLayout title={t('home.topCollections.title')}>
      <TopCollectionsLayout>
        <CollectionTileSkeleton size={SizeMD} />
        <CollectionTileSkeleton size={SizeMD} />
        <CollectionTileSkeleton size={SizeMD} />
        <CollectionTileSkeleton size={SizeMD} />
      </TopCollectionsLayout>
    </HomeSectionLayout>
  )
}
