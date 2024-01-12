import { type Collection } from '@echo/model/types/collection'
import { CollectionTile } from '@echo/ui/components/collection/tile/collection-tile'
import { HomeHeroLayout } from '@echo/ui/components/home/hero/home-hero-layout'
import { SIZE_LG } from '@echo/ui/constants/size'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  collection: Collection
}

export const HomeHero: FunctionComponent<Props> = ({ collection }) => {
  const t = useTranslations('home')

  const { slug, profilePictureUrl, name, swapsCount } = collection
  return (
    <HomeHeroLayout title={t('title')} subtitle={t('subtitle')}>
      <CollectionTile slug={slug} pictureUrl={profilePictureUrl} name={name} swapsCount={swapsCount} size={SIZE_LG} />
    </HomeHeroLayout>
  )
}
