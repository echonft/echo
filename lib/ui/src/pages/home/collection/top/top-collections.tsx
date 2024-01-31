import { type Collection } from '@echo/model/types/collection'
import { CollectionTile } from '@echo/ui/components/collection/tile/collection-tile'
import { SIZE_MD } from '@echo/ui/constants/size'
import { TopCollectionsLayout } from '@echo/ui/pages/home/collection/top/layout/top-collections-layout'
import { HomeSectionLayout } from '@echo/ui/pages/home/layout/home-section-layout'
import { useTranslations } from 'next-intl'
import { isEmpty, map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  collections: Collection[]
}

export const TopCollections: FunctionComponent<Props> = ({ collections }) => {
  const t = useTranslations('home.topCollections')
  if (isEmpty(collections)) {
    return null
  }
  return (
    <HomeSectionLayout title={t('title')}>
      <TopCollectionsLayout>
        {map(
          ({ slug, name, profilePictureUrl, swapsCount }) => (
            <CollectionTile
              key={slug}
              slug={slug}
              name={name}
              pictureUrl={profilePictureUrl}
              swapsCount={swapsCount}
              size={SIZE_MD}
            />
          ),
          collections
        )}
      </TopCollectionsLayout>
    </HomeSectionLayout>
  )
}
