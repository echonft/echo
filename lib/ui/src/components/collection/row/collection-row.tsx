import { pathProvider } from '@echo/routing/constants/path-provider'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { SizeableImage } from '@echo/ui/components/base/sizeable-image'
import { CollectionRowLabel } from '@echo/ui/components/collection/row/collection-row-label'
import { CollectionRowRank } from '@echo/ui/components/collection/row/collection-row-rank'
import { CollectionRowLayout } from '@echo/ui/components/collection/row/layout/collection-row-layout'
import { CollectionRowNameRankPictureLayout } from '@echo/ui/components/collection/row/layout/collection-row-name-rank-picture-layout'
import { CollectionRowRankPictureLayout } from '@echo/ui/components/collection/row/layout/collection-row-rank-picture-layout'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  collection: CollectionWithRank
}

export const CollectionRow: FunctionComponent<Props> = ({
  collection: { name, pictureUrl, rank, slug, swapsCount }
}) => {
  return (
    <InternalLink path={pathProvider.collection.default.get({ slug })}>
      <CollectionRowLayout>
        <CollectionRowNameRankPictureLayout>
          <CollectionRowRankPictureLayout>
            <CollectionRowRank>{rank}</CollectionRowRank>
            <SizeableImage
              className={clsx('w-[6.25rem]', 'h-[6.25rem]', 'rounded')}
              src={pictureUrl}
              alt={name}
              width={100}
              height={100}
            />
          </CollectionRowRankPictureLayout>
          <CollectionRowLabel>{name}</CollectionRowLabel>
        </CollectionRowNameRankPictureLayout>
        <CollectionRowLabel>{swapsCount}</CollectionRowLabel>
      </CollectionRowLayout>
    </InternalLink>
  )
}
