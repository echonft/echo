'use client'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import { type Collection } from '@echo/model/types/collection'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { CollectionThumbnailPicture } from '@echo/ui/components/collection/thumbnail/collection-thumbnail-picture'
import { CollectionThumbnailTitle } from '@echo/ui/components/collection/thumbnail/collection-thumbnail-title'
import { CollectionThumbnailLayout } from '@echo/ui/components/collection/thumbnail/layout/collection-thumbnail-layout'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  count: number
  collection: Collection
  linkDisabled?: boolean
}

export const CollectionThumbnail: FunctionComponent<Props> = ({ count, collection, linkDisabled }) => {
  const { name, slug, profilePictureUrl } = collection
  return (
    <InternalLink path={linkProvider.collection.items.get({ slug })} disabled={linkDisabled}>
      <CollectionThumbnailLayout>
        <div className={'relative'}>
          <CollectionThumbnailPicture alt={name} pictureUrl={profilePictureUrl} />
        </div>
        <div className={clsx('flex', 'flex-row', 'justify-center', 'grow', 'bg-white/[0.08]', 'p-2')}>
          <CollectionThumbnailTitle count={count} collectionName={collection.name} />
        </div>
      </CollectionThumbnailLayout>
    </InternalLink>
  )
}
