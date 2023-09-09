'use client'
import { links } from '../../../constants/links'
import { InternalLink } from '../../base/link/internal-link'
import { NftThumbnailPicture } from '../../nft/thumbnail/nft-thumbnail-picture'
import { CollectionThumbnailTitle } from './collection-thumbnail-title'
import { NftCollection } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  collection: NftCollection
  linkDisabled?: boolean
}

export const CollectionThumbnail: FunctionComponent<Props> = ({ collection, linkDisabled }) => {
  const { name, slug, profilePictureUrl } = collection
  return (
    <InternalLink path={links.collection.collectionItemsLink(slug)} disabled={linkDisabled}>
      <div className={clsx('flex', 'flex-col', 'rounded-2xl', 'w-52', 'h-max', 'cursor-pointer', 'overflow-clip')}>
        <div className={'relative'}>
          {/*TODO make sure we have a fallback*/}
          <NftThumbnailPicture alt={name} pictureUrl={profilePictureUrl!} />
        </div>
        <div className={clsx('flex', 'flex-row', 'justify-center', 'grow', 'bg-white/[0.08]', 'p-2')}>
          <CollectionThumbnailTitle collectionName={collection.name} />
        </div>
      </div>
    </InternalLink>
  )
}
