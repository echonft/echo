import { CollectionTileSkeleton } from '@echo/ui/components/collection/tile/skeleton/collection-tile-skeleton'
import { TopCollectionsLayout } from '@echo/ui/components/home/collection/top/layout/top-collections-layout'
import { HomeSectionLayout } from '@echo/ui/components/home/layout/home-section-layout'
import { SIZE_MD } from '@echo/ui/constants/size'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const TopCollectionsSkeleton: FunctionComponent = () => {
  const t = useTranslations('home.topCollections')
  return (
    <HomeSectionLayout title={t('title')}>
      <TopCollectionsLayout>
        <CollectionTileSkeleton size={SIZE_MD} />
        <CollectionTileSkeleton size={SIZE_MD} />
        <CollectionTileSkeleton size={SIZE_MD} />
        <CollectionTileSkeleton size={SIZE_MD} />
      </TopCollectionsLayout>
    </HomeSectionLayout>
  )
}
