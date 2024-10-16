import type { CollectionWithSwapsCount } from '@echo/model/types/collection/collection-with-swaps-count'
import { CollectionTile } from '@echo/ui/components/collection/tile/collection-tile'
import { SIZE_LG } from '@echo/ui/constants/size'
import { HomeHeroLayout } from '@echo/ui/pages/home/hero/home-hero-layout'
import type { Nullable } from '@echo/utils/types/nullable'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  collection: Nullable<CollectionWithSwapsCount>
}

export const HomeHero: FunctionComponent<Props> = ({ collection }) => {
  const t = useTranslations('home')
  if (isNil(collection)) {
    return null
  }

  const { slug, profilePictureUrl, name, swapsCount } = collection
  return (
    <HomeHeroLayout title={t('title')} subtitle={t('subtitle')}>
      <CollectionTile slug={slug} pictureUrl={profilePictureUrl} name={name} swapsCount={swapsCount} size={SIZE_LG} />
    </HomeHeroLayout>
  )
}
