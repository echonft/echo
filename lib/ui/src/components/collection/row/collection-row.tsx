import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { CollectionRowImage } from '@echo/ui/components/collection/row/collection-row-image'
import { CollectionRowLabel } from '@echo/ui/components/collection/row/collection-row-label'
import { CollectionRowRank } from '@echo/ui/components/collection/row/collection-row-rank'
import { CollectionRowLayout } from '@echo/ui/components/collection/row/layout/collection-row-layout'
import { CollectionRowNameRankPictureLayout } from '@echo/ui/components/collection/row/layout/collection-row-name-rank-picture-layout'
import { CollectionRowRankPictureLayout } from '@echo/ui/components/collection/row/layout/collection-row-rank-picture-layout'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { type FunctionComponent } from 'react'

interface Props {
  collection: CollectionWithRank
}

export const CollectionRow: FunctionComponent<Props> = ({
  collection: { name, pictureUrl, rank, slug, swapsCount }
}) => {
  return (
    <InternalLink path={frontendRoutes.collection.details.get({ slug })}>
      <CollectionRowLayout>
        <CollectionRowNameRankPictureLayout>
          <CollectionRowRankPictureLayout>
            <CollectionRowRank>{rank}</CollectionRowRank>
            <CollectionRowImage alt={name} src={pictureUrl} />
          </CollectionRowRankPictureLayout>
          <CollectionRowLabel>{name}</CollectionRowLabel>
        </CollectionRowNameRankPictureLayout>
        <CollectionRowLabel>{swapsCount}</CollectionRowLabel>
      </CollectionRowLayout>
    </InternalLink>
  )
}
