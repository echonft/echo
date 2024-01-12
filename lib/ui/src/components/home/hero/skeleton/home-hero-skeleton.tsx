import { CollectionTileSkeleton } from '@echo/ui/components/collection/tile/skeleton/collection-tile-skeleton'
import { HomeHeroLayout } from '@echo/ui/components/home/hero/home-hero-layout'
import { SIZE_LG } from '@echo/ui/constants/size'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const HomeHeroSkeleton: FunctionComponent = () => {
  const t = useTranslations('home')

  return (
    <HomeHeroLayout title={t('title')} subtitle={t('subtitle')}>
      <CollectionTileSkeleton size={SIZE_LG} />
    </HomeHeroLayout>
  )
}
