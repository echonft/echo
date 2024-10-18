import { CollectionTileSkeleton } from '@echo/ui/components/collection/tile/skeleton/collection-tile-skeleton'
import { Size } from '@echo/ui/constants/size'
import { TopCollectionsLayout } from '@echo/ui/pages/home/collection/top/layout/top-collections-layout'
import { HomeSectionLayout } from '@echo/ui/pages/home/layout/home-section-layout'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const TopCollectionsSkeleton: FunctionComponent = () => {
  const t = useTranslations('home.topCollections')
  return (
    <HomeSectionLayout title={t('title')}>
      <TopCollectionsLayout>
        <CollectionTileSkeleton size={Size.MD} />
        <CollectionTileSkeleton size={Size.MD} />
        <CollectionTileSkeleton size={Size.MD} />
        <CollectionTileSkeleton size={Size.MD} />
      </TopCollectionsLayout>
    </HomeSectionLayout>
  )
}
