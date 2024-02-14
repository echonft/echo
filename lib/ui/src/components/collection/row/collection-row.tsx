import { linkProvider } from '@echo/api/routing/link-provider'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { CollectionRowLabel } from '@echo/ui/components/collection/row/collection-row-label'
import { CollectionRowRank } from '@echo/ui/components/collection/row/collection-row-rank'
import { CollectionRowLayout } from '@echo/ui/components/collection/row/layout/collection-row-layout'
import { CollectionRowNameRankPictureLayout } from '@echo/ui/components/collection/row/layout/collection-row-name-rank-picture-layout'
import { CollectionRowRankPictureLayout } from '@echo/ui/components/collection/row/layout/collection-row-rank-picture-layout'
import { DEFAULT_COLLECTION_PROFILE_PICTURE_URL } from '@echo/ui/constants/default-collection-profile-picture-url'
import { classes } from '@echo/ui/helpers/classes'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import Image from 'next/image'
import { type FunctionComponent } from 'react'

interface Props {
  collection: CollectionWithRank
}

export const CollectionRow: FunctionComponent<Props> = ({
  collection: { name, profilePictureUrl, rank, slug, swapsCount }
}) => {
  return (
    <InternalLink path={linkProvider.collection.items.get({ slug })}>
      <CollectionRowLayout>
        <CollectionRowNameRankPictureLayout>
          <CollectionRowRankPictureLayout>
            <CollectionRowRank>{rank}</CollectionRowRank>
            <Image
              className={classes('w-[6.25rem]', 'h-[6.25rem]', 'rounded')}
              src={profilePictureUrl ?? DEFAULT_COLLECTION_PROFILE_PICTURE_URL}
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
