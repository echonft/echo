import type { CollectionWithSwapsCount } from '@echo/model/types/collection/collection-with-swaps-count'
import { CollectionTile } from '@echo/ui/components/collection/tile/collection-tile'
import { Size } from '@echo/ui/constants/size'
import { TopCollectionsLayout } from '@echo/ui/pages/home/collection/top/layout/top-collections-layout'
import { isEmpty, map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  collections: CollectionWithSwapsCount[]
}

export const TopCollections: FunctionComponent<Props> = ({ collections }) => {
  if (isEmpty(collections)) {
    return null
  }
  return (
    <TopCollectionsLayout>
      {map(
        ({ slug, name, profilePictureUrl, swapsCount }) => (
          <CollectionTile
            key={slug}
            slug={slug}
            name={name}
            pictureUrl={profilePictureUrl}
            swapsCount={swapsCount}
            size={Size.MD}
          />
        ),
        collections
      )}
    </TopCollectionsLayout>
  )
}
