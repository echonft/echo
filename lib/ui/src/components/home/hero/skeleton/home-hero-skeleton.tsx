import { CollectionTileSkeleton } from '@echo/ui/components/collection/tile/skeleton/collection-tile-skeleton'
import { HomeHeroLayout } from '@echo/ui/components/home/hero/home-hero-layout'
import { SIZE_LG } from '@echo/ui/constants/size'
import { getTranslator } from '@echo/ui/messages/get-translator'
import { type FunctionComponent } from 'react'

export const HomeHeroSkeleton: FunctionComponent = () => {
  const t = getTranslator()

  return (
    <HomeHeroLayout title={t('home.title')} subtitle={t('home.subtitle')}>
      <CollectionTileSkeleton size={SIZE_LG} />
    </HomeHeroLayout>
  )
}
