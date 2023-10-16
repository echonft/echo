'use client'
import type { Collection } from '@echo/model/types/collection'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { CollectionThumbnailTitle } from '@echo/ui/components/collection/thumbnail/collection-thumbnail-title'
import { NftThumbnailPicture } from '@echo/ui/components/nft/thumbnail/nft-thumbnail-picture'
import { links } from '@echo/ui/constants/links'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  count: number
  collection: Collection
  linkDisabled?: boolean
}

export const CollectionThumbnail: FunctionComponent<Props> = ({ count, collection, linkDisabled }) => {
  const { name, slug, profilePictureUrl } = collection
  return (
    <InternalLink path={links.collection.items(slug)} disabled={linkDisabled}>
      <div className={clsx('flex', 'flex-col', 'rounded-2xl', 'w-52', 'h-max', 'cursor-pointer', 'overflow-clip')}>
        <div className={'relative'}>
          {/*TODO make sure we have a fallback*/}
          <NftThumbnailPicture alt={name} pictureUrl={profilePictureUrl} />
        </div>
        <div className={clsx('flex', 'flex-row', 'justify-center', 'grow', 'bg-white/[0.08]', 'p-2')}>
          <CollectionThumbnailTitle count={count} collectionName={collection.name} />
        </div>
      </div>
    </InternalLink>
  )
}
