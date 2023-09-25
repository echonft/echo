import { CollectionTile } from '@echo/ui/components/collection/tile/collection-tile'
import { TopCollectionsLayout } from '@echo/ui/components/home/collection/layout/top-collections-layout'
import { HomeSectionLayout } from '@echo/ui/components/home/layout/home-section-layout'
import { SizeMD } from '@echo/ui/constants/size'
import { getTranslator } from '@echo/ui/messages/get-translator'
import type { CollectionTileDetails } from '@echo/ui/types/model/collection-tile-details'
import { map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  collections: Array<CollectionTileDetails>
}

export const TopCollections: FunctionComponent<Props> = ({ collections }) => {
  const t = getTranslator()
  return (
    <HomeSectionLayout title={t('home.topCollections.title')}>
      <TopCollectionsLayout>
        {map(
          ({ slug, name, profilePictureUrl, swapsCount }) => (
            <CollectionTile
              key={slug}
              slug={slug}
              name={name}
              pictureUrl={profilePictureUrl!}
              swapsCount={swapsCount}
              size={SizeMD}
            />
          ),
          collections
        )}
      </TopCollectionsLayout>
    </HomeSectionLayout>
  )
}
