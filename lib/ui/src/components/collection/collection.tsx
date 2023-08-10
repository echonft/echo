import { CollectionSkeleton } from '../skeleton/collection/collection-skeleton'
import { CollectionFetcher } from './fetchers/collection-fetcher'
import { FunctionComponent, Suspense } from 'react'

export interface CollectionProps {
  slug: string
  onMakeOfferForNft?: (id: string) => unknown
  onCollectionError?: (error: Error) => unknown
  onNftsError?: (error: Error) => unknown
}

export const Collection: FunctionComponent<CollectionProps> = ({
  slug,
  onMakeOfferForNft,
  onCollectionError,
  onNftsError
}) => {
  return (
    <Suspense fallback={<CollectionSkeleton />}>
      <CollectionFetcher
        slug={slug}
        onMakeOfferForNft={onMakeOfferForNft}
        onCollectionError={onCollectionError}
        onNftsError={onNftsError}
      />
    </Suspense>
  )
}
