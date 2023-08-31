import { CollectionSkeleton } from '../skeleton/collection/collection-skeleton'
import { CollectionFetcher } from './fetchers/collection-fetcher'
import { FunctionComponent, Suspense } from 'react'

interface Props {
  slug: string
  onMakeOfferForNft?: (id: string) => unknown
  onCollectionError?: (error: Error) => unknown
  onNftsError?: (error: Error) => unknown
}

export const Collection: FunctionComponent<Props> = ({ slug, onMakeOfferForNft, onCollectionError, onNftsError }) => {
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
