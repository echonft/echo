import type { Collection } from '@echo/model/types/collection'
import { CollectionTile } from '@echo/ui/components/collection/tile/collection-tile'
import { HomeHeroLayout } from '@echo/ui/components/home/hero/home-hero-layout'
import { SizeLG } from '@echo/ui/constants/size'
import { getTranslator } from '@echo/ui/messages/get-translator'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  collection: Collection | undefined
}

export const HomeHero: FunctionComponent<Props> = ({ collection }) => {
  const t = getTranslator()

  if (isNil(collection)) {
    return null
  }

  const { slug, profilePictureUrl, name, swapsCount } = collection
  return (
    <HomeHeroLayout title={t('home.title')} subtitle={t('home.subtitle')}>
      <CollectionTile slug={slug} pictureUrl={profilePictureUrl} name={name} swapsCount={swapsCount} size={SizeLG} />
    </HomeHeroLayout>
  )
}
